projSUS.FastHeal = projSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.id = 1;
        this.name = "Cura Rapida";
        this.sprite_name = "fast_heal.png";

        this.base_heal = 20;
        this.base_mana = 30;
        this.base_cast = 0.2;

        this.init();
    },

    leveUP: function () {

    },

    setDescription: function () {
        this.description = "Após " + this.curr_cast + " seg, cura o aliado selecionado em " + this.curr_heal + ".";
    }

});