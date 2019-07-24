projectSUS.OptionsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new projectSUS.OptionsLayer();
        this.addChild(layer);
        layer.init();
    }
});

projectSUS.OptionsLayer = cc.Layer.extend({
    ctor: function (parent) {
        this._super();
        if (parent)
            parent.addChild(this);

        this.init();
    },


    init: function () {
        this.sound_lvl = 100;
        this.difficult = 0;
        this.selected_lang = 0;
        this.flags = [];
        this.labels = [];

        this.bg = new cc.LayerColor(cc.color(150,150,50));
        this.addChild(this.bg, -1);

        this.btn_close = pd.createSprite("btn_close.png", cc.p(615,335), this);

        this.labels.push(pd.label(this, "VOLUME : " + this.sound_lvl , 1, 1));
        this.labels.push(pd.label(this, "DIFFICULT", 1, 1));
        this.labels.push(pd.label(this, "LANGUAGE", 1, 1));

        this.labels[0].setPosition(320, 350);
        this.labels[0].setDimensions(640, 50);
        this.labels[0].setAnchorPoint(0.5, 1);
        this.labels[1].setPosition(320, 225);
        this.labels[1].setDimensions(640, 50);
        this.labels[1].setAnchorPoint(0.5, 1);
        this.labels[2].setPosition(320, 100);
        this.labels[2].setDimensions(640, 50);
        this.labels[2].setAnchorPoint(0.5, 1);

        this.vol_bar = pd.createSprite("vol_bar.png", cc.p(320,300), this);
        this.vol_bar.is_active = false;
        this.vol_btn = pd.createSprite("vol_btn.png", cc.p(0,12), this.vol_bar);

        this.flags.push(pd.createSprite("bandeira1.png", cc.p(200, 50), this));
        this.flags.push(pd.createSprite("bandeira2.png", cc.p(400,50), this));

        this.updateLanguage();
        this.changeVolume(cc.p(0,0));
        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projectSUS.input.addEventListener("onMouseUp", "onMouseUp", this, 1);
        projectSUS.input.addEventListener("onMouseMove", "onMouseMove", this, 1);
    },

    updateLanguage: function () {
        for (let i = 0; i < this.flags.length; i++) {
            this.flags[i].setColor(cc.color(70,70,70));
        }
        this.flags[this.selected_lang].setColor(cc.color(255,255,255));
    },

    changeVolume: function(pos) {
        let x = this.vol_bar.convertToNodeSpace(pos).x;
        let vol = Math.floor(100 * x / this.vol_bar.width);
        if (vol < 0){
            vol = 0;
        }
        else if (vol > 100) {
            vol = 100;
        }
        this.sound_lvl = vol;
        this.labels[0].setString("VOLUME: " + this.sound_lvl);
        this.vol_btn.x = (this.sound_lvl * this.vol_bar.width / 100);

    },

    onMouseDown: function (e) {
        let rect, rect2;
        for (let i = 0; i < this.flags.length; i++) {
            rect = this.flags[i].getBoundingBox();
            if (cc.rectContainsPoint(rect, e.getLocation())) {
                this.selected_lang = i;
                this.updateLanguage();
            }
        }

        rect = this.vol_bar.getBoundingBox();
        rect2 = this.vol_btn.getBoundingBoxToWorld();
        if (cc.rectContainsPoint(rect, e.getLocation()) || cc.rectContainsPoint(rect2, e.getLocation())) {
            this.vol_bar.is_active = true;
            this.changeVolume(e.getLocation());
        }
        else if (cc.rectContainsPoint(this.btn_close.getBoundingBox(), e.getLocation())) {
            this.runAction(cc.sequence(
                cc.fadeOut(0.3),
                cc.callFunc(function () {
                    this.getParent().resumeControl();
                    this.removeFromParent();
                }, this)
            ));

        }
    },

    onMouseUp: function (e) {
        this.vol_bar.is_active = false;

    },

    onMouseMove: function (e) {
        if (this.vol_bar.is_active) {
            this.changeVolume(e.getLocation());
        }
    }
});