projSUS.Heal = projSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.id = 3;
        this.name = "Cura";
        this.sprite_name = "heal.png";

        this.base_heal = 10;
        this.base_mana = 5;
        this.base_cast = 1;
        this.base_cd   = 0.8;

        this.init();
    },

    leveUP: function () {

    },

    setDescription: function () {
        this.description = "Após " + this.curr_cast + " seg, cura o aliado selecionado em " + this.curr_heal + ".";
    }

});