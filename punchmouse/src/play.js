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
        this.addChild(btnBack);
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

        //show target
        this.showTarget();

        //add Sound
        if(cc.game.SOUND){
            cc.audioEngine.playMusic(res.BGPlay_auido, true);
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
    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});

