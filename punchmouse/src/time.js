var Timelayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    
    init: function () {
        this.timePlay = 150;
        this.timeCurrent = this.timePlay;
        this.scheduleUpdate();
    },

    update: function (dt) {
        this.timePlay -= dt;
        if(this.timePlay <=0)
        {
            cc.director.pause();
            this.addChild(new PopUpLoseLayer());
        }
    },

    countStar: function () {
        var timeSub = this.timeCurrent - this.timePlay;
        if(timeSub <= (1/3)*this.timeCurrent)
        {
            localStorage.setItem("Star" + cc.game.LEVEL, 3);
        }
        else if(timeSub > (1/3)*this.timeCurrent && timeSub <= (2/3)*this.timeCurrent)
        {
            localStorage.setItem("Star" + cc.game.LEVEL, 2);
        }
        else if(timeSub> (2/3)* this.timeCurrent)
        {
            localStorage.setItem("Star"+ cc.game.LEVEL, 1);
        }
        else if(timeSub = this.timeCurrent){
            localStorage.setItem("Star"+ cc.game.LEVEL, 0);
        }
    }
});