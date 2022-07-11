import linecache


def get_number_of_lines_in_file(filepath: str) -> int:
    with open(r"{}".format(filepath), 'r') as fp:
        for count, line in enumerate(fp):
            pass
    return count + 1


def get_line_with_index(filepath: str, line_number: int) -> str:
    return linecache.getline(r"{}".format(filepath), line_number).rstrip('\n')
