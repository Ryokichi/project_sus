projSUS.SpellBookLayer = cc.Layer.extend({
    ctor: function (parent) {
        this._super ();

        parent.addChild(this);

        this.setCascadeOpacityEnabled(true);
        this.setOpacity(0);
        this.init();
    },

    init: function () {
        this.is_paused   = false;
        this.btn_opacity = 190;

        this.bg = new cc.LayerColor(cc.color(0,0,0,150));
        this.addChild(this.bg, -1);

        this.book = pd.createSprite("book_interface.png", cc.p(320,180), this);

        this.btn_close = new cc.LayerColor(cc.color(0,0,0,this.btn_opacity), 25, 22);
        this.btn_close.setPosition(549,300);
        this.addChild(this.btn_close, 500);

        this.btn_prev = new cc.LayerColor(cc.color(0,0,0,this.btn_opacity), 25, 15);
        this.btn_prev.setPosition(330,95);
        this.addChild(this.btn_prev, 500);

        this.btn_next = new cc.LayerColor(cc.color(0,0,0,this.btn_opacity), 25, 15);
        this.btn_next.setPosition(513,95);
        this.addChild(this.btn_next, 500);

        this.btn_lvl = new cc.LayerColor(cc.color(0,0,0,this.btn_opacity), 200, 20);
        this.btn_lvl.setPosition(90,100);
        this.addChild(this.btn_lvl, 900);

        this.target_spell  = null;
        this.spells_box    = [];
        this.hot_bar_slot = [];

        this.spell_description = this.std_label();
        this.spell_description.setPosition(90,222);
        this.spell_description.setDimensions(200, 85);

        this.life_label = this.std_label();
        this.life_label.setPosition(103,144);
        this.mana_label = this.std_label();
        this.mana_label.setPosition(155,144);
        this.cast_label = this.std_label();
        this.cast_label.setPosition(213,144);
        this.cd_label   = this.std_label();
        this.cd_label.setPosition(260,144);

        this.mock_spell = pd.createSprite("mock_sprite.png", cc.p(50,300), this, 100);
        this.mock_spell.is_active = false;
        this.mock_spell.came_from_hot_bar = false;
        this.mock_spell.linked_spell = null;
        this.mock_spell.setScale(1.1);
        // this.mock_spell.setColor(cc.color(150,150,150));

        this.upgrade_layer = new projSUS.SpellUp(cc.color(0,150,150, 255), 280, 340, this);
        this.upgrade_layer.setAnchorPoint(0.5, 0.5);
        this.upgrade_layer.setPosition(320,180);
        this.upgrade_layer.setScale(0);
        this.upgrade_layer.setLocalZOrder(1000);


        this.createSpellList();
        this.createSelectedSpells();

        projSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projSUS.input.addEventListener("onMouseUp", "onMouseUp", this, 1);
        projSUS.input.addEventListener("onMouseMove", "onMouseMove", this, 1);

        this.runAction(cc.fadeIn(0.3));
    },

    onMouseDown: function (e) {
        if (this.is_paused) return;

        if (cc.rectContainsPoint(this.btn_close, e.getLocation())) {
            this.closeAndResumeParent();
            return;
        }

        if (cc.rectContainsPoint(this.btn_lvl.getBoundingBox(), e.getLocation())) {
            if (this.target_spell == null) return;

            this.upgrade_layer.showUp(this.target_spell);
            this.pauseControl();
            return;
        }

        var rect;
        for (var i = 0; i < this.spells_box.length; i++) {
            rect = this.spells_box[i].getBoundingBoxToWorld();
            if (cc.rectContainsPoint(rect, e.getLocation())) {
                this.showSpellData(this.spells_box[i].spell);
                this.changeMockSpell(this.spells_box[i].spell);
                this.spells_box[i].spell.sprite.setColor(cc.color(150,150,150));
            }
        }

        for (var i = 0; i < this.hot_bar_slot.length; i++) {
            rect = this.hot_bar_slot[i].getBoundingBoxToWorld();
            if (cc.rectContainsPoint(rect, e.getLocation())) {
                if (this.hot_bar_slot[i].linked_spell != null) {
                    this.mock_spell.came_from_hot_bar = i;
                    this.changeMockSpell(this.hot_bar_slot[i].linked_spell);
                    this.updateHotBarSlot(i, null);
                }
            }
        }
    },

    onMouseUp: function (e) {
        var rect;
        if (this.mock_spell.is_active) {
            for (var i = 0; i < this.hot_bar_slot.length; i++) {
                rect = this.hot_bar_slot[i].getBoundingBox();
                if (cc.rectContainsPoint(rect, e.getLocation())) {
                    if (this.mock_spell.came_from_hot_bar !== false) { ///came form hot bar deve ser um numero
                        this.permutSprite(this.mock_spell.came_from_hot_bar, i);
                    } else {
                        this.updateHotBarSlot(i, this.mock_spell.linked_spell);
                    }
                    this.checkDuplicates(i, this.mock_spell.linked_spell);
                }
            }
        }
        this.hideMockSpell();

        /**
         * Volta para a cor original os icones de magia que não estão na hot bar.
         */
        for (var i = 0; i < this.spells_box.length; i++) {
            this.spells_box[i].spell.sprite.setColor(cc.color(255,255,255));
            for (var j = 0; j < this.hot_bar_slot.length; j++) {
                if (this.spells_box[i].spell === this.hot_bar_slot[j].linked_spell) {
                    this.spells_box[i].spell.sprite.setColor(cc.color(150,150,150));
                }
            }
        }
    },

    onMouseMove: function (e) {
        if (this.mock_spell.is_active) {
            this.mock_spell.setPosition(e.getLocation());
        }
    },

    std_label: function () {
        var label =  new cc.LabelTTF("-", "Arial", 10, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        label.setFontFillColor(cc.color(0,0,0,255));
        label.setDimensions(50,15);
        label.setAnchorPoint(0,1);
        this.addChild(label);
        return label;
    },

    createSpellList: function () {
        var x = 0, y = 327, box, s_name;
        for (var i = 0; i < projSUS.spellList.length; i++, x += 109) {
            s_name = projSUS.spellList[i];
            if (i%2 == 0) {
                x = 380;
                y -= 47;
            }

            box = pd.createSprite("spell_box.png", cc.p(x, y), this);
            box.spell = new projSUS[s_name];
            box.spell.setPosition(16,16);
            box.label = this.spellBoxLabel(box, box.spell.getName());
            box.addChild(box.spell,-1);

            this.spells_box.push(box)
        }
    },

    spellBoxLabel: function (parent, text) {
        var label = new cc.LabelTTF(text, "Arial", 10, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        label.setFontFillColor(cc.color(0,0,0,255));
        label.setPosition(34, 30);
        label.setDimensions(63, 40);
        label.setAnchorPoint(0,1);

        parent.addChild(label);
        return label;
    },

    createSelectedSpells: function () {
        var frame = pd.createSprite("spells_frame.png", cc.p(312,0), this, 1);
        frame.setAnchorPoint(0.5,0);

        var slot;
        for (var i = 0; i < 5; i++) {
            slot = pd.createSprite("mock_sprite.png", cc.p(0,0), this);
            slot.spell = null;
            slot.setPosition(204+(47*i), 24);
            if (i == 4) {
                slot.setPosition(411, 24);
            }

            this.hot_bar_slot.push(slot);
        }
    },

    /**
     *Atualiza uma magia na hot bar
     * @param idx
     * @param linked_spell
     */
    updateHotBarSlot: function (idx, linked_spell) {
        var name = (linked_spell) ? linked_spell.getSpriteName() : "mock_sprite.png";

        this.hot_bar_slot[idx].setSpriteFrame(name);
        this.hot_bar_slot[idx].linked_spell = linked_spell;
        this.saveData();
    },

    /**
     * Permuta as magias na hot bar
     * @param idx_origin
     * @param idx_dest
     */
    permutSprite: function (idx_origin, idx_dest) {
        this.updateHotBarSlot(idx_origin, this.hot_bar_slot[idx_dest].linked_spell);
        this.updateHotBarSlot(idx_dest, this.mock_spell.linked_spell);
    },

    checkDuplicates: function (curr_idx, spell) {
        for (var i = 0; i < this.hot_bar_slot.length; i++) {
            if (i !== curr_idx && this.hot_bar_slot[i].linked_spell === spell) {
                this.updateHotBarSlot(i, null);
            }
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
        var has_at_least_one = false;
        for (var i = 0; i < this.hot_bar_slot.length && !has_at_least_one ; i++) {
            if (this.hot_bar_slot[i].linked_spell != null) {
                has_at_least_one = true;
            }
        }

        if (has_at_least_one) {
            this.runAction(cc.sequence(
                cc.fadeOut(0.3),
                cc.callFunc(function () {
                    this.getParent().resumeControl();
                    this.removeFromParent();
                }, this)
            ));
        }
        else {
            cc.log("selecione ao menos uma magia");
        }
    },

    pauseControl: function () {
        this.is_paused = true;
    },

    resumeControl: function () {
        this.is_paused = false;
    },

    changeMockSpell: function (spell) {
        if (spell != null) {
            this.mock_spell.setVisible(true);
            this.mock_spell.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(spell.getSpriteName()));
            this.mock_spell.linked_spell = spell;
            this.mock_spell.is_active = true;
        }
    },

    hideMockSpell: function () {
        this.mock_spell.setVisible(false);
        this.mock_spell.setPosition(-100,-100);
        this.mock_spell.came_from_hot_bar = false;
    },

    saveData: function () {
        for (var i = 0; i < this.hot_bar_slot.length; i++) {
            var value = (this.hot_bar_slot[i].linked_spell)?this.hot_bar_slot[i].linked_spell.id : null;
            projSUS.SavedData.spell["slot"+i] = value;
        }
    }
});