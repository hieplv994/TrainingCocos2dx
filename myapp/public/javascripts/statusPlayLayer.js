var StatusPlayLayerGlobal;
var statusPlayLayer = cc.Layer.extend({
    labelMouse: null,
    labelScore: null,
    labelTargetMouse: null,
    labelTargetCombo: null,
    labelTargetDiamond: null,
    mouseLife: 100,
    score: 0,
    levelUnlock: 1,

    ctor:function (objTarget) {
        this._super();
        this.init(objTarget);
        StatusPlayLayerGlobal = this;
    },

    init: function(objTarget){
         //create Button Back Level
         var btnBack = new ccui.Button();
         btnBack.loadTextures(res.btnExitLevel_png);
         btnBack.setPosition(
             cc.winSize.width * 0.9, 
             cc.winSize.height * 0.15
         );
         btnBack.addTouchEventListener(commonInstance.gotoMenuLevel, this);
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
        this.showLabel();
        this.showLabelTarget(objTarget);

        //add Sound
        if(cc.game.SOUND){
            cc.audioEngine.playMusic(res.bgPlay_auido, true);
        } else {
            cc.audioEngine.stopMusic();
        }

    },

    //Event Touch Back menu level
    // touchBack: function(sender, type){
    //     switch (type) {
    //         case ccui.Widget.TOUCH_BEGAN:
    //             clientInstance.gotoLevel();
    //             cc.director.runScene(new levelScene());
    //             break;
    //         default:
    //             break;
    //     }
    // },

    //Event Touch Pause Game
    touchPause: function(sender, type){
        cc.director.pause();
        this.addChild(new popupPauseLayer(), 2);
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
        return label;
    },

    //show Lable : life mouse, level, score, information target
    showLabel: function(){
        this.labelMouse = this.setLabel(this.mouseLife, 0.13, 0.82);
        this.addChild(this.labelMouse);
        var lebelLevel = this.setLabel(cc.game.LEVEL, 0.14, 0.74);
        this.addChild(lebelLevel);
        this.labelScore = this.setLabel(this.score, 0.14, 0.68);
        this.addChild(this.labelScore);
        
        //show label when hit combo
        this.labelComboShow = this.labelCombo();
        this.addChild(this.labelComboShow);
    },

    //Update label
    updateLabelMouseLife: function(mouseLife){
        this.labelMouse.setString(mouseLife);
        if(mouseLife == 0){
            cc.director.pause();
            this.addChild(new popupLoseLayer());
        }
    },
    //update Score
    updateLabelScore: function(score){
        this.score = score;
        this.labelScore.setString(this.score);
    },

    showLabelTarget: function(objTarget){
        // target information
        this.mouseLifeTarget = parseInt(objTarget.lifeMouse);
        this.labelTargetMouse = this.setLabel(this.mouseLifeTarget, 0.88, 0.82);
        this.addChild(this.labelTargetMouse, 0, "mouse");

        this.comboTarget = parseInt(objTarget.combo);
        this.labelTargetCombo = this.setLabel(this.comboTarget, 0.88, 0.755);
        this.addChild(this.labelTargetCombo);
    
        this.diamondTarget = parseInt(objTarget.diamond);
        this.checkDiamond = this.createNode(res.playCheck_png, 0.88, 0.68);
        this.checkDiamond.setScale(0.8);
        this.labelTargetDiamond = this.setLabel(this.diamondTarget, 0.88, 0.675);
        if(cc.game.LEVEL == 1){
            this.addChild(this.checkDiamond);
        }else {
            this.addChild(this.labelTargetDiamond);
        }
    },
    
    // update information target
    updateMouseTarget: function(mouseLife){
        if(mouseLife >= 0){
            this.labelTargetMouse.setString(mouseLife);
            if(mouseLife == 0){
                this.removeChild(this.labelTargetMouse, true);
                var check = this.createNode(res.playCheck_png, 0.88, 0.82);
                check.setScale(0.8);
                this.addChild(check);
                // this.winGame();
            }
        }
    },

    updateDiamondTarget: function(diamondTarget){
        if(diamondTarget >= 0){
            this.labelTargetDiamond.setString(diamondTarget);
            if(diamondTarget == 0 && cc.game.LEVEL != 1){
                this.removeChild(this.labelTargetDiamond, true);
                var check = this.createNode(res.playCheck_png, 0.88, 0.675);
                check.setScale(0.8);
                this.addChild(check);
                // this.winGame();
            }
        } 
    },

    updateComboTarget(comboTarget){
        //update combo on target information
        if(comboTarget >= 0){
            this.labelTargetCombo.setString(comboTarget);
            if(comboTarget == 0) {
                this.removeChild(this.labelTargetCombo, true);
                var check = this.createNode(res.playCheck_png, 0.88, 0.755);
                check.setScale(0.8);
                this.addChild(check);
                // this.winGame();
            }
        }
    },

    updateComboLabel: function(combo){
        if(combo != 0){
            this.labelComboShow.setString("COMBO x " + combo);
        }else{
            this.labelComboShow.setString("");
        }
    },

    labelCombo: function(){
        labelCombo = new cc.LabelTTF(
            "", 
            'Consola', 45,
            cc.size(300, 0),
            cc.TEXT_ALIGNMENT_CENTER
        );
        labelCombo.setColor(cc.color.BLUE);
        labelCombo.setPosition(
            cc.winSize.width * 0.72, 
            cc.winSize.height * 0.85
        );
        return labelCombo;
     
    },
    // if miss combo label combo hide
    delLabelCombo: function(){
        this.labelComboShow.setString("");
    }, 

    winGame: function(){
        // if(cc.game.LEVEL > 1){
        //     this.levelUnlock = localStorage.getItem("LevelUnLock");
        // }
        // this.setBestScore(cc.game.LEVEL);
        cc.director.pause();
        //send time play from client to server
        var objTimePlay = PlayLayerGlobal._time.countStar();
        clientInstance.sendTimePlay(objTimePlay);
        cc.game.LEVEL ++;
        // if(cc.game.LEVEL > this.levelUnlock){
        //     this.levelUnlock++;
        //     localStorage.setItem("LevelUnLock", this.levelUnlock);
        // }
    },

    //set best score
    // setBestScore: function(level){
    //     var bestScore = localStorage.getItem("BestScore" + level);
    //     if(bestScore == null){
    //         localStorage.setItem("BestScore" + level, this.score);
    //     }else if(bestScore <= this.score){
    //         localStorage.setItem("BestScore" + level, this.score);
    //     }else if(bestScore > this.score){
    //         localStorage.setItem("BestScore" + level, bestScore);
    //     }
    // }

});