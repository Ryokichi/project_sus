projSUS.Healer = projSUS.Char.extend({
    ctor: function (parent) {
        this._super(parent);

        this.has_control = true;
        this.is_casting = false;
        this.curr_state = "idle";
        this.curr_direction = "down";

        this.curr_speed = cc.p(0,0);
        this.last_speed = cc.p(0,0);
        this.max_speed  = cc.p(2,2);

        this.max_mana   = 100;
        this.curr_mana  = this.max_mana;
        this.mana_regen = 0.5;
        this.time_regen = 0;

        this.target_ally = null;

        this.cast_bar = new pd.ComplexBar("party_hp_bar.png", "party_hp_interface.png", this);
        this.cast_bar.setPercentage(0);
        this.cast_bar.setPosition(this.width/2, this.height + 11);
    },

    setHole: function () {
        this.hole = "healer";
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

    consumeMana: function (amount) {
        this.curr_mana -= amount;
        this.updateMana();
    },

    updateMana: function () {
        projSUS.controller.updateHealerMana(100 * this.curr_mana / this.max_mana);
    },

    update: function(dt) {
        this.time_regen += dt;
        if (this.time_regen >= 1) {
            this.time_regen -= 1;
            this.curr_mana += this.mana_regen;
            if (this.curr_mana > this.max_mana)
                this.curr_mana = this.max_mana;
            this.updateMana();
        }

        this.checkKeyboardState();
        this.updateAnimations();

        this.x += this.speed.x;
        this.y += this.speed.y;
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
    },

    setTargetAlly: function (target) {
        this.target_ally = target;
    },

    getTargetAlly: function () {
        return this.target_ally;
    },

    getMana: function () {
        return this.curr_mana;
    }

});