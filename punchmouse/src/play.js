var arrLocation = [];

var PlayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init: function(){
        cc.director.resume();
        //add Sprite frame cache
        cc.spriteFrameCache.addSpriteFrames(res.mouseAnimation_plist);
        cc.spriteFrameCache.addSpriteFrames(res.oldAnimation_plist);

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
        this.addChild(btnBack, 1);

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
        
        //action mouse
        this.setAction(
            "#Mouse1.png", 
            "Mouse", 1, 4, 7, 8, 
            cc.game.LEVEL
        );

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
        cc.director.pause();
        this.addChild(new PopupPauseLayer(), 3);
    },

    // show target
    showTarget: function(){
        cc.director.pause();
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
        //code here information target count down
    },

    //set hole
    setHole: function(){
        var x = 0.3;
        var y = 0.635;
        var hole = 1;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(i == 0 && j == 3){
                    break;
                }
                var spriteUp = this.createSprite(res.playLandUp_png, x, y);
                this.addChild(spriteUp);
                var spriteDown = this.createSprite(res.playLandDown_png, x, y);
                this.addChild(spriteDown, 2);
                arrLocation.push({
                    hole: hole,
                    width: x,
                    height: y,
                    checkFill: false
                });
                x += 0.2;
                hole ++;
            }
            x -= 0.74;
            y -= 0.138;
        }
    },
    //create sprite for mouse and old
    createSprite: function(src_png, x, y){
        var sprite = cc.Sprite.create(src_png);
        sprite.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        return sprite;
    },

    //Mouse, Old Animation
    setAnimation: function(start, end, string){
        var animFrames = [];
        var str = "";
        for (var i = start; i < end; i++) {
            str = string + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.08);
        var animate   = cc.Animate.create(animation); 
        return animate;
    },

    //set time Mouse from up to down for level
    setTimeActionForLevel: function(level){
        if(level != 0){
            var timeDaley = cc.DelayTime.create(3.5 * (1/level));
            return timeDaley;
        }
        return 0;
    },

    //set Action mouse, old
    setAction: function(src_png, name, startUp, endUp, 
        startDown, endDown ,level){
        var rd = Math.floor((Math.random() * 15));
        var sprite = this.createSprite(
            src_png,
            arrLocation[rd].width - 0.005,
            arrLocation[rd].height + 0.05
        );
        this.addChild(sprite, 1);
        // set animate mouse up
        var upAnimate = this.setAnimation(
            startUp, endUp, name
        ); 
        // set animate mouse down
        var downAnimate = this.setAnimation(
            startDown, endDown, name
        );
        // set delay time 
        var timeDelay = this.setTimeActionForLevel(level);
        sprite.runAction(cc.sequence(
            upAnimate, 
            timeDelay, 
            downAnimate,
            cc.removeSelf(),
        ));

    },

});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
        // layer.showTarget();
    }
});

