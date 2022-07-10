from abc import ABC, abstractmethod
import random
from string import ascii_uppercase
from constants import *
from typing import Dict


class Player(ABC):
    @abstractmethod
    def get_next_move(self, params):
        pass


class Computer(Player):
    def __init__(self) -> None:
        self.prev_moves = []

    def hangman(self) -> str:
        if len(self.prev_moves) == HANGMAN_MAX_CHARACTERS:
            raise Exception(NO_LETTERS_LEFT_MSG)
        left_chars = ''
        for char in ascii_uppercase:
            if char not in self.prev_moves:
                left_chars += char
        move = random.choice(left_chars)
        self.prev_moves.append(move)
        return move

    def get_next_move(self, params: Dict[str, str]) -> str:
        game_id = params[ID_KEY]
        if game_id == HANGMAN_IDENTIFIER:
            return self.hangman()
        else:
            raise Exception(UNKNOWN_GAME_ID_MSG)


class Human(Player):
    @staticmethod
    def hangman(msg: str) -> str:
        return input(msg)

    def get_next_move(self, params: Dict[str, str]) -> str:
        game_id = params[ID_KEY]
        if game_id == HANGMAN_IDENTIFIER:
            msg = params[MSG_KEY]
            return Human.hangman(msg)
        else:
            raise Exception(UNKNOWN_GAME_ID_MSG)
