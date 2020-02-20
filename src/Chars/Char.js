projSUS.Char = pd.Animation.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.hole      = null;
        this.max_life  = null;
        this.curr_life = null;
        this.status = "alive";
        this.curr_state = "idle";
        this.curr_direction = "up";

        this.setHole();
        this.setAnchorPoint(0.5,0);
        this.createAnimations();

        this.health_bar = new pd.ComplexBar("party_hp_bar.png", "party_hp_interface.png", this);
        this.health_bar.setPosition(this.width/2, this.height + 5);
    },

    setHole: function () {
        cc.warn("função setHole deve ser sobrescrita");
    },

    createAnimations: function () {
        cc.warn("função createAnimations deve ser sobrescrita");
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
        cc.log("aumentando vida");
        this.curr_life += qtd;
        if (this.curr_life > this.max_life) {
            this.curr_life = this.max_life;
        }
        this.health_bar.setPercentage(100 * this.curr_life / this.max_life);
    },

    subtractLife: function (qtd) {
        // cc.log("tomando dano", qtd);
        this.curr_life -= qtd;
        if (this.curr_life < 0) {
            this.curr_life = 0;
            this.status = "dead";
        }
        this.health_bar.setPercentage(100 * this.curr_life / this.max_life);
    },

});