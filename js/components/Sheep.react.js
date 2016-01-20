var React = require('react');
var GameStore = require('../stores/GameStore');
var ScreenUtils = require('../ScreenUtils');
var TodoConstants = require('../constants/TodoConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var Sheep = React.createClass({
	_handleDragging: function (phase) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.DRAGGING_SHEEP,
			id:this.props.id,
			phase : phase
		});
	},
	_onChange: function() {
		if (this.isMounted()) {
			this.setState(GameStore.getAll()[this.props.id])
		}
	},
	getInitialState: function() {
		return {
			x:this.props.x,
			y:this.props.y,
			key:this.props.key,
			isDragging:false
		}
	},
	componentDidMount: function(){
		GameStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		GameStore.removeChangeListener(this._onChange);
	},
	render: function() {

		var position = ScreenUtils.toPhysicalScreenXY(this.state.x, this.state.y);

		return(
			<div style={{left: position.x + "px", top: position.y + "px"}}
				 onMouseDown={this._handleDragging.bind(this, "start")} className="Sheep"></div>
		)
	}
});

module.exports = Sheep;