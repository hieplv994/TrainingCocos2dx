//---------------------- Background Layer ----------------------
//--------------------------------------------------------------
var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._landframes = [];
        this.init();
    },

    init: function(){
        //Add background
        var playBackGroundSprite = new cc.Sprite.create(res.playBackGround_png);
        playBackGroundSprite.setPosition(
             cc.winSize.width * 0.5, 
             cc.winSize.height * 0.5
         );
        this.addChild(playBackGroundSprite, 0);
        this.setHole();
    },

    //set hole
    setHole: function(){
        var x = 0.3;
        var y = 0.635;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(i == 0 && j == 3){
                    break;
                }
                var spriteUp = new HoleSprite(res.playLandUp_png);
                spriteUp.setPosition(
                    cc.winSize.width * x, 
                    cc.winSize.height * y
                );
                this.addChild(spriteUp, 1);
                var spriteDown = new HoleSprite(res.playLandDown_png);
                spriteDown.setPosition(
                    cc.winSize.width * x, 
                    cc.winSize.height * y
                );
                this.addChild(spriteDown, 3);
                this._landframes.push(spriteDown);
                x += 0.2;
            }
            x -= 0.74;
            y -= 0.138;
        }
        delayMouse = cc.DelayTime.create(3);
        if(cc.game.LEVEL < 2){
            this.updateAction("Mouse");
            // this.updateAction("Diamond");
            // this.updateAction("Old");
            // this.updateAction("Boom");
        } else if(cc.game.LEVEL > 1 && cc.game.LEVEL < 5){
            this.updateAction("Mouse");
            this.updateAction("Diamond");
        }else if(cc.game.LEVEL > 4 && cc.game.LEVEL < 8){
            this.updateAction("Mouse");
            this.updateAction("Diamond");
            this.updateAction("Old");
        }else if(cc.game.LEVEL > 7){
            this.updateAction("Mouse");
            this.updateAction("Diamond");
            this.updateAction("Old");
            this.updateAction("Boom");
        }
    },

    actionMouse: function(dt){
        let index = Math.floor((Math.random() * 15));
        if(!this._landframes[index]._checkFill){
            this._landframes[index].mouseAction();
        }
    },

    actionOld: function(dt){
        let index = Math.floor((Math.random() * 15));
        if(!this._landframes[index]._checkFill){
            this._landframes[index].oldAction();
        }
    },

    actionBoom: function(dt){
        let index = Math.floor((Math.random() * 15));
        if(!this._landframes[index]._checkFill){
            this._landframes[index].boomAction();
        }
    },

    actionDiamond: function(dt){
        let index = Math.floor((Math.random() * 15));
        if(!this._landframes[index]._checkFill){
            this._landframes[index].diamondAction();
        }
    },

    updateAction: function(type){
        var func  = null;
        var speed = 0 ;
        if(type == "Mouse"){
            func = this.actionMouse;
            speed = 2;
        } else if(type == "Old"){
            func = this.actionOld;
            speed = 3;
        }else if(type == "Diamond"){
            func = this.actionDiamond;
            speed = 4;
        }else if(type == "Boom"){
            func = this.actionBoom;
            speed = 3.5;
        }
        this.schedule(
            func, 
            speed - cc.game.LEVEL * 0.1,
            cc.REPEAT_FOREVER, 0, ""
        );
    },

});

//--------------------- Hole Sprite -------------------------
//-----------------------------------------------------------

var HoleSprite = cc.Sprite.extend({
    ctor: function (spriteSrc) {
        this._super(spriteSrc);
        this._checkFill = false;
        this._checkTouch = false;
        this.init();
    },
    init: function(){
        //Event Touch
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                // When "swallow touches" is true, then returning 'true' from the 
                // onTouchBegan method will "swallow" the touch event, preventing 
                //other listeners from using it.
                var target = event.getCurrentTarget();

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    if(target.getParent()._checkTouch == false)
                    {
                        return true;
                    }
                }
                return false;
            },

            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                var parent = target.getParent();
                // event click hit mouse 
                parent._checkFill = false;
                if(target == parent.spriteMouse){
                    parent._checkTouch = true;
                    parent.hitMouse();
                    //stop all action of sprite mouse
                    parent.spriteMouse.stopAllActions();
                    // sequence action hit
                    parent.spriteMouse.runAction(cc.sequence(
                        parent.hitMouseAnimate,
                        cc.removeSelf(),
                        cc.callFunc(function(){
                            PlayLayerGlobal._status.updateLabelCombo();
                            cc.DelayTime.create(1); // after 1s check Touch -> true for everything don'n up in the hole
                            parent._checkTouch = false;
                            // PlayLayerGlobal._status.updateComboTarget();
                        }, this)
                    ));
                    if(cc.game.SOUND)
                    {
                        cc.audioEngine.playEffect(res.Audio_HitMouse_mp3);
                    }
                }else // event click hit old 
                if(target == parent.spriteOld){
                    parent._checkTouch = true;
                    parent.hitOld();
                    parent.spriteOld.stopAllActions();
                    parent.spriteOld.runAction(cc.sequence(
                        parent.hitOldAnimate,
                        cc.removeSelf(),
                        cc.callFunc(function(){
                            cc.DelayTime.create(1); // after 1s check Touch -> true for everything don'n up in the hole
                            parent._checkTouch = false;
                        }, parent), 
                    ));
                    if(cc.game.SOUND)
                    {
                        cc.audioEngine.playEffect(res.Audio_Old_mp3);
                    }
                    // disable event
                    parent.listener.setEnabled(false);

                }else// event click hit boom
                if(target == parent.spriteBoom){
                    parent._checkTouch = true;
                    parent.hitBoom();
                    cc.audioEngine.stopMusic();
                    cc.audioEngine.stopAllEffects();
                    if(cc.game.SOUND)
                    {
                        cc.audioEngine.playEffect(res.Audio_Boom_wav);
                    }
                    parent.listener.setEnabled(false);
                }else // event hit diamond
                if(target == parent.spriteDiamond){
                    parent._checkTouch = true;
                    parent.hitDiamond();
                    parent.spriteDiamond.stopAllActions();
                    parent.spriteDiamond.runAction(cc.sequence(
                        cc.removeSelf(), 
                        cc.callFunc(function(){
                            cc.DelayTime.create(1); // after 1s check Touch -> true for everything don'n up in the hole
                            parent._checkTouch = false;
                        }, parent)
                    ));
                    if(cc.game.SOUND)
                    {
                        cc.audioEngine.playEffect(res.Audio_Diamond_mp3);
                    }
                    //create effect ParticleFlower
                    var particle = parent.hitDiamondEffect();
                    parent.addChild(particle, 10);
                    parent.listener.setEnabled(false);
                }
            }
        });
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

    //set Time Delay
    timeDelay: function(){
        var time = 0;
        if(cc.game.LEVEL != 0){
            time = cc.DelayTime.create(3.5 - (0.08 * cc.game.LEVEL));
        }
        return time;
    },

    mouseAction: function(){
        this._checkFill = true;
        // create sprite Mouse
        cc.spriteFrameCache.addSpriteFrames(res.mouseAnimation_plist);
        this.spriteMouse = this.createSprite(
            "#Mouse1", 
            0.075, 
            0.1
        );
        this.addChild(this.spriteMouse, 2);
        //mouse up animate
        var mouseUp = this.setAnimation(1, 4, "Mouse");
        //mouse down animate
        var mouseDown = this.setAnimation(7, 8, "Mouse");
        //set sound
        if(cc.game.SOUND){
            cc.audioEngine.playEffect(res.Audio_MousePeek);
        }
        this.spriteMouse.runAction(cc.sequence(
            mouseUp, 
            this.timeDelay(), 
            mouseDown,
            cc.removeSelf(),
            cc.callFunc(function(){
                    this._checkFill = false;
                    PlayLayerGlobal._status.updateLabelMouseLife();
                    PlayLayerGlobal._status.missCombo();
                }, this), 
        ));
        // hit mouse animate
        this.hitMouseAnimate = this.setAnimation(4, 6, "Mouse");
        cc.eventManager.addListener(
            this.listener.clone(),
            this.spriteMouse
        );
    },

    hitMouse: function(){
        PlayLayerGlobal._status.updateLabelScore("Mouse");
        PlayLayerGlobal._status.updateMouseTarget();
    },

    oldAction: function(){
        this._checkFill = true;
        // create sprite Old
        cc.spriteFrameCache.addSpriteFrames(res.oldAnimation_plist);
        this.spriteOld = this.createSprite(
            "#Old1", 
            0.07, 
            0.11
        );
        this.addChild(this.spriteOld, 2);
        //Old up animate
        var oldUp = this.setAnimation(1, 4, "Old");
        //Old down animate
        var oldDown = this.setAnimation(7, 8, "Old");
        this.spriteOld.runAction(cc.sequence(
            oldUp, 
            this.timeDelay(), 
            oldDown,
            cc.removeSelf(),
            cc.callFunc(function(){
                    this._checkFill = false;
                    PlayLayerGlobal._status.updateLabelMouseLife();
                }, this), 
        ));
        // hit Old animate
        this.hitOldAnimate = this.setAnimation(4, 6, "Old");
        cc.eventManager.addListener(
            this.listener.clone(),
            this.spriteOld
        );
    },

    hitOld: function(){
        PlayLayerGlobal._status.updateLabelScore("Old");
    },

    boomAction: function(){
        this._checkFill = true;
        // create sprite Boom
        this.spriteBoom = this.createSprite(
            res.playBoom_png, 
            0.1, 
            0.09
        );
        this.addChild(this.spriteBoom, 2);
        this.spriteBoom.runAction(cc.sequence( 
            this.timeDelay(), 
            cc.removeSelf(),
            cc.callFunc(function(){
                this._checkFill = false;
            }, this),
        ));
        cc.eventManager.addListener(
            this.listener.clone(),
            this.spriteBoom
        );
    },

    hitBoom: function(){
        cc.director.pause();
        PlayLayerGlobal.addChild(new PopUpLoseLayer(), 7);
    },

    diamondAction: function(){
        this._checkFill = true;
        // create sprite Boom
        this.spriteDiamond = this.createSprite(
            res.playDiamond_png, 
            0.074, 
            0.08
        );
        this.addChild(this.spriteDiamond, 2);
        this.spriteDiamond.runAction(cc.sequence( 
            this.timeDelay(), 
            cc.removeSelf(),
            cc.callFunc(function(){
                this._checkFill = false;
            }, this),
        ));
        cc.eventManager.addListener(
            this.listener.clone(),
            this.spriteDiamond
        );
    },

    hitDiamond: function(){
        PlayLayerGlobal._status.updateLabelScore("Diamond");
        PlayLayerGlobal._status.updateDiamondTarget();
    },

    hitDiamondEffect: function(){
        var particle = new cc.ParticleFlower();
        // this.addChild(particle, 10);
        particle.texture = cc.textureCache.addImage(res.star_png);
        particle.setDuration(1);
        particle.setSpeed(100);
        particle.setPosition(cc.winSize.width *0.08, cc.winSize.height * 0.1);
        return particle;
    }

});