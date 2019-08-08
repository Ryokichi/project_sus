projectSUS.GameInterface = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this, 1000);

        this.bg = pd.createSprite("interface_background.png", cc.p(320,25), this);

        this.mana_frame = pd.createSprite("player_mana_interface.png", cc.p(320,10), this);
        this.mana_bar   = pd.createSprite("player_mana_bar.png", cc.p(276,10), this);
        this.mana_bar.setAnchorPoint(0.0, 0.5);
        this.mana_label = pd.label(this, "0/0", 1, 1);
        this.mana_label.setPosition(320,7);
        this.mana_label.setFontFillColor(cc.color(255,255,255,255));
        this.mana_label.setDimensions(92,15);
        this.mana_label.setAnchorPoint(0.5,0.5);

        this.life_frame = pd.createSprite("player_health_interface.png", cc.p(320,26), this);
        this.life_bar   = pd.createSprite("player_health_bar.png", cc.p(276,26), this);
        this.life_bar.setAnchorPoint(0.0, 0.5);

        this.cast_frame = pd.createSprite("cast_interface.png", cc.p(320,60), this);
        this.cast_bar   = pd.createSprite("cast_bar.png", cc.p(14,1), this.cast_frame);
        this.cast_bar.setScaleX(1);
        this.cast_bar.setAnchorPoint(0,0);
        this.cast_time_label = pd.label(this.cast_frame, "0", 1, 1);
        this.cast_time_label.setPosition(45,4);
        this.cast_time_label.setDimensions(92,15);
        this.cast_time_label.setAnchorPoint(0.5,0.5);

        this.cast_frame.setCascadeOpacityEnabled(true);
        this.cast_frame.setOpacity(0);

        this.boss_life_frame = pd.createSprite("boss_health_interface.png", cc.p(320,340), this);
        this.boss_life_bar = pd.createSprite("boss_health_bar.png", cc.p(3,3), this.boss_life_frame);
        this.boss_life_bar.setAnchorPoint(0,0);
        this.boss_icon_frame = pd.createSprite("boss_health_icon.png", cc.p(-6,9), this.boss_life_frame);

        this.char_list = [];
        var x = 11;
        var y = 32;
        var y_ini = y;

        var char_bg;
        for (var i = 0; i < 10; i++) {
            this.char_list[i] = pd.createSprite("party_hp_bar.png", cc.p(x,y), this, 2);
            this.char_list[i].setAnchorPoint(0,0);

            char_bg = pd.createSprite("party_hp_interface.png", cc.p(x-1, y-1), this, 1);
            char_bg.setAnchorPoint(0,0);

            this.char_list[i].bg = pd.createSprite("party_interface_unselected.png", cc.p(x+22, y+6), this, 0);
            this.char_list[i].frame = pd.createSprite("party_interface_background.png", cc.p(x+22, y+6), this, 2);

            y -= 23;
            if (i % 2 == 1) {
                x += 52;
                y = y_ini;
            }

            // this.char_list[i].setColor(cc.color(0,128,0));
            this.player_index = null;
        }

        pd.createSprite("party_icon_tank.png",  cc.p(14, 42),this);
        pd.createSprite("party_icon_tank.png",  cc.p(14, 18),this);
        pd.createSprite("party_icon_melee.png", cc.p(66, 42),this);
        pd.createSprite("party_icon_melee.png", cc.p(66, 18),this);
        pd.createSprite("party_icon_range.png", cc.p(118,42),this);
        pd.createSprite("party_icon_range.png", cc.p(118,18),this);
        pd.createSprite("party_icon_mage.png",  cc.p(170,42),this);
        pd.createSprite("party_icon_mage.png",  cc.p(170,18),this);
        pd.createSprite("party_icon_mage.png",  cc.p(222,42),this);
        pd.createSprite("party_icon_heal.png",  cc.p(222,18),this);


        var pos_mana = [], x;
        for (var i = 0; i < 4; i++) {
            x = 393+47*i;
            pd.createSprite("interface_mana_icon.png", cc.p(x,6), this);
            pos_mana.push(x)
        }

        pd.createSprite("manacost_n1.png", cc.p(pos_mana[0]+6,6), this);
        pd.createSprite("manacost_n0.png", cc.p(pos_mana[0]+11,6), this);
        pd.createSprite("manacost_n2.png", cc.p(pos_mana[1]+6,6), this);
        pd.createSprite("manacost_n0.png", cc.p(pos_mana[1]+11,6), this);
        pd.createSprite("manacost_n2.png", cc.p(pos_mana[2]+6,6), this);
        pd.createSprite("manacost_n0.png", cc.p(pos_mana[2]+11,6), this);
        pd.createSprite("manacost_n7.png", cc.p(pos_mana[3]+6,6), this);
        pd.createSprite("manacost_n5.png", cc.p(pos_mana[3]+11,6), this);
    },

    setNewTarget: function(idx) {
        if (idx == "all") {
            for (var i = 0; i < this.char_list.length; i++) {
                this.char_list[i].frame.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("party_interface_background_target.png"));
            }
        }
        else {
            for (var i = 0; i < this.char_list.length; i++) {
                if (i == idx) {
                    this.char_list[i].frame.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("party_interface_background_target.png"));
                } else {
                    this.char_list[i].frame.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("party_interface_background.png"));
                }
            }
        }
    },

    setNewSelection: function (idx) {
        if (idx == "all") {
            for (var i = 0; i < this.char_list.length; i++) {
                this.char_list[i].bg.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("party_interface_selected.png"));
            }
        }
        else {
            for (var i = 0; i < this.char_list.length; i++) {
                if (i == idx) {
                    this.char_list[i].bg.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("party_interface_selected.png"));
                } else {
                    this.char_list[i].bg.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("party_interface_unselected.png"));
                }
            }
        }
    },

    informWhoIsPlayer: function (index) {
        this.player_index = index;
    },

    updateCharLife: function (index, char) {
        var  color;
        var percent = char.getLifePercentage();

        if (index == this.player_index) {
            this.updatePlayerLife(percent);
        }

        // if      (percent <= 0.26) color = cc.color(128,0,0);
        // else if (percent <= 0.51) color = cc.color(128,30,0);
        // else if (percent <= 0.76) color = cc.color(128,128,0);
        // else                      color = cc.color(0,128,0);
        //
        // this.char_list[index].setColor(color);
        this.char_list[index].setScaleX(percent);

        if (percent == 0) {
            this.char_list[index].bg.setColor(cc.color(0,0,0,150));
        }
    },

    updatePlayerLife: function (perc) {
        this.life_bar.setScaleX(perc)
    },

    updatePlayerMana: function (mana, max_mana) {
        var perc = mana / max_mana;
        this.mana_bar.setScaleX(perc);

        this.mana_label.setString(Math.floor(mana)+"/"+max_mana);
    },

    updateBossLife: function(perc) {
        var x = this.boss_life_bar.getPosition().x + this.boss_life_bar.width*perc;
        this.boss_life_bar.setScaleX(perc);
        // this.boss_icon_frame.x = x
    },

    updateCastBar: function (time, ct) {
        var perc = time / ct;
        this.cast_bar.setScaleX(perc);
        this.cast_time_label.setString(Math.floor((ct - time)*10)/10);
    },

    showCastBar: function () {
        this.cast_frame.stopAllActions();
        this.cast_frame.runAction(cc.fadeIn(0.05));
    },

    hideCastBar: function () {
        this.cast_frame.stopAllActions();
        this.cast_frame.runAction(cc.fadeOut(0.2));
    }

});