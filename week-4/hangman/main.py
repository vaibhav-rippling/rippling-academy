from hangman import Hangman
from constants import *

if __name__ == '__main__':
    hangman = Hangman(HANGMAN_MAX_ATTEMPTS, True, PLAYER_HUMAN)
    word, mask = hangman.start_game()
    # print(word)
    print(mask)
    print(HANGMAN_ATTEMPTS_LEFT_MESSAGE.format(HANGMAN_MAX_ATTEMPTS))
    while not hangman.is_game_over():
        print(hangman.get_next_move())


