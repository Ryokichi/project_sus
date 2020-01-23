projSUS.Level_2 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.Level_2_Layer();
        this.addChild(this.layer);
    }
});

projSUS.Level_2_Layer = projSUS.BattleFieldLayer.extend({
    init: function () {
        this._super();
    }
});