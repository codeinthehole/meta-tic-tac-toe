# Meta-tic-tac-toe

A simple game for exploring React, Redux and other JS libraries.


## Local installation

Install [yarn](https://yarnpkg.com/en/) then install the `devDependencies` from
`package.json` with:

    $ yarn install --production=false


## Local development

### Local server

Run an Express server (configured by `server.js`) with:

    $ yarn start

### Test suite

and browse the site at http://localhost:3000

Run tests with:

    $ yarn test

### Dependencies

Check for outdated dependencies with:

    $ yarn outdated

Add new dependencies with:

    $ yarn add $package


## Deployment

The repo is deployed using Github pages. The contents of the `public/` folder
are deployed to the `gh-pages` branch of the repo, making the project available
at: http://codeinthehole.com/meta-tic-tac-toe/

To deploy a new version, run:

    $ make deploy

which will compile a new `public/bundle.js` file


## Dependency notes

Babel:

- [`babel-core`](https://www.npmjs.com/package/babel-core) - For transpiling code
- [`babel-preset-latest`](https://www.npmjs.com/package/babel-preset-latest) -
    Includes plugins from
    [`es2015`](https://babeljs.io/docs/plugins/preset-es2015/),
    [`es2016`](https://babeljs.io/docs/plugins/preset-es2016/) and
    [`es2017`](https://babeljs.io/docs/plugins/preset-es2017/)
- [`babel-preset-react`](https://www.npmjs.com/package/babel-preset-react) -
    Includes plugins `preset-flow`, `syntax-jsx`, `transform-react-jsx` and `transform-react-display-name`.

Webpack:

- [`webpack`](https://www.npmjs.com/package/webpack) - Bundles JS together into
    a single file.
- [`babel-loader`](https://www.npmjs.com/package/babel-loader) - Webpack plugin
    to support running babel from webpack.

Testing:

- [`sinon`](https://www.npmjs.com/package/sinon) - For spying on calls to console.log


## Learning resources

I used these articles when building this:

- [Build your own starter](http://andrewhfarmer.com/build-your-own-starter/#0-intro)
- [JS Stack from Scratch](https://github.com/verekia/js-stack-from-scratch)
