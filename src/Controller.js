projSUS = {};
projSUS.input = new pd.gameInput();

projSUS.Controller = cc.Class.extend ({
    hud: null,
    boss: null,
    player: null,
    allies: null,

    resetData: function () {
        this.hud = null;
        this.boss = null;
        this.player = null;
        this.allies = null
    },

    setGameElements: function (hud, boss, player, allies) {
        this.hud = hud;
        this.boss = boss;
        this.player = player;
        this.allies = allies;
    },

    updateBossLife: function (perc) {
        this.hud.updateBossLife(perc);
    },

    attackAnAlly: function (target, amount) {
        target.takingHit(amount);
    },

    playerHasMana: function (manaAmount) {
        return (this.player.curr_mana >= manaAmount);
    }

});

projSUS.controller = new projSUS.Controller();