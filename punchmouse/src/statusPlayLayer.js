var levelUnlock = 1;
var StatusPlayLayerGlobal = null;
var StatusPlayLayer = cc.Layer.extend({
    labelMouse: null,
    labelScore: null,
    labelTargetMouse: null,
    labelTargetCombo: null,
    labelTargetDiamond: null,
    mouseLife: 100,
    score: 0,
    combo: 0,

    ctor:function () {
        this._super();
        this.init();
        StatusPlayLayerGlobal = this;
    },

    init: function(){
 
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
        this.showLabel();

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
        this.addChild(new PopupPauseLayer(), 2);
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
        // target information
        this.mouseLifeTarget = cc.game.LIFEMOUSE + cc.game.LEVEL - 1;
        this.labelTargetMouse = this.setLabel(this.mouseLifeTarget, 0.88, 0.82);
        this.addChild(this.labelTargetMouse, 0, "mouse");

        this.comboTarget = cc.game.COMBO + cc.game.LEVEL - 1;
        this.labelTargetCombo = this.setLabel(this.comboTarget, 0.88, 0.755);
        this.addChild(this.labelTargetCombo);
    
        this.diamondTarget = cc.game.DIAMOND + cc.game.LEVEL - 1;
        this.checkDiamond = this.createNode(res.playCheck_png, 0.88, 0.68);
        this.checkDiamond.setScale(0.8);
        this.labelTargetDiamond = this.setLabel(this.diamondTarget, 0.88, 0.675);
        if(cc.game.LEVEL == 1){
            this.addChild(this.checkDiamond);
        }else {
            this.addChild(this.labelTargetDiamond);
        }
        
        //show label when hit combo
        this.labelComboShow = this.labelCombo();
        this.addChild(this.labelComboShow);
    },

    //Update label
    updateLabelMouseLife: function(){
        this.mouseLife --;
        this.labelMouse.setString(this.mouseLife);
    },
    //update Score
    updateLabelScore: function(type){
        if(type == "Mouse"){
            this.score = this.score + 20;
        }else if(type == "Old"){
            this.score = this.score - 15;
        }else if(type == "Diamond"){
            this.score = this.score + 35;
        }
        this.labelScore.setString(this.score);
    },
    
    // update information target
    updateMouseTarget: function(){
        this.mouseLifeTarget --;
        if(this.mouseLifeTarget != 0){
            this.labelTargetMouse.setString(this.mouseLifeTarget);
        }else{
            this.removeChild(this.labelTargetMouse, true);
            var check = this.createNode(res.playCheck_png, 0.88, 0.82);
            check.setScale(0.8);
            this.addChild(check);
            this.winGame();
        }
    },

    updateDiamondTarget: function(){
        if(this.diamondTarget > 0){
            this.diamondTarget --;
            this.labelTargetDiamond.setString(this.diamondTarget);
            if(this.diamondTarget == 0){
                this.removeChild(this.labelTargetDiamond, true);
                var check = this.createNode(res.playCheck_png, 0.88, 0.675);
                check.setScale(0.8);
                this.addChild(check);
                this.winGame();
            }
        } 
    },

    updateLabelCombo(){
        this.combo ++;
        if(this.combo > 1){
            var realCombo = this.combo - 1;
            this.labelComboShow.setString("COMBO x " + realCombo);
            //update combo on target information
            if(this.comboTarget > 0){
                debugger
                this.comboTarget --;
                this.labelTargetCombo.setString(this.comboTarget);
                if(this.comboTarget == 0) {
                    this.removeChild(this.labelTargetCombo, true);
                    var check = this.createNode(res.playCheck_png, 0.88, 0.755);
                    check.setScale(0.8);
                    this.addChild(check);
                    this.winGame();
                }
            }
        }
    },

    labelCombo: function(){
        labelCombo  = new cc.LabelTTF(
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

    missCombo: function(){
        this.labelComboShow.setString("");
        return this.combo = 0;
    }, 

    winGame: function(){
        if(this.mouseLifeTarget == 0){
            if(this.comboTarget == 0 && this.diamondTarget == 0){
                this.setBestScore(cc.game.LEVEL);
                cc.director.pause();
                PlayLayerGlobal._time.countStar();
                cc.game.LEVEL ++;
                if(cc.game.LEVEL > levelUnlock){
                    levelUnlock++;
                    localStorage.setItem(
                        "LevelUnLock",
                        levelUnlock
                    );
                }
                this.addChild(new PopUpWinLayer());
            }
        }
    },

    //set bset score
    setBestScore: function(level){
        var bestScore = localStorage.getItem("BestScore" + level);
        if(bestScore == null){
            localStorage.setItem("BestScore" + level, this.score);
        }else if(bestScore <= this.score){
            localStorage.setItem("BestScore" + level, this.score);
        }else if(bestScore > this.score){
            localStorage.setItem("BestScore" + level, bestScore);
        }
    }

});