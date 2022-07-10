from abc import ABC, abstractmethod


class Game(ABC):
    @abstractmethod
    def start_game(self):
        pass

    @abstractmethod
    def get_next_move(self):
        pass

    @abstractmethod
    def update_game_status(self, move):
        pass

    @abstractmethod
    def game_won(self):
        pass

    @abstractmethod
    def game_lost(self):
        pass
