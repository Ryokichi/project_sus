projSUS.Hero = projSUS.Char.extend({
    ctor: function (parent) {
        this._super(parent);
        this.setAnchorPoint(0.5,0);

        this.curr_speed = cc.p(0,0);
        this.last_speed = cc.p(0,0);
        this.max_speed = cc.p(2,2);

        this.has_control = true;
        this.is_casting = false;
        this.curr_state = "idle";
        this.curr_direction = "down";

        this.max_mana = 100;
        this.curr_mana = this.max_mana;
        this.mana_regen = 2;

        this.curr_spell = null;
        this.spell_target = null;
        this.spell_cast_time = 1;
        this.spell_curr_ct = 0;

        this.timer = 0;

        this.cast_frame = new cc.LayerColor(cc.color(255,255,255),32,4);
        this.cast_frame.setPosition(this.width/2-16, this.height + 9);
        this.cast_frame.setVisible(false);
        this.addChild(this.cast_frame, 2);
        this.cast_bar = new cc.LayerColor(cc.color(218,165,32),30,2);
        this.cast_bar.setAnchorPoint(0,0.5);
        this.cast_bar.setPosition(1,1);
        this.cast_frame.addChild(this.cast_bar);
    },

    createAnimations: function () {
        this.addAnimation("idle_down",  1, 1, "Priest_");
        this.addAnimation("idle_left",  2, 2, "Priest_");
        this.addAnimation("idle_up",    3, 3, "Priest_");
        this.addAnimation("idle_right", 4, 4, "Priest_");

        this.addAnimation("walk_down",   5,  6, "Priest_");
        this.addAnimation("walk_left",   7,  8, "Priest_");
        this.addAnimation("walk_up",     9, 10, "Priest_");
        this.addAnimation("walk_right", 11, 12, "Priest_");

        this.addAnimation("cast_down",  14, 14, "Priest_");
        this.addAnimation("cast_left",  16, 16, "Priest_");
        this.addAnimation("cast_up",    18, 18, "Priest_");
        this.addAnimation("cast_right", 20, 20, "Priest_");

        this.changeAndLoop("idle_down");
        this.scheduleUpdate();
    },

    regenMana: function () {
        this.curr_mana += this.mana_regen;
        if (this.curr_mana > this.max_mana) {
            this.curr_mana = this.max_mana;
        }
        this.updateMana();
    },

    updateMana: function () {
        projSUS.controller.updatePlayerMana(this.curr_mana / this.max_mana);
    },

    update: function(dt) {
        this.timer += dt;
        if (this.timer >= 1) {
            this.timer -= 1;
            this.regenMana();
        }

        if (this.is_casting) {
            this.cast_bar.setScale(this.spell_curr_ct / this.spell_cast_time, 1);
            if (this.spell_curr_ct < this.spell_cast_time) {
                this.spell_curr_ct += dt;
            }
            else {
                this.spell_curr_ct = 0;
                this.executeCast();
            }

        }

        this.checkKeyboardState();
        this.updateAnimations();

        this.x += this.speed.x;
        this.y += this.speed.y;
    },

    beginCast: function (spell, target) {
        this.is_casting = true;
        this.curr_spell = spell;
        this.spell_target = target;
        this.spell_cast_time = spell.base_cast;
        this.cast_frame.setVisible(true);
    },

    executeCast: function () {
        ////Mas e se a magia é um cleanse, a magia quem deve chamar o controller?
        ////Quais tipos de modificadores eu posso utilizar?

        this.curr_mana -= this.curr_spell.base_mana;
        var amount = this.curr_spell.base_heal;
        projSUS.controller.spellHeal(this.spell_target, amount);
        this.is_casting = false;
        this.cast_frame.setVisible(false);
    },

    checkKeyboardState: function () {
        this.speed = cc.p(0,0);

        if (projSUS.input.isKeyPressed(projSUS.gameConfig.btn_a_up) ||
            projSUS.input.isKeyPressed(projSUS.gameConfig.btn_b_up)){
            this.speed.y = this.max_speed.y;
            this.curr_direction = "up";
        }
        else if (projSUS.input.isKeyPressed(projSUS.gameConfig.btn_a_down) ||
            projSUS.input.isKeyPressed(projSUS.gameConfig.btn_b_down)){
            this.speed.y = -this.max_speed.y;
            this.curr_direction = "down";
        }
        else if (projSUS.input.isKeyPressed(projSUS.gameConfig.btn_a_left) ||
            projSUS.input.isKeyPressed(projSUS.gameConfig.btn_b_left)){
            this.speed.x = -this.max_speed.x;
            this.curr_direction = "left";
        }
        else if (projSUS.input.isKeyPressed(projSUS.gameConfig.btn_a_right) ||
            projSUS.input.isKeyPressed(projSUS.gameConfig.btn_b_right)){
            this.speed.x = this.max_speed.x;
            this.curr_direction = "right";
        }
    },

    updateAnimations: function () {
        if (!this.has_control) return;

        if ((this.speed.x != 0 || this.speed.y != 0) && this.curr_state != "cast") {
            this.curr_state = "walk";
        }
        else if ((this.speed.x == 0 || this.speed.y == 0) && this.curr_state != "cast") {
            this.curr_state = "idle";
        }
        this.changeAndLoop(this.curr_state+"_"+this.curr_direction, 10);
    },

    moveTo: function (pos) {
        this.stopAllActions();
        var dist = pd.pointDistance(this.getPosition(), pos);
        var time = dist/(this.max_speed.x*60);

        this.curr_state = "walk";
        this.runAction(cc.sequence(
            cc.moveTo(time,pos),
            cc.callFunc(function () {
                this.curr_state = "idle";
                this.speed
            },this)
        ));
    }

});