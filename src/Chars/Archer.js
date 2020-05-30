projSUS.Archer = projSUS.Char.extend({
    ctor: function (parent) {
        this._super(parent);

        this.setAnchorPoint(0.5, 0);
        this.setInitialLife(70);

    },

    setHole: function () {
        this.hole = "archer";
    },

    createAnimations: function () {
        this.addAnimation("idle_down",  1, 1, "Archer_");
        this.addAnimation("idle_left",  2, 2, "Archer_");
        this.addAnimation("idle_up",    3, 3, "Archer_");
        this.addAnimation("idle_right", 4, 4, "Archer_");

        this.addAnimation("walk_down",   5,  6, "Archer_");
        this.addAnimation("walk_left",   7,  8, "Archer_");
        this.addAnimation("walk_up",     9, 10, "Archer_");
        this.addAnimation("walk_right", 11, 12, "Archer_");

        this.addAnimation("cast_down",  14, 14, "Archer_");
        this.addAnimation("cast_left",  16, 16, "Archer_");
        this.addAnimation("cast_up",    18, 18, "Archer_");
        this.addAnimation("cast_right", 20, 20, "Archer_");

        this.changeAndLoop("idle_up");
    },

});