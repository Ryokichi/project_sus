projSUS.Spell = cc.Node.extend({
    ctor: function() {
        this._super();
        this.status={
            "ready": 0,
            "onCast": 1,
            "onCD": 2
        };


        this.id = null;
        this.name = "";
        this.description = "";
        this.sprite_name = "mock_sprite.png";
        this.curr_status = this.status["ready"];
        this.level = 1;
        this.target = null;

        this.base_heal = 0;
        this.base_mana = 0;
        this.base_cast = 0;
        this.base_cd   = 0;
        this.base_tick = 0;
        this.base_duration = 0;

        this.curr_heal = 0;
        this.curr_mana = 0;
        this.curr_cast = 0;
        this.curr_cd   = 0;
        this.curr_tick = 0;
        this.curr_duration = 0;


        this.label_bg = new cc.LayerColor(cc.color(91,110,255), 28, 10);
        this.label_bg.setPosition(-14,-13);
        this.addChild(this.label_bg, 2);

        this.cd_label = pd.label(this.label_bg, "80.8", 2, 1, "monospace");
        this.cd_label.setFontFillColor(cc.color(255,225,255));
        this.cd_label.setPosition(12, 3);
        this.cd_label.setLocalZOrder(2);

        this.setCascadeColorEnabled(true);
        this.setCascadeOpacityEnabled(true);
    },

    init: function () {
        this.sprite = pd.createSprite(this.sprite_name, cc.p(0,0), this, 1);
        this.setValues();
        this.setDescription();
    },

    update: function (dt) {
        cc.log(this.curr_status, this.cast_timer, this.base_cast);
        if (this.curr_status == this.status["onCast"]) {
            this.cast_timer += dt;
            if (this.cast_timer >= this.base_cast) {
                this.finishCast(this.target);
            }
            this.updateCastTimer();
        }
        else if (this.curr_status == this.status["onCD"]) {
            this.curr_cd -= dt;
            if (this.curr_cd <= 0) {
                this.finishCoolDown();
            }
            this.updateCDLabel();
        }
    },

    updateCastTimer: function () {
        cc.log("--");
        projSUS.controller.healer.cast_bar.setPercentage(100 * this.cast_timer / this.base_cast);

    },

    updateCDLabel: function (dt) {
        this.cd_label.setVisible(true);
        if (this.curr_cd > 0) {
            this.cd_label.setString(Math.round(this.curr_cd*10)/10);
        }
        else {
            this.cd_label.setVisible(false);
        }
    },

    setValues: function () {
        this.curr_heal = this.base_heal;
        this.curr_mana = this.base_mana;
        this.curr_cast = this.base_cast;
        this.curr_cd   = this.base_cd;
        this.curr_tick = this.base_tick;
        this.curr_duration = this.base_duration;
    },

    setName: function (name) {
        this.name = name;
    },

    getName: function () {
        return this.name;
    },

    getSpriteName: function () {
        return this.sprite_name;
    },

    getDescription: function () {
        return this.description;
    },

    setDescription: function () {
        cc.warn("Sobrescrever de funcao spell: " + this.name);
    },

    beginCast: function (target) {
        cc.warn("sobrescrever função beginCast de " + this.name);
    },

    finishCast: function (target) {
        cc.warn("sobrescrever função finishCast de " + this.name);
    },

    finishCoolDown: function () {
        this.curr_cd = 0;
        this.curr_status = this.status["ready"];
        this.unscheduleUpdate();
    }
});