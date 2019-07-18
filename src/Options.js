projectSUS.OptionsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new projectSUS.OptionsLayer();
        this.addChild(layer);
        layer.init();
    }
});

projectSUS.OptionsLayer = cc.Layer.extend({
    init: function () {
        this.sound_lvl = 100;
        this.selected_lang = 0;
        this.difficult = 0;

        this.bg = new cc.LayerColor(cc.color(150,150,150));
        this.addChild(this.bg);
    }
});