projectSUS.Petrerus = projectSUS.Boss.extend({
    ctor: function (parent) {
        this._super();

        if (parent) parent.addChild(this);

        this.sprite = pd.createSprite("boss.png", cc.p(0,0), this);
        this.sprite.setAnchorPoint(0.5,0);

        // this.heroes_list = heroes;
        //
        //
        // this.is_atacking = false;
        // this.time_to_attack = 0;

        cc.log("Soy Petrerus");
    },

    init:function () {

        this.scheduleUpdate();
    },

    update: function (dt) {

    }
});