projSUS.Boss = pd.Animation.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.setAnchorPoint(0.5, 0);

        this.life     = 1;
        this.max_life = 1;
        this.heroes_list = null;
        this.time_next_attack = 0;
        this.next_attack = null;
        this.attack_list = [];
    },

    setHeroes: function (heroes_list) {
        this.heroes_list = heroes_list;
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

    setInitialLife: function (qtd) {
        this.life = qtd;
        this.max_life = this.life;
    },

    getLifePerc: function () {
        return this.life / this.max_life;
    }


});