projectSUS.SpellBookLayer = cc.Layer.extend({
    ctor: function (parent) {
        this._super ();

        parent.addChild(this);

        this.setCascadeOpacityEnabled(true);
        this.setOpacity(0);
        this.init();
    },

    init: function () {
        this.is_paused = false;

        this.bg = new cc.LayerColor(cc.color(0,0,0,150));
        this.addChild(this.bg, -1);

        this.target_spell = null;

        this.level_up_layer = new projectSUS.SpellUp(cc.color(0,150,150, 255), 280, 340, this);
        this.level_up_layer.setAnchorPoint(0.5, 0.5);
        this.level_up_layer.setPosition(320,180);
        this.level_up_layer.setScale(0);
        this.level_up_layer.setLocalZOrder(1000);

        this.open_up = new cc.LayerColor(cc.color(255,255,0, 255), 20, 20);
        this.open_up.setPosition(280,300);
        this.addChild(this.open_up, 900);
        cc.log(this.level_up_layer.getBoundingBox());

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
        // this.mock_spell.setColor(cc.color(150,150,150));
        this.mock_spell.setScale(1.1);
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
        if (this.is_paused)
            return;

        if (e.getButton() === cc.EventMouse.BUTTON_RIGHT){
            cc.log(e.getLocation());
        }
        if (cc.rectContainsPoint(this.close_btn, e.getLocation())) {
            this.closeAndResumeParent();
            return;
        }

        if (cc.rectContainsPoint(this.open_up.getBoundingBox(), e.getLocation())) {
            if (this.target_spell == null)
                return;

            this.level_up_layer.showUp(this.target_spell);
            this.pauseControl();
            return;
        }

        let rect;
        for (let i = 0; i < this.spells_list.length; i++) {
            rect = this.spells_box[i].getBoundingBoxToWorld();
            if (cc.rectContainsPoint(rect, e.getLocation())) {
                this.showSpellData(this.spells_box[i].spell);
                this.changeMockSprite(this.spells_box[i].spell.getSpriteName());
                this.spells_box[i].spell.sprite.setColor(cc.color(150,150,150));
            }
        }

        for (let i = 0; i < this.spells_select.length; i++) {
            rect = this.spells_select[i].getBoundingBoxToWorld();
            if (cc.rectContainsPoint(rect, e.getLocation())) {
                if (this.spells_select[i].spell_name) {
                    this.changeMockSprite(this.spells_select[i].spell_name);
                    this.mock_spell.came_from_hot_bar = i;
                    this.changeHotBarSprite(this.spells_select[i], null);
                }
            }
        }
    },

    permutSprite: function (curr_idx, old_idx) {
        this.changeHotBarSprite(this.spells_select[old_idx], this.spells_select[curr_idx].spell_name);
        this.changeHotBarSprite(this.spells_select[curr_idx], this.mock_spell.name);

    },

    onMouseUp: function (e) {
        let rect;

        if (this.mock_spell.is_active) {
            for (let i = 0; i < this.spells_select.length; i++) {
                rect = this.spells_select[i].getBoundingBox();
                if (cc.rectContainsPoint(rect, e.getLocation())) {
                    cc.log("+++ ", this.mock_spell.came_from_hot_bar);
                    if (this.mock_spell.came_from_hot_bar !== false) {
                        this.permutSprite(i, this.mock_spell.came_from_hot_bar);
                    } else {
                        this.changeHotBarSprite(this.spells_select[i], this.mock_spell.name);
                    }

                    this.checkDuplicates(i, this.mock_spell.name);
                    this.hideMockSpell();
                }
            }
        }
        this.hideMockSpell();

        for (let i = 0; i < this.spells_box.length; i++) {
            this.spells_box[i].spell.sprite.setColor(cc.color(255,255,255));
            for (let j = 0; j < this.spells_select.length; j++) {
                if (this.spells_box[i].spell.getSpriteName() == this.spells_select[j].spell_name) {
                    this.spells_box[i].spell.sprite.setColor(cc.color(150,150,150));
                }
            }
        }
    },

    checkDuplicates: function (curr_idx, name) {
        for (let i = 0; i < this.spells_select.length; i++) {
            if (i !== curr_idx && this.spells_select[i].spell_name == name) {
                this.changeHotBarSprite(this.spells_select[i], null);
            }
        }
    },


    onMouseMove: function (e) {
        if (this.mock_spell.is_active) {
            this.mock_spell.setPosition(e.getLocation());
        }
    },

    showSpellData: function (spell) {
        this.target_spell = spell;
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
    },

    pauseControl: function () {
        this.is_paused = true;
    },

    resumeControl: function () {
        this.is_paused = false;
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
        obj.spell_name = (name != "btn_padrao.png") ? name : null;
    }
});