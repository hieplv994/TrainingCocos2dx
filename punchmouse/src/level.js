var LevelLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init: function(){
        //stop music
        cc.audioEngine.stopMusic();

        //Add background
        var spriteLevel = new cc.Sprite.create(res.BGMenuLevel_png);
        spriteLevel.setPosition(
            cc.winSize.width * 0.5, 
            cc.winSize.height * 0.5
        );
        this.addChild(spriteLevel);

        //Craete Button go back to Menu
        var btnExitLevel = new ccui.Button();
        btnExitLevel.loadTextures(res.btnExitLevel_png);
        btnExitLevel.setPosition(
            cc.winSize.width * 0.08, 
            cc.winSize.height * 0.85
        );
        btnExitLevel.addTouchEventListener(this.touchExitLevel, this);
        this.addChild(btnExitLevel);

        //Craete Buttons Level
        var x = 0.15;    //width
        var y = 0.68;    // height
        var levelMenu = 1;
        var levelUnlock = localStorage.getItem("LevelUnLock");
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 5; j++){
                // create button
                var btn = this.createButtonLevel(levelMenu,x , y);
                this.addChild(btn);
                this.checkLockLevel(levelMenu, levelUnlock, x , y, btn);
                this.setStar(levelMenu, levelUnlock, x, y);
                this.createLabel(levelMenu, x, y - 0.11);
                if(j == 4){
                    x = 0.15;
                }else{
                    x += 0.165;
                    levelMenu++;
                }
            }
            y -= 0.22
            levelMenu++;
        }

        //set music backgourd
        if(cc.game.MUSIC){
            cc.audioEngine.playMusic(res.BGHome_audio, true);
        }

    },

    //Create Button Level
    createButtonLevel: function(level, x, y){
        var btnLevel = new ccui.Button();
        btnLevel._NumberLevel = level;
        btnLevel.loadTextures(res.btnLevel_png);
        btnLevel.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        btnLevel.addTouchEventListener(this.touchBtnLevel, this);
        return btnLevel;
    },

    //craete Star Level
    createStarLevel: function(x, y, NumberStar){
        if(NumberStar == 0){
            x -= 0.03;
            for(let i = 0; i < 3; i++){
                var spriteStar = new cc.Sprite.create(res.imgStartLock_png);
                spriteStar.setPosition(
                cc.winSize.width * x, 
                cc.winSize.height * y
                );
                spriteStar.setScale(0.8);
                this.addChild(spriteStar);
                x += 0.032;
            }
        }else if(NumberStar <= 3 && NumberStar > 0){
            var count = NumberStar;
            x -= 0.03;
            for(let i = 0; i < 3; i++){
                var spriteStar = new cc.Sprite.create(res.imgStarLevel_png);
                var spriteStarLock = new cc.Sprite.create(res.imgStartLock_png);
                spriteStarLock.setPosition(
                    cc.winSize.width * x, 
                    cc.winSize.height * y
                    );
                spriteStar.setPosition(
                    cc.winSize.width * x, 
                    cc.winSize.height * y
                );
                spriteStar.setScale(0.8);
                spriteStarLock.setScale(0.8);
                if(count > 0){
                    this.addChild(spriteStar);
                }else if(count == 0){
                    this.addChild(spriteStarLock);
                }
                count--;
                x += 0.032;
            }
        }
        
    },

    //set Star
    setStar: function(level, levelUnlock, x, y){
        var numberStar = localStorage.getItem("Star" + level);
        if(level <= levelUnlock){
            if(numberStar == null){
                this.createStarLevel(x, y, 0);
            }else {
                this.createStarLevel(x, y, numberStar);
            }
        }else if(levelUnlock == null && level == 1){
            this.createStarLevel(x, y, 0);
        }
        
    },

    //check Lock Level
    checkLockLevel: function(level, levelUnlock,  x, y, btnLevel){
        var spriteLock = new cc.Sprite.create(res.imgLock_png);
        spriteLock.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        if(levelUnlock == null){
            if(level != 1){
                this.addChild(spriteLock, 1);
                btnLevel.setTouchEnabled(false);
            }
        }else if(level > levelUnlock){
            this.addChild(spriteLock, 1);
            btnLevel.setTouchEnabled(false);
        }
        
        
    },

    //Event Touch button level
    touchBtnLevel: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new PlayScene());
                cc.game.LEVEL = sender._NumberLevel; 
                break;
            default:
                break;
        }
    },

    // Create Label Level Number
    createLabel: function(level, x, y){
        var labelLevel = new cc.LabelTTF(
            "Level " + level, 
            'Consola', 30,
            cc.size(150, 0),
            cc.TEXT_ALIGNMENT_CENTER
        );
        labelLevel.setColor(cc.color.WHITE);
        labelLevel.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        this.addChild(labelLevel);
    },

    // Event Touch Exit Level
    touchExitLevel: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new MenuScene());
                break;
            default:
                break;
        }
    },

});

var LevelScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LevelLayer();
        this.addChild(layer);
    }
});

