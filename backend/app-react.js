// IMPORTS =========================================================================================
let Async = require("async");
let React = require("react");
let ReactRouter = require("react-router");

let routes = require("frontend/routes");

// APP =============================================================================================
module.exports = function (path, callback) {
  // TODO account path!!!
  let router = ReactRouter.create({
    routes: routes,
    location: path
  });

  router.run((Application, state) => {
    // you might want to push the state of the router to a
    // store for whatever reason
    // RouterActions.routeChange({routerState: state});
    callback(React.renderToString(<Application/>));
  });
};
