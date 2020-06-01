projSUS = {};
projSUS.input = new pd.gameInput();

projSUS.Controller = cc.Class.extend ({
    hud: null,
    boss: null,
    healer: null,
    allies: null,

    resetData: function () {
        this.hud = null;
        this.boss = null;
        this.healer = null;
        this.allies = null
    },

    setGameElements : function (hud, boss, healer, allies) {
        this.hud = hud;
        this.boss = boss;
        this.healer = healer;
        this.allies = allies;

        this.boss.setHeroes();
    },

    updateBossLife: function (perc) {
        this.hud.updateBossLife(perc);
    },

    attackAnAlly: function (target, amount) {
        target.takingHit(amount);
    },

    healerHasMana: function (manaAmount) {
        cc.log(manaAmount, this.healer.curr_mana);
        return (this.healer.curr_mana >= manaAmount);
    },

    healerTargetAlly: function () {
        return this.healer.getTargetAlly();
    },

    updateHealerMana: function (curr_mana, max_mana) {
        this.hud.updateHealerMana(curr_mana, max_mana);
    },

    updateHealerMana: function (curr_mana, max_mana) {
        this.hud.updateHealerMana(curr_mana, max_mana);
    },

    createHealFeed: function (target, amount) {
        this.hud.createHealFeed(target, amount);
    }


});

projSUS.controller = new projSUS.Controller();