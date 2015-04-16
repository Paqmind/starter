export default function loadersByExtension(obj) {
	let loaders = [];
	let extensions = Object.keys(obj).map(function (key) {
		return key.split("|");
	}).reduce(function (arr, a) {
		arr.push.apply(arr, a);
		return arr;
	}, []);
	Object.keys(obj).forEach(function (key) {
		let exts = key.split("|");
		let value = obj[key];
		let entry = {
			extensions: exts,
			test: extsToRegExp(exts),
			loaders: value
		};
		if (Array.isArray(value)) {
			entry.loaders = value;
		} else if (typeof value === "string") {
			entry.loader = value;
		} else {
			Object.keys(value).forEach(function (key) {
				entry[key] = value[key];
			});
		}
		loaders.push(entry);
	});
	return loaders;
};

function extsToRegExp(exts) {
	return new RegExp("\\.(" + exts.map(function (ext) {
		return ext.replace(/\./g, "\\.") + "(\\?.*)?";
	}).join("|") + ")$");
}
