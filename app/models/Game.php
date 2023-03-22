<?php
require_once('Dictionary.php');

function isValid($word) {
    return in_array(strtolower($word), DICTIONARY);
}

function check($word) {
    if (strlen($word) != 5) {
        return 'Not enough letters.';
    }

    return (in_array(strtolower($word), DICTIONARY) ? 'A valid word.' : 'Not a valid word.');
}

function getLetterCount($word, $letter) {
    $regex = "/$letter/i";
    return preg_match_all($regex, $word);
}

function getLetterPosition($word, $letter, $position) {
    $result = 0;
    for ($i=0; $i < $position; $i++) {
        if (strcasecmp($word[$position], $letter) == 0) {
            $result++;
        }
    }
    return $result;
}

function newWord() {
    return DICTIONARY[array_rand(DICTIONARY)];
}
?>