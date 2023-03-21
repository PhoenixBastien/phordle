<?php
require_once('_config.php');

use Phordle\Game;

$action = $_GET["action"];

switch ($action) {
case "newgame":
    $g = new Game();
    break;
case "check":
    $word = $_GET["word"];
    $value = $g->check($word);
    break;
case "countpos":
    $word = $_GET["word"];
    $letter = $_GET["letter"];
    $position = $_GET["position"];
    $secret = $g->getSecret();

    $letterCountSecret = $g->getLetterCount($secret, $letter);
    $letterCountGuess = $g->getLetterCount($word, $letter);
    $letterPosition = $g->getLetterPosition($word, $letter, $position);

    if ($letterCountGuess > $letterCountSecret
    && $letterPosition > $letterCountSecret) {
        $letterStatus = "wrong";
    }
    else {
        if ($letter === $secret[$position]) {
            $letterStatus = "right-position";
        } else if (str_contains($secret, $letter)) {
            $letterStatus = "wrong-position";
        } else {
            $letterStatus = "wrong";
        }
    }
    echo $letterStatus;
    break;
case "gamestatus":
    $secret = $g->getSecret();
    $word = $_GET["word"];
    if ($secret === $word) {
        echo "Winner";
    }
    break;
}
?>