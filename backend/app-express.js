// DEFAULTS ========================================================================================
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.NODE_CONFIG_DIR = process.env.NODE_CONFIG_DIR || "./shared/config";

// APP =============================================================================================
let BodyParser = require("body-parser");
let Config = require("config");
let Express = require("express");
let Path = require("path");
let UUID = require("uuid");
let DB = require("backend/db");

// load bundle information from stats
let stats = require("public/stats.json");
let styleUrl = undefined; // Config.get("app:separate-stylesheet?") ? stats.publicPath + "main.css?" + stats.hash : undefined;
let scriptUrl = stats.publicPath + [].concat(stats.assetsByChunkName.main)[0];
let commonsUrl = stats.publicPath + [].concat(stats.assetsByChunkName.commons)[0];

// APPS ============================================================================================
let app = Express();
let reactApp;
if (Config.get("app:prerender?")) {
  reactApp = require("public/prerender.main.js");
}

// TEMPLATER =======================================================================================
let templater = require("backend/templater")(app);
// =================================================================================================

// serve the static assets
app.use("/public", Express.static(Path.join(__dirname, "../public"), {
  maxAge: "200d" // We can cache them as they include hashes
}));

app.use(BodyParser.json());

// The fake database
let todosDb = new DB();
let listsDb = new DB();

(function () {
  // Initial data
  let mylist = [UUID.v4(), UUID.v4(), UUID.v4()];
  let otherlist = [UUID.v4()];
  listsDb.set("mylist", mylist);
  listsDb.set("otherlist", otherlist);
  todosDb.set(mylist[0], {
    text: "Hello World"
  });
  todosDb.set(mylist[1], {
    text: "Eat something"
  });
  todosDb.set(mylist[2], {
    text: "Nothing"
  });
  todosDb.set(otherlist[0], {
    text: "12345679"
  });
}());

// REST APIs
// Note that there is no security in this example
// Make sure your production server handles requests better!

app.get("/_/list/*", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  let list = listsDb.get(req.params[0], []);
  let items = {};
  list.forEach(function (itemId) {
    items["_" + itemId] = todosDb.get(itemId, {});
  });
  res.end(JSON.stringify({
    list: list,
    items: items
  }));
});

app.post("/_/list/*", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  let newList = listsDb.update(req.params[0], req.body);
  let additionalItems = {};
  newList = newList.map(function (item) {
    if (typeof item === "string") return item;
    let newId = UUID.v4();
    todosDb.set(newId, item);
    additionalItems["_" + newId] = item;
    return newId;
  });
  listsDb.set(list, newList);
  res.end(JSON.stringify({
    list: newList,
    items: additionalItems
  }));
});

app.get("/_/todo/*", function (req, res) {
  let todo = req.params[0].split("+");
  res.setHeader("Content-Type", "application/json");
  if (todo.length === 1) {
    data = todosDb.get(todo[0], {});
  } else {
    data = todo.reduce(function (obj, todo) {
      obj["_" + todo] = todosDb.get(todo, {});
      return obj;
    }, {});
  }
  res.end(JSON.stringify(data));
});

app.post("/_/todo/*", function (req, res) {
  let todo = req.params[0];
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(todosDb.update(todo, {$merge: req.body})));
});

app.get("/favicon.ico", function (req, res) {
  return res.status(404).end("");
});

app.get("/*", function (req, res, cb) {
  if (Config.get("app:prerender?")) {
    // PRERENDER
    reactApp(req.path, function (htmlPayload) {
      res.status(200).render("react-prerender.html", {
        scriptUrl, styleUrl, htmlPayload, //commonsUrl, dataPayload,
      });
      return cb();
    });
  } else {
    // BASIC
    res.status(200).render("react.html", {
      scriptUrl,
    });
    return cb();
  }
});

let port = parseInt(process.env.PORT || Config.get("http:port"));
app.listen(port, function () {
  console.log("Server listening on port " + port);
});

//renderApplication(req.path, {
//  TodoItem: function (item, callback) {
//    callback(null, todosDb.get(item.id, {}));
//  },
//  TodoList: function (item, callback) {
//    callback(null, listsDb.get(item.id, []));
//  }
//}, scriptUrl, styleUrl, commonsUrl, function (err, html) {
//  res.end(html);
//});

// PRERENDER
  //let Async = require("async");
  //let React = require("react");
  //let ReactRouter = require("react-router");
  //let ItemsStore = require("items-store/ItemsStore");
  //require("shared/shims");
  //let routes = require("frontend/" + __resourceQuery.substr(1) + "routes");
  //let storesDescriptions = require("frontend/" + __resourceQuery.substr(1) + "storesdescriptions");
  //let html = require("frontend/prerender.html");
  //
  //let stores = createStoresPrerender(readItems);

//    function createStoresPrerender(readItems) {
//	return Object.keys(storesDescriptions).reduce(function (obj, name) {
//		obj[name] = new ItemsStore(Object.assign({
//			readSingleItem: readItems[name],
//			queueRequest: function (fn) { fn(); }
//		}, storesDescriptions[name]));
//		return obj;
//	}, {});
//}

  // run the path thought react-router
  //ReactRouter.run(routes, req.path, function (Application, state) {
  //	// wait until every store is charged by the components
  //	// for faster response time there could be a timeout here
  //	Async.forEach(state.routes, function (route, callback) {
  //		if (route.handler.chargeStores) {
  //			route.handler.chargeStores(stores, state.params, callback);
  //		} else {
  //			callback();
  //		}
  //	}, function () {
  //
  //		// prerender the application with the stores
  //		let htmlPayload = React.withContext({stores}, function () {
//			return React.renderToString(<Application />);
//		});
//
 //   let renderedHtml = nunjucks.renderString(html, {
 //     styleUrl,
 //     scriptUrl,
 //     commonsUrl,
 //     data: JSON.stringify(Object.keys(stores).reduce(function (obj, name) {
//				if (!stores[name].desc.local)
//					obj[name] = stores[name].getData();
//				return obj;
//			}, {})),
 //     content
 //   });
//
//		// format the full page
//		callback(null, renderedHtml);
//			.replace("CONTENT", application));
//	});
//});
  //return res.render();

  //let dataPayload = JSON.stringify(Object.keys(stores).reduce(function (obj, name) {
  //  if (!stores[name].desc.local)
  //    obj[name] = stores[name].getData();
  //  return obj;
  //}, {}));