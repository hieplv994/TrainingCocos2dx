
var StatusPlayLayer = cc.Layer.extend({
    labelMouse: null,
    labelScore: null,
    labelTargetMouse: null,
    labelTargetCombo: null,
    labelTargetDiamond: null,
    mouseLife: 100,
    score: 0,
    ctor:function () {
        this._super();
        this.init();
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
        //code here information target count down
    },

    //Update label
    updateLabelMouseLife: function(){
        this.mouseLife = this.mouseLife - 1;
        this.labelMouse.setString(this.mouseLife);
    },

    updateLabelScore: function(){

    }

});