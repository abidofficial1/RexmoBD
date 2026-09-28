<?php
// Here is change and reason: Added a minimal PHP session demonstration so the assignment can show server-side authentication concepts without MySQL, PDO, MySQLi, or SQL files.
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'POST requests only.']);
    exit;
}

$email = trim($_POST['email'] ?? '');
$name = trim($_POST['name'] ?? '');
$password = $_POST['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $name === '' || $password === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Valid login information is required.']);
    exit;
}

$_SESSION['rexmobd_user'] = [
    'email' => $email,
    'name' => $name,
    'logged_in' => true
];

echo json_encode(['success' => true, 'message' => 'PHP session initialized.', 'user' => $_SESSION['rexmobd_user']]);
?>