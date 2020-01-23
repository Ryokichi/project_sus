projSUS.Warrior = projSUS.Char.extend({
    ctor: function (parent) {
        this._super(parent);

        this.health_bar.setPosition(-3,35);
        this.setScale(1.5);
        this.setAnchorPoint(0.5, 0);
        this.setInitialLife(100);
        this.createAnimations();
        this.attack();
    },

    setHole: function () {
        this.hole = "tanker";
    },

    createAnimations: function () {
        this.addAnimation("idle", 1, 1, "warrior_");
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


    ////setar
    takingHeal: function (amount) {
        this.addLife(amount);
    },

    ////Setar mitigação de dano
    takingHit: function (amount, type) {
        this.subtractLife(amount);
    }
});