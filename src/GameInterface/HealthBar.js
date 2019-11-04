projSUS.HealthBar = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.life_frame  = new cc.LayerColor(cc.color(255,255,255),32,4);
        this.addChild(this.life_frame);

        this.life_bar_bg = new cc.LayerColor(cc.color(130,50,50),30,2);
        this.life_bar_bg.setPosition(1,1);
        this.life_frame.addChild(this.life_bar_bg);

        this.life_bar = new cc.LayerColor(cc.color(255,0,0),30,2);
        this.life_bar.setPosition(1,1);
        this.life_bar.setAnchorPoint(0,0.5);
        this.life_frame.addChild(this.life_bar);
    },

    select: function () {
        this.life_frame.setColor(cc.color(0,0,255));
    },

    unselect: function () {
        this.life_frame.setColor(cc.color(255,255,255));
    },

    setLifePerc: function (perc) {
        if (perc > 1) perc = 1;
        this.life_bar.setScale(perc, 1);
    }

});