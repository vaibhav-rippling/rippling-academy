from hangman import Hangman
from constants import *

if __name__ == '__main__':
    hangman = Hangman(HANGMAN_MAX_ATTEMPTS, HANGMAN_HINT_ENABLED, HANGMAN_MAX_HINTS, PLAYER_HUMAN)
    assert HANGMAN_MAX_ATTEMPTS > 0
    assert HANGMAN_MAX_HINTS > 0
    assert HANGMAN_MAX_CHARACTERS > 0
    word, mask = hangman.start_game()
    # print(word)
    print(mask)
    print(HANGMAN_ATTEMPTS_LEFT_MESSAGE.format(HANGMAN_MAX_ATTEMPTS))
    if HANGMAN_HINT_ENABLED:
        print(HANGMAN_HINT_MESSAGE)
        print(HANGMAN_HINTS_LEFT_MESSAGE.format(HANGMAN_MAX_HINTS))
    while not hangman.is_game_over():
        print(hangman.get_next_move())


