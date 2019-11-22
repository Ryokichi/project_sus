projSUS.Delegate = cc.Class.extend({
    ctor: function () {
        this.player = null;
        this.boss = null;
        this.hud = null;
    },

    setPlayer: function (player) {
        this.player = player;
    },

    setBoss: function (boss) {
        this.boss = boss;
    },

    setHUD: function (hud) {
        this.hud = hud;
    },

    updateBossLife: function (perc) {
        this.hud.updateBossLife(perc);
    },

    attackTheBoss: function (amount, type) {
        this.boss.takingHit(amount, type);
    },

    attackAnAlly: function (target, amount) {
        target.takingHit(amount);
    }
});