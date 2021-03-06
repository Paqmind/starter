let React = require("react");
let State = require("react-router").State;
let Link = require("react-router").Link;
let StateFromStoreMixin = require("items-store/StateFromStoresMixin");
let Todo = require("./../actions").Todo;

export default React.createClass({
	mixins: [State, StateFromStoreMixin],
	statics: {
		getState(stores, params) {
			let list = stores.TodoList.getItem(params.list);
			return {
				id: params.list,
				list: list,
				items: list && list.map(function (item) {
					if (typeof item === "string")
						return stores.TodoItem.getItem(item);
				}.bind(this)),
				// get more info about the item
				info: stores.TodoList.getItemInfo(params.list)
			};
		}
	},
	getInitialState() {
		return {
			newItem: ""
		};
	},
	render() {
		let id = this.state.id;
		let list = this.state.list;
		let items = this.state.items;
		let info = this.state.info;
		return <div>
			<h3>Todolist: {id}</h3>
			{
				info.error ? <div><strong>{info.error.message}</strong></div> :
				info.available ? this.renderItemsView(id, list, items) :
				<div>Fetching from server...</div>
			}
		</div>;
	},
	renderItemsView(id, list, items) {
		return <ul>
			{
				list.map(function (item, idx) {
					if (typeof item === "string") {
						return <li key={item}><Link to="todoitem" params={{item: item}}>
							{items[idx] ? items[idx].text : ""}
						</Link></li>;
					} else {
						// While adding item
						return <li key={item}>
							{item.text} &uarr;
						</li>;
					}
				})
			}
			<li>
				<input type="text" value={this.state.newItem} onChange={function (event) {
					this.setState({newItem: event.target.value});
				}.bind(this)} />
				<button onClick={function () {
					Todo.add(id, {
						text: this.state.newItem
					});
					this.setState({newItem: ""});
				}.bind(this)}>Add</button>
			</li>
		</ul>;
	}
});