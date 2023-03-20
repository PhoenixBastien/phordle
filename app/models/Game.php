<?php
namespace Phordle;

require_once('Dictionary.php');

class Game
{
    public array $state;

    public function __construct() {
        $state = [
            'secret' => DICTIONARY[array_rand(DICTIONARY)],
            'grid' => array_fill(0, 6, array_fill(0, 5, '')),
            'currentRow' => 0,
            'currentCol' => 0
        ];
    }

    public function isValid($word) {
        return in_array(strtolower($word), DICTIONARY);
    }

    public function getLetterCount($word, $letter) {
        $regex = "/$letter/i";
        return preg_match_all($regex, $word);
    }

    public function getLetterPosition($word, $letter, $position) {
        $result = 0;
        for ($i=0; $i < $position; $i++) { 
            if (strcasecmp($word[$position], $letter) == 0) {
                $result++;
            }
        }
        return $result;
    }

    public function isWinner($guess) {
        
    }
}
?>
