projectSUS.GameInterface = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent)
            parent.addChild(this);

        this.bg = pd.createSprite("base_interface.png", cc.p(320,180), this);

        this.char_list = [];
        for (var i = 0; i < 8; i++) {
            this.char_list[i] = pd.createSprite("i_life_bar.png", cc.p(100,100), this);
            this.char_list[i].setAnchorPoint(0,0);
        }
        this.char_list[0].setPosition(  5,25);
        this.char_list[1].setPosition( 64,25);
        this.char_list[2].setPosition(123,25);
        this.char_list[3].setPosition(182,25);
        this.char_list[4].setPosition(241,25);
        this.char_list[5].setPosition(  5, 3);
        this.char_list[6].setPosition( 64, 3);
        this.char_list[7].setPosition(123, 3);

        this.mana_bar = pd.createSprite("mana_bar.png", cc.p(224, 49), this);
        this.mana_bar.setAnchorPoint(0,0);
        this.boss_bar = pd.createSprite("boss_bar.png", cc.p( 97,334), this);
        this.boss_bar.setAnchorPoint(0,0);

        this.mana = 1000;
        this.boss_life = 10000;
    },

    updateCharLife: function (index, char) {
        this.char_list[index].setScaleX = char.getLifePercentage();
    }
});