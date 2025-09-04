<?php
/*
Path: public/dashboard_test.php
Description: Endpoint de prueba para el dashboard. Devuelve datos simulados.
*/

header('Content-Type: application/json');
echo json_encode([
    "meta" => [
        "title" => "Dashboard Test",
        "date" => date("Y-m-d")
    ],
    "series" => [
    "hoy" => ["data" => array_fill(0, 288, rand(50, 100))],
    "ayer" => ["data" => array_fill(0, 288, rand(40, 90))],
    "semana_anterior" => ["data" => array_fill(0, 288, rand(30, 80))]
    ],
    "features" => [],
    "producto" => "Test Producto"
]);
?>