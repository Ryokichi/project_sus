projectSUS.BattleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new projectSUS.BattleLayer();
        this.addChild(layer);
        layer.init();
    }
});

projectSUS.BattleLayer = cc.Layer.extend({
    init: function () {
        var size = cc.director.getWinSize();

        // this.bg = new cc.LayerColor(cc.color("#ffffff"));
        // this.addChild(this.bg, -1);
        this.bg = pd.createSprite("bg.png", cc.p(320,180), this);
        // this.layer = pd.createSprite("game_interface.png", cc.p(320,180), this);
        this.layer = new projectSUS.GameInterface(this);

        this.char_selected = 0;

        this.char_list = [];
        this.char_list[0] = new projectSUS.Char(this, "char6.png", cc.p(200,150));
        this.char_list[1] = new projectSUS.Char(this, "char10.png", cc.p(250,150));
        this.char_list[2] = new projectSUS.Char(this, "char8.png", cc.p(350,150));
        this.char_list[3] = new projectSUS.Char(this, "char2.png", cc.p(450,150));
        this.char_list[4] = new projectSUS.Char(this, "char12.png", cc.p(500,150));
        this.char_list[5] = new projectSUS.Char(this, "char3.png", cc.p(200,100));
        this.char_list[6] = new projectSUS.Char(this, "char4.png", cc.p(300,100));
        this.char_list[7] = new projectSUS.Char(this, "char5.png", cc.p(400,100));


        this.char_btn =[];
        for (var i = 0; i < this.char_list.length; i++) {
            this.char_btn[i] = new cc.LayerColor(cc.color(130,200,200,100),56,20);
            this.addChild(this.char_btn[i]);
        }
        this.char_btn[0].setPosition(5,25);
        this.char_btn[1].setPosition(64,25);
        this.char_btn[2].setPosition(123,25);
        this.char_btn[3].setPosition(182,25);
        this.char_btn[4].setPosition(241,25);
        this.char_btn[5].setPosition(5,3);
        this.char_btn[6].setPosition(64,3);
        this.char_btn[7].setPosition(123,3);

        this.spell_list = [];
        for (var i = 0; i < 5; i++) {
            this.spell_list[i] = new cc.LayerColor(cc.color(200,200,200,100),30,30);
            this.addChild(this.spell_list[i]);
        }
        this.spell_list[0].setPosition(328,10);
        this.spell_list[1].setPosition(369,10);
        this.spell_list[2].setPosition(415,10);
        this.spell_list[3].setPosition(464,10);
        this.spell_list[4].setPosition(537,10);

        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projectSUS.input.addEventListener("onKeyPressed", "onKeyPressed", this, 1);

    },

    onMouseDown: function (e) {
        var has_selection = false;

        for (var i = 0; i < this.char_btn.length; i++) {
            if (cc.rectContainsPoint(this.char_btn[i].getBoundingBox(), e.getLocation())) {
                has_selection = true;
                this.char_selected = i;
            }
        }
        if (has_selection) {
            for (var i = 0; i < this.char_btn.length; i++) {
                this.char_btn[i].setColor(cc.color(cc.color(200,200,200,100)));
                this.char_list[i].setScale(1);
            }
            this.char_btn[this.char_selected].setColor(cc.color(200,100,100,100));
            this.char_list[this.char_selected].setScale(1.3);
        }

        if (cc.rectContainsPoint(this.spell_list[0].getBoundingBox(), e.getLocation())) {
            this.char_list[this.char_selected].addLife(5);
        }
        else if (cc.rectContainsPoint(this.spell_list[1].getBoundingBox(), e.getLocation())) {
            this.char_list[this.char_selected].addLife(10);
        }
        else if (cc.rectContainsPoint(this.spell_list[2].getBoundingBox(), e.getLocation())) {
            this.char_list[this.char_selected].addLife(20);
        }
        else if (cc.rectContainsPoint(this.spell_list[3].getBoundingBox(), e.getLocation())) {
            this.char_list[this.char_selected].addLife(30);
        }
        else if (cc.rectContainsPoint(this.spell_list[4].getBoundingBox(), e.getLocation())) {
            for (var i=0; i < this.char_list.length; i++) {
                this.char_list[i].addLife(100);
            }
        }

    },

    onKeyPressed: function (key, e) {
        if (key == 81) {
            var target = Math.ceil(Math.random()*893) % this.char_list.length;
            this.char_list[target].subtractLife(15);
        }
        else if (key == 87) {
            var target = Math.ceil(Math.random()*893) % 2;
            this.char_list[target].subtractLife(20);
        }
        else if (key == 69) {
            var target = Math.ceil(Math.random()*893) % this.char_list.length;
            this.char_list[target].subtractLife(15);
        }
        else if (key == 82) {
            for (var i=0; i < this.char_list.length; i++) {
                this.char_list[i].subtractLife(20);
            }
        }
    }
});