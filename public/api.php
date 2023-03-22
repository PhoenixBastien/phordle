<?php
require_once('_config.php');
require_once($GLOBALS["appDir"] . "/models/Game.php");

$action = $_GET["action"];

$secret = 'dummy'; // hard coded word :(

switch ($action) {
case "newgame":
    $secret = newWord();
    echo $secret;
    break;
case "check":
    $word = $_GET["word"];
    echo check($word);
    break;
case "countpos":
    $word = $_GET["word"];
    $letter = $_GET["letter"];
    $position = $_GET["position"];

    $letterCountSecret = getLetterCount($secret, $letter);
    $letterCountGuess = getLetterCount($word, $letter);
    $letterPosition = getLetterPosition($word, $letter, $position);

    if ($letterCountGuess > $letterCountSecret
    && $letterPosition > $letterCountSecret) {
        $letterStatus = "wrong";
    } else {
        if ($letter == $secret[$position]) {
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
    $word = $_GET["word"];
    if ($secret == $word) {
        echo "Winner";
    }
    break;
}
?>