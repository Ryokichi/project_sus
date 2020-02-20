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

        this.target = null;

        this.cast_timer = 0;
        this.cd_timer = 0;

        this.init();
    },

    leveUP: function () {

    },

    setDescription: function () {
        this.description = "Após " + this.curr_cast + " seg, cura o aliado selecionado em " + this.curr_heal + ".";
    },

    update : function (dt) {
        this._super(dt);

        if (this.cast_timer >= this.base_cast) {
            this.target.addLife(this.base_heal);
            this.finishCast();
        }
    },

    beginCast: function (target) {
        this.target = target;
        if (projSUS.controller.playerHasMana(this.base_mana)) {
            this.scheduleUpdate();
        }
        else {
            cc.log("Jogador não tem mana suficiente")
        }
    },

    finishCast: function () {
        // this.unscheduleUpdate();
        this.target = null;
        this.cast_timer = 0;
        this.curr_cd = this.base_cd;
        this.curr_status = this.status["onCD"];
    }
});