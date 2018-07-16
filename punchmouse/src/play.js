var PlayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init: function(){
        //Add background
        var playBackGroundSprite = new cc.Sprite.create(res.playBackGround_png);
        playBackGroundSprite.setPosition(
            cc.winSize.width * 0.5, 
            cc.winSize.height * 0.5
        );
        this.addChild(playBackGroundSprite);

        //create Button Back Level
        var btnBack = new ccui.Button();
        btnBack.loadTextures(res.btnExitLevel_png);
        btnBack.setPosition(
            cc.winSize.width * 0.9, 
            cc.winSize.height * 0.15
        );
        btnBack.addTouchEventListener(this.touchBack, this);
        this.addChild(btnBack);

        //create Button Pause Game
        var btnPause = new ccui.Button();
        btnPause.loadTextures(res.playBtnPause_png);
        btnPause.setPosition(
            cc.winSize.width * 0.5, 
            cc.winSize.height * 0.85
        );
        btnPause.addTouchEventListener(this.touchPause, this);
        this.addChild(btnPause);

        // Create Node Mouse Numbers
        var nodeMouseLife = this.createNode(res.playMouseLife_png, 0.08, 0.83);
        this.addChild(nodeMouseLife);

        //Create Node Level
        var nodeLevel = this.createNode(res.playLevel_png, 0.09, 0.74);
        this.addChild(nodeLevel);

        //Create Node Score
        var nodeScore = this.createNode(res.playScore_png, 0.1, 0.68);
        this.addChild(nodeScore);

        //Create Node Information
        var nodeInfor = this.createNode(res.playInfor_png, 0.915, 0.75);
        this.addChild(nodeInfor);

        // show label Life mouse, level, Score, information target
        this.showLabel(cc.game.LEVEL);

        //set Hole
        this.setHole();

        //show target
        this.showTarget();

        //add Sound
        if(cc.game.SOUND){
            cc.audioEngine.playMusic(res.BGPlay_auido, true);
        } else {
            cc.audioEngine.stopMusic();
        }

    },

    //Event Touch Back
    touchBack: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new LevelScene());
                break;
            default:
                break;
        }
    },

    //Event Touch Pause Game
    touchPause: function(sender, type){
        this.addChild(new PopupPauseLayer());
    },

    // show target
    showTarget: function(){
        this.addChild(new PopUpTargetLayer());
    },

    //Create Node 
    createNode: function(src, x, y){
        var node =  new cc.Sprite.create(src);
        node.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        return node;
    }, 

    //set label
    setLabel: function(int, x, y){
        var label = new cc.LabelTTF(
            int.toString(), 
            'Consola', 30,
            cc.size(100, 0),
            cc.TEXT_ALIGNMENT_CENTER
        );
        label.setColor(cc.color.WHITE);
        label.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        this.addChild(label);
    },

    //show Lable : life mouse, level, score, information target
    showLabel: function(level){
        this.setLabel((cc.game.LIFEMOUSE * 10), 0.13, 0.82);
        this.setLabel(level, 0.14, 0.74);
        this.setLabel(0, 0.14, 0.68);
    },

    //set sprite
    setSprite: function(src, x, y){
        var sprite = new cc.Sprite.create(src);
        sprite.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        this.addChild(sprite);
    },

    //set hole and random mouse
    setHole: function(){
        var x = 0.3;
        var y = 0.635;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(i == 0 && j == 3){
                    break;
                }
                this.setSprite(res.playLandUp_png, x, y)
                this.setSprite(res.playLandDown_png, x, y)
                x += 0.2;
            }
            x -= 0.74;
            y -= 0.138;
        }
    },

    //Mouse, Old Animation
    setAnimation: function(src_png, src_plist, x, y, len, string){
        var sprite = cc.Sprite.create(src_png);
        sprite.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        this.addChild(sprite);

        cc.spriteFrameCache.addSpriteFrames(src_plist);
        var animFrames = [];
        var str = "";
        for (var i = 1; i < len; i++) {
            str = string + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.04);
        var animate   = cc.Animate.create(animation); 
        sprite.runAction(animate);
    },

});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});

