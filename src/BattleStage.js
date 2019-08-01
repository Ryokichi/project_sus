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
        this.layer.setLocalZOrder(1000);

        this.boss = new projectSUS.Boss(this);
        this.boss.setPosition(130,205);

        this.char_selected = 0;
        this.char_list = [];
        this.char_list[0] = new projectSUS.Char(this, "char10.png", cc.p(250,150));
        this.char_list[1] = new projectSUS.Char(this, "char8.png",  cc.p(225,120));
        this.char_list[2] = new projectSUS.Char(this, "char6.png",  cc.p(285,140));
        this.char_list[3] = new projectSUS.Char(this, "char2.png",  cc.p(280,100));
        this.char_list[4] = new projectSUS.Char(this, "char12.png", cc.p(330,160));
        this.char_list[5] = new projectSUS.Char(this, "char3.png",  cc.p(325,125));
        this.char_list[6] = new projectSUS.Char(this, "char4.png",  cc.p(375,160));
        this.char_list[7] = new projectSUS.Char(this, "char9.png",  cc.p(380,120));
        this.char_list[8] = new projectSUS.Char(this, "char7.png",  cc.p(370,85));
        this.char_list[9] = new projectSUS.Char(this, "char5.png",  cc.p(430,130));


        var x = 5;
        var y = 27;
        var y_ini = y;
        this.char_btn =[];
        for (var i = 0; i < this.char_list.length; i++) {
            this.char_btn[i] = new cc.LayerColor(cc.color(130,200,200,0),47,18);
            this.char_btn[i].setPosition(x, y);
            this.addChild(this.char_btn[i], 1001);

            y -= 23;
            if (i % 2 == 1) {
                x += 52;
                y = y_ini;
            }
        }

        this.spell_list = [];
        for (var i = 0; i < 5; i++) {
            this.spell_list[i] = new cc.LayerColor(cc.color(200,200,200,100),30,30);
            this.addChild(this.spell_list[i], 1001);
        }
        this.spell_list[0].setPosition(375,12);
        this.spell_list[1].setPosition(420,12);
        this.spell_list[2].setPosition(470,12);
        this.spell_list[3].setPosition(515,12);
        this.spell_list[4].setPosition(575,12);

        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projectSUS.input.addEventListener("onKeyPressed", "onKeyPressed", this, 1);

        this.time_to_attack = 5;
        this.keys = [81,87,69,82];
        this.damage_time = 3;

        this.scheduleUpdate();

    },

    update: function(dt) {
        this.time_to_attack -= dt;
        this.damage_time -= dt;

        if (this.time_to_attack <=0) {
            this.time_to_attack = 2 + Math.random()*3;
            pd.shuffle(this.keys);
            cc.log(this.keys);
            this.onKeyPressed(this.keys[0]);
        }




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
                this.char_btn[i].setColor(cc.color(cc.color(200,200,200,0)));
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
        cc.log("chamou", key);
        if (key == 81) {
            var target = Math.ceil(Math.random()*893) % this.char_list.length;
            this.char_list[target].subtractLife(15);
            this.layer.updateCharLife(target, this.char_list[target]);
        }
        else if (key == 87) {
            var target = Math.ceil(Math.random()*893) % 2;
            this.char_list[target].subtractLife(20);
            this.layer.updateCharLife(target, this.char_list[target]);
        }
        else if (key == 69) {
            var target = Math.ceil(Math.random()*893) % this.char_list.length;
            this.char_list[target].subtractLife(15);
            this.layer.updateCharLife(target, this.char_list[target]);
        }
        else if (key == 82) {
            for (var i=0; i < this.char_list.length; i++) {
                this.char_list[i].subtractLife(20);
                this.layer.updateCharLife(target, this.char_list[target]);
            }
        }
    }
});