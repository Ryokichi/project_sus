projSUS.Controller = cc.Class.extend({
    ctor: function () {
        this.player;
        this.boss;
        this.interface;

    },

    setElements: function (player, boss, interface) {
        this.setPlayer(player);
        this.setBoss(boss);
        this.setInterface(interface);
    },

    setPlayer: function (player) {
        this.player = player;
    },

    setBoss: function (boss) {
        this.boss = boss;
    },

    setInterface: function (interface){
        this.interface = interface;
    },

    updateBossLife: function (perc) {
        this.boss_helth.setScaleX(perc);
    },

    updatePlayerMana: function (perc) {
        this.interface.updatePlayerMana(perc);
    },

    getPlayerTarget: function () {
        return this.player.getTargetAlly();
    },

    playerHasMana: function (amount) {
        return (this.player.getMana() >= amount);
    }

});