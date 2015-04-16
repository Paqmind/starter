let React = require("react");
let ListMenu = require("./todolistmenu");
let RouteHandler = require("react-router").RouteHandler;

let TodoPage = React.createClass({
	render: function () {
		return <div>
			<h2>TodoPage</h2>
			<ListMenu />
			<RouteHandler />
		</div>;
	}
});

export default TodoPage;
