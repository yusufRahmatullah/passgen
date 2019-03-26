.PHONY: build build-pin dep run run-pin

build: dep
	pip3 install pyinstaller
	pyinstaller --clean --onefile passgen.py

build-pin: dep
	pip3 install pyinstaller
	pyinstaller --clean --onefile pingen.py

dep:
	sudo apt install -y python3-dev python3-pip

run:
	python3 passgen.py

run-pin:
	python3 pingen.py