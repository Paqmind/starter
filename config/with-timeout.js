// ??? =============================================================================================
export default function (fn, timeout, callback) {
	let timedOut = false;
	let to = setTimeout(function () {
		timedOut = true;
		callback();
	}, timeout);
	fn(function () {
		clearTimeout(to);
		if (!timedOut) callback();
	});
};
