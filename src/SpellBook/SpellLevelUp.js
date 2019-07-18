projectSUS.SpellUp = cc.LayerColor.extend({
    ctor: function (color, w, h, parent) {
        this._super(color, w, h);
        this.is_paused = true;

        this.spell = null;

        if (parent) {
            parent.addChild(this)
        }
        else {
            cc.warn("não foi informado o um pai para layer Spell Up");
        }
        this.init();
    },

    init: function () {
        this.ignoreAnchorPointForPosition(false);
        this.cancel_btn = new cc.LayerColor(cc.color(255,255,255,255), 100, 25);
        this.cancel_btn.setPosition(10,10);
        this.addChild(this.cancel_btn);
        this.confirm_btn = new cc.LayerColor(cc.color(0,255,255,255), 100, 25);
        this.confirm_btn.setPosition(120,10);
        this.addChild(this.confirm_btn);

        this.level_lbl = this.std_label();
        this.level_lbl.setPosition(50, 280);
        this.heal_lbl = this.std_label();
        this.heal_lbl.setPosition(50, 250);
        this.mana_lbl = this.std_label();
        this.mana_lbl.setPosition(50, 230);
        this.cast_lbl = this.std_label();
        this.cast_lbl.setPosition(50, 210);
        this.cd_lbl = this.std_label();
        this.cd_lbl.setPosition(50, 190);
        this.tick_lbl = this.std_label();
        this.tick_lbl.setPosition(50, 170);
        this.duration_lbl = this.std_label();
        this.duration_lbl.setPosition(50, 150);

        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projectSUS.input.addEventListener("onMouseUp", "onMouseUp", this, 1);
    },

    std_label: function () {
        let label =  new cc.LabelTTF("-", "Arial", 10, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        label.setFontFillColor(cc.color(0,0,0,255));
        label.setDimensions(240,20);
        label.setAnchorPoint(0,1);
        this.addChild(label);
        return label;
    },

    showUp: function (spell) {
        if (spell == null)
            return;

        this.spell = spell;
        this.setStrings();

        this.runAction(cc.sequence(
            cc.scaleTo(0.3, 1),
            cc.callFunc(function () {
                this.resumeControl();
            }, this)
        ))
    },

    setStrings: function () {
        this.level_lbl.setString("Level " + this.spell.level);

        let new_lvl = this.spell.level + 1;

        this.heal_lbl.setString("Vida: " + this.spell.curr_heal + " --> " + this.spell.curr_heal * new_lvl);
        this.mana_lbl.setString("Mana: " + this.spell.curr_mana + " --> " + this.spell.curr_mana * new_lvl);
        this.cast_lbl.setString("Cast Time: " + this.spell.curr_cast + " --> " + this.spell.curr_cast * new_lvl);
        this.cd_lbl.setString("Cool Down: " + this.spell.curr_cd + " --> " + this.spell.curr_cd * new_lvl);
        this.tick_lbl.setString("Tick: " + this.spell.curr_tick + " --> " + this.spell.curr_tick * new_lvl);
        this.duration_lbl.setString("Duracao: " + this.spell.curr_duration + " --> " + this.spell.curr_duration * new_lvl);

    },

    minimaze: function () {
        this.runAction(cc.sequence(
            cc.scaleTo(0.3, 0),
            cc.callFunc(function () {
                this.pauseControl();
                this.getParent().resumeControl();
            }, this)
        ))
    },

    onMouseDown: function (e) {
        if (this.is_paused)
            return;

        let pto = this.convertToNodeSpace(e.getLocation());
        if (cc.rectContainsPoint(this.cancel_btn.getBoundingBox(), pto)) {
            this.minimaze();
        }
        else if (cc.rectContainsPoint(this.confirm_btn.getBoundingBox(), pto)) {
            this.spell.level ++;
            this.setStrings();
            this.minimaze();
        }

    },

    onMouseUp: function (e) {
        if (this.is_paused)
            return;

    },

    closeAndResumeParent: function () {
        this.runAction(cc.sequence(
            cc.fadeOut(0.3),
            cc.callFunc(function () {
                this.getParent().resumeControl();
                this.removeFromParent();
            }, this)
        ));
    },

    pauseControl: function () {
        this.is_paused = true;
    },

    resumeControl: function () {
        this.is_paused = false;
    },
});