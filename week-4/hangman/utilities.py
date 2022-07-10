import dao
import random
from constants import *


def get_random_line_from_file(filepath: str) -> str:
    total_lines = dao.get_number_of_lines_in_file(filepath)
    line_num = random.randint(0, total_lines - 1)
    return dao.get_line_with_index(filepath, line_num)


def word_masker(word: str, move: str = None, prev_mask: str = None) -> str:
    word_len = len(word)
    if prev_mask is None or move is None:
        return HANGMAN_LETTER_MASK * word_len
    new_mask = ''
    for index in range(word_len):
        if prev_mask[index] != HANGMAN_LETTER_MASK:
            new_mask += prev_mask[index]
        else:
            if word[index] == move:
                new_mask += word[index]
            else:
                new_mask += HANGMAN_LETTER_MASK
    return new_mask


def hangman_formatter(word: str) -> str:
    word_len = len(word)
    formatted_word = ''
    for i in range(word_len):
        if i:
            formatted_word += ' '
        formatted_word += word[i]
    return formatted_word


def get_new_mask_after_hint(prev_mask: str, unmasked_index: int, revealed_char: str) -> str:
    return prev_mask[:unmasked_index] + revealed_char + prev_mask[unmasked_index + 1:]


def get_incorrect_guess_msg(left_attempts: int, mask: str) -> str:
    return HANGMAN_INCORRECT_GUESS_MESSAGE.format(left_attempts) + '\n' + hangman_formatter(mask)
