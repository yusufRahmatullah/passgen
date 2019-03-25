from __future__ import division
import getpass
import random

pool = []
width = 256
chunks = 6
digits = 52

next_max = [10, 26, 26, 10]
next_char = [
    '!@#$%^&*-_',
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789'
]

startdenom = width ** chunks
significance = 2 ** digits
overflow = significance * 2
mask = width - 1


def autoseed():
    result = []
    for _ in range(width):
        result.append(random.randint(0, 255))
    return result


def flatten(d, n):
    res = []
    typ = type(d)
    if n and typ == dict:
        for k in d:
            try:
                res.append(flatten(d[k], n-1))
            except:
                pass
    if len(res):
        return res
    elif typ == str:
        return d
    else:
        return str(d) + '\0'


def gen_pass(seed):
    prng = seedrandom(seed)
    result = ''
    for _ in range(64):
        nt = int(prng() * 4)
        nm = next_max[nt]
        nc = int(prng() * nm)
        result += next_char[nt][nc]
    return result

def mixkey(seed, input_key):
    def get_smear(key, idx):
        if idx >= len(key):
            return 0
        else:
            return key[idx] * 19

    key = input_key + [0] * (255-len(input_key))
    stringseed = str(seed)
    smear = 0
    j = 0
    while j < len(stringseed):
        smear ^= get_smear(key, mask & j)
        key[mask & j] = mask & (smear + ord(stringseed[j]))
        j += 1

    return to_string(key), trim_key(key)


def seedrandom(seed, options=None, callback=None):
    global pool

    key = []
    if options == True:
        options = {'entropy': True}
    elif options == None:
        options = {}
    if 'entropy' in options:
        fd = [seed, to_string(pool)]
    elif seed == None:
        fd = autoseed()
    else:
        fd = seed
    shortseed, key = mixkey(flatten(fd, 3), key)
    arc4 = ARC4(key)
    _, pool = mixkey(to_string(arc4.S), pool)

    def prng():
        n = arc4.g(chunks)
        d = startdenom
        x = 0
        while n < significance:
            n = (n + x) * width
            d *= width
            x = arc4.g(1)
        while n >= overflow:
            n = n / 2
            d /= 2
            x >>= 1
        return (n + x) / d

    s = 'global' in options
    if 'pass' in options:
        return options['pass'](prng, shortseed, s)
    elif callback != None:
        return callback(prng, shortseed, s)
    return prng


def trim_key(key):
    return list(filter(lambda x: x, key))


def to_string(key):
    return ''.join(map(chr, trim_key(key)))


class ARC4:
    def __init__(self, key):
        if len(key) == 0:
            key = [0]
        t = 0
        keylen = len(key)
        i = 0
        j = self.i = self.j = 0
        s = self.S = [0] * 256

        while i < width:
            s[i] = i
            i += 1
        for i in range(width):
            t = s[i]
            j = mask & (j + key[i % keylen] + t)
            s[i] = s[j]
            s[j] = t            
        self.g(width)
    
    def g(self, count):        
        t = 0
        r = 0
        i = self.i
        j = self.j
        s = self.S
        while count > 0:
            i = mask & (i + 1)
            t = s[i]
            j = mask & (j + t)
            s[i] = s[j]
            s[j] = t
            try:
                r = int(float(r * width + s[mask & (s[i] + s[j])]))
            except:
                r = float('inf')
            count -= 1            
        self.i = i
        self.j = j
        return r


def main():
    master = getpass.getpass('Master key: ')
    purpose = getpass.getpass('Purpose: ')
    seed = '%s::%s' % (master, purpose)
    print('seed:', seed)
    result = gen_pass(seed)
    print('Result:')
    print(result)


if __name__ == '__main__':
    main()
