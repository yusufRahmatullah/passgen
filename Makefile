.PHONY: build compress dep start

build: dep
	pkg -t node8-linux-x64 app.js -o passgen

compress: build
	upx --brute passgen

dep:
	yarn install

run: dep
	yarn start
