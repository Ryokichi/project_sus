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
        var size = cc.director.getWinSize();

        this.time_to_attack = 5;
        this.keys = [81,87,69,82];
        this.damage_time = 0.3;

        this.bg = pd.createSprite("bg.png", cc.p(320,180), this);
        this.gui = new projectSUS.GameInterface(this);

        this.boss = new projectSUS.Boss(this);
        this.boss.setInitialLife(10000);
        this.boss.setPosition(-800,-800);

        this.char_selected = 0;
        this.hero_list = [];
        this.hero_list[0] = new projectSUS.Hero(this, "char10.png", cc.p(250,150));
        this.hero_list[1] = new projectSUS.Hero(this, "char8.png",  cc.p(225,120));
        this.hero_list[2] = new projectSUS.Hero(this, "char6.png",  cc.p(285,140));
        this.hero_list[3] = new projectSUS.Hero(this, "char2.png",  cc.p(280,100));
        this.hero_list[4] = new projectSUS.Hero(this, "char12.png", cc.p(330,160));
        this.hero_list[5] = new projectSUS.Hero(this, "char3.png",  cc.p(325,125));
        this.hero_list[6] = new projectSUS.Hero(this, "char4.png",  cc.p(375,160));
        this.hero_list[7] = new projectSUS.Hero(this, "char9.png",  cc.p(380,120));
        this.hero_list[8] = new projectSUS.Hero(this, "char7.png",  cc.p(370,85));
        this.hero_list[9] = new projectSUS.Hero(this, "char5.png",  cc.p(430,130));

        this.gui.informWhoIsPlayer(9);

        var x = 5;
        var y = 27;
        var y_ini = y;
        this.char_btn =[];
        for (var i = 0; i < this.hero_list.length; i++) {
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


        this.mana_time = 1;
        this.mana = 300;
        this.max_mana = this.mana;

        this.cast_time = 0;
        this.magic_data = {
            magic_id: null,
            magic_ct: 0,
            target: null,
            mana_cost: 0,
            heal: 0
        };

        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
        projectSUS.input.addEventListener("onKeyPressed", "onKeyPressed", this, 1);
        this.scheduleUpdate();
    },

    update: function(dt) {
        this.time_to_attack -= dt;
        this.damage_time -= dt;
        this.mana_time -= dt;

        if (this.mana_time <= 0) {
            this.mana_time = 1;
            this.mana += 2.5;
            if (this.mana > this.max_mana) this.mana = this.max_mana;
            this.gui.updatePlayerMana(this.mana, this.max_mana);
        }

        if (this.damage_time <= 0) {
            this.damage_time = 0.3;
            this.boss.subtractLife(5);
            this.gui.updateBossLife(this.boss.getLifePerc());
        }

        if (this.time_to_attack <=0) {
            this.time_to_attack = 2 + Math.random()*3;
            pd.shuffle(this.keys);
            this.onKeyPressed(this.keys[0]);
        }

        if (this.magic_data.target != null) {
            this.cast_time += dt;

            if (this.cast_time >= this.magic_data.magic_ct){
                this.cast_time = this.magic_data.magic_ct;
            }

            this.gui.updateCastBar(this.cast_time, this.magic_data.magic_ct);

            if (this.cast_time === this.magic_data.magic_ct) {
                console.log(this.cast_time,"***",this.magic_data.magic_ct);

                var target = this.magic_data.target;
                var heal   = this.magic_data.heal;

                if (target == "all") {
                    for (var i = 0; i < this.hero_list.length; i++) {
                        this.hero_list[i].addLife(heal);
                        this.gui.updateCharLife(i, this.hero_list[i]);
                    }
                } else {
                    this.hero_list[target].addLife(heal);
                    this.gui.updateCharLife(target, this.hero_list[target]);
                }

                this.cast_time = 0;
                this.magic_data.heal = 0;
                this.magic_data.mana_cost = 0;
                this.magic_data.target   = null;
                this.magic_data.magic_id = null;
                this.magic_data.magic_ct = 0;
            }
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
                this.hero_list[i].setScale(1);
            }
            this.char_btn[this.char_selected].setColor(cc.color(200,100,100,100));
            this.hero_list[this.char_selected].setScale(1.3);
        }

        if (cc.rectContainsPoint(this.spell_list[0].getBoundingBox(), e.getLocation())) {
            if (this.mana >=30) {
                this.magic_data.magic_id = 0;
                // this.cast_time = 0.1;
                this.magic_data.magic_ct = 0.1;
                this.magic_data.mana_cost = 30;
                this.magic_data.heal = 20;
                this.magic_data.target = this.char_selected;

                this.mana -= 30;
            }
        }
        else if (cc.rectContainsPoint(this.spell_list[1].getBoundingBox(), e.getLocation())) {
            if (this.mana >=5) {
                this.magic_data.magic_id = 1;
                // this.cast_time = 1;
                this.magic_data.magic_ct = 1;
                this.magic_data.mana_cost = 5;
                this.magic_data.heal = 10;
                this.magic_data.target = this.char_selected;

                this.mana -= 5;
            }
        }
        else if (cc.rectContainsPoint(this.spell_list[2].getBoundingBox(), e.getLocation())) {
            if (this.mana >=10) {
                this.magic_data.magic_id = 2;
                // this.cast_time = 1.8;
                this.magic_data.magic_ct = 1.8;
                this.magic_data.mana_cost = 10;
                this.magic_data.heal = 35;
                this.magic_data.target = this.char_selected;

                this.mana -= 10;
            }
        }
        else if (cc.rectContainsPoint(this.spell_list[3].getBoundingBox(), e.getLocation())) {
            if (this.mana >= 25) {
                this.magic_data.magic_id = 3;
                // this.cast_time = 2.3;
                this.magic_data.magic_ct = 2.3;
                this.magic_data.mana_cost = 25;
                this.magic_data.heal = 20;
                this.magic_data.target = "all";

                this.mana -= 25;
            }
        }
        else if (cc.rectContainsPoint(this.spell_list[4].getBoundingBox(), e.getLocation())) {
            this.magic_data.magic_id = 4;
            // this.cast_time = 10;
            this.magic_data.magic_ct = 10;
            this.magic_data.mana_cost = 0;
            this.magic_data.heal = 100;
            this.magic_data.target = "all";
        }
        this.gui.updatePlayerMana(this.mana, this.max_mana);

    },

    onKeyPressed: function (key, e) {
        if (key == 81) {
            var target = Math.ceil(Math.random()*893) % this.hero_list.length;
            this.hero_list[target].subtractLife(15);
            this.gui.updateCharLife(target, this.hero_list[target]);
        }
        else if (key == 87) {
            var target = Math.ceil(Math.random()*893) % 2;
            this.hero_list[target].subtractLife(20);
            this.gui.updateCharLife(target, this.hero_list[target]);
        }
        else if (key == 69) {
            var target = Math.ceil(Math.random()*893) % this.hero_list.length;
            this.hero_list[target].subtractLife(15);
            this.gui.updateCharLife(target, this.hero_list[target]);
        }
        else if (key == 82) {
            for (var i=0; i < this.hero_list.length; i++) {
                this.hero_list[i].subtractLife(20);
                this.gui.updateCharLife(i, this.hero_list[i]);
            }
        }
    }
});