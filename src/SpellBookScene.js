projectSUS.SpellBookScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new projectSUS.SpellBookLayer();
        this.addChild(layer);
        layer.init();
    }
});

projectSUS.SpellBookLayer = cc.Layer.extend({
    ctor: function (parent) {
        this._super ();

        parent.addChild(this);

        this.setCascadeOpacityEnabled(true);
        this.setOpacity(0);
        this.init();
    },

    init: function () {
        this.bg = new cc.LayerColor(cc.color(0,0,0,150), 640, 360);
        this.addChild(this.bg, -1);

        // this.close_btn = new cc.LayerColor(cc.color(100,100,100,200), 25, 17);
        // this.close_btn.setPosition(594, 311);
        // this.addChild(this.close_btn, 30);

        this.close_btn = cc.rect(594,311,25,14);


        this.book = pd.createSprite(res.spell_book, cc.p(320,180), this);

        this.spells_list  = [];
        this.spells_box   = [];
        this.spell_select = [];

        this.spell_description = new cc.LabelTTF("----", "Arial", 10, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.spell_description.setFontFillColor(cc.color(0,0,0,255));
        this.spell_description.setPosition(75,200);
        this.spell_description.setDimensions(225, 85);
        this.spell_description.setAnchorPoint(0,1);
        this.addChild(this.spell_description);

        this.life_label = new cc.LabelTTF("----", "Arial", 10, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.life_label.setFontFillColor(cc.color(0,0,0,255));
        this.life_label.setPosition(100,110);
        this.life_label.setDimensions(50,15);
        this.life_label.setAnchorPoint(0,1);
        this.addChild(this.life_label);

        this.mana_label = new cc.LabelTTF("----", "Arial", 10, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.mana_label.setFontFillColor(cc.color(0,0,0,255));
        this.mana_label.setPosition(100,82);
        this.mana_label.setDimensions(50,15);
        this.mana_label.setAnchorPoint(0,1);
        this.addChild(this.mana_label);

        this.cast_label = new cc.LabelTTF("----", "Arial", 10, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.cast_label.setFontFillColor(cc.color(0,0,0,255));
        this.cast_label.setPosition(222,110);
        this.cast_label.setDimensions(50,15);
        this.cast_label.setAnchorPoint(0,1);
        this.addChild(this.cast_label);

        this.cd_label = new cc.LabelTTF("----", "Arial", 10, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.cd_label.setFontFillColor(cc.color(0,0,0,255));
        this.cd_label.setPosition(222,82);
        this.cd_label.setDimensions(50,15);
        this.cd_label.setAnchorPoint(0,1);
        this.addChild(this.cd_label);

        this.selected_spell = pd.createSprite("btn_padrao.png", cc.p(170, 25), this);


        this.loadSpells();

        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);

        this.runAction(cc.fadeIn(0.3));
    },

    loadSpells: function () {
        this.spells_list = [
            new projectSUS.Heal(),
            new projectSUS.FastHeal(),
            new projectSUS.GreatHeal(),
            new projectSUS.Renew(),
            new projectSUS.Heal(),
            new projectSUS.FastHeal(),
            new projectSUS.GreatHeal(),
            new projectSUS.Renew()
        ];

        let x = 390, y = 310;
        for (let i = 0; i < this.spells_list.length; i++) {
            x += 130;
            if (i%2 == 0) {
                x = 390;
                y -= 55;
            }
            this.spells_box[i] = pd.createSprite("spell_box.png", cc.p(x, y), this);
            this.spells_box[i].spell = this.spells_list[i];
            this.spells_box[i].spell.setPosition(25,25);
            this.spells_box[i].label = this.spellBoxLabel(this.spells_box[i], this.spells_box[i].spell.getName());
            this.spells_box[i].addChild(this.spells_box[i].spell);
        }
    },

    spellBoxLabel: function (parent, text) {
        let label = new cc.LabelTTF(text, "Arial", 13, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        label.setFontFillColor(cc.color(0,0,0,255));
        label.setPosition(55, 45);
        label.setDimensions(60, 40);
        label.setAnchorPoint(0,1);

        parent.addChild(label);

        return label;
    },

    onMouseDown: function (e) {
        if (e.getButton() === cc.EventMouse.BUTTON_RIGHT){
            cc.log(e.getLocation());
        }

        let rect;
        for (let i = 0; i < this.spells_list.length; i++) {
            rect = this.spells_box[i].getBoundingBoxToWorld();

            if (cc.rectContainsPoint(rect, e.getLocation())) {
                this.setSpellData(this.spells_box[i].spell);
            }
            else if (cc.rectContainsPoint(this.close_btn, e.getLocation())){
                this.closeAndResumeParent();
            }
        }
    },

    setSpellData: function (spell) {
        this.spell_description.setString(spell.getDescription());
        this.life_label.setString(spell.curr_heal);
        this.mana_label.setString(spell.curr_mana);
        this.cast_label.setString(spell.curr_cast);
        this.cd_label.setString(spell.curr_cd);
    },

    closeAndResumeParent: function () {
        this.runAction(cc.sequence(
            cc.fadeOut(0.3),
            cc.callFunc(function () {
                this.getParent().resumeControl();
                this.removeFromParent();
            }, this)
        ));
    }
});