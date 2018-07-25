var PopUpLoseLayer = cc.Layer.extend({
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
        var sprite = new cc.Sprite.create(res.popUpLose_png);
        sprite.setPosition(cc.winSize.width * 0.55, cc.winSize.height * 0.5);
        this.addChild(sprite);

        //button go back menu level
        var btnBackToMenu = this.createButton(res.btnBackMenu_png, 0.415, 0.25);
        btnBackToMenu.addTouchEventListener(this.touchEventBackToMenu, this);
        this.addChild(btnBackToMenu);

        //set Button Restart
        var btnRestart = this.createButton(res.btnRestart_png, 0.58, 0.25);
        btnRestart.addTouchEventListener(this.touchEventRestart, this);
        this.addChild(btnRestart);

        //set label
        var label = new cc.LabelTTF(
            "SO BAD", 
            'Consola', 45,
            cc.size(300, 0),
            cc.TEXT_ALIGNMENT_CENTER
        );
        label.setColor(cc.color.BLACK);
        label.setPosition(
            cc.winSize.width * 0.5, 
            cc.winSize.height * 0.4
        );
        this.addChild(label);

        var x = 0.435;
        for(let i = 0; i < 3; i++){
            var spriteStarLock = new cc.Sprite.create(res.imgStartLock_png);
            spriteStarLock.setPosition(
                cc.winSize.width * x, 
                cc.winSize.height * 0.6
            );
            spriteStarLock.setScale(0.8);
            this.addChild(spriteStarLock);
            x += 0.08;
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