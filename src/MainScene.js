projSUS = {};
projSUS.input = new pd.gameInput();

projSUS.MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.MainLayer();
        this.addChild(this.layer);
        this.layer.init();
    }
});

projSUS.MainLayer = cc.Layer.extend({
    init: function () {
        this._super();

        this.setColor(150,200,30,255);

        projSUS.input.addEventListener("onMouseDown","onMouseDown",this);
        this.nomeJogo = pd.label(this, "Projeto_SUS",0,1);
        this.nomeJogo.setDimensions(640,0);
        this.nomeJogo.setPosition(0,300);
        this.nomeJogo.setFontSize(60);
        this.nomeJogo.setFontFillColor(cc.color(150,150,150,255));

        this.texto = pd.label(this, "TOQUE PARA INICIAR",0,1);
        this.texto.setDimensions(cc.size(640,0));
        this.texto.setPosition(0,150);
        this.texto.setFontSize(25);
        this.texto.setFontFillColor(cc.color(150,150,150,255));
    },

    onMouseDown: function(e) {
        projSUS.input.removeEventListener(this);
        pd.changeScene(new projSUS.MainMenu(), 1, 0);
    }
});