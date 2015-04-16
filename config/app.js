var async = require("async");
var React = require("react");
var Router = require("react-router");
var routes = require("../frontend/" + __resourceQuery.substr(1) + "routes");
var stores = require("../frontend/" + __resourceQuery.substr(1) + "stores");
var withTimeout = require("./with-timeout");
var ReactUpdates = require("react/lib/ReactUpdates");

var initialRun = true;

// react-router handles location
Router.run(routes, Router.HistoryLocation, function (Application, state) {

	// On every page navigation invalidate data from the stores
	// This is not needed when the server notifies the client about changes (WebSocket, SSE)
	if (!initialRun) {
		Object.keys(stores).forEach(function (key) {
			stores[key].outdate();
		});
	}
	initialRun = false;

	ReactUpdates.batchedUpdates(function () {
		stores.Router.setItemData("transition", state);
	});

	// try to fetch data for a defined timespan
	// when the data is not fully fetched after the timeout components are rendered (with missing/old data)
	withTimeout(async.forEach.bind(async, state.routes, function (route, callback) {
		if (route.handler.chargeStores) {
			route.handler.chargeStores(stores, state.params, callback);
		} else {
			callback();
		}
	}), 600, function () {

		ReactUpdates.batchedUpdates(function () {
			stores.Router.setItemData("transition", null);
		});

		// Render the components with the stores
		React.withContext({
			stores: stores
		}, function () {
			React.render(<Application />, document.getElementById("content"));
		});
	});
});
