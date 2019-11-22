delegate = new projSUS.Delegate();

projSUS.MainMenu = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.MainMenuLayer();
        this.addChild(this.layer);
        this.layer.init();
    }
});

projSUS.MainMenuLayer = cc.Layer.extend({
    init: function () {
        this._super();
        projSUS.input.addEventListener("onMouseDown", "onMouseDown", this);

        this.bg = pd.createSprite("main_bg.png", cc.p(320,180),this);
        this.btn_start = pd.createSprite("btn_start_n.png", cc.p(320,270), this);
        this.btn_opt = pd.createSprite("btn_opt_n.png", cc.p(320,90), this);
    },

    onMouseDown: function (e) {
        if (cc.rectContainsPoint(this.btn_start.getBoundingBox(), e.getLocation())) {
            projSUS.input.removeEventListener(this);
            pd.changeScene(new projSUS.MapScene(), 1, 0);
        }
        else if (cc.rectContainsPoint(this.btn_opt.getBoundingBox(), e.getLocation())) {
            projSUS.input.removeEventListener(this);
        }
    }
});