projSUS.BattleHUD = cc.Layer.extend({
    ctor: function (parentNode) {
        this._super();

        if (parentNode) {
            parentNode.addChild(this, 10000);
        }

        this.boss_life = new pd.ComplexBar("boss_health_bar_2.png", "boss_health_interface.png", this);
        this.boss_life.setPosition(cc.winSize.width/2, cc.winSize.height-20);

        this.healer_mana = new pd.ComplexBar("player_mana_bar.png", "player_mana_interface.png", this);
        this.healer_mana.setPosition(cc.winSize.width/2, 65);

        this.healer_mana_label = pd.labelBM(this.healer_mana, "0 / 0", res.OperatorSC, "100px", 1);
        this.healer_mana_label.setScale(0.4);

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
            var target = projSUS.controller.healerTargetAlly();
            if (projSUS.gameConfig.spell_btn_a0 == key || projSUS.gameConfig.spell_btn_b0 == key) {
                this.spells[0].beginCast(target);
            }
            else if (projSUS.gameConfig.spell_btn_a1 == key || projSUS.gameConfig.spell_btn_b1 == key) {
                this.spells[1].beginCast(target);
            }
            else if (projSUS.gameConfig.spell_btn_a2 == key || projSUS.gameConfig.spell_btn_b2 == key) {
                this.spells[2].beginCast(target);
            }
            else if (projSUS.gameConfig.spell_btn_a3 == key || projSUS.gameConfig.spell_btn_b3 == key) {
                this.spells[3].beginCast(target);
            }
            else if (projSUS.gameConfig.spell_btn_a4 == key || projSUS.gameConfig.spell_btn_b4 == key) {
                this.spells[4].beginCast(target);
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

    updateHealerMana: function (curr_mana, max_mana) {
        this.healer_mana.setPercentage(100 * curr_mana / max_mana);
        this.healer_mana_label.setString(Math.floor(curr_mana)+" / "+max_mana);
    },

    createHealFeed: function (target, amount){
        var box  = target.getBoundingBox();
        var feed = pd.labelBM(this, "+"+amount, res.OperatorSC);
        feed.setScale(0.45);
        feed.setColor(cc.color(200,0,0));
        feed.setPosition(box.x+box.width/2, box.y+box.height+6);

        feed.runAction(cc.sequence(
            cc.spawn(
                cc.moveBy(0.5, 0, 15),
                cc.fadeOut(0.5),
            ),
            cc.removeSelf(true)
        ));
    }
});