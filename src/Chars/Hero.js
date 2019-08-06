projectSUS.Hero = cc.Node.extend({
    ctor: function (parent, sprite, pos) {
        this._super();
        if (parent) parent.addChild(this);
        this.setPosition(pos);

        this.class = null;
        this.life = 100;
        this.max_life = this.life;

        this.sprite = pd.createSprite(sprite, cc.p(0,0), this);
        this.sprite.setAnchorPoint(0.5, 0);

        // var y = this.sprite.height + 3;
        // this.life_bar = pd.createSprite("life_bar.png", cc.p(0, y), this);
        // this.life_bar.setAnchorPoint(0.5,0,5);
        // this.life_bar.setVisible(false);
    },

    addLife: function (qtd) {
        this.life += qtd;
        if (this.life > this.max_life) {
            this.life = this.max_life;
        }
    },

    subtractLife: function (qtd) {
        this.life -= qtd;
        if (this.life < 0) {
            this.life = 0;
        }

    },

    getLifePercentage: function () {
        return this.life / this.max_life;
    },

    updateLifeBar: function () {

    }

});