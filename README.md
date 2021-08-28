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

Add new production dependencies with:

    $ yarn add $package

Add new development dependencies with:

    $ yarn add --dev $package

Check for outdated dependencies with:

    $ yarn outdated

then upgrade them with one of:

    $ yarn upgrade $package --latest
    $ yarn upgrade $package@$version


## Deployment

The repo is deployed using Github pages. The contents of the `public/` folder
are deployed to the `gh-pages` branch of the repo, making the project available
at: http://codeinthehole.com/meta-tic-tac-toe/

To deploy a new version, run:

    $ make deploy

which will compile a new `public/bundle.js` file


## Dependency notes

### Javascript compilation

Compiling modern Javascript and JSX into JS that browsers understand:

- [`@babel/core`](https://babel.dev/docs/en/babel-core) - Core transpiling
  package.
- [`@babel/preset-env`](https://babel.dev/docs/en/babel-preset-env) - Preset to control which browsers your code can
  compile for.
- [`@babel/preset-react`](https://babel.dev/docs/en/babel-preset-react) - Preset which includes plugins for transpiling JSX.

Babel is configured in `"babel"` key in `package.json`.

### Bundling

Converting source files into JS/CSS files.

- [`webpack`](https://www.npmjs.com/package/webpack) - Bundles JS together into
    a single file.
- [`babel-loader`](https://www.npmjs.com/package/babel-loader) - Webpack plugin
    to support running babel from webpack.

### Local server

Tools for running a local site with hot reloading:

- [`webpack-dev-middleware`](https://github.com/webpack/webpack-dev-middleware) - Middleware to allow Express to serve files emitted from Webpack.
    a single file.

### Testing

- [`jest`](https://jestjs.io/) - Test runner, configured in `"jest"` object
  within `package.json`.
- [`sinon`](https://www.npmjs.com/package/sinon) - For spying on calls to console.log
- [`enzyme`](https://enzymejs.github.io/enzyme/) - For testing React components.


## Learning resources

I used these articles when building this:

- [Build your own starter](http://andrewhfarmer.com/build-your-own-starter/#0-intro)
- [JS Stack from Scratch](https://github.com/verekia/js-stack-from-scratch)
