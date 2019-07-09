var Stage1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Stage1Layer();
        this.addChild(layer);
        layer.init();
    }
});

var Stage1Layer = cc.Layer.extend({
    init: function () {
        var size = cc.director.getWinSize();
        var middle = cc.p(size.width/2, size.height/2);

        pd.createSprite(res.bg, middle, this, -1);

        this.runAction(cc.sequence(
            cc.delayTime(3),
            cc.callFunc(function () {
                type_num ++;
                pd.changeScene(new projectSUS.MainScene(), 1, 0);
            }, this)
        ))
    },
});