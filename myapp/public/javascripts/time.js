var Timelayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    
    init: function () {
        this.timePlay = 150;
        this.timeCurrent = this.timePlay;
    
        this.scheduleUpdate();0
    },

    update: function (dt) {
        this.timePlay -= dt;
        if(this.timePlay <= 0)
        {
            cc.director.pause();
            this.addChild(new PopUpLoseLayer());
        }
    },

    countStar: function () {
        var timeSub = this.timeCurrent - this.timePlay;
        var objTime = {
            ts: timeSub,
            tc: this.timeCurrent
        };
        return objTime;
        // localStorage.setItem("Star-Lv" + cc.game.LEVEL, this.star);
    }
});