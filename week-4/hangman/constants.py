# DB constants
DB_FILEPATH = "./db/sowpods.txt"

# Player constants
PLAYER_COMPUTER = "Computer"
PLAYER_HUMAN = "Human"
ID_KEY = "id"
MSG_KEY = "msg"
UNKNOWN_GAME_ID_MSG = "Unknown Game Id"
NO_LETTERS_LEFT_MSG = "No letters left"
UNKNOWN_PLAYER_ID_MSG = "Unknown Player Id"

# Hangman constants
HANGMAN_WELCOME_MSG = "Welcome to Hangman!"
HANGMAN_IDENTIFIER = "hangman"
HANGMAN_INPUT_MSG = "Guess your letter: "
HANGMAN_COMPUTER_PARAMS = {ID_KEY: HANGMAN_IDENTIFIER}
HANGMAN_HUMAN_PARAMS = {ID_KEY: HANGMAN_IDENTIFIER, MSG_KEY: HANGMAN_INPUT_MSG}
HANGMAN_MAX_ATTEMPTS = 6
HANGMAN_ATTEMPTS_LEFT_MESSAGE = "{} attempts left"
HANGMAN_INCORRECT_GUESS_MESSAGE = "Incorrect!\n" + HANGMAN_ATTEMPTS_LEFT_MESSAGE
HANGMAN_INVALID_INPUT_ERROR_MSG = "Invalid move\nEnter an uppercase character"
HANGMAN_CHARACTER_REPEATED_ERROR_MSG = "Invalid move\nCharacter already entered"
HANGMAN_LETTER_MASK = '_'
HANGMAN_MAX_CHARACTERS = 26
HANGMAN_GAME_WON_MESSAGE = "Very Good!\n{}"
HANGMAN_GAME_LOST_MESSAGE = "Sorry you lost\nThe answer was: {}"
HANGMAN_HINT_INPUT = "HINT"
HANGMAN_HINT_DISABLED_ERROR_MSG = "Hints are disabled"
HANGMAN_HINT_TAKEN_ERROR_MSG = "Hint has already been taken"
