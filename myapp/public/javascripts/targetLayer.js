
var popupTargetLayer = cc.Layer.extend({
    ctor:function (puTarget) {
        this._super();
        this.init(puTarget);
        this.blockTouch();
    },
    init: function(puTarget){
        //create layer black when popup open
        var colorLayer = new cc.LayerColor(cc.color(0, 0, 0, 180));
        colorLayer.ignoreAnchorPointForPosition(false);// set anchor poit will be (0, 0)
        colorLayer.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(colorLayer);

        //add background
        var sprite = new cc.Sprite.create(res.popUpTarget_png);
        sprite.setPosition(cc.winSize.width * 0.55, cc.winSize.height * 0.5);
        this.addChild(sprite);

        //set Button OK
        var btnPlay = commonInstance.createButton(res.btnOK_png, 0.6, 0.22);
        btnPlay.addTouchEventListener(this.touchEventOK, this);
        this.addChild(btnPlay);

        //set Button Back menu level
        var btnBack = commonInstance.createButton(res.btnBack_png, 0.4, 0.22);
        btnBack.addTouchEventListener(commonInstance.gotoMenuLevel, this);
        this.addChild(btnBack);

        //add Sound
        if(cc.game.SOUND){
            cc.audioEngine.playMusic(res.bgPlay_auido, true);
        };

        this.showLabelTarget(puTarget);
    },

    //craete Button
    // createButton: function(src, x, y){
    //     var btn = new ccui.Button();
    //     btn.loadTextures(src);
    //     btn.setPosition(
    //         cc.winSize.width * x, 
    //         cc.winSize.height * y
    //     );
    //     return btn;
    // },

    //Event Button Play
    touchEventOK: function(sender, type){
        this.removeFromParentAndCleanup(true);
        cc.director.resume();
    },

    //Envet Button Back
    // touchEventBack: function(sender, type){
    //     switch (type) {
    //         case ccui.Widget.TOUCH_BEGAN:
    //             clientInstance.gotoLevel();
    //             cc.director.runScene(new levelScene());
    //             break;
    //         default:
    //             break;
    //     }
    // },

    //show label target
    showLabelTarget: function(objTarget){
        this.setLabel(parseInt(objTarget.lifeMouse), 0.61);
        this.setLabel(parseInt(objTarget.combo), 0.485);
        this.setLabel(parseInt(objTarget.diamond), 0.355);
    },

    //set label
    setLabel: function(int, y){
        var label = new cc.LabelTTF(
            int.toString(), 
            'Consola', 45,
            cc.size(100, 0),
            cc.TEXT_ALIGNMENT_CENTER
        );
        label.setColor(cc.color.WHITE);
        label.setPosition(
            cc.winSize.width * 0.6, 
            cc.winSize.height * y
        );
        this.addChild(label);
    },

    //block touch
    blockTouch: function(){
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan:function(touch, event)
            {
                return true;
            }
        }, this);
    }
});

