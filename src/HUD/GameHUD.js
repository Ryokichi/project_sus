projSUS.BattleHUD = cc.Layer.extend({
    ctor: function (parentNode) {
        this._super();

        if (parentNode) {
            parentNode.addChild(this, 10000);
        }

        this.boss_life = new pd.ComplexBar("boss_health_bar_2.png", "boss_health_interface.png", this);
        this.boss_life.setPosition(cc.winSize.width/2, cc.winSize.height-20);

        this.player_mana = new pd.ComplexBar("player_mana_bar.png", "player_mana_interface.png", this);
        this.player_mana.setPosition(cc.winSize.width/2, 65);


        var box = this.boss_life.getBoundingBox();
        this.boss_icon = pd.createSprite("boss_health_icon.png", cc.p(-box.width/2,0), this.boss_life);

        this.spell_frame = pd.createSprite("spells_frame_bg.png", cc.p(cc.winSize.width/2, 30), this);
        pd.createSprite("spells_frame.png", cc.p(this.spell_frame.width/2, this.spell_frame.height/2), this.spell_frame, 2);

        this.spells = [];
        this.loadSpells();

        projSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projSUS.input.addEventListener("onKeyPressed", "onKeyPressed", this, 1);
    },

    onMouseDown: function (e) {

    },

    onKeyPressed: function (key, event, first_press) {
        if (first_press) {
            if (projSUS.gameConfig.spell_btn_a0 == key || projSUS.gameConfig.spell_btn_b0 == key) {
                this.spells[0].
            }
        }
    },

    loadSpells: function () {
        var i = 0;
        for (var item in projSUS.SavedData.spells) {
            var spell = projSUS.SavedData.spells[item];

            var s = new projSUS.Spell();
            if ( spell != null) {
                s = new projSUS[spell];
            }

            this.spells.push(s);
            this.spell_frame.addChild(s);

            s.setPosition((i*47)+33, 24);
            if (i == 4)
                s.setPosition(240,24);
            i++;
        }

    },

    updateBossLife: function (perc) {
        this.boss_life.setPercentage(perc);
    },

    updatePlayerMana: function (perc) {
        this.player_mana.setPercentage(perc);
    }
});