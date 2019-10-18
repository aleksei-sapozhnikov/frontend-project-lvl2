install:
	npm install

run:
	npx babel-node src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

test:
	npx jest --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run
	npm link
