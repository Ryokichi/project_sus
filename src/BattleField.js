projectSUS.BattleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projectSUS.BattleLayer();
        this.addChild(this.layer);
        this.layer.init();
    }
});

projectSUS.BattleLayer = cc.Layer.extend({
    init: function () {
        this.bg   = pd.createSprite("bg.png", cc.p(320,180), this);
        this.gui  = new projectSUS.GameInterface(this);
        this.boss = new projectSUS.current_boss(this);
        this.boss.setPosition(320, 180);

        this.hero_list = [];
        this.hero_list[0] = new projectSUS.Hero(this, "char10.png", cc.p(250,150));
        this.hero_list[1] = new projectSUS.Hero(this, "char8.png",  cc.p(225,120));
        this.hero_list[2] = new projectSUS.Hero(this, "char6.png",  cc.p(285,140));
        this.hero_list[3] = new projectSUS.Hero(this, "char2.png",  cc.p(280,100));
        this.hero_list[4] = new projectSUS.Hero(this, "char12.png", cc.p(330,160));
        this.hero_list[5] = new projectSUS.Hero(this, "char3.png",  cc.p(325,125));
        this.hero_list[6] = new projectSUS.Hero(this, "char4.png",  cc.p(375,160));
        this.hero_list[7] = new projectSUS.Hero(this, "char9.png",  cc.p(380,120));
        this.hero_list[8] = new projectSUS.Hero(this, "char7.png",  cc.p(370, 85));
        this.hero_list[9] = new projectSUS.Hero(this, "char5.png",  cc.p(430,130));
        this.gui.informWhoIsPlayer(9);

    }
});