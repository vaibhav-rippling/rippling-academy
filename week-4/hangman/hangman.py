import validator
from game import Game
from player import Computer, Human, Player
from typing import Tuple, List
from utilities import *
import random


class Hangman(Game):
    def validator(self, move: str) -> bool:
        return validator.hangman(move, self.prev_moves)

    def __init__(self, max_attempts: int, hint_enabled: bool, player: str) -> None:
        self.game_over = False
        self.left_attempts = max_attempts
        self.hint_enabled = hint_enabled
        self.prev_moves: List[str] = []
        self.word = ''
        self.word_on_screen = ''
        self.hint_taken = False
        if player == PLAYER_COMPUTER:
            self.player: Player = Computer()
            self.params = HANGMAN_COMPUTER_PARAMS
        elif player == PLAYER_HUMAN:
            self.player = Human()
            self.params = HANGMAN_HUMAN_PARAMS
        else:
            raise Exception(UNKNOWN_PLAYER_ID_MSG)

    def start_game(self) -> Tuple[str, str]:
        print(HANGMAN_WELCOME_MSG)
        self.word = get_random_line_from_file(DB_FILEPATH)
        self.word_on_screen = word_masker(self.word)
        return self.word, hangman_formatter(self.word_on_screen)

    def get_next_move(self) -> str:
        move = self.player.get_next_move(self.params).upper()
        try:
            self.validator(move)
        except Exception as e:
            return str(e)
        else:
            return self.update_game_status(move)

    def update_game_status(self, move: str) -> str:
        if move == HANGMAN_HINT_INPUT:
            return self.handle_hint()
        self.prev_moves.append(move)
        new_mask = word_masker(self.word, move, self.word_on_screen)
        if new_mask == self.word_on_screen:
            self.left_attempts -= 1
            return self.game_lost() if not self.left_attempts else get_incorrect_guess_msg(self.left_attempts, new_mask)
        else:
            self.word_on_screen = new_mask
            return self.game_won() if self.word_on_screen == self.word else hangman_formatter(self.word_on_screen)

    def game_won(self) -> str:
        self.game_over = True
        return HANGMAN_GAME_WON_MESSAGE.format(self.word)

    def game_lost(self) -> str:
        self.game_over = True
        return HANGMAN_GAME_LOST_MESSAGE.format(self.word)

    def handle_hint(self) -> str:
        if not self.hint_enabled:
            return HANGMAN_HINT_DISABLED_ERROR_MSG
        elif self.hint_taken:
            return HANGMAN_HINT_TAKEN_ERROR_MSG
        else:
            self.hint_taken = True
            word_len = len(self.word)
            masked_indices = []
            for index in range(word_len):
                if self.word_on_screen[index] == HANGMAN_LETTER_MASK:
                    masked_indices.append(index)
            unmasked_index = random.choice(masked_indices)
            revealed_char = self.word[unmasked_index]
            self.word_on_screen = get_new_mask_after_hint(self.word_on_screen, unmasked_index, revealed_char)
            return self.game_won() if self.word_on_screen == self.word else hangman_formatter(self.word_on_screen)

    def is_game_over(self) -> bool:
        return self.game_over
