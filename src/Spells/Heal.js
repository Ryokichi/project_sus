projectSUS.Heal = projectSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.code = "SPS1";
        this.name = "Cura";

        this.base_heal = 10;
        this.base_mana = 5;
        this.base_cast = 1;
        this.base_cd   = 0.8;

        this.sprite = pd.createSprite("cura1.png", cc.p(0,0), this, 1);
        this.init();
    },

    leveUP: function () {

    },

    setDescription: function () {
        this.description = "Após " + this.curr_cast + " seg, cura o aliado selecionado em " + this.curr_heal + "." +
        "dsdsafdsf dsfafdsafdsa sadfsdaf kkkkkkkkkkkkkkkkkkkkksdfdsfsdafa  saddfdsa fdsaf asddsf f sadf  asdfads safdsaf"+
        "lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll asdfsadf";
    }

});