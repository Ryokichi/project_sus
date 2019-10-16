projSUS.SuperHeal = projSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.code = "super_heal";
        this.name = "Cura Suprema";
        this.sprite_name = "super_heal.png";

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
        this.description = "Cura muito todo mundo.";
    }

});