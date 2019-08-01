projectSUS.Boss = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.life = 1;
        this.max_life = 1;

        this.sprite = pd.createSprite("boss.png", cc.p(0,0), this);
        this.sprite.flippedX = true;
        this.sprite.setScale(0.6,0.6);
    },

    setLife: function (qtd) {
        this.life = qtd;
        this.max_life = this.life;
    },

    getLifePerc: function () {
        return this.life / this.max_life;
    }


});