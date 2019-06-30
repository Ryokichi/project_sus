var BattleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BattleLayer();
        this.addChild(layer);
        layer.init();
    }
});

var BattleLayer = cc.Layer.extend({
    init: function () {
        var size = cc.director.getWinSize();
        var middle = cc.p(size.width/2, size.height/2);

        gb.createSprite(res.bg, middle, this, -1);

        this.skill_1 = gb.createSprite("cura1.png", cc.p(100,100), this, 1);
        this.skill_2 = gb.createSprite("cura2.png", cc.p(200,100), this, 1);
        this.skill_3 = gb.createSprite("cura3.png", cc.p(300,100), this, 1);


        gb.addMouseEvent(this.skill_1);
        // gb.addMouseEvent(this.skill_2);
        // gb.addMouseEvent(this.skill_3);



    },
});