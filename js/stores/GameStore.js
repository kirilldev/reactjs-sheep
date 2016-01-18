/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var ControlsUtils = require('../utils/ControlsUtils');
var ScreenUtils = require('../ScreenUtils');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _sheep = {};
var sheepNextId = 0;

function createSheep(x, y) {
  var id = sheepNextId;
  _sheep[id] = {
    id: id,
    x: x,
    y: y
  };

  sheepNextId++
}

function draggingSheep (id, phase) {
  if (phase === "start") {
    _sheep[id].isDragging = true;
  } else if (phase === "end") {
    _sheep[id].isDragging = false;
  }
}

function updateGameState() {
  for (var key in _sheep) {
    if (!_sheep[key].isDragging) {
      _sheep[key].x = _sheep[key].x - 1.5;

      if (_sheep[key].x < 0) {
        delete _sheep[key]
      }
    } else {
      var xy = ScreenUtils.toVirtualScreenXY(ControlsUtils.pointerX, ControlsUtils.pointerY);
      _sheep[key].y = xy.y;
    }
  }
}

function removeSheep(id) {
  delete _sheep[id];
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _sheep;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.ENTER_FRAME:
      updateGameState();
      TodoStore.emitChange();
      break;
    case TodoConstants.CREATE_SHEEP:
      createSheep(action.x, action.y);
      break;
    case TodoConstants.DRAGGING_SHEEP:
      draggingSheep(action.id, action.phase);
      break;


    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = TodoStore;
