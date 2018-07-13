var PlayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init: function(){
        //Add background
        var playBackGroundSprite = new cc.Sprite.create(res.playBackGround_png);
        playBackGroundSprite.setPosition(
            cc.winSize.width * 0.5, 
            cc.winSize.height * 0.5
        );
        this.addChild(playBackGroundSprite);
    },
});

var PalyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});

