// delegate = new projSUS.Delegate();

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
        // this.btn_start = pd.createSprite("btn_start_n.png", cc.p(320,270), this);
        // this.btn_opt = pd.createSprite("btn_opt_n.png", cc.p(320,90), this);

        this.btn1 = pd.createSprite("btn120x40_n.png", cc.p(320,270), this);
        this.btn2 = pd.createSprite("btn120x40_n.png", cc.p(320,200), this);
        this.btn3 = pd.createSprite("btn120x40_n.png", cc.p(320,130), this);
        this.btn4 = pd.createSprite("btn120x40_n.png", cc.p(320, 60), this);

        this.txt1 = pd.labelBM(this.btn1, "NEW GAME", res.OperatorSC);
        this.txt1.setPosition(60,20);
        this.txt1.setScale(0.8);
        this.txt1.setColor(cc.color(0,0,0));
        this.txt2 = pd.labelBM(this.btn2, "LOAD GAME", res.OperatorSC);
        this.txt2.setPosition(60,20);
        this.txt2.setScale(0.8);
        this.txt2.setColor(cc.color(0,0,0));
        this.txt3 = pd.labelBM(this.btn3, "SETTINGS", res.OperatorSC);
        this.txt3.setPosition(60,20);
        this.txt3.setScale(0.8);
        this.txt3.setColor(cc.color(0,0,0));
        this.txt4 = pd.labelBM(this.btn4, "CREDITS", res.OperatorSC);
        this.txt4.setPosition(60,20);
        this.txt4.setScale(0.8);
        this.txt4.setColor(cc.color(0,0,0));
    },

    onMouseDown: function (e) {
        if (cc.rectContainsPoint(this.btn1.getBoundingBox(), e.getLocation())) {
            projSUS.input.removeEventListener(this);
            pd.changeScene(new projSUS.MapScene(), 1, 0);
        }
        else if (cc.rectContainsPoint(this.btn3.getBoundingBox(), e.getLocation())) {
            projSUS.input.removeEventListener(this);
            this.settings = new projSUS.SettingsLayer(this);
        }
    },

    resumeControl: function () {
        projSUS.input.addEventListener("onMouseDown","onMouseDown",this);
    }
});