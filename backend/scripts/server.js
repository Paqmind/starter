// DEFAULTS ========================================================================================
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.NODE_CONFIG_DIR = process.env.NODE_CONFIG_DIR || "./shared/config";

// APP =============================================================================================
let Config = require("config");
let Express = require("express");
let Path = require("path");
let bodyParser = require("body-parser");
let uuid = require("uuid");
let DB = require("./db");

// require the page rendering logic
let renderApplication = Config.get("app-prerender") ?
  require("../../public/prerender.main.js") :
  require("../../config/simple.js");

// load bundle information from stats
let stats = require("../../public/stats.json");

let publicPath = stats.publicPath;

let STYLE_URL = Config.get("app-separate-stylesheet") && (publicPath + "main.css?" + stats.hash);
let SCRIPT_URL = publicPath + [].concat(stats.assetsByChunkName.main)[0];
let COMMONS_URL = publicPath + [].concat(stats.assetsByChunkName.commons)[0];

let app = Express();

// serve the static assets
app.use("/public", Express.static(Path.join(__dirname, "../public"), {
  maxAge: "200d" // We can cache them as they include hashes
}));

// artifical delay and errors
app.use(function (req, res, next) {
  if (Math.random() < 0.05) {
    // Randomly fail to test error handling
    res.statusCode = 500;
    res.end("Random fail! (you may remove this code in your app)");
    return;
  }
  setTimeout(next, Math.ceil(Math.random() * 1000));
});

app.use(bodyParser.json());

// The fake database
let todosDb = new DB();
let listsDb = new DB();

(function () {
  // Initial data
  let mylist = [uuid.v4(), uuid.v4(), uuid.v4()];
  let otherlist = [uuid.v4()];
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
    let newId = uuid.v4();
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

// application
app.get("/*", function (req, res) {
  renderApplication(req.path, {
    TodoItem: function (item, callback) {
      callback(null, todosDb.get(item.id, {}));
    },
    TodoList: function (item, callback) {
      callback(null, listsDb.get(item.id, []));
    }
  }, SCRIPT_URL, STYLE_URL, COMMONS_URL, function (err, html) {
    res.contentType = "text/html; charset=utf8";
    res.end(html);
  });
});


let port = parseInt(process.env.PORT || Config.get("http-port"));
app.listen(port, function () {
  console.log("Server listening on port " + port);
});