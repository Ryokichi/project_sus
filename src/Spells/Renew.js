projSUS.Renew = projSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.id = 4;
        this.name = "Renovar";
        this.sprite_name = "renew.png";

        this.base_heal = 3;
        this.base_mana = 5;
        this.base_cast = 1;
        this.base_cd   = 0.8;
        this.base_tick = 0.8;
        this.base_duration = 3;

        this.init();
    },

    leveUP: function () {

    },

    setDescription: function () {
        this.description = "Cura o aliado selecionado em " + this.curr_heal +
            " a cada " + this.curr_tick + " seg, ao longo de " + this.curr_duration + " seg.";
    }

});