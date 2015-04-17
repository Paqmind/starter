webpackJsonp([2],{65:function(e,t,n){"use strict";var r=n(2),o=r.createClass({displayName:"Readme",render:function(){var e={"default":{backgroundColor:"white",border:"1px dotted gray",padding:"1em"}},t={__html:n(205)};return r.createElement("div",{style:e["default"],dangerouslySetInnerHTML:t})}});e.exports=o},205:function(e,t,n){e.exports='<h1 id=webpack-react-starter>webpack/react-starter</h1><p>Aimed to be simplified version of original <a href=https://github.com/webpack/react-starter>webpack.react-starter</a>.</p><p>Differences:</p><ul><li>pure declarative configs, much more clear subjectively</li><li>react-hot-loader is dev default</li><li>Nodemon as dev server instance</li><li>different file/folder names and structure</li><li>LESS is kept, SASS / Stylus are removed, though can be easily added</li><li>mentions of CoffeeScript are removed ;)</li><li>SourceMaps are enabled by default</li><li>a lot of minor changes across documentation etc.</li><li>ES6 syntax everywhere (including webpack configs)</li><li>all config options are commented and linked to corresp. Webpack documentation section</li></ul><hr><h1 id=starter-template-for-react-with-webpack>Starter template for React with Webpack</h1><h2 id=features>Features</h2><ul><li>Compilation with Webpack</li><li>React and JSX</li><li>React-Router</li><li>Stylesheets can be CSS, LESS or mixed</li><li>Embedded resources like images or fonts use DataUrls if appropriate</li><li>A simple flag loads a react component (and dependencies) on demand.</li><li>Development<ul><li>Hot Module Replacement development server (LiveReload for Stylesheets and React components enabled)</li><li>SourceMaps</li></ul></li><li>Production<ul><li>Server example for prerendering for React components</li><li>Initial data inlined in page</li><li>Long Term Caching through file hashes enabled</li><li>Generate separate css file to avoid FOUC</li><li>Minimized CSS and javascript</li></ul></li><li>You can also require markdown or text files for your content.</li></ul><h2 id=local-installation>Local Installation</h2><p>Install <a href=https://nodejs.org>node.js</a> or <a href=https://iojs.org>io.js</a></p><p>Just clone this repo and change the <code>origin</code> git remote.</p><pre><code class=lang-text>$ npm install &amp;&amp; bin/install\n</code></pre><h2 id=development-server>Development server</h2><p>1) Optionally change <code>webpack.config-dev.js</code></p><p>2) Start the webpack-dev-server in HMR mode and wait for compilation</p><pre><code>$ npm run dev\n</code></pre><p>3) Start the Nodemon server in another terminal</p><pre><code>$ npm run nodemon\n</code></pre><p>4) Open this url in your browser</p><pre><code>http://localhost:8080/\n</code></pre><p>It automatically recompiles when files are changed. When a hot-replacement-enabled file is changed (i. e. stylesheets or React components) the module is hot-replaced. If Hot Replacement is not possible the page is refreshed.</p><p>Hot Module Replacement has a performance impact on compilation.</p><p>Also check the <a href=http://webpack.github.io/docs/webpack-dev-server.html>webpack-dev-server documentation</a>.</p><h2 id=production-compilation-and-server>Production compilation and server</h2><p>1) Optionally change <code>webpack.config-prod.js</code></p><p>2) Build the client bundle and the prerendering bundle</p><pre><code>$ npm run prod\n</code></pre><p>3) Start the NodeJS server in production mode</p><pre><code>$ npm start\n</code></pre><p>4) Open this url in your browser</p><pre><code>http://localhost:80/\n</code></pre><p>The server is at <code>backend/server.js</code></p><p>The production setting builds two configurations: one for the client (<code>build/public</code>) and one for the serverside prerendering (<code>build/prerender</code>).</p><h2 id=build-visualization>Build visualization</h2><p>After a production build you may want to visualize your modules and chunks tree.</p><p>Use the <a href="http://webpack.github.io/analyse/">analyse tool</a> with the file at <code>public/stats.json</code>.</p><h2 id=loaders-and-file-types>Loaders and file types</h2><p>Many file types are preconfigured, but not every loader is installed. If you get an error like <code>Cannot find module &quot;xxx-loader&quot;</code>, you&#39;ll need to install the loader with <code>npm install xxx-loader --save</code> and restart the compilation.</p><h2 id=common-changes-to-the-configuration>Common changes to the configuration</h2><h3 id=add-more-entry-points>Add more entry points</h3><p>(for a multi page app)</p><ol><li>Add an entry point to <code>make-webpack-config.js</code> (<code>let entry</code>).</li><li>Add a new top-level react component in <code>app</code> (<code>xxxRoutes.js</code>, <code>xxxStoreDescriptions.js</code>, <code>xxxStores.js</code>).</li><li>(Optional) Enable <code>commonsChunk</code> in <code>webpack-production.config.js</code> and add <code>&lt;script src=&quot;COMMONS_URL&quot;&gt;&lt;/script&gt;</code> to <code>frontend/prerender.html</code>.</li><li>Modify the server code to require, serve and prerender the other entry point.</li><li>Restart compilation.</li></ol>'}});