
var PopUpLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.initLayer();
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan:function(touch, event)
            {
                return true;
            }
        }, this);
    },

    initLayer: function(){
        var sprite = new cc.Sprite.create(res.PopUp_png);
        sprite.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(sprite);
        this.setButton();
    }, 

    setButton: function(){
        var button = new ccui.Button();
        button.loadTextures(res.ButtonClose);
        button.setPosition(cc.winSize.width * 0.9, cc.winSize.height * 0.85);
        button.setScale(0.4);
        button.addTouchEventListener(this.touchEvent, this);
        this.addChild(button);
    },

    touchEvent: function(sender, type){
        // cc.director.runScene(new ButtonScene());
        cc.log("PopUp click");
        this.removeFromParentAndCleanup(true); // remove  layer
    },

});

