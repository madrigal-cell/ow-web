<?php
declare(strict_types=1);
require __DIR__ . '/_mail.php';

$lang = ow_guard('brief-form');
$name = ow_field('name', 120);
$company = ow_field('company', 160);
$email = ow_field('email', 200);
$deliverables = isset($_POST['deliverables']) && is_array($_POST['deliverables'])
    ? array_map(fn($v) => mb_substr(trim((string) $v), 0, 60), array_slice($_POST['deliverables'], 0, 10))
    : [];

ow_send(
    '[Web] Brief: ' . $name . ($company !== '' ? ' (' . $company . ')' : '') . ' · ' . ow_field('type', 60),
    [
        'Nombre' => $name,
        'Agencia / empresa' => $company,
        'Email' => $email,
        'Teléfono' => ow_field('phone', 60),
        'Fecha del evento o rodaje' => ow_field('date', 20),
        'Ciudad' => ow_field('city', 120),
        'Tipo de proyecto' => ow_field('type', 60),
        'Entregables' => $deliverables,
        'Plazo de entrega' => ow_field('deadline', 160),
        'Mensaje' => ow_field('message', 5000),
    ],
    $email,
    $lang,
    'brief-form'
);
