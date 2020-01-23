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
        cc.log("new");

    }

});