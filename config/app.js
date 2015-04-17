// IMPORTS =========================================================================================
let Async = require("async");
let React = require("react");
let ReactUpdates = require("react/lib/ReactUpdates");
let ReactRouter = require("react-router");
let routes = require("../frontend/" + __resourceQuery.substr(1) + "routes");
let stores = require("../frontend/" + __resourceQuery.substr(1) + "stores");
let withTimeout = require("./with-timeout");

// ??? =============================================================================================
let initialRun = true;

// react-router handles location
ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Application, state) {

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
	withTimeout(Async.forEach.bind(Async, state.routes, function (route, callback) {
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
