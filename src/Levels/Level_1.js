projSUS.Level_1 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.Level_1_Layer();
        this.addChild(this.layer);
    }
});

projSUS.Level_1_Layer = projSUS.BattleFieldLayer.extend({
    init: function () {
        this._super();

        this.bar = new pd.ComplexBar("boss_health_interface.png", "boss_health_bar.png", this);
        this.bar. setPosition(300,100);

    }
});