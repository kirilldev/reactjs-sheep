module.exports = {
    virtualWidth: 1280,
    virtualHeight: 720,
    toPhysicalScreenXY: function (virtualX, virtualY) {
        var widthRatio = window.innerWidth / this.virtualWidth;
        var heightRatio = window.innerHeight / this.virtualHeight;

        return {
            x: widthRatio * virtualX,
            y: heightRatio * virtualY
        }
    },
    toVirtualScreenXY: function (physicalX, physicalY) {
        var widthRatio = window.innerWidth / this.virtualWidth;
        var heightRatio = window.innerHeight / this.virtualHeight;

        return {
            x: physicalX / widthRatio,
            y: physicalY / heightRatio
        }
    }
};

