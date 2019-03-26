import getpass

import passgen


def main():
    master = getpass.getpass('Master key: ')
    purpose = getpass.getpass('Purpose: ')
    seed = '%s::%s' % (master, purpose)
    result = passgen.gen_pin(seed)
    print('Result:')
    print(result)


if __name__ == '__main__':
    main()
