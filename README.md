# Password (and pin) Generator

Password/pin generator using *master key* and *purpose* as the seed for the PRNG (*Pseudo Random Number Generator*) to generate 64-char alphanumeric and some symbols password (minimal secure length of SHA-256 key) and to generate 6-num pin. The generator can be used like a password manager that can be accessed anywhere (currently the web-version is hosted on [here](https://passgen.netlify.com)) and not persist on any storage (cloud or locally).

## Getting Started

This branch is the implementation in Python 3 which can be compiled into executable (can be used locally). The implementation of PRNG is following the javascript version from [David Bau's seedrandom](https://github.com/davidbau/seedrandom) to maintain same result in javascript or Python.

### Prerequisites

This instruction is tested on Ubuntu 16.04 with Python 3.5. To install the dependencies, simply call

```bash
$ make dep
```

### Installing

To run the program directly from Python, run the following command

```bash
$ python3 passgen.py  # work on Python2 too, or
$ make run  # make run-pin for pingen
```

To build the python as single-file executable, run the following command

```bash
$ make build  # for passgen
$ make build-pin  # for pingen
```

Executable will be compiled in `dist` directory. Just copy them to `/usr/local/bin` to make `passgen` and `pingen` callable from everywhere

## Acknowledgment

This app doesn't have any warranty. Use this app on your risk.