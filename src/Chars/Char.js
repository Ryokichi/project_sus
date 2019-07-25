projectSUS.Char = cc.Node.extend({
    ctor: function (parent, sprite, pos) {
        this._super();
        if (parent)
            parent.addChild(this);
        this.setPosition(pos);

        this.life = 100;

        this.sprite = pd.createSprite(sprite, cc.p(0,0), this);
        this.sprite.setAnchorPoint(0.5, 0);

        var y = this.sprite.height + 3;
        this.life_bar = pd.createSprite("life_bar.png", cc.p(0, y), this);
        this.life_bar.setAnchorPoint(0.5,0,5);
        this.life_bar.setVisible(false);
    },

    addLife: function (qtd) {
        this.life += qtd;
    },

    subtractLife: function (qtd) {
        this.life -= qtd;
    },

    getLifePercentage: function () {
        return this.life_bar / 100;
    },

    updateLifeBar: function () {
        if (this.life < 0) {
            this.life = 0;
        }
        else if (this.life > 100) {
            this.life = 100;
        }

        this.life_bar.setScaleX(this.life/100);
    }

});