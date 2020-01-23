projSUS.IntroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.IntroLayer();
        this.addChild(this.layer);
        this.layer.init();
    }
});

projSUS.IntroLayer = cc.Layer.extend({
    init: function () {
        this._super();
        this.bg = pd.createSprite("main_bg.png", cc.p(320,180),this);

        this.nomeJogo = pd.labelBM(this, "MIRRILA", res.outline, "",1);
        this.nomeJogo.setPosition(320,250);
        this.nomeJogo.setColor(cc.color(255,255,255));

        this.texto = pd.labelBM(this, "TOQUE PARA INICIAR", "", "",1);
        this.texto.setPosition(320,125);
        this.texto.setColor(cc.color(255,255,255));

        cc.loader.loadJson("src/Save/SavedData.json", function (err, data) {
            if (!err) {
                projSUS.loadData(data);
            }
        });

        projSUS.input.addEventListener("onMouseDown","onMouseDown",this);
    },

    onMouseDown: function(e) {
        projSUS.input.removeEventListener(this);
        pd.changeScene(new projSUS.MainMenu(), 1, 0);
    }
});