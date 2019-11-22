projSUS.Char = pd.Animation.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);
        this.health_bar = new projSUS.HealthBar(this);

        this.hole      = null;
        this.max_life  = null;
        this.curr_life = null;
        this.curr_state = "idle";
        this.curr_direction = "up";


        this.setHole();
    },

    setHole: function () {
        cc.warn("função setHole deve ser sobrescrita");
    },

    setInitialLife: function (qtd) {
        this.curr_life = qtd;
        this.max_life = this.curr_life;
    },

    takingHeal: function (amount, type) {
        ////Setar mitigação heal devido debuff
        cc.warn("sobrescrever este método");
    },

    takingHit: function (amount, type) {
        ////Setar mitigação de dano
        cc.warn("sobrescrever este método");
    },

    addLife: function (qtd) {
        this.curr_life += qtd;
        if (this.curr_life > this.max_life) {
            this.curr_life = this.max_life;
        }
        this.health_bar.setLifePerc(this.curr_life / this.max_life);
    },

    subtractLife: function (qtd) {
        cc.log("tomando dano", qtd);
        this.curr_life -= qtd;
        if (this.curr_life < 0) {
            this.curr_life = 0;
        }
        cc.log(this.curr_life / this.max_life);
        this.health_bar.setLifePerc(this.curr_life / this.max_life);
    },

});