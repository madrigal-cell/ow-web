<?php
/**
 * On White · envío de formularios (contacto y brief).
 * Se ejecuta en el hosting de IONOS. Valida, filtra spam y envía por correo.
 * Configuración: cambiar solo las constantes de abajo.
 */
declare(strict_types=1);

const OW_TO      = 'produccion@owmakers.com';   // buzón que recibe los formularios
const OW_FROM    = 'sh-585926058@eu.hosting-webspace.io'; // remitente técnico: la única dirección que IONOS acepta desde este webspace
                                                          // (el correo @owmakers.com vive en Google, no en IONOS). Reply-To lleva el email del visitante.
const OW_SITE    = 'https://owmakers.com';
const OW_THANKS  = ['es' => '/gracias/', 'en' => '/en/thanks/'];
const OW_MIN_SECONDS = 3;                        // un humano tarda más de 3 s en rellenar el formulario

function ow_field(string $k, int $max = 500): string {
    $v = isset($_POST[$k]) ? (string) $_POST[$k] : '';
    $v = trim(str_replace(["\r", "\0"], '', $v));
    return mb_substr($v, 0, $max);
}

function ow_wants_json(): bool {
    return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
}

function ow_respond(bool $ok, string $lang, string $formId, string $error = ''): void {
    if (ow_wants_json()) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 400);
        echo json_encode(['ok' => $ok, 'error' => $error], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $lang = $lang === 'en' ? 'en' : 'es';
    $back = $_SERVER['HTTP_REFERER'] ?? OW_SITE . '/';
    $back = str_starts_with($back, OW_SITE) ? strtok($back, '?#') : OW_SITE . '/';
    header('Location: ' . ($ok ? OW_SITE . OW_THANKS[$lang] : $back . '?error=1#' . $formId), true, 303);
    exit;
}

/** Comprobaciones comunes. Devuelve el idioma o corta con error. */
function ow_guard(string $formId): string {
    $lang = ow_field('lang', 2) === 'en' ? 'en' : 'es';
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') ow_respond(false, $lang, $formId, 'method');
    if (ow_field('website') !== '') ow_respond(true, $lang, $formId);            // honeypot: fingimos éxito
    $t = (int) ow_field('t', 20);
    if ($t > 0 && (time() * 1000 - $t) < OW_MIN_SECONDS * 1000) ow_respond(true, $lang, $formId); // demasiado rápido: bot
    $name = ow_field('name', 120);
    $email = ow_field('email', 200);
    if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) ow_respond(false, $lang, $formId, 'invalid');
    if (ow_field('consent', 10) === '') ow_respond(false, $lang, $formId, 'consent');
    return $lang;
}

function ow_send(string $subject, array $rows, string $replyTo, string $lang, string $formId): void {
    $lines = [];
    foreach ($rows as $k => $v) {
        if ($v === '' || $v === []) continue;
        $lines[] = $k . ': ' . (is_array($v) ? implode(', ', $v) : $v);
    }
    $lines[] = '';
    $lines[] = 'Idioma: ' . $lang . ' · IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '') . ' · ' . date('c');
    $body = implode("\n", $lines);

    $headers = [
        'From: On White Web <' . OW_FROM . '>',
        'Reply-To: ' . $replyTo,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: owmakers.com',
    ];
    $encoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $ok = mail(OW_TO, $encoded, $body, implode("\r\n", $headers));
    ow_respond($ok, $lang, $formId, $ok ? '' : 'mail');
}
