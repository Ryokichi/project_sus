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

        this.mock_spell = pd.createSprite("cura1.png", cc.p(50,300), this, 100);
        this.mock_spell.is_active = false;
        this.mock_spell.name = null;
        this.mock_spell.came_from_hot_bar = false;

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
            this.spells_select[i].spell_name = null;
        }
    },

    onMouseDown: function (e) {
        if (e.getButton() === cc.EventMouse.BUTTON_RIGHT){
            cc.log(e.getLocation());
        }
        if (cc.rectContainsPoint(this.close_btn, e.getLocation())) {
            this.closeAndResumeParent();
            return;
        }

        let rect;
        for (let i = 0; i < this.spells_list.length; i++) {
            rect = this.spells_box[i].getBoundingBoxToWorld();
            if (cc.rectContainsPoint(rect, e.getLocation())) {
                this.changeMockSprite(this.spells_box[i].spell.getSpriteName());
            }
        }

        for (let i = 0; i < this.spells_select.length; i++) {
            rect = this.spells_select[i].getBoundingBoxToWorld();
            if (cc.rectContainsPoint(rect, e.getLocation())) {
                if (this.spells_select[i].spell_name) {
                    this.changeMockSprite(this.spells_select[i].spell_name);
                    this.spells_select.came_from_hot_bar = i;
                }
            }
        }
    },

    permutSprite: function (curr_idx, old_idx) {
        cc.log( this.spells_select[curr_idx].spell_name, "-->", this.mock_spell.spell_name);
        this.changeHotBarSprite(this.spells_select[old_idx], this.spells_select[curr_idx].spell_name);
        this.changeHotBarSprite(this.spells_select[curr_idx], this.mock_spell.spell_name);
    },

    onMouseUp: function (e) {
        let rect;

        if (this.mock_spell.is_active) {
            cc.log("is active");
            for (let i = 0; i < this.spells_select.length; i++) {
                rect = this.spells_select[i].getBoundingBox();
                if (cc.rectContainsPoint(rect, e.getLocation())) {
                    cc.log("está dentro");
                    if (this.mock_spell.came_from_hot_bar) {
                        cc.log("veio do hot bar", this.mock_spell.came_from_hot_bar);
                        this.permutSprite(i, this.mock_spell.came_from_hot_bar);
                    } else {
                        cc.log("veio da lista");
                        this.changeHotBarSprite(this.spells_select[i], this.mock_spell.name);
                    }
                    this.hideMockSpell();
                }
            }
        }

        this.hideMockSpell();
    },

    onMouseMove: function (e) {
        if (this.mock_spell.is_active) {
            this.mock_spell.setPosition(e.getLocation());
        }
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

    changeMockSprite: function (name) {
        if (name !== "" && name != null) {
            this.mock_spell.setVisible(true);
            this.mock_spell.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(name));
            this.mock_spell.name = name;
            this.mock_spell.is_active = true;
        }
    },

    hideMockSpell: function () {
        this.mock_spell.setVisible(false);
        this.mock_spell.setPosition(-100,-100);
        this.mock_spell.came_from_hot_bar = false;
    },

    changeHotBarSprite(obj, name) {
        name = (name) ? name : "btn_padrao.png";
        obj.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(name));
        obj.spell_name = name;
    }
});