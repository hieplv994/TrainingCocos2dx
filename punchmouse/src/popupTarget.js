var PopUpTargetLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
        this.blockTouch();
    },
    init: function(){
        //create layer black when popup open
        var colorLayer = new cc.LayerColor(cc.color(0, 0, 0, 180));
        colorLayer.ignoreAnchorPointForPosition(false);// set anchor poit will be (0, 0)
        colorLayer.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(colorLayer);

        //add background
        var sprite = new cc.Sprite.create(res.PopUpTarget_png);
        sprite.setPosition(cc.winSize.width * 0.55, cc.winSize.height * 0.5);
        this.addChild(sprite);

        //set Button OK
        var btnPlay = this.createButton(res.btnOK_png, 0.6, 0.22);
        btnPlay.addTouchEventListener(this.touchEventOK, this);
        this.addChild(btnPlay);

        //set Button Back
        var btnBack = this.createButton(res.btnBack_png, 0.4, 0.22);
        btnBack.addTouchEventListener(this.touchEventBack, this);
        this.addChild(btnBack);

        //add Sound
        if(cc.game.SOUND){
            cc.audioEngine.playMusic(res.BGPlay_auido, true);
        }

        //set Rule Label Target
        this.showLabelTarget(cc.game.LEVEL);
    },

    //craete Button
    createButton: function(src, x, y){
        var btn = new ccui.Button();
        btn.loadTextures(src);
        btn.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        return btn;
    },

    //Event Button Play
    touchEventOK: function(sender, type){
        this.removeFromParentAndCleanup(true);
    },

    //Envet Button Back
    touchEventBack: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new LevelScene());
                break;
            default:
                break;
        }
    },

    //show label target
    showLabelTarget: function(level){
        this.setLabel(cc.game.LIFEMOUSE + level - 1, 0.61);
        this.setLabel(cc.game.COMBO + level - 1, 0.485);
        this.setLabel(cc.game.DIAMOND + level - 1, 0.355);
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

