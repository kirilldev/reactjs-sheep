var React = require('react');

var GameApp = require('./components/GameApp.react.js');
var AppDispatcher = require('./dispatcher/AppDispatcher.js');
var TodoConstants = require('./constants/TodoConstants');
var GameStore = require('./stores/GameStore');
var EventEmitter = require('events').EventEmitter;

React.render(
    <GameApp />, document.getElementById('sheep-game')
);

(function () {
    var onEachFrame;
    if (window.webkitRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                webkitRequestAnimationFrame(_cb);
            };
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                mozRequestAnimationFrame(_cb);
            };
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / 60);
        }
    }

    onEachFrame(function () {
        /*GameStore.emit('change');*/
        AppDispatcher.dispatch({
            actionType: TodoConstants.ENTER_FRAME
        });
    });

    window.onresize=function(){
        AppDispatcher.dispatch({
            actionType: TodoConstants.SCREEN_RESIZED,
        });
    };
})();