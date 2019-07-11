projectSUS.Spell = cc.Node.extend({
    ctor: function() {
        this._super();

        this.code = null;
        this.name = "";
        this.description = "";
        this.level = 0;

        this.heal_base = 0;
        this.mana_base = 0;
        this.cast_base = 0;
        this.cd_base = 0;

        this.curr_heal = 0;
        this.curr_mana = 0;
        this.curr_cast = 0;
        this.curr_cd = 0;
    },

    setSpellName: function (name) {
        this.name = name;
    },

    getSpellName: function f() {
        return this.name;
    },

    setDescription: function (desc) {
        this.description = desc;
    },

    getDescription: function () {
        return this.description;
    }

});