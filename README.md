# webpack/react-starter

Aims to be simplified version of original [webpack.react-starter](https://github.com/webpack/react-starter).

Differences:
* purely declarative configs
* config options are commented and linked to Webpack doc sections
* ES6 syntax everywhere (including webpack configs)
* different file/folder names and structure
* `build/public/` are merged into `public/`
* React Hot Loader by default (dev)
* SourceMaps by default (dev)
* Nodemon by default (dev)
* LESS is kept, SASS / Stylus are removed
* mentions of CoffeeScript are removed ;)

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

1) Optionally change `webpack.config-dev.js`

2) Start the webpack-dev-server in HMR mode and wait for compilation
```
$ npm run dev
```

3) Start the Nodemon server in another terminal
```
$ npm run nodemon
```

4) Open this url in your browser
```
http://localhost:8080/
```

It automatically recompiles when files are changed. When a hot-replacement-enabled file is changed (i. e. stylesheets or React components) the module is hot-replaced. If Hot Replacement is not possible the page is refreshed.

Hot Module Replacement has a performance impact on compilation.

Also check the [webpack-dev-server documentation](http://webpack.github.io/docs/webpack-dev-server.html).


## Production compilation and server

1) Optionally change `webpack.config-prod.js`

2) Build the client bundle and the prerendering bundle
```
$ npm run prod
```

3) Start the NodeJS server in production mode
```
$ npm start
```

4) Open this url in your browser
```
http://localhost:80/
```

The server is at `backend/server.js`

The production setting builds two configurations: one for the client (`build/public`) and one for the serverside prerendering (`build/prerender`).


## Build visualization

After a production build you may want to visualize your modules and chunks tree.

Use the [analyse tool](http://webpack.github.io/analyse/) with the file at `public/stats.json`.


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