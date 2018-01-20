server:
	yarn start

install:
	yarn install

test:
	yarn test

tree:
	tree -I node_modules

deploy: compile
	git subtree push --prefix public origin gh-pages

# This isn't needed for development as Express is configured to serve bundle.js
compile:
	yarn run compile
