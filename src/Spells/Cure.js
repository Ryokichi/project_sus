projectSUS.Cure = projectSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.code = "SPS1";
        this.name = "Cura";
        this.description = "Cura o aliado selecionado";

        this.heal_base = 10;
        this.mana_base = 5;
        this.cast_base = 1;
        this.cd_base = 0.8;

        this.sprite = pd.createSprite("cura1.png", cc.p(0,0), this, 1);
    },

    leveUP: function () {
        this.curr_heal = this.heal_base * this.level;
        this.curr_mana = this.mana_base * this.level;
        this.curr_cast = this.cast_base * this.level;
        this.curr_cd   = this.cd_base * this.level;
    },

    getDescription: function () {
        return ("Cura o aliado selecionado em " + this.curr_heal);
    }
});