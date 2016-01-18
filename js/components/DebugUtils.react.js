var React = require('react');
var GameStore = require('../stores/GameStore');

var DebugUtils = React.createClass({
	_onChange: function() {
		var thisLoop = new Date;
		var refreshCount = this.state.refreshCount - 1;

		if (refreshCount === 0) {
			var fps = Math.round(1000 / (thisLoop - this.state.lastLoop));

			this.setState({
				lastLoop : thisLoop,
				refreshCount: 10,
				fps : fps
			});
		} else {
			this.setState({
				lastLoop : thisLoop,
				refreshCount : refreshCount
			});
		}
	},
	getInitialState: function() {
		return {
			lastLoop: new Date(),
			refreshCount: 10,
			fps : 0
		}
	},
	componentDidMount: function(){
		GameStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		GameStore.removeChangeListener(this._onChange);
	},
	render: function() {
		return(
			<div style={{left: 0, top: 0, position:"absolute"}}>{this.state.fps} fps</div>
		)
	}
});

module.exports = DebugUtils;