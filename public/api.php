<?php
require_once('_config.php');

use Phordle\Game;

switch ($_GET["action"] ?? "version") {
case "secret":
    $g = new Game();
    $data = ["value" => $g->$state['secret']];
    break;
case "version":
default:
    $data = ["version" => "1.0"];
}

header("Content-Type: application/json");
echo json_encode($data);
?>