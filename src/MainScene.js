projectSUS.MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new projectSUS.MainLayer();
        this.addChild(layer);
        layer.init();
    }
});

projectSUS.MainLayer = cc.Layer.extend({
    init: function () {
        this.is_paused = false;

        this.bg = pd.createSprite(res.main_bg, cc.p(320, 180), this);
        this.btn_1 = pd.createSprite("btn120x40_n.png", cc.p(70,330), this);
        this.btn_2 = pd.createSprite("btn120x40_n.png", cc.p(70,270), this);

        this.btn_opt = pd.createSprite("btn_opt.png", cc.p(615,335), this);

        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
    },

    onMouseDown: function (e) {
        if (this.is_paused)
            return;

        if (cc.rectContainsPoint(this.btn_1.getBoundingBox(), e.getLocation())){
            this.pauseControl();
            new projectSUS.SpellBookLayer(this);
            // this.addChild(spel_b, 1000);
        }
        else if (cc.rectContainsPoint(this.btn_2.getBoundingBox(), e.getLocation())){

        }
        else if (cc.rectContainsPoint(this.btn_opt.getBoundingBox(), e.getLocation())){
            this.pauseControl();
            new projectSUS.OptionsLayer(this);
        }
    },

    pauseControl: function () {
        this.is_paused = true;
    },

    resumeControl: function () {
        this.is_paused = false;
    },

});


///todo  Animated button, Static button e button padrao

