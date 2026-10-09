<?php
session_start();
include_once(__DIR__ . '/config.php');

if (!isset($_SESSION['email']) || !isset($_POST['tutorial_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Sessão inválida']);
    exit();
}

$email = $_SESSION['email'];
$tutorialId = $_POST['tutorial_id'];
$xpGanha = 100; // Quantidade de XP concedida por leitura

// Verifica se a leitura já foi realizada
$check = $conexao->prepare("SELECT id FROM leituras_tutoriais WHERE usuario_email = ? AND tutorial_id = ?");
$check->bind_param("ss", $email, $tutorialId);
$check->execute();
$resultado = $check->get_result();

if ($resultado->num_rows === 0) {
    // Registra a leitura
    $ins = $conexao->prepare("INSERT INTO leituras_tutoriais (usuario_email, tutorial_id) VALUES (?, ?)");
    $ins->bind_param("ss", $email, $tutorialId);
    $ins->execute();

    // Adiciona o XP e recalcula o Level (a cada 100 XP sobe 1 level)
    $conexao->query("UPDATE usuarios SET xp = xp + $xpGanha, level = FLOOR((xp + $xpGanha) / 100) WHERE email = '$email'");

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'already_read']);
}
?>