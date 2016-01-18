var ControlsUtils = {
    pointerX: null,
    pointerY: null
};

(function () {
    document.addEventListener('mousemove', onMouseUpdate, false);
    document.addEventListener('mouseenter', onMouseUpdate, false);

    function onMouseUpdate(e) {
        ControlsUtils.pointerX = e.pageX;
        ControlsUtils.pointerY = e.pageY;
    }
})();

module.exports = ControlsUtils;