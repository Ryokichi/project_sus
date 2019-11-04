projSUS.Controller = cc.Class.extend({
    ctor: function () {
        this.player;
        this.boss;
        this.interface;

        this.spells = [];
    },

    loadElements: function (player, boss, interface) {
        this.setPlayer(player);
        this.setBoss(boss);
        this.setInterface(interface);

        this.spells = [];
        var spell, spell_name;
        for (var slot in projSUS.SavedData.spell) {
            spell_name = projSUS.SavedData.spell[slot];

            spell = null;
            if (spell_name !== null) {
                spell = new projSUS[spell_name];
            }
            this.spells.push(spell);
        }
        this.interface.setSpellSprites(this.spells);
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

    castSpell: function (num, target) {
        cc.log("target", target);
        if (this.spells[num] != null && target != null) {
            this.player.beginCast(this.spells[num], target);
        }
    },

    spellHeal: function (target, amount) {
        target.heal(amount);
    }
});