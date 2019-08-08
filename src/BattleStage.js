projectSUS.BattleScene_old = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projectSUS.BattleLayer_old();
        this.addChild(this.layer);
        this.layer.init();
    }
});

projectSUS.BattleLayer_old = cc.Layer.extend({
    init: function () {
        var size = cc.director.getWinSize();

        this.time_to_attack = 5;
        this.keys = [81,87,69,82];
        this.damage_time = 0.3;

        this.bg = pd.createSprite("bg_2.png", cc.p(320,180), this);
        this.gui = new projectSUS.GameInterface(this);

        this.boss = new projectSUS.Boss(this);
        this.boss.setInitialLife(1500);
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

        var x = 10;
        var y = 29;
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
        this.spell_list[0].setPosition(385,14);
        this.spell_list[1].setPosition(430,14);
        this.spell_list[2].setPosition(480,14);
        this.spell_list[3].setPosition(525,14);
        this.spell_list[4].setPosition(585,14);

        this.spell_list[0].cd = 0;
        this.spell_list[1].cd = 0;
        this.spell_list[2].cd = 6;
        this.spell_list[3].cd = 10;
        this.spell_list[4].cd = 60;

        this.spell_list[0].timer = 0;
        this.spell_list[1].timer = 0;
        this.spell_list[2].timer = 0;
        this.spell_list[3].timer = 0;
        this.spell_list[4].timer = 0;

        this.spell_list[0].timer_label = pd.label(this.spell_list[0], "0", 1, 1);
        this.spell_list[1].timer_label = pd.label(this.spell_list[1], "0", 1, 1);
        this.spell_list[2].timer_label = pd.label(this.spell_list[2], "0", 1, 1);
        this.spell_list[3].timer_label = pd.label(this.spell_list[3], "0", 1, 1);
        this.spell_list[4].timer_label = pd.label(this.spell_list[4], "0", 1, 1);

        this.spell_list[0].timer_label.setDimensions(20,40);
        this.spell_list[1].timer_label.setDimensions(20,40);
        this.spell_list[2].timer_label.setDimensions(20,40);
        this.spell_list[3].timer_label.setDimensions(20,40);
        this.spell_list[4].timer_label.setDimensions(20,40);

        this.spell_list[0].timer_label.setPosition(0,20);
        this.spell_list[1].timer_label.setPosition(0,20);
        this.spell_list[2].timer_label.setPosition(0,20);
        this.spell_list[3].timer_label.setPosition(0,20);
        this.spell_list[4].timer_label.setPosition(0,20);


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

        this.boss_target = null;
        this.boss_attack_num = 0;
        this.boss_attack_code = null;

        cc.audioEngine.playMusic(res.bmg, true);
    },

    update: function(dt) {
        if (this.boss.life <= 0) {
            this.unscheduleUpdate();
            cc.audioEngine.playEffect(res.sfx_boss, false);
            alert("Boss morreu")
        }

        this.time_to_attack -= dt;
        this.damage_time -= dt;
        this.mana_time -= dt;

        for (var i = 0; i < this.spell_list.length; i++) {
            if (this.spell_list[i].timer > 0) {
                this.spell_list[i].timer -= dt;
                this.spell_list[i].setColor(cc.color(50,50,50,100));
            }
            else {
                this.spell_list[i].timer = 0;
                this.spell_list[i].setColor(cc.color(200,200,200,100));
            }
            this.spell_list[i].timer_label.setString(this.spell_list[i].timer.toFixed(1))
        }

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
            this.onKeyPressed(this.boss_attack_code, null, this.boss_target);
            this.boss_attack_num = Math.floor(Math.random() * 1000);

            if (this.boss_attack_num < 500) {
                this.time_to_attack = 2;
                this.boss_target = 0;
                this.boss_attack_code = 81;
                cc.log("Vou bater 20 no ", this.boss_target, " em:", this.time_to_attack);
            }
            else if (this.boss_attack_num < 800) {
                this.time_to_attack = 2;
                this.boss_target = 1;
                this.boss_attack_code = 81;
                cc.log("Vou bater 20 no ", this.boss_target, " em:", this.time_to_attack);
            }
            else if (this.boss_attack_num < 950) {
                this.time_to_attack = 2;
                this.boss_target = Math.floor(2+(Math.random()*987)%8);
                this.boss_attack_code = 69;
                cc.log("Vou bater 60 no ", this.boss_target, " em:", this.time_to_attack);
            }
            else {
                this.time_to_attack = 2;
                this.boss_target = "all";
                this.boss_attack_code = 82;
                cc.log("Vou bater 35 em todos em:", this.time_to_attack);
            }

            this.gui.setNewTarget(this.boss_target);
        }

        if (this.magic_data.target != null) {
            this.cast_time += dt;

            if (this.cast_time >= this.magic_data.magic_ct){
                this.cast_time = this.magic_data.magic_ct;
            }

            this.gui.updateCastBar(this.cast_time, this.magic_data.magic_ct);

            if (this.cast_time === this.magic_data.magic_ct) {
                this.spell_list[this.magic_data.magic_id].timer = this.spell_list[this.magic_data.magic_id].cd;

                if (this.magic_data.magic_id == 0) cc.audioEngine.playEffect(res.sfx_spell_1, false);
                else if (this.magic_data.magic_id == 1) cc.audioEngine.playEffect(res.sfx_spell_2, false);
                else if (this.magic_data.magic_id == 2) cc.audioEngine.playEffect(res.sfx_spell_3, false);
                else if (this.magic_data.magic_id == 3) cc.audioEngine.playEffect(res.sfx_spell_4, false);
                else if (this.magic_data.magic_id == 4) cc.audioEngine.playEffect(res.sfx_spell_5, false);

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

                this.gui.hideCastBar();
            }
        }
    },

    onMouseDown: function (e) {
        var has_selection = false;

        for (var i = 0; i < this.char_btn.length; i++) {
            if (cc.rectContainsPoint(this.char_btn[i].getBoundingBox(), e.getLocation())) {
                if (this.hero_list[i].life > 0) {
                    has_selection = true;
                    this.char_selected = i;
                }
            }
        }
        if (has_selection) {
            cc.audioEngine.playEffect(res.click, false);

            for (var i = 0; i < this.char_btn.length; i++) {
                this.char_btn[i].setColor(cc.color(cc.color(200,200,200,0)));
                this.hero_list[i].setScale(1);
            }
            this.char_btn[this.char_selected].setColor(cc.color(200,100,100,100));
            this.hero_list[this.char_selected].setScale(1.3);
            this.gui.setNewSelection(this.char_selected);
        }

        if (this.magic_data.magic_id != null) return;
        if (cc.rectContainsPoint(this.spell_list[0].getBoundingBox(), e.getLocation())) {
            if (this.mana >=30 && this.spell_list[0].timer <= 0) {
                this.magic_data.magic_id = 0;
                // this.cast_time = 0.1;
                this.magic_data.magic_ct = 2.5;
                this.magic_data.mana_cost = 10;
                this.magic_data.heal = 25;
                this.magic_data.target = this.char_selected;

                this.mana -= 10;
                this.gui.showCastBar();
            }
        }
        else if (cc.rectContainsPoint(this.spell_list[1].getBoundingBox(), e.getLocation())) {
            if (this.mana >=5 && this.spell_list[1].timer <= 0) {
                this.magic_data.magic_id = 1;
                // this.cast_time = 1;
                this.magic_data.magic_ct = 1;
                this.magic_data.mana_cost = 20;
                this.magic_data.heal = 25;
                this.magic_data.target = this.char_selected;

                this.mana -= 20;
                this.gui.showCastBar();
            }
        }
        else if (cc.rectContainsPoint(this.spell_list[2].getBoundingBox(), e.getLocation())) {
            if (this.mana >=10 && this.spell_list[2].timer <= 0) {
                this.magic_data.magic_id = 2;
                // this.cast_time = 1.8;
                this.magic_data.magic_ct = 1.5;
                this.magic_data.mana_cost = 20;
                this.magic_data.heal = 60;
                this.magic_data.target = this.char_selected;

                this.mana -= 20;
                this.gui.showCastBar();
            }
        }
        else if (cc.rectContainsPoint(this.spell_list[3].getBoundingBox(), e.getLocation())) {
            if (this.mana >= 25 && this.spell_list[3].timer <= 0) {
                this.magic_data.magic_id = 3;
                // this.cast_time = 2.3;
                this.magic_data.magic_ct = 0;
                this.magic_data.mana_cost = 75;
                this.magic_data.heal = 25;
                this.magic_data.target = "all";

                this.mana -= 75;
                this.gui.showCastBar();
            }
        }
        else if (cc.rectContainsPoint(this.spell_list[4].getBoundingBox(), e.getLocation())) {
            if (this.spell_list[4].timer <= 0) {
                this.magic_data.magic_id = 4;
                // this.cast_time = 10;
                this.magic_data.magic_ct = 3;
                this.magic_data.mana_cost = 0;
                this.magic_data.heal = 100;
                this.magic_data.target = "all";
                this.gui.showCastBar();
            }
        }
        this.gui.updatePlayerMana(this.mana, this.max_mana);

    },

    onKeyPressed: function (key, e, target) {
        if (key == 81) {
            // var target = Math.ceil(Math.random()*893) % this.hero_list.length;
            this.hero_list[target].subtractLife(20);
            this.gui.updateCharLife(target, this.hero_list[target]);
            cc.audioEngine.playEffect(res.sfx_hit_1, false);
        }
        else if (key == 87) {
            // var target = Math.ceil(Math.random()*893) % 2;
            this.hero_list[target].subtractLife(20);
            this.gui.updateCharLife(target, this.hero_list[target]);
            cc.audioEngine.playEffect(res.sfx_hit_2, false);
        }
        else if (key == 69) {
            // var target = Math.ceil(Math.random()*893) % this.hero_list.length;
            this.hero_list[target].subtractLife(60);
            this.gui.updateCharLife(target, this.hero_list[target]);
            cc.audioEngine.playEffect(res.sfx_hit_3, false);
        }
        else if (key == 82) {
            for (var i=0; i < this.hero_list.length; i++) {
                this.hero_list[i].subtractLife(35);
                this.gui.updateCharLife(i, this.hero_list[i]);
                cc.audioEngine.playEffect(res.sfx_hit_4, false);
            }
        }
    }
});