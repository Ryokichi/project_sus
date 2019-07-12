projectSUS.Renew = projectSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.code = "SPS2";
        this.name = "Renovar";

        this.base_heal = 3;
        this.base_mana = 5;
        this.base_cast = 1;
        this.base_cd   = 0.8;
        this.base_tick = 0.8;
        this.base_duration = 3;

        this.sprite = pd.createSprite("cura4.png", cc.p(0,0), this, 1);
        this.init();
    },

    leveUP: function () {

    },

    setDescription: function () {
        this.description = "Cura o aliado selecionado em " + this.curr_heal +
            " a cada " + this.curr_tick + " seg, ao longo de " + this.curr_duration + " seg.";
    }

});