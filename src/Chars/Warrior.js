projSUS.Warrior = pd.Animation.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.curr_state = "idle";
        this.curr_direction = "down";

        this.curr_speed = cc.p(0, 0);
        this.last_speed = cc.p(0, 0);
        this.max_speed = cc.p(1, 1);

        this.max_life = 100;
        this.curr_life = this.max_life;

        // this.frame_hp = pd.createSprite("party_hp_interface.png", cc.p(13,35), this);
        // this.bar_hp = pd.createSprite("party_hp_bar.png", cc.p(2,this.frame_hp.height/2), this.frame_hp);
        // this.bar_hp.setAnchorPoint(0,0.5);

        this.health_bar = new projSUS.HealthBar(this);
        this.health_bar.setPosition(-3,35);

        this.setScale(1.5);
        this.setAnchorPoint(0.5, 0);
        this.createAnimations();
        this.attack();
        this.scheduleUpdate();
    },

    update: function (dt) {
        this.health_bar.setLifePerc(this.curr_life / this.max_life);
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
    }
});