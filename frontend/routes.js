// IMPORTS =========================================================================================
let React = require("react");
let {Route, DefaultRoute, NotFoundRoute} = require("react-router");

// Eager Components
let Body = require("frontend/common/body");
let Home = require("frontend/common/home");
let NotFound = require("frontend/common/notfound");

// Lazy Components
let Readme = require("react-proxy!frontend/common/readme");
let Somepage = require("react-proxy!frontend/common/somepage");

// ROUTES ==========================================================================================
export default (
	<Route path="/" name="app" handler={Body}>
    <DefaultRoute handler={Home} />
    <NotFoundRoute handler={NotFound} />
    <Route path="/home" name="home" handler={Home} />
    <Route path="/readme" name="readme" handler={Readme} />
		<Route path="/some-page" name="some-page" handler={Somepage} />
	</Route>
);

// let TodoPage = require("./todopage")
// let TodoList = require("./todopage/todolist")
// let TodoItem = require("./todopage/todoitem")
//
//<Route path="/todo" name="todo" handler={TodoPage} >
//  <Route path="list/:list" name="todolist" handler={TodoList} />
//  <Route path="item/:item" name="todoitem" handler={TodoItem} />
//</Route>