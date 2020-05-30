projSUS.Heal = projSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.id = "Heal";
        this.name = "Cura";
        this.sprite_name = "heal.png";

        this.base_heal = 10;
        this.base_mana = 5;
        this.base_cast = 1;
        this.base_cd   = 0.8;

        this.cast_timer = 0;
        this.cd_timer = 0;

        this.init();
    },

    levelUP: function () {

    },

    setDescription: function () {
        this.description = "Após " + this.curr_cast + " seg, cura o aliado selecionado em " + this.curr_heal + ".";
    },

    beginCast: function (target) {
        this.target = target;
        if (this.curr_cd > 0) {
            cc.log("Magia ainda em cooldown:", this.curr_cd);
        }
        else if (projSUS.controller.healerHasMana(this.base_mana)) {
            projSUS.controller.healer.consumeMana(this.base_mana);
            this.curr_status = this.status["onCast"];
            this.scheduleUpdate();
        }
        else {
            cc.log("Jogador não tem mana suficiente")
        }
    },

    finishCast: function () {
        this.target.takingHeal(this.base_heal);

        this.target = null;
        this.cast_timer = 0;
        this.curr_cd = this.base_cd;
        this.curr_status = this.status["onCD"];
    }
});