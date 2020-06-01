projSUS.Char = pd.Animation.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.hole      = null;
        this.max_life  = 100;
        this.curr_life = 100;
        this.status = "alive";
        this.curr_state = "idle";
        this.curr_direction = "up";

        this.buffs_on_me = [];
        this.debuffs_on_me = [];

        this.setHole();
        this.setAnchorPoint(0.5,0);
        this.createAnimations();

        this.health_bar = new pd.ComplexBar("party_hp_bar.png", "party_hp_interface.png", this, 50);
        this.health_bar.setPosition(this.width/2, this.height + 5);
    },

    setHole: function () {
        cc.warn("função setHole deve ser sobrescrita");
    },

    getHole: function () {
        return this.hole;
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
        this.addLife(amount);
        this.createHealFeed(amount);
    },

    takingHit: function (amount, type) {
        ////Setar mitigação de dano
        cc.warn("sobrescrever este método");
        this.subtractLife(amount);
    },

    addLife: function (qtd) {
        this.curr_life += qtd;
        if (this.curr_life > this.max_life) {
            this.curr_life = this.max_life;
        }
        this.health_bar.setPercentage(100 * this.curr_life / this.max_life);
    },

    subtractLife: function (qtd) {
        // cc.log("tomando dano", qtd);
        if (this.status == "dead")
            return;

        this.curr_life -= qtd;
        if (this.curr_life <= 0) {
            this.curr_life = 0;
            this.status = "dead";
        }
        this.health_bar.setPercentage(100 * this.curr_life / this.max_life);
    },

    addAnBuff: function (buff) {
        this.buffs_on_me.push(buff);
    },

    createHealFeed: function (amount) {
        projSUS.controller.createHealFeed(this, amount);
    }
});