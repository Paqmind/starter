let React = require("react");
let State = require("react-router").State;
let Link = require("react-router").Link;
let StateFromStoreMixin = require("items-store/StateFromStoresMixin");
let Todo = require("./../actions").Todo;

export default React.createClass({
	mixins: [State, StateFromStoreMixin],
	statics: {
		getState(stores, params) {
			return {
				id: params.item,
				// this is just the data (or undefined when not yet available)
				item: stores.TodoItem.getItem(params.item),
				// this gives more info about the item
				// i. e. updated, outdated, error
				info: stores.TodoItem.getItemInfo(params.item)
			};
		}
	},
	render() {
		let id = this.state.id;
		let item = this.state.item;
		let info = this.state.info;
		// item is undefined on initial load
		if (!item) {
			return <div>Initial load from server...</div>
		}
		// We use a special error data for mark errored items
		// see ../mainStoresDescriptions.js
		if (item.error) {
			return <div>
				<div><b>{item.error}</b></div>
				<button onClick={function () {
					Todo.reload(id);
				}}>Reload</button>
			</div>;
		}
		return <div>
			<h3>Todoitem "{item.text}"</h3>
			<p><input type="text" value={item.text} onChange={function (event) {
				Todo.update(id, {
					text: event.target.value
				});
			}} /></p>
			{ info.updated ? <p>Syncing to server...</p> : info.outdated ? <p>Syncing from server...</p> : null }
		</div>
	}
});