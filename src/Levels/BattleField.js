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

        this.selection = pd.createSprite(res.selection, cc.p(0,0), this);

    },

    update: function (dt) {
        cc.log("está rodando")

    }


});