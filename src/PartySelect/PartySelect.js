projectSUS.PartySelection = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new projectSUS.PartySelection();
        this.addChild(layer);
        layer.init();
    }
});

projectSUS.PartySelection = cc.Layer.extend({
    init: function () {
        
    }

});