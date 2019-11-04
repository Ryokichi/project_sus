projSUS.GameInterface = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this, 1000);

        this.boss_frame = pd.createSprite("boss_health_interface.png", cc.p(320,340), this);
        this.boss_helth = pd.createSprite("boss_health_bar.png", cc.p(3,this.boss_frame.height/2), this.boss_frame);
        this.boss_helth.setAnchorPoint(0,0.5);
        this.boss_icon = pd.createSprite("boss_health_icon.png", cc.p(110,340), this);

        this.mana_frame = pd.createSprite("player_mana_interface.png", cc.p(320,58), this);
        this.mana_bar = pd.createSprite("player_mana_bar.png", cc.p(2,8), this.mana_frame);
        this.mana_bar.setAnchorPoint(0,0.5);

        this.spell_frame = pd.createSprite("spells_frame.png", cc.p(320, 25), this, 1);
        this.spell_frame_bg = new cc.LayerColor(cc.color(153,98,88),277,45);
        this.spell_frame_bg.setPosition(180,2);
        this.addChild(this.spell_frame_bg, 0);

        this.slot = [];
        for (var i=0; i < 5; i++) {
            var pos = cc.p(212+47*i, 25);
            if (i==4) pos = cc.p(419,25);

            this.slot.push(pd.createSprite("mock_sprite.png", pos, this));
        }
    },

    setSpellSprites: function (spells){
        for (var i = 0;  i < spells.length; i++) {
            if (spells[i] != null) {
                this.slot[i].setSpriteFrame(spells[i].sprite_name);
            }
        }
    },

    setPlayer: function (player) {
        this.player = player;
    },

    setBoss: function (boss) {
        this.boss = boss;
    },

    updateBossLife: function (perc) {
        this.boss_helth.setScaleX(perc);
    },

    updatePlayerMana: function (perc) {
        this.mana_bar.setScaleX(perc);
    },



});