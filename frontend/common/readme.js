let React = require("react");

export default React.createClass({
	render() {
		let style = {
			default: {
				"backgroundColor": "white",
				"border": "1px dotted gray",
				"padding": "1em"
			}
		};
		let readme = { __html: require("./../../README.md") };
		return <div style={style.default} dangerouslySetInnerHTML={readme}></div>;
	}
});