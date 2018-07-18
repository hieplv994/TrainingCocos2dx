var arrLocation = [];
var countMouseDown = 0;

var BackgroundLayer = cc.Layer.extend({
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
        this.addChild(playBackGroundSprite, 0);
        this.setHole();
        this.updateActionGame();
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
                this.addChild(spriteUp, 1);
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
            var timeDaley = cc.DelayTime.create(3 * (1/level));
            return timeDaley;
        }
        return 0;
    },

    //set Action mouse, old
    setAction: function(src_png, name, startUp, endUp, 
        startDown, endDown ,level){
        var rd = Math.floor((Math.random() * 15));
        rd = this.checkFillHole(rd);
        var sprite = this.createSprite(
            src_png,
            arrLocation[rd].width - 0.005,
            arrLocation[rd].height + 0.05
        );
        arrLocation[rd].checkFill = true;
        this.addChild(sprite, 1);
        var timeDelay = this.setTimeActionForLevel(level);
        if(name == "Mouse" || name == "Old"){
            // set animate up
            var upAnimate = this.setAnimation(
                startUp, endUp, name
            ); 
            // set animate down
            var downAnimate = this.setAnimation(
                startDown, endDown, name
            );
            // set delay time 
            sprite.runAction(cc.sequence(
                upAnimate, 
                timeDelay, 
                downAnimate,
                cc.removeSelf(),
                cc.callFunc(function(){
                        arrLocation[rd].checkFill = false;
                        PlayLayerGlobal._status.updateLabelMouseLife();
                    }, this), 
            ));
        }else{
            sprite.runAction(cc.sequence(
                timeDelay,
                cc.removeSelf()
            ));
        }
        
    },

    //check fill hole
    checkFillHole: function(random){
        var index = 0;
        if(arrLocation[random].checkFill){
            index = Math.floor((Math.random() * 15));
            while(arrLocation[index].checkFill){
                index = Math.floor((Math.random() * 15));
                if(index != random)
                    break;
            }
        }else {
            index = random;
        }
        return index;
    },

    //action game
    actionGame: function(dt){
        //mouse action
        this.setAction(
            "#Mouse1",
            "Mouse",
            1, 4, 7, 8,
            cc.game.LEVEL
        );
        //diamond action
        // if(cc.game.LEVEL > 1){
        this.setAction(
            res.playDiamond_png,
            "Diamond",
        );
        // }
        
        if(cc.game.LEVEL > 3){
            this.setAction(
                res.oldAnimation_png,
                "Old",
                1, 4, 7, 8,
                cc.game.LEVEL
            ); 
        }
    },

    //Update action
    updateActionGame: function(){
        this.schedule(this.actionGame, 
            2/cc.game.LEVEL,
            cc.REPEAT_FOREVER, 0, ""
        );
    }, 

    //
});

