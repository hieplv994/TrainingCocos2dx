var PopUpExitLayer = cc.Layer.extend({
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
        //Stop music
        cc.audioEngine.stopMusic();
        //Add background popup
        var sprite = new cc.Sprite.create(res.PopUpExit_png);
        sprite.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(sprite);

        // set button Ok Quit game
        var btnOK = createButton(res.btnOKExit_png, 0.34, 0.24);
        btnOK.addTouchEventListener(this.touchEventOK, this);
        this.addChild(btnOK);

        //set Button Cancel Quit game
        var btnCancel = createButton(res.btnCancelExit_png, 0.55, 0.24);
        btnCancel.addTouchEventListener(this.touchEventCancel, this);
        this.addChild(btnCancel);

        var labelExit = new cc.LabelTTF(
            cc.game.LABELEXIT, 
            'Consola', 40,
            cc.size(300, 0),
            cc.TEXT_ALIGNMENT_CENTER
        );
        labelExit.setColor(cc.color.WHITE);
        labelExit.setPosition(
            cc.winSize.width * 0.45, 
            cc.winSize.height * 0.5
        );
        this.addChild(labelExit);
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

    touchEventCancel: function(){
        this.removeFromParentAndCleanup(true); // remove  layer
        cc.audioEngine.playMusic(res.BGHome_audio, true);
    },

    touchEventOK: function(type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.game.end();
                break;
        }
    },

    //Block touch down
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