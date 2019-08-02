projectSUS.GameInterface = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.bg = pd.createSprite("interface_background_mock.png", cc.p(320,25), this);
        this.mana_frame = pd.createSprite("player_mana_bar.png", cc.p(312,10), this);
        this.mana_bar = pd.createSprite("player_mana_life.png", cc.p(312,10), this);
        this.life_frame = pd.createSprite("player_health_bar.png", cc.p(312,26), this);
        this.life_bar = pd.createSprite("player_health_life.png", cc.p(312,26), this);
        this.name_frame = pd.createSprite("party_interface_background.png", cc.p(312,45), this);

        this.boss_life_frame = pd.createSprite("boss_health_bar.png", cc.p(320,340), this);
        this.boss_life_bar = pd.createSprite("boss_health_life.png", cc.p(3,3), this.boss_life_frame);
        this.boss_life_bar.setAnchorPoint(0,0);
        this.boss_icon_frame = pd.createSprite("boss_health_icon.png", cc.p(-6,9), this.boss_life_frame);

        this.char_list = [];
        var x = 5;
        var y = 27;
        var y_ini = y;
        for (var i = 0; i < 10; i++) {
            this.char_list[i] = pd.createSprite("party_interface_life.png", cc.p(x,y), this);
            this.char_list[i].setAnchorPoint(0,0);

            y -= 23;
            if (i % 2 == 1) {
                x += 52;
                y = y_ini;
            }

            this.char_list[i].setColor(cc.color(0,128,0));
        }

        pd.createSprite("party_icon_tank.png", cc.p(10,40),this);
        pd.createSprite("party_icon_tank.png", cc.p(10,16),this);
        pd.createSprite("party_icon_melee.png", cc.p(62,40),this);
        pd.createSprite("party_icon_melee.png", cc.p(62,16),this);
        pd.createSprite("party_icon_range.png", cc.p(114,40),this);
        pd.createSprite("party_icon_range.png", cc.p(114,16),this);
        pd.createSprite("party_icon_range.png", cc.p(166,40),this);
        pd.createSprite("party_icon_mage.png", cc.p(166,16),this);
        pd.createSprite("party_icon_mage.png", cc.p(218,40),this);
        pd.createSprite("party_icon_mage.png", cc.p(218,16),this);
    },

    informWhoIsPlayer: function (player) {
        this.player = player;
    },

    updateCharLife: function (index, char) {
        var  color;
        var percent = char.getLifePercentage();


        if (this.char_list[index] == this.player) {
            this.updatePlayerLife(percent);
        }


        if (percent <= 0.26)      color = cc.color(128,0,0);
        else if (percent <=0.51)  color = cc.color(128,30,0);
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
        this.boss_life_bar.setScaleX(perc);
    }
});