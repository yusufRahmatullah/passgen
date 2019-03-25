.PHONY: build dep run

build: dep
	pip3 install pyinstaller
	pyinstaller --clean --onefile passgen.py

dep:
	sudo apt install -y python3-dev python3-pip

run:
	python3 passgen.py
