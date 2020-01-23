projSUS.SettingsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.SettingsLayer();
        this.addChild(this.layer);
        this.layer.init();
    }
});

projSUS.SettingsLayer = cc.Layer.extend({
    ctor: function (parent) {
        this._super();
        if (parent)
            parent.addChild(this);

        this.init();
    },

    init: function () {
        this.sound_lvl     = projSUS.gameConfig.volume;
        this.selected_lang = projSUS.gameConfig.language;
        this.flags  = [];
        this.labels = [];
        this.labels_txt = [];

        this.bg = new cc.LayerColor(cc.color(150,150,50));
        this.addChild(this.bg, -1);

        this.btn_close = pd.createSprite("btn_close.png", cc.p(615,335), this);

        this.labels_pos = [
            cc.p(320, 350), cc.p(320,280),
            cc.p(160, 150), cc.p(160, 110),
            cc.p(160, 70),  cc.p(160, 30),
            cc.p(460, 150), cc.p(460, 110),
            cc.p(460, 70),  cc.p(460, 30)
        ];

        for (var i = 0; i < 10; i++) {
            var label = pd.labelBM(this, "","","",0);
            label.setScale(1);
            label.setPosition(this.labels_pos[i]);
            label.setAnchorPoint(1,0.5);
            this.labels.push(label);
        }
        this.labels[0].setAnchorPoint(0.5,0.5);
        this.labels[1].setAnchorPoint(0.5,0.5);

        for (var i = 0; i < 4; i++) {
            pd.createSprite("btn_padrao.png", cc.p(190, 150 - (40 * i)), this);
            pd.createSprite("btn_padrao.png", cc.p(240, 150 - (40 * i)), this);
            pd.createSprite("btn_padrao.png", cc.p(500, 150 - (40 * i)), this);
            pd.createSprite("btn_padrao.png", cc.p(550, 150 - (40 * i)), this);
        }

        this.vol_bar = pd.createSprite("vol_bar.png", cc.p(320,320), this);
        this.vol_bar.is_active = false;
        this.vol_btn = pd.createSprite("vol_btn.png", cc.p(0,12), this.vol_bar);

        this.flags.push(pd.createSprite("bandeira1.png", cc.p(200,230), this));
        this.flags.push(pd.createSprite("bandeira2.png", cc.p(400,230), this));

        this.updateLanguage();
        // this.changeVolume(cc.p(0,0));

        projSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projSUS.input.addEventListener("onMouseUp",   "onMouseUp",   this, 1);
        projSUS.input.addEventListener("onMouseMove", "onMouseMove", this, 1);
    },

    updateLanguage: function () {
        for (var i = 0; i < this.flags.length; i++) {
            this.flags[i].setColor(cc.color(70,70,70));
        }
        this.flags[this.selected_lang].setColor(cc.color(255,255,255));
        this.updateLabels();
    },

    updateLabels: function () {
        this.labels_txt = [
            (this.selected_lang == 0) ? "VOLUME"   : "VOLUME",
            (this.selected_lang == 0) ? "IDIOMA"   : "LANGUAGE",
            (this.selected_lang == 0) ? "CIMA"     : "UP",
            (this.selected_lang == 0) ? "BAIXO"    : "DOWN",
            (this.selected_lang == 0) ? "ESQUERDA" : "LEFT",
            (this.selected_lang == 0) ? "DIREITA"  : "RIGHT",
            (this.selected_lang == 0) ? "MAGIA 1"  : "SPELL 1",
            (this.selected_lang == 0) ? "MAGIA 2"  : "SPELL 2",
            (this.selected_lang == 0) ? "MAGIA 3"  : "SPELL 3",
            (this.selected_lang == 0) ? "MAGIA 4"  : "SPELL 4",
        ];

        for (var i = 0; i < this.labels_txt.length; i++) {
            this.labels[i].setString(this.labels_txt[i], true);
        }
    },

    changeVolume: function(pos) {
        var x = this.vol_bar.convertToNodeSpace(pos).x;
        var vol = Math.floor(100 * x / this.vol_bar.width);
        if (vol < 0){
            vol = 0;
        }
        else if (vol > 100) {
            vol = 100;
        }
        this.sound_lvl = vol;
        this.labels[0].setString(this.labels_txt[0]+ ": " + this.sound_lvl, true);
        this.vol_btn.x = (this.sound_lvl * this.vol_bar.width / 100);

    },

    onMouseDown: function (e) {
        var rect, rect2;
        for (var i = 0; i < this.flags.length; i++) {
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