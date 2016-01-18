/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */
var React = require('react');
var Sheep = require('./Sheep.react');
var DebugUtils = require('./DebugUtils.react');
var GameStore = require('../stores/GameStore');
var TodoConstants = require('../constants/TodoConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getGameState() {
  return {
    allSheep: GameStore.getAll()
  };
}

var GameApp = React.createClass({

  getInitialState: function() {
    return getGameState();
  },


  componentDidMount: function(){
    GameStore.addChangeListener(this._onChange);

    AppDispatcher.dispatch({
      actionType: TodoConstants.CREATE_SHEEP,
      color : "white",
      x :100,
      y : 200
    });

    AppDispatcher.dispatch({
      actionType: TodoConstants.CREATE_SHEEP,
      x :800,
      y : 100
    });

    AppDispatcher.dispatch({
      actionType: TodoConstants.CREATE_SHEEP,
      color : "red",
      x :600,
      y : 100
    });

    AppDispatcher.dispatch({
      actionType: TodoConstants.CREATE_SHEEP,
      color : "blue",
      x :400,
      y : 400
    });

    AppDispatcher.dispatch({
      actionType: TodoConstants.CREATE_SHEEP,
      color : "blue",
      x :600,
      y : 200
    });
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    var sheep = [];

    for (var key in this.state.allSheep) {
      var currentSheep = this.state.allSheep[key];
      sheep.push(<Sheep key={key} id={currentSheep.id}  x={currentSheep.x}  y={currentSheep.y} />);
    }

    return (
      <div>
        <DebugUtils />
        {sheep}
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getGameState());
  }

});

module.exports = GameApp;
