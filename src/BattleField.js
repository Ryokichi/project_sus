projSUS.BattleField = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.BattleFieldLayer();
        this.addChild(this.layer);
        this.layer.init();
    }
});

projSUS.BattleFieldLayer = cc.Layer.extend({
    init: function () {
        cc.log("---");

        this.bg = pd.createSprite("bg.png", cc.p(320,180), this);

        this.spell_interface = new projSUS.GameInterface(this);

    }
});