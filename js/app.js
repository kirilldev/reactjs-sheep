var React = require('react');

var GameApp = require('./components/GameApp.react.js');
var AppDispatcher = require('./dispatcher/AppDispatcher.js');
var TodoConstants = require('./constants/TodoConstants');
var GameStore = require('./stores/GameStore');
var ScreenUtils = require('./ScreenUtils');
var EventEmitter = require('events').EventEmitter;
var gameContainer = document.getElementById('sheep-game');

React.render(<GameApp />, gameContainer);

(function () {
    var maintainElementAspectRatio = function () {
        var physicalAspectRatio = window.innerHeight / window.innerWidth;
        var newWidth, newHeight;

        if (physicalAspectRatio < ScreenUtils.virtualAspectRatio) {
            newWidth = window.innerHeight / ScreenUtils.virtualAspectRatio;
            newHeight = window.innerHeight;
        } else {
            newWidth = window.innerWidth;
            newHeight = window.innerWidth * ScreenUtils.virtualAspectRatio;
        }

        gameContainer.style.flexBasis = newWidth + "px";
        gameContainer.style.height = newHeight + "px";
    };

    maintainElementAspectRatio();

    window.addEventListener("resize", maintainElementAspectRatio);

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

    window.onresize = function () {
        AppDispatcher.dispatch({
            actionType: TodoConstants.SCREEN_RESIZED,
        });
    };
})();