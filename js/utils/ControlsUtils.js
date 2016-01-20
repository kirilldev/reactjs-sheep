var ControlsUtils = {
    pointerX: null,
    pointerY: null,
    mouseUpCallbacks : []
};

(function () {
    document.addEventListener('mousemove', onMouseUpdate, false);
    document.addEventListener('mouseenter', onMouseUpdate, false);

    function onMouseUpdate(e) {
        ControlsUtils.pointerX = e.pageX;
        ControlsUtils.pointerY = e.pageY;
    }

    document.addEventListener('mouseup', function(){
        for (var i=0; i < ControlsUtils.mouseUpCallbacks.length; i++) {
            ControlsUtils.mouseUpCallbacks[i]();
        }
    }, false);
})();

module.exports = ControlsUtils;