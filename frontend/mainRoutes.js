let React = require("react");
let Router = require("react-router");
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;
let NotFoundRoute = Router.NotFoundRoute;

// export routes
export default (
	<Route name="app" path="/" handler={require("./application")}>
		<Route name="some-page" path="/some-page" handler={require("react-proxy!./somepage")} />
		<Route name="readme" path="/readme" handler={require("react-proxy!./readme")} />
		<Route name="todo" path="/todo" handler={require("./todopage")} >
			<Route name="todolist" path="list/:list" handler={require("./todopage/todolist")} />
			<Route name="todoitem" path="item/:item" handler={require("./todopage/todoitem")} />
		</Route>
		<Route name="home" path="/home" handler={require("./home")} />
		<DefaultRoute handler={require("./home")} />
		<NotFoundRoute handler={require("./notfound")} />
	</Route>
);