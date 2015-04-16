var React = require("react");
var ListMenu = require("./TodolistMenu");
var RouteHandler = require("react-router").RouteHandler;

var TodoPage = React.createClass({
	render: function () {
		return <div>
			<h2>TodoPage</h2>
			<ListMenu />
			<RouteHandler />
		</div>;
	}
});

export default TodoPage;
