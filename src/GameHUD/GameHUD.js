projSUS.GameHUD = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this, 1000);

        this.boss_frame = pd.createSprite("boss_health_interface.png", cc.p(320,340), this);
        this.boss_helth = pd.createSprite("boss_health_bar.png", cc.p(3,this.boss_frame.height/2), this.boss_frame);
        this.boss_helth.setAnchorPoint(0,0.5);
        this.boss_icon = pd.createSprite("boss_health_icon.png", cc.p(110,340), this);

        this.mana_frame = pd.createSprite("player_mana_interface.png", cc.p(320,58), this);
        this.mana_bar = pd.createSprite("player_mana_bar.png", cc.p(2,7.5), this.mana_frame);
        this.mana_bar.setAnchorPoint(0,0.5);
        this.spell_frame = pd.createSprite("spells_frame.png", cc.p(320, 25), this, 1);
        this.spell_frame_bg = new cc.LayerColor(cc.color(153,98,88),277,45);
        this.spell_frame_bg.setPosition(180,2);
        this.addChild(this.spell_frame_bg, 0);

        this.slot = [];
        for (var i=0; i < 5; i++) {
            var spell = null;
            if (projSUS.SavedData.spell["slot"+i] != null) {
                spell = new projSUS[projSUS.SavedData.spell["slot"+i]];
            }
            else {
                spell = new projSUS.Spell();
            }

            var pos = cc.p(212+47*i, 25);
            if (i==4) pos = cc.p(419,25);

            spell.img = pd.createSprite(spell.sprite_name, pos, this);
            this.slot.push(spell);
        }

        projSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projSUS.input.addEventListener("onKeyPressed", "onKeyPressed", this, 1);
    },

    update: function (dt) {

    },

    onMouseDown: function (e) {
        for (var i = 0;  i < this.slot.length; i++) {
            if (cc.rectContainsPoint(this.slot[i].img.getBoundingBox(), e.getLocation())) {
                this.castSpell(i);
            }
        }
    },

    onKeyPressed: function (key) {
        if (key == projSUS.gameConfig.spell_btn_a0 || key == projSUS.gameConfig.spell_btn_b0) {
            this.castSpell(0);
        }
        if (key == projSUS.gameConfig.spell_btn_a1 || key == projSUS.gameConfig.spell_btn_b1) {
            this.castSpell(1);
        }
        if (key == projSUS.gameConfig.spell_btn_a2 || key == projSUS.gameConfig.spell_btn_b2) {
            this.castSpell(2);
        }
        if (key == projSUS.gameConfig.spell_btn_a3 || key == projSUS.gameConfig.spell_btn_b3) {
            this.castSpell(3);
        }
        if (key == projSUS.gameConfig.spell_btn_a4 || key == projSUS.gameConfig.spell_btn_b4) {
            this.castSpell(4);
        }
    },

    castSpell: function (idx) {
        this.slot[idx].beginCast(projSUS.controller.getPlayerTarget())
    },

    setPlayer: function (player) {
        this.player = player;
    },

    setBoss: function (boss) {
        this.boss = boss;
    },

    updatePlayerMana: function (perc) {
        this.mana_bar.setScaleX(perc);
    },

    updateBossLife: function (perc) {
        this.boss_helth.setScaleX(perc);
    }
});