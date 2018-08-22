var common = function (){};

common.prototype.gotoMenuLevel = function(sender, type){
    switch (type) {
        case ccui.Widget.TOUCH_BEGAN:
            clientInstance.gotoLevel();
            cc.director.runScene(new levelScene());
            break;
        default:
            break;
    }
};

common.prototype.createButton = function(src, x, y){
    var btn = new ccui.Button();
    btn.loadTextures(src);
    btn.setPosition(
        cc.winSize.width * x, 
        cc.winSize.height * y
    );
    return btn;
};

var commonInstance = new common();
