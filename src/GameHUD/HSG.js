projSUS.HSG = cc.Node.extend({
    ctor:function(){
        this._super();
    },
    generateString:function(color, value, y){
        var size = 10 + (Math.sqrt(value/20));
        var string = new cc.LabelTTF(value, "Arial", size);
        string.setScale(0);
        string.setAnchorPoint(0.5, 0);
        this.addChild(string);
        string.setFontFillColor(color);
        string.enableStroke(cc.color(0, 0, 0), 1);
        string.runAction(cc.sequence(
            cc.spawn(cc.fadeIn(0.1),
                cc.scaleTo(0.1, 1),
                cc.moveBy(0.6, 0, y)),
            cc.fadeOut(0.2),
            cc.removeSelf()
        ));
    },
});