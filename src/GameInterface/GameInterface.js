projectSUS.GameInterface = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this, 1000);

        this.bg = pd.createSprite("interface_background_mock.png", cc.p(320,25), this);
        this.mana_frame = pd.createSprite("player_mana_bar.png", cc.p(312,10), this);
        this.mana_bar   = pd.createSprite("player_mana_life.png", cc.p(268,10), this);
        this.mana_bar.setAnchorPoint(0.0, 0.5);
        this.life_frame = pd.createSprite("player_health_bar.png", cc.p(312,26), this);
        this.life_bar   = pd.createSprite("player_health_life.png", cc.p(268,26), this);
        this.life_bar.setAnchorPoint(0.0, 0.5);

        this.cast_frame = pd.createSprite("player_health_bar.png", cc.p(312,48), this);
        this.cast_bar   = pd.createSprite("player_mana_life.png", cc.p(312,48), this);
        this.cast_bar.setColor(cc.color(150,150,50));
        this.cast_bar.setScaleX(0.0);
        this.cast_time_label = pd.label(this, "0/0", 1, 1);
        this.cast_time_label.setPosition(312,46);
        this.cast_time_label.setFontFillColor(cc.color(255,255,255,255));
        this.cast_time_label.setDimensions(92,15);
        this.cast_time_label.setAnchorPoint(0.5,0.5);

        this.boss_life_frame = pd.createSprite("boss_health_bar.png", cc.p(320,340), this);
        this.boss_life_bar = pd.createSprite("boss_health_life.png", cc.p(3,3), this.boss_life_frame);
        this.boss_life_bar.setAnchorPoint(0,0);
        this.boss_icon_frame = pd.createSprite("boss_health_icon.png", cc.p(-6,9), this.boss_life_frame);

        this.char_list = [];
        var x = 5;
        var y = 27;
        var y_ini = y;

        var char_bg;
        for (var i = 0; i < 10; i++) {
            char_bg = pd.createSprite("party_interface_background.png", cc.p(x-1, y-1), this);
            char_bg.setAnchorPoint(0,0);
            this.char_list[i] = pd.createSprite("party_interface_life.png", cc.p(x,y), this);
            this.char_list[i].setAnchorPoint(0,0);

            y -= 23;
            if (i % 2 == 1) {
                x += 52;
                y = y_ini;
            }

            this.char_list[i].setColor(cc.color(0,128,0));
            this.player_index = null;
        }

        pd.createSprite("party_icon_tank.png", cc.p(10,40),this);
        pd.createSprite("party_icon_tank.png", cc.p(10,16),this);
        pd.createSprite("party_icon_melee.png", cc.p(62,40),this);
        pd.createSprite("party_icon_melee.png", cc.p(62,16),this);
        pd.createSprite("party_icon_range.png", cc.p(114,40),this);
        pd.createSprite("party_icon_range.png", cc.p(114,16),this);
        pd.createSprite("party_icon_mage.png", cc.p(166,40),this);
        pd.createSprite("party_icon_mage.png", cc.p(166,16),this);
        pd.createSprite("party_icon_mage.png", cc.p(218,40),this);
        pd.createSprite("party_icon_heal.png", cc.p(218,16),this);


        var pos_mana = [], x;
        for (var i = 0; i < 4; i++) {
            x = 383+47*i;
            pd.createSprite("interface_mana_icon.png", cc.p(x,6), this);
            pos_mana.push(x)
        }

        pd.createSprite("manacost_n3.png", cc.p(pos_mana[0]+6,6), this);
        pd.createSprite("manacost_n0.png", cc.p(pos_mana[0]+11,6), this);
        pd.createSprite("manacost_n0.png", cc.p(pos_mana[1]+6,6), this);
        pd.createSprite("manacost_n5.png", cc.p(pos_mana[1]+11,6), this);
        pd.createSprite("manacost_n1.png", cc.p(pos_mana[2]+6,6), this);
        pd.createSprite("manacost_n0.png", cc.p(pos_mana[2]+11,6), this);
        pd.createSprite("manacost_n2.png", cc.p(pos_mana[3]+6,6), this);
        pd.createSprite("manacost_n5.png", cc.p(pos_mana[3]+11,6), this);
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

        if      (percent <= 0.26) color = cc.color(128,0,0);
        else if (percent <= 0.51) color = cc.color(128,30,0);
        else if (percent <= 0.76) color = cc.color(128,128,0);
        else                      color = cc.color(0,128,0);

        this.char_list[index].setColor(color);
        this.char_list[index].setScaleX(percent);
    },

    updatePlayerLife: function (perc) {
        this.life_bar.setScaleX(perc)
    },

    updatePlayerMana: function (perc) {
        this.mana_bar.setScaleX(perc)
    },

    updateBossLife: function(perc) {
        var x = this.boss_life_bar.getPosition().x + this.boss_life_bar.width*perc;
        this.boss_life_bar.setScaleX(perc);
        this.boss_icon_frame.x = x
    },

    updateCastBar: function (time, ct) {
        var perc = time / ct;
        if (perc <= 0) {
            this.cast_time_label.setVisible(false);
        }
        else {
            this.cast_time_label.setVisible(true);
            this.cast_time_label.setString(Math.floor(time*10)/10+"/"+ct);
        }

        this.cast_bar.setScaleX(perc);

    }
});