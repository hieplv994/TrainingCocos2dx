var PopupTargetLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
        this.blockTouch();
    },

    init: function(){
        //create layer black when popup open
        var colorLayer = new cc.LayerColor(cc.color(0, 0, 0, 180));
        colorLayer.ignoreAnchorPointForPosition(false);// set anchor poit will be (0, 0)
        colorLayer.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(colorLayer);

        //add background
        var sprite = new cc.Sprite.create(res.PopUpTarget_png);
        sprite.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(sprite);

        //set Button OK
        var btnPlay = createButton(res.btnOK_png, 0.34, 0.24);
        btnPlay.addTouchEventListener(this.touchEventOK, this);
        this.addChild(btnPlay);

        //set Button Back
        var btnBack = createButton(res.btnBack_png, 0.55, 0.24);
        btnBack.addTouchEventListener(this.touchEventBack, this);
        this.addChild(btnBack);

        //set Label Target
        
    },

    //craete Button
    createButton: function(src, x, y){
        var btn = new ccui.Button();
        btn.loadTextures(src);
        btn.setPosition(
            cc.winSize.width * x, 
            cc.winSize.height * y
        );
        return btn;
    },

    //Event Button Play
    touchEventOK: function(sender, type){

    },

    //Envet Button Back
    touchEventBack: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.runScene(new LevelScene());
                break;
            default:
                break;
        }
    },


    //block touch
    blockTouch: function(){
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan:function(touch, event)
            {
                return true;
            }
        }, this);
    }
});

