lint:
	npx eslint .

test:
	npx jest

install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

publish:
	npm publish --dry-run && npm link
