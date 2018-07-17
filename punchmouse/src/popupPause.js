var PopupPauseLayer = cc.Layer.extend({
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
        var sprite = new cc.Sprite.create(res.PopUpPause_png);
        sprite.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(sprite);

        //set Button Play
        var btnPlay = this.createButton(res.btnPlayGame_png, 0.45, 0.58);
        btnPlay.addTouchEventListener(this.touchEventPlay, this);
        this.addChild(btnPlay);

        //set Button Restart
        var btnRestart = this.createButton(res.btnRestart_png, 0.55, 0.5);
        btnRestart.addTouchEventListener(this.touchEventRestart, this);
        this.addChild(btnRestart);

        //set Button Go back to Menu
        var btnBackToMenu = this.createButton(res.btnBackMenu_png, 0.35, 0.5);
        btnBackToMenu.addTouchEventListener(this.touchEventBackToMenu, this);
        this.addChild(btnBackToMenu);
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
    touchEventPlay: function(sender, type){
        cc.director.resume();
        this.removeFromParentAndCleanup(true); // remove  layer
        if(cc.game.SOUND){
            cc.audioEngine.playMusic(res.BGPlay_auido, true);
        }else {
            cc.audioEngine.stopMusic();
        }
    },

    //Envet Button Restart
    touchEventRestart: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new PlayScene());
                break;
            default:
                break;
        }
    },

    //Event Button BackToMenu
    touchEventBackToMenu: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new LevelScene());
                break;
            default:
                break;
        }
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