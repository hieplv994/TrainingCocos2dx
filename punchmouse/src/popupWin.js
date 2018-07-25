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
        
        //set label
        this.labelScore = this.setLabel("Score: " + StatusPlayLayerGlobal.score, 0.44, 0.46);
        this.addChild(this.labelScore);
        var bestScore = localStorage.getItem("BestScore" + (cc.game.LEVEL - 1));
        this.labelBestScore = this.setLabel("Best Score: " + bestScore, 0.48, 0.37);
        this.addChild(this.labelBestScore);

        // set star
        var level = cc.game.LEVEL - 1;
        var numberStar = localStorage.getItem("Star" + level);
        this.createStarLevel(0.435, 0.6, numberStar);

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
                cc.director.runScene(new PlayScene());
                break;
            default:
                break;
        }
    },

    //set label
    setLabel: function(int, x, y){
        var label = new cc.LabelTTF(
            int.toString(), 
            'Consola', 40,
            cc.size(300, 0),
            cc.TEXT_ALIGNMENT_CENTER
        );
        label.setColor(cc.color.WHITE);
        label.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        return label;
    },

    createStarLevel: function(x, y, NumberStar){
        if(NumberStar != 0){
            var count = NumberStar;
            for(let i = 0; i < 3; i++){
                var spriteStar = new cc.Sprite.create(res.imgStarLevel_png);
                spriteStar.setPosition(
                    cc.winSize.width * x, 
                    cc.winSize.height * y
                );
                spriteStar.setScale(1.5);
                var spriteStarLock = new cc.Sprite.create(res.imgStartLock_png);
                spriteStarLock.setPosition(
                    cc.winSize.width * x, 
                    cc.winSize.height * y
                );
                spriteStarLock.setScale(1.5);
                if(count > 0){
                    this.addChild(spriteStar);
                }else if(count == 0){
                    this.addChild(spriteStarLock);
                }
                count--;
                x += 0.08;
            }
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