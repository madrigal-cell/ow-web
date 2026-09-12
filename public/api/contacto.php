<?php
declare(strict_types=1);
require __DIR__ . '/_mail.php';

$lang = ow_guard('contact-form');
$name = ow_field('name', 120);
$company = ow_field('company', 160);
$email = ow_field('email', 200);

ow_send(
    '[Web] Contacto: ' . $name . ($company !== '' ? ' (' . $company . ')' : ''),
    [
        'Nombre' => $name,
        'Agencia / empresa' => $company,
        'Email' => $email,
        'Teléfono' => ow_field('phone', 60),
        'Mensaje' => ow_field('message', 5000),
    ],
    $email,
    $lang,
    'contact-form'
);
