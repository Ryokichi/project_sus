var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
        layer.init();
    }
});
var type_num = 0;



gamename = {};

var MainLayer = cc.Layer.extend({
    init: function () {
        this._super();
        gamename.input = new myGameInput();

        var size = cc.director.getWinSize();

        this.bg = gb.createSprite(res.main_bg, cc.p(size.width/2, size.height/2), this);
        this.bg.setScale(1.5);

        this.btn_start = gb.createButtonFromPlist("btn_start_", this, 10);
        this.btn_start.setPosition(size.width/2, size.height/1.5);
        this.btn_start.addClickEventListener(this.startGame, this);

        this.btn_options = gb.createButtonFromPlist("btn_opt_", this, 10);
        this.btn_options.setPosition(size.width/2, size.height/4);
        this.btn_options.addClickEventListener(this.goOptions, ["1", "2"]);

        this.test = gb.createButtonFromLocal(res.close_btn, res.close_btn_p, "", this, 0);
        this.test.setPosition(100,100);
    },

    startGame: function () {
        if (type_num <= 15) {
            gb.changeScene(new BattleScene(), 1, type_num);
        }
    },

    goOptions: function (alpha, beta, charlie) {
        cc.log("Ir para opções");
        cc.log(alpha);
        cc.log(beta);
        cc.log(charlie);
    }
});