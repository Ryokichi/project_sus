projectSUS.PartySelectionScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new projectSUS.PartySelectionLayer();
        this.addChild(layer);
        layer.init();
    }
});

projectSUS.PartySelectionLayer = cc.Layer.extend({
    init: function () {
        this.bg = new cc.LayerColor(cc.color(150,150,50));
        this.addChild(this.bg, -1);

        this.grupo = [];

        this.grupo.push(pd.createSprite("grupo1.png", cc.p(320, 300), this));
        this.grupo.push(pd.createSprite("grupo2.png", cc.p(320, 200), this));
        this.grupo.push(pd.createSprite("grupo3.png", cc.p(320, 100), this));

        this.go_btn = new cc.LayerColor(cc.color(255,255,255),40,40);
        this.go_btn.setPosition(595,5);
        this.addChild(this.go_btn);

        this.go_txt = pd.label(this.go_btn, "Go", 1, 1);
        this.go_txt.setPosition(20,20);


        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
    },

    onMouseDown: function (e) {
        if (cc.rectContainsPoint(this.go_btn.getBoundingBox(), e.getLocation())){
            projectSUS.input.removeEventListener(this);
            pd.changeScene(new projectSUS.BattleScene, 1, 0);
        }
    }

});