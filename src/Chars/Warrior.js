projSUS.Warrior = projSUS.Char.extend({
    ctor: function (parent) {
        this._super(parent);

        this.setAnchorPoint(0.5, 0);
        this.setInitialLife(100);
        // this.attack();
    },

    setHole: function () {
        this.hole = "tanker";
    },

    createAnimations: function () {
        this.addAnimation("idle_down",  1, 1, "Warrior_");
        this.addAnimation("idle_left",  2, 2, "Warrior_");
        this.addAnimation("idle_up",    3, 3, "Warrior_");
        this.addAnimation("idle_right", 4, 4, "Warrior_");

        this.addAnimation("walk_down",   5,  6, "Warrior_");
        this.addAnimation("walk_left",   7,  8, "Warrior_");
        this.addAnimation("walk_up",     9, 10, "Warrior_");
        this.addAnimation("walk_right", 11, 12, "Warrior_");

        this.addAnimation("cast_down",  14, 14, "Warrior_");
        this.addAnimation("cast_left",  16, 16, "Warrior_");
        this.addAnimation("cast_up",    18, 18, "Warrior_");
        this.addAnimation("cast_right", 20, 20, "Warrior_");

        this.changeAndLoop("idle_up");
    },

    attack: function () {
        this.runAction(cc.repeatForever(
            cc.sequence(
                cc.delayTime(3),
                cc.moveBy(0.1,0,20),
                cc.callFunc(function () {
                    delegate.attackTheBoss(10,"physical");
                }, this),
                cc.delayTime(0.1),
                cc.moveBy(0.1,0,-20)
            )
        ));
    },



});