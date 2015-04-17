// IMPORTS =========================================================================================
let FS = require("fs");
let Path = require("path");

// ??? =============================================================================================
let html = FS.readFileSync(Path.resolve(__dirname, "../frontend/simple.html"), "utf-8");

export default function (path, readItems, scriptUrl, styleUrl, commonsUrl, callback) {
	callback(null, html.replace("SCRIPT_URL", scriptUrl));
};
