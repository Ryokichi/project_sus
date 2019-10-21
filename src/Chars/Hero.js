projSUS.Hero = pd.Animation.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.has_control = true;
        this.is_casting = false;
        this.curr_state = "idle";
        this.curr_direction = "down";

        this.curr_speed = cc.p(0,0);
        this.last_speed = cc.p(0,0);
        this.max_speed = cc.p(1,1);


        this.setAnchorPoint(0.5, 0);
        this.createAnimations();
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

    update: function(dt) {
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
    }

});