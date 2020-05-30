projSUS.Renew = projSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.id = "Renew";
        this.name = "Renovar";
        this.sprite_name = "renew.png";

        this.base_heal = 3;
        this.base_mana = 5;
        this.base_cast = 1;
        this.base_cd   = 0.8;
        this.base_tick = 0.8;
        this.base_duration = 3;
        this.time_until_stop = 0;
        this.time_ticking = 0;

        this.cast_timer = 0;
        this.cd_timer = 0;

        this.init();
    },

    leveUP: function () {

    },

    setDescription: function () {
        this.description = "Cura o aliado selecionado em " + this.curr_heal +
            " a cada " + this.curr_tick + " seg, ao longo de " + this.curr_duration + " seg.";
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
        

        this.target = null;
        this.cast_timer = 0;
        this.curr_cd = this.base_cd;
        this.curr_status = this.status["onCD"];
    },

    update: function(dt) {
        this._super(dt);
        
        if (this.time_until_stop > 0) {
            this.time_until_stop -= dt;
            this.time_ticking += dt;

            if (this.time_ticking > this.base_tick) {
                this.time_ticking = 0;
                this.target.takingHeal(this.base_heal);
            }

        }

    }

});