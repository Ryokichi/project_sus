projSUS.Warrior = projSUS.Char.extend({
    ctor: function (parent) {
        this._super(parent);

        this.curr_state = "idle";
        this.curr_direction = "down";

        this.curr_speed = cc.p(0, 0);
        this.last_speed = cc.p(0, 0);
        this.max_speed = cc.p(1, 1);

        // this.frame_hp = pd.createSprite("party_hp_interface.png", cc.p(13,35), this);
        // this.bar_hp = pd.createSprite("party_hp_bar.png", cc.p(2,this.frame_hp.height/2), this.frame_hp);
        // this.bar_hp.setAnchorPoint(0,0.5);

        this.setScale(1.5);
        this.setAnchorPoint(0.5, 0);
        this.attack();

    },

    update: function (dt) {

    },

    createAnimations: function () {
        this.addAnimation("idle", 1, 1, "warrior_");
    },

    attack: function () {
        this.runAction(cc.repeatForever(
            cc.sequence(
                cc.delayTime(3),
                cc.moveBy(0.1,0,20),
                cc.delayTime(0.1),
                cc.moveBy(0.1,0,-20)
            )
        ));
    },


});