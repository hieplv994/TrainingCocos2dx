var PlayLayerGlobal = null;

var PlayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();

        PlayLayerGlobal = this;
    },

    init: function(){
        this._background = new BackgroundLayer();
        this.addChild(this._background);
        this._status = new StatusPlayLayer();
        this.addChild(this._status);
    }, 

    // show target
    showTarget: function(){
        cc.director.pause();
        this.addChild(new PopUpTargetLayer());
    },
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
        layer.showTarget();
    }
});
