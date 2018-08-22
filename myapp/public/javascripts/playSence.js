var PlayLayerGlobal = null;
var playLayer = cc.Layer.extend({
    objTarget: {},
    ctor:function () {
        this._super();
        this.init();
        PlayLayerGlobal = this;
    },

    init: function(){
        this.objTarget = client.objTarget;
        var currentTarget = this.getTargetForLevel(this.objTarget, cc.game.LEVEL);
        this._background = new backgroundLayer();
        this.addChild(this._background);
        this._status = new statusPlayLayer(currentTarget);
        this.addChild(this._status);
        this._time = new timelayer();
        this.addChild(this._time);
        this.showTarget(currentTarget);
    },

    // show target
    showTarget: function(data){
        cc.director.pause();
        this._popupTarget = new popupTargetLayer(data);
        this.addChild(this._popupTarget);
    },
    // get Target from array Target send from Server
    getTargetForLevel: function(obj, level){
        for(var i = 0; i < obj.length; i++){
            if(obj[i].numberLevel ===  level){
                return obj[i];
            }
        }
        return null;
    }
});

var playScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new playLayer();
        this.addChild(layer);
        // layer.showTarget(client.objTarget);
    }
});
