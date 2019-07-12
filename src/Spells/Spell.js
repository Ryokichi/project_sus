projectSUS.Spell = cc.Node.extend({
    ctor: function() {
        this._super();

        this.code = null;
        this.name = "";
        this.description = "";
        this.level = 1;

        this.base_heal = 0;
        this.base_mana = 0;
        this.base_cast = 0;
        this.base_cd   = 0;
        this.base_tick = 0;
        this.base_duration = 0;

        this.curr_heal = 0;
        this.curr_mana = 0;
        this.curr_cast = 0;
        this.curr_cd   = 0;
        this.curr_tick = 0;
        this.curr_duration = 0;
    },

    init: function () {
        this.setValues();
        this.setDescription();
    },

    setValues: function () {
        this.curr_heal = this.base_heal;
        this.curr_mana = this.base_mana;
        this.curr_cast = this.base_cast;
        this.curr_cd   = this.base_cd;
        this.curr_tick = this.base_tick;
        this.curr_duration = this.base_duration;
    },

    setName: function (name) {
        this.name = name;
    },

    getName: function f() {
        return this.name;
    },

    setDescription: function (desc) {
        this.description = desc;
    },

    getDescription: function () {
        return this.description;
    },

    setDescription: function () {
        cc.warn("Sobrescrever de funcao spell: " + this.name);
    }

});