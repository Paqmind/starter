// IMPORTS =========================================================================================
let update = require("react/lib/update");

// DB ==============================================================================================
function DB(initialData) {
	this.data = initialData || {};
}

DB.prototype.get = function (id, createDefaultData) {
	let d = this.data["_" + id];
	if (!d) {
		return this.data["_" + id] = createDefaultData;
	}
	return d;
};

DB.prototype.update = function (id, upd) {
	return this.data["_" + id] = update(this.data["_" + id], upd);
};

DB.prototype.set = function (id, data) {
	return this.data["_" + id] = data;
};

export default DB;