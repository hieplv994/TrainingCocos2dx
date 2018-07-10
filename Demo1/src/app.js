
var ButtondLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        this.initLayer();
    },

    initLayer: function(){
         // Set Button A
        var buttonA = this.setButton(buttonA , 0.35, 0.5);
        this.addChild(buttonA, 0);
        // Set label Button A
        var labelBMFontA =  new ccui.TextBMFont();
        labelBMFontA = this.setLabel("ButtonA", 0.35, 0.7);
        this.addChild(labelBMFontA, 1);
        // Set Button B
        var buttonB = this.setButton(buttonB , 0.75, 0.5);
        this.addChild(buttonB, 0);
        // Set label Button B
        var labelBMFontB = new ccui.TextBMFont();
        labelBMFontB = this.setLabel("ButtonB", 0.75, 0.7);
        this.addChild(labelBMFontB, 1);
    },

    setLabel: function(string, x, y){
        // var labelBMFont = new ccui.TextBMFont();
        // labelBMFont.setFntFile(res.LabelBMFont_png);
        // labelBMFont.setString(string);
        // labelBMFont.setPosition(cc.p(x, y));
        // labelBMFont.setScale(0.5);
        // labelBMFont.setColor(cc.color.WHITE);
        // return labelBMFont;
        var label = new cc.LabelTTF(string, 'Consola', '30'); //(string, font, font size)
        label.setColor(cc.color.WHITE);
        label.setPosition(cc.winSize.width * x, cc.winSize.height * y);
        return label;
    },

    setButton: function(button, x, y){
        var button = new ccui.Button();
        button.loadTextures(res.ButtonNomarl_png, res.ButtonPress_png);
        button.setPosition(cc.winSize.width * x, cc.winSize.height * y);
        button.addTouchEventListener(this.touchEvent, this);     
        return button;
    },

    touchEvent: function(sender, type){
        var popup = new PopUpLayer();
        // sender.getParent() =  this
        // sender.getParent().addChild(popup, 3); 
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("Click Event app");
                this.addChild(popup, 3);
                break;
            default:
                break;
        }
    }

});

var ButtonScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ButtondLayer();
        this.addChild(layer);
    }
});

