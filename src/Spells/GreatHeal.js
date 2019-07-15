projectSUS.GreatHeal = projectSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.code = "SPS1";
        this.name = "Grande Cura";
        this.sprite_name = "cura3.png";

        this.base_heal = 30;
        this.base_mana = 10;
        this.base_cast = 1.3;

        this.init();
    },

    leveUP: function () {

    },

    setDescription: function () {
        this.description = "Após " + this.curr_cast + " seg, cura o aliado selecionado em " + this.curr_heal + ".";
    }

});