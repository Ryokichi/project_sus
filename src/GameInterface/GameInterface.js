projSUS.GameInterface = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this, 1000);
        this.bg = pd.createSprite("spells_frame.png", cc.p(320, 25), this, 1);


        this.slot = [];
        var spell, spell_name, idx = 0;
        for (var slot in projSUS.SavedData.spell) {
            spell_name = projSUS.SavedData.spell[slot];

            if (spell_name !== null) {
                spell = new projSUS[spell_name];
                this.addChild(spell);
                this.slot.push(spell);
            }
            else {
                spell = pd.createSprite("mock_sprite.png", cc.p(0,0), this);
            }
            spell.setPosition(212+(47*idx), 25);
            if (idx == 4) {
                spell.setPosition(419, 25);
            }
            idx++
        }
    },


});