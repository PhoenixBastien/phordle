<?php
require_once('_config.php');

use Phordle\Game;

$action = $_GET["action"];

switch ($word ?? "version") {
case "newgame":
    $g = new Game();
case "secret":
    $secret = $g->getSecret();
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
    // $data = [
    //     "lettercountsecret" => $letterCountSecret,
    //     "lettercountguess" => $letterCountGuess,
    //     "letterposition" => $letterPosition,
    //     "letterstatus" => $letterStatus
    // ];
    // echo json_encode($data);
    echo $letterStatus;
}

// $guess = $_GET['guess'];

// $g = new Game();

// if (strlen($word) === 5) {
//     $isValidWord = in_array(strtolower($word), DICTIONARY);
//     if ($isValidWord) {
//         $g->$state['currentRow'] += 1;
//     }
// }
?>