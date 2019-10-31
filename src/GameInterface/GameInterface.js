projSUS.GameInterface = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this, 1000);

        this.boss_frame = pd.createSprite("boss_health_interface.png", cc.p(320,340), this);
        this.boss_helth = pd.createSprite("boss_health_bar.png", cc.p(3,this.boss_frame.height/2), this.boss_frame);
        this.boss_helth.setAnchorPoint(0,0.5);
        this.boss_icon = pd.createSprite("boss_health_icon.png", cc.p(110,340), this);
        this.boss = null;

        this.player = null;
        this.mana_frame = pd.createSprite("player_mana_interface.png", cc.p(320,58), this);
        this.mana_bar = pd.createSprite("player_mana_bar.png", cc.p(320,58), this);
        this.spell_frame = pd.createSprite("spells_frame.png", cc.p(320, 25), this, 1);

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
        this.scheduleUpdate()
    },

    update: function (dt) {
        this.mana_bar.setScaleX(this.player.curr_mana / this.player.max_mana);
        this.boss_helth.setScaleX(this.boss.getLifePerc());
    },

    setPlayer: function (player) {
        this.player = player;
    },

    setBoss: function (boss) {
        this.boss = boss;
    },

});