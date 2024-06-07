<?php
$host = 'localhost'; // Hostname
$db = 'mavitaba'; // Database name
$user = 'root'; // MySQL username (default is 'root' for XAMPP)
$pass = ''; // MySQL password (default is empty for XAMPP)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>
