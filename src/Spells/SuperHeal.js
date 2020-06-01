projSUS.SuperHeal = projSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.id = "SuperHeal";
        this.name = "Cura Suprema";
        this.sprite_name = "super_heal.png";

        this.base_heal = 80;
        this.base_mana = 5;
        this.base_cast = 1.5;
        this.base_cd   = 20;

        this.cast_timer = 0;
        this.cd_timer = 0;

        this.init();
    },

    leveUP: function () {

    },

    beginCast: function (target) {
        this.target = target;
        if (this.curr_cd > 0) {
            cc.log("Magia ainda em cooldown:", this.curr_cd);
        }
        else if (projSUS.controller.healerHasMana(this.base_mana)) {
            projSUS.controller.healer.consumeMana(this.base_mana);
            this.curr_status = this.status["onCast"];
            cc.log("chameio o update");
            this.scheduleUpdate();
        }
        else {
            cc.log("Jogador não tem mana suficiente")
        }
    },

    finishCast: function (target) {
        var allies = projSUS.controller.allies;

        for (var i = 0; i < allies.length;  i++) {
            allies[i].takingHeal(this.base_heal);
        }

        this.cast_timer = 0;
        this.curr_cd = this.base_cd;
        this.curr_status = this.status["onCD"];
    },

    setDescription: function () {
        this.description = "Cura muito todo mundo.";
    }

});