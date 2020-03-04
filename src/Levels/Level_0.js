projSUS.Level_0 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.Level_0_Layer();
        this.addChild(this.layer);
    }
});

projSUS.Level_0_Layer = projSUS.BattleFieldLayer.extend({
    init: function () {
        this._super();

        this.bg = pd.createSprite("bg.png", cc.p(320,180), this, this.objOrder["bg"]);

        this.boss = new projSUS.Petrerus(this);
        this.boss.setPosition(320, 215);

        this.healer = new projSUS.Healer(this);
        this.warrior = new projSUS.Warrior(this);
        this.archer = new projSUS.Archer(this);

        this.warrior.setPosition(280,150);
        this.archer.setPosition(380,150);
        this.healer.setPosition(330,100);

        this.allies.push (this.healer);
        this.allies.push (this.warrior);
        this.allies.push (this.archer);

        projSUS.controller.setGameElements(this.hud, this.boss, this.healer, this.allies);
        this.scheduleUpdate();
    },

    update: function (dt) {
        this._super(dt);

    }
});