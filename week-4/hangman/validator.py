from constants import *
from string import ascii_letters
from typing import List


def hangman(player_move: str, prev_moves: List[str]) -> bool:
    if player_move == HANGMAN_HINT_INPUT or \
            (len(player_move) == 1 and
             player_move in ascii_letters and
             player_move not in prev_moves):
        return True
    elif len(player_move) != 1 or \
            player_move not in ascii_letters:
        raise Exception(HANGMAN_INVALID_INPUT_ERROR_MSG)
    else:
        raise Exception(HANGMAN_CHARACTER_REPEATED_ERROR_MSG)
