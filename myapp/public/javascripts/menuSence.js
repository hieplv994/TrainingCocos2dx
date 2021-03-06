var menuLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init: function(){
        // set BackGroud
        var loadingSprite = new cc.Sprite.create(res.loading_png);
        loadingSprite.setPosition(
            cc.winSize.width * 0.5, 
            cc.winSize.height * 0.5
        );
        this.addChild(loadingSprite);

        // set title
        var titleHome = new cc.Sprite.create(res.titleHome_png);
        titleHome.setPosition(
            cc.winSize.width * 0.75, 
            cc.winSize.height * 0.75
        );
        titleHome.setRotation(30);
        this.addChild(titleHome);

        // Create button exit
        var btnExitHome = new ccui.Button();
        btnExitHome.loadTextures(res.btnExitHome_png);
        btnExitHome.setPosition(
            cc.winSize.width * 0.05, 
            cc.winSize.height * 0.85
        );
        btnExitHome.addTouchEventListener(this.touchEventExit, this);
        this.addChild(btnExitHome);

        // Create button Play
        var btnPlay = new ccui.Button();
        btnPlay.loadTextures(res.btnPlay_png);
        btnPlay.setPosition(
            cc.winSize.width * 0.85, 
            cc.winSize.height * 0.25
        );
        // btnPlay.addTouchEventListener(this.touchEventPlay, this);
        btnPlay.addTouchEventListener(commonInstance.gotoMenuLevel, this);
        this.addChild(btnPlay);

        // Create button on/off music backgroud
        var btnOnMusic = new cc.MenuItemImage(
            res.btnOnMusic_png, 
            this, null
        );
        var btnOffMusic = new cc.MenuItemImage(
            res.btnOffMusic_png, 
            this, null
        );
        var btnSetupMusic = new cc.MenuItemToggle(
            btnOnMusic,
            btnOffMusic, 
            this.onMusicControl, this
        );
        // check select
        var stateMusic = cc.game.MUSIC ? 0 : 1;
        btnSetupMusic.setSelectedIndex(stateMusic);
        // add to menu
        var menuMusic = new cc.Menu(btnSetupMusic);
        menuMusic.setPosition(
            cc.winSize.width * 0.08, 
            cc.winSize.height * 0.25
        );
        this.addChild(menuMusic);
        // Create button on/off sound in game
        var btnOnSound = new cc.MenuItemImage(
            res.btnOnSound_png,
            this, null
        );
        var btnOffSound = new cc.MenuItemImage(
            res.btnOffSound_png,
            this, null
        );
        var btnSetupSound = new cc.MenuItemToggle(
            btnOnSound,
            btnOffSound,
            this.onSoundControl, this
        );
        //check select
        var stateSound = cc.game.SOUND ? 0 : 1;
        btnSetupSound.setSelectedIndex(stateSound);
        //add button to menu
        var menuSound = new cc.Menu(btnSetupSound);
        menuSound.setPosition(
            cc.winSize.width * 0.2, 
            cc.winSize.height * 0.25
        );
        this.addChild(menuSound);

        //set music backgourd
        if(cc.game.MUSIC){
            cc.audioEngine.playMusic(res.bgHome_audio, true);
        }
    },

    //Controll Music backgroud
    onMusicControl: function(){
        cc.game.MUSIC = !cc.game.MUSIC;
       if(cc.game.MUSIC){
            cc.audioEngine.playMusic(res.bgHome_audio, true);
       }else{
            cc.audioEngine.stopMusic();
       }
    },

    //Controll Sound in game
    onSoundControl: function(){
        cc.game.SOUND = !cc.game.SOUND;
    },

    // Event click button Exit
    touchEventExit: function(sender, type){
        var popup = new popupExitLayer();
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                this.addChild(popup);
                break;
            default:
                break;
        }
    },

    //Event click button Play
    // touchEventPlay: function(sender, type){
    //     switch (type) {
    //         case ccui.Widget.TOUCH_BEGAN:
    //             clientInstance.gotoLevel();
    //             cc.director.runScene(new levelScene());
    //             break;
    //         default:
    //             break;
    //     }
    // }
    
});

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new menuLayer();
        this.addChild(layer);
    }
});