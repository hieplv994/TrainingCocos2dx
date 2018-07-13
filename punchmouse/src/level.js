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
        var level = 1;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 5; j++){
                this.createButtonLevel(x, y);
                this.createLabel(level, x, y - 0.11);
                this.setStarLockLevel(x, y, this.ckeckLockLevel(level, x, y, true));
                if(j == 4){
                    x = 0.15;
                }else{
                    x += 0.165;
                    level++;
                }
            }
            y -= 0.22
            level++;
        }

    },

    //Create Button Level
    createButtonLevel: function(x, y, locklevel, level){
        var btnLevel = new ccui.Button();
        btnLevel.loadTextures(res.btnLevel_png);
        btnLevel.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        btnLevel.addTouchEventListener(this.touchBtnLevel(), this);
        this.addChild(btnLevel);
        if(locklevel){
            btnLevel.setEnabled(false);
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

    //check Lock Level
    ckeckLockLevel: function(level, x, y, checkLock){
        if(level != 1){
            var spriteLockLevel = new cc.Sprite.create(res.imgLock_png);
            spriteLockLevel.setPosition(
                cc.winSize.width * x, 
                cc.winSize.height * y
            );
            if(checkLock){      
                this.addChild(spriteLockLevel);
                return true
            }
            return false;
        }
    },

    //Set StarLock level
    setStarLockLevel: function(x , y, checkLockLevel){
        x -= 0.03;
        for(let i = 0; i < 3; i++){
            var spriteStarLock = new cc.Sprite.create(res.imgStartLock_png);
            spriteStarLock.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
            );
            spriteStarLock.setScale(0.8);
            x += 0.032;
            if(!checkLockLevel){
                this.addChild(spriteStarLock);
            }
        }
    },

    //Set Star Level
    setStarLevel: function(x, y, StarNumber){
        x -= 0.03;
        for(let i = 0; i < StarNumber; i++){
            var spriteStar = new cc.Sprite.create(res.imgStarLevel_png);
            spriteStarLock.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
            );
            spriteStarLock.setScale(0.8);
            x += 0.032;
        }
    },

    //Event Touch button level
    touchBtnLevel: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new PlayScene());
                break;
            default:
                break;
        }
    },

    // Event Touch Exit Level
    touchExitLevel: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new ManuScene());
                break;
            default:
                break;
        }
    }
});

var LevelScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LevelLayer();
        this.addChild(layer);
    }
});