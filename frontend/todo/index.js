let React = require("react");
let ListMenu = require("./todolistmenu");
let RouteHandler = require("react-router").RouteHandler;

export default React.createClass({
	render() {
		return <div>
			<h2>TodoPage</h2>
			<ListMenu />
			<RouteHandler />
		</div>;
	}
});