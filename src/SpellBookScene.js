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

        this.close_btn = cc.rect(594,311,25,14);

        this.book = pd.createSprite(res.spell_book, cc.p(320,180), this);

        this.spells_list  = [];
        this.spells_box   = [];
        this.spells_select = [];
        this.aux_spell_img = [];

        this.spell_description = this.std_label();
        this.spell_description.setPosition(75,200);
        this.spell_description.setDimensions(225, 85);

        this.life_label = this.std_label();
        this.life_label.setPosition(100,110);
        this.mana_label = this.std_label();
        this.mana_label.setPosition(100,82);
        this.cast_label = this.std_label();
        this.cast_label.setPosition(222,110);
        this.cd_label   = this.std_label();
        this.cd_label.setPosition(222,82);



        this.createSpellList();
        this.createSelectedSpells();
        this.runAction(cc.fadeIn(0.3));
        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projectSUS.input.addEventListener("onMouseUp", "onMouseUp", this, 1);
        projectSUS.input.addEventListener("onMouseMove", "onMouseMove", this, 1);
    },

    std_label: function () {
        let label =  new cc.LabelTTF("-", "Arial", 10, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        label.setFontFillColor(cc.color(0,0,0,255));
        label.setDimensions(50,15);
        label.setAnchorPoint(0,1);
        this.addChild(label);
        return label;
    },

    createSpellList: function () {
        this.spells_list = [
            new projectSUS.Heal(),
            new projectSUS.FastHeal(),
            new projectSUS.GreatHeal(),
            new projectSUS.Renew(),
            new projectSUS.Shield()
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

            let name = this.spells_box[i].spell.getSpriteName();
            let pos = this.spells_box[i].convertToWorldSpace(this.spells_box[i].spell.getPosition());
            this.aux_spell_img.push(pd.createSprite(name, pos, this, 10));
            this.aux_spell_img[i].was_clicked = false;
        }
    },

    spellBoxLabel: function (parent, text) {
        let label = new cc.LabelTTF(text, "Arial", 11, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        label.setFontFillColor(cc.color(0,0,0,255));
        label.setPosition(47, 45);
        label.setDimensions(73, 42);
        label.setAnchorPoint(0,1);

        parent.addChild(label);
        return label;
    },

    createSelectedSpells: function () {
        for (let i = 0; i < 4; i++) {
            this.spells_select.push(pd.createSprite("btn_padrao.png", cc.p(0,0), this));
            this.spells_select[i].setPosition(170+(80*i), 25);
            this.spells_select[i].spell_code = null;
        }
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

        for (let i = 0; i < this.aux_spell_img.length; i++) {
            rect = this.aux_spell_img[i].getBoundingBox();
            if (cc.rectContainsPoint(rect, e.getLocation())){
                this.aux_spell_img[i].was_clicked = true;
            }
        }
    },

    onMouseUp: function (e) {
        let rect, box_pos;
        for (let i = 0; i < this.aux_spell_img.length; i++) {
            if (this.aux_spell_img[i].was_clicked) {
                this.aux_spell_img[i].was_clicked = false;
                this.aux_spell_img[i].setLocalZOrder(10);

                for (let j = 0; j < this.spells_select.length; j++) {
                    rect = this.spells_select[j].getBoundingBox();

                    cc.log(rect);
                    if (cc.rectContainsPoint(rect, e.getLocation())) {
                        this.aux_spell_img[i].setPosition(this.spells_select[j].getPosition());
                        break;
                    }
                    else {
                        box_pos = this.spells_box[i].convertToWorldSpace(this.spells_box[i].spell.getPosition());
                        this.aux_spell_img[i].setPosition(box_pos);
                    }
                }
            }
        }
    },

    onMouseMove: function (e) {
        for (let i = 0; i < this.aux_spell_img.length; i++) {
            if (this.aux_spell_img[i].was_clicked){
                this.aux_spell_img[i].setPosition(e.getLocation());
                this.aux_spell_img[i].setLocalZOrder(11);
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