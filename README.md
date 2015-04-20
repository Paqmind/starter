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
* uses nunjucks templates on backend

---

# Starter template for React with Webpack

## Features

* Compilation with Webpack
* React, React-Router, JSX
* Stylesheets can be CSS, LESS or mixed
* Embedded resources like images or fonts use DataUrls if appropriate
* Optional lazyload for any React components
* Development
  * Hot Module Replacement development server (LiveReload for Stylesheets and React components enabled)
  * SourceMaps
* Production
  * Server example for prerendering for React components
  * Isomorphic app (initial data inlined in page)
  * Long Term Caching through file hashes enabled
  * Generate separate css file to avoid FOUC
  * Minimized CSS and javascript
* You can also require markdown or text files for your content

## Local Installation

Install [node.js](https://nodejs.org) or [io.js](https://iojs.org)

Just clone this repo and change the `origin` git remote.

```text
$ npm install && bin/install
```

## Development

1) Optionally change `webpack.config-dev.js`

2) Start the webpack-dev-server in HMR mode and wait for compilation
```
$ npm run dev
```

3) Start the Nodemon server (second terminal)
```
$ npm run nodemon
```

4) Open `http://localhost:80/`

## Production

1) Optionally change `webpack.config-prod.js`

2) Build the client bundle and the prerendering bundle
```
$ npm run prod
```

3) Start the NodeJS server (second terminal)
```
$ NODE_ENV=production npm start
```

4) Open `http://localhost:80/`

## Build visualization

After a production build you may want to visualize your modules and chunks tree.

Use the [analyse tool](http://webpack.github.io/analyse/) with the file at `public/stats.json`.

## Loaders and file types

Many file types are preconfigured, but not every loader is installed.
If you get an error like `Cannot find module "xxx-loader"`, you'll need to install the loader
with `$ npm install xxx-loader --save`

## Multi page app

1. Add an entry point to `webpack.config-xxx.js`
2. Add a new top-level react component in `app` (`xxxRoutes.js`, `xxxStoreDescriptions.js`, `xxxStores.js`)
3. (Optional) Enable `commonsChunk` in `webpack-production.config.js` and add `<script src="{{ commonsUrl }}"></script>` to `frontend/react-prerender.html`
4. Modify the server code to require, serve and prerender the other entry point
5. Restart compilation