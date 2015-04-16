var fs = require("fs");
var path = require("path");
var html = fs.readFileSync(path.resolve(__dirname, "../frontend/simple.html"), "utf-8");

export default function (path, readItems, scriptUrl, styleUrl, commonsUrl, callback) {
	callback(null, html.replace("SCRIPT_URL", scriptUrl));
};
