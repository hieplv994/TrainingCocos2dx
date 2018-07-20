var PopUpWinLayer = cc.Layer.extend({
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
        var sprite = new cc.Sprite.create(res.popUpWin_png);
        sprite.setPosition(cc.winSize.width * 0.55, cc.winSize.height * 0.5);
        this.addChild(sprite);
        
        //button go back menu level
        var btnBackToMenu = this.createButton(res.btnBackMenu_png, 0.415, 0.25);
        btnBackToMenu.addTouchEventListener(this.touchEventBackToMenu, this);
        this.addChild(btnBackToMenu);

        //button next level
        var btnNextLevel = this.createButton(res.btnNextLevel_png, 0.61, 0.25);
        btnNextLevel.addTouchEventListener(this.touchEventNextLvel, this);
        this.addChild(btnNextLevel);

        //add Sound
        if(cc.game.SOUND){
            cc.audioEngine.playMusic(res.BGPlay_auido, true);
        }
        
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
    //event Next Level
    touchEventNextLvel: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.game.LEVEL ++;
                cc.director.runScene(new PlayScene());
                break;
            default:
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