projSUS.Boss = pd.Animation.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.setAnchorPoint(0.5, 0);

        this.max_life = 100;
        this.life = this.max_life;

        this.heroes_list = null;
        this.time_next_attack = 0;
        this.next_attack = null;
        this.attack_list = [];

    },

    setHeroes: function () {
        this.heroes_list = projSUS.controller.allies;
    },

    setInitialLife: function (qtd) {
        this.life = qtd;
        this.max_life = this.life;
    },

    addLife: function (qtd) {
        cc.warn("Funcao addLife deve ser sobrescrita");
        this.life += qtd;
        if (this.life > this.max_life) {
            this.life = this.max_life;
        }
        this.informLifeChange();
    },

    subtractLife: function (qtd) {
        this.life -= qtd;
        if (this.life < 0) {
            this.life = 0;
        }
        this.informLifeChange();
    },

    getLifePerc: function () {
        return (this.life / this.max_life);
    },

    informLifeChange: function () {
        projSUS.controller.updateBossLife(this.getLifePerc());
    },

    ////criar regra para amplicação e mitigação de dano
    takingHit: function (amount, type) {
        cc.warn("sobrescrever este método");
    }
});