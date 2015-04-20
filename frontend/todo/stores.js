let ItemsStore = require("items-store/ItemsStore");
let Async = require("async");
let Superagent = require("superagent");
let ReactUpdates = require("react/lib/ReactUpdates");

// a few helper methods for a REST API

function batchedCallback(callback) {
	return function (err, res) {
		ReactUpdates.batchedUpdates(callback.bind(null, err, res));
	}
}

function writeAndReadSingleItem(path, resultHandler) {
	resultHandler = resultHandler || function (result) { return result; };
	return function (options, callback) {
		Superagent.post(path + options.id)
			.set("Accept", "application/json")
			.type("json")
			.send(options.update)
			.end(batchedCallback(function (err, res) {
				if (err) return callback(err);
				if (res.status !== 200)
					return callback(new Error("Request failed with " + res.status + ": " + res.text));
				callback(null, resultHandler(res.body));
			}));
	}
}

function readSingleItem(path, resultHandler) {
	resultHandler = resultHandler || function (result) { return result; };
	return function (options, callback) {
		Superagent.get(path + options.id)
			.set("Accept", "application/json")
			.type("json")
			.end(batchedCallback(function (err, res) {
				if (err) return callback(err);
				if (res.status !== 200)
					return callback(new Error("Request failed with " + res.status + ": " + res.text));
				callback(null, resultHandler(res.body));
			}));
	}
}

function readMultipleItems(path, resultHandler) {
	resultHandler = resultHandler || function (result) { return result; };
	return function (optionsArr, callback) {
		Superagent.get(path + optionsArr.map(function (options) {
			return options.id;
		}).join("+"))
			.set("Accept", "application/json")
			.type("json")
			.end(batchedCallback(function (err, res) {
				if (err) return callback(err);
				if (res.status !== 200)
					return callback(new Error("Request failed with " + res.status + ": " + res.text));
				callback(null, resultHandler(res.body));
			}));
	}
}

// a queue that allows only one REST request at a time
// it also defers the requests to next tick, to aggregate multiple changes
let queue = Async.queue(function (fn, callback) {
	process.nextTick(function () {
		fn(callback);
	});
}, 1);

// load embedded initial store data from prerendering if available
let dataPayload = typeof dataPayload === "object" ? dataPayload : {};

// take the store descriptions as base
let desc = require("./mainstoresdescriptions");

let stores = module.exports = {
	Router: new ItemsStore(desc.Router),

	TodoList: new ItemsStore(Object.assign({
		// REST API at "/_/list/"
		// the API also returns "TodoItem"s for requests

		writeAndReadSingleItem: writeAndReadSingleItem("/_/list/", function (result) {
			Object.keys(result.items).forEach(function (key) {
				stores.TodoItem.setItemData(key.substr(1), result.items[key]);
			});
			return result.list;
		}),
		readSingleItem: readSingleItem("/_/list/", function (result) {
			Object.keys(result.items).forEach(function (key) {
				stores.TodoItem.setItemData(key.substr(1), result.items[key]);
			});
			return result.list;
		}),

		queueRequest: queue.push.bind(queue),
	}, desc.TodoList), dataPayload.TodoList),

	TodoItem: new ItemsStore(Object.assign({
		// REST API at "/_/todo"
		// it supports reading up to 10 items at once

		writeAndReadSingleItem: writeAndReadSingleItem("/_/todo/"),
		readSingleItem: readSingleItem("/_/todo/"),
		readMultipleItems: readMultipleItems("/_/todo/"),

		queueRequest: queue.push.bind(queue),
		maxWriteItems: 10
	}, desc.TodoItem), dataPayload.TodoItem)
};


// bind actions to stores

let actions = require("./actions");

actions.Todo.add.listen(function (list, item) {
	stores.TodoList.updateItem(list, { $push: [item] });
});

actions.Todo.update.listen(function (id, update) {
	stores.TodoItem.updateItem(id, update);
});

actions.Todo.reload.listen(function (id) {
	stores.TodoItem.update(id);
});