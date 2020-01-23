projSUS.BattleFieldLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.boss = null;
        this.healer = null;
        this.allies = [];

        this.hud = new projSUS.BattleHUD(this);

    }
});