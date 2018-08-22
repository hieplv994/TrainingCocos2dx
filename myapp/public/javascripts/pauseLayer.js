var popupPauseLayer = cc.Layer.extend({
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
        var sprite = new cc.Sprite.create(res.popUpPause_png);
        sprite.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(sprite);

        //set Button Play
        // var btnPlay = this.createButton(res.btnPlayGame_png, 0.45, 0.58);
        var btnPlay = commonInstance.createButton(res.btnPlayGame_png, 0.45, 0.58);
        btnPlay.addTouchEventListener(this.touchEventPlay, this);
        this.addChild(btnPlay);

        //set Button Restart
        // var btnRestart = this.createButton(res.btnRestart_png, 0.55, 0.5);
        var btnRestart = commonInstance.createButton(res.btnRestart_png, 0.55, 0.5);
        btnRestart.addTouchEventListener(this.touchEventRestart, this);
        this.addChild(btnRestart);

        //set Button Go back to Menu level
        // var btnBackToMenu = this.createButton(res.btnBackMenu_png, 0.35, 0.5);
        var btnBackToMenu = commonInstance.createButton(res.btnBackMenu_png, 0.35, 0.5);
        btnBackToMenu.addTouchEventListener(commonInstance.gotoMenuLevel, this);
        this.addChild(btnBackToMenu);
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
    touchEventPlay: function(sender, type){
        cc.director.resume();
        this.removeFromParentAndCleanup(true); // remove  layer
        if(cc.game.SOUND){
            cc.audioEngine.playMusic(res.bgPlay_auido, true);
        }else {
            cc.audioEngine.stopMusic();
        }
    },

    //Envet Button Restart
    touchEventRestart: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new playScene());
                clientInstance.resetGame(cc.game.LEVEL);
                break;
            default:
                break;
        }
    },

    //Event Button BackToMenu
    // touchEventBackToMenu: function(sender, type){
    //     switch (type) {
    //         case ccui.Widget.TOUCH_BEGAN:
    //             clientInstance.gotoLevel();
    //             cc.director.runScene(new levelScene());
    //             clientInstance.sendLevel(cc.game.LEVEL);
    //             break;
    //         default:
    //             break;
    //     }
    // },

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