# React playground

This is just for testing React and Redux stuff.

## Commands

Install [yarn](https://yarnpkg.com/en/) then run:

    $ make install

Run the Express server with:

    $ make

And browse the site at http://localhost:3000

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

## Sources

I used these articles when building this:

- [Build your own starter](http://andrewhfarmer.com/build-your-own-starter/#0-intro)
- [JS Stack from Scratch](https://github.com/verekia/js-stack-from-scratch)
