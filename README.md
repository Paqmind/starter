# webpack/react-starter

Aimed to be simplified version of original [webpack.react-starter](https://github.com/webpack/react-starter).

Differences:
* pure declarative configs, much more clear subjectively
* react-hot-loader is dev default
* Nodemon as dev server instance
* different file/folder names and structure
* LESS is kept, SASS / Stylus are removed, though can be easily added
* mentions of CoffeeScript are removed ;)
* SourceMaps are enabled by default
* a lot of minor changes across documentation etc.
* ES6 syntax everywhere (including webpack configs)
* all config options are commented and linked to corresp. Webpack documentation section

---

# Starter template for React with Webpack

## Features

* Compilation with Webpack
* React and JSX
* React-Router
* Stylesheets can be CSS, LESS or mixed
* Embedded resources like images or fonts use DataUrls if appropriate
* A simple flag loads a react component (and dependencies) on demand.
* Development
  * Hot Module Replacement development server (LiveReload for Stylesheets and React components enabled)
  * SourceMaps
* Production
  * Server example for prerendering for React components
  * Initial data inlined in page
  * Long Term Caching through file hashes enabled
  * Generate separate css file to avoid FOUC
  * Minimized CSS and javascript
* You can also require markdown or text files for your content.

## Local Installation

Install [node.js](https://nodejs.org) or [io.js](https://iojs.org)

Just clone this repo and change the `origin` git remote.

```text
$ npm install && bin/install
```

## Development server

#### 0. Optionally change webpack.config-dev.js

#### 1. Start the webpack-dev-server in HMR mode and wait for compilation
`$ npm run dev`

#### 2. Start the Nodemon server in another terminal
`$ npm run nodemon`

#### 3. Open this url in your browser
`http://localhost:8080/`

It automatically recompiles when files are changed. When a hot-replacement-enabled file is changed (i. e. stylesheets or React components) the module is hot-replaced. If Hot Replacement is not possible the page is refreshed.

Hot Module Replacement has a performance impact on compilation.

Also check the [webpack-dev-server documentation](http://webpack.github.io/docs/webpack-dev-server.html).


## Production compilation and server

#### 0. Optionally change webpack.config-dev.js webpack.config-prod.js

#### 1. Build the client bundle and the prerendering bundle
`$ npm run prod`

#### 2. Start the NodeJS server in production mode
`$ npm start`

#### 3. Open this url in your browser
`http://localhost:80/`

The server is at `backend/server.js`

The production setting builds two configurations: one for the client (`build/public`) and one for the serverside prerendering (`build/prerender`).


## Legacy static assets

Assets in `public` are also served.


## Build visualization

After a production build you may want to visualize your modules and chunks tree.

Use the [analyse tool](http://webpack.github.io/analyse/) with the file at `build/stats.json`.


## Loaders and file types

Many file types are preconfigured, but not every loader is installed. If you get an error like `Cannot find module "xxx-loader"`, you'll need to install the loader with `npm install xxx-loader --save` and restart the compilation.


## Common changes to the configuration

### Add more entry points

(for a multi page app)

1. Add an entry point to `make-webpack-config.js` (`let entry`).
2. Add a new top-level react component in `app` (`xxxRoutes.js`, `xxxStoreDescriptions.js`, `xxxStores.js`).
3. (Optional) Enable `commonsChunk` in `webpack-production.config.js` and add `<script src="COMMONS_URL"></script>` to `frontend/prerender.html`.
4. Modify the server code to require, serve and prerender the other entry point.
5. Restart compilation.