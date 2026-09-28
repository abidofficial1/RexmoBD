<?php
// Here is change and reason: Added a minimal PHP logout endpoint that destroys the demonstration session without using a database.
session_start();
$_SESSION = [];
session_destroy();
header('Content-Type: application/json');
echo json_encode(['success' => true, 'message' => 'PHP session destroyed.']);
?>