projectSUS.SpellBookScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new projectSUS.SpellBookLayer();
        this.addChild(layer);
        layer.init();
    }
});

projectSUS.SpellBookLayer = cc.Layer.extend({
    init: function () {
        this.bg = pd.createSprite(res.main_bg, cc.p(320, 180), this);
        this.book = pd.createSprite(res.spell_book, cc.p(320,180), this);

        this.spells_list = [];

        this.loadSpells();
    },

    loadSpells: function () {
        this.spells_list.push(new projectSUS.Cure());
        this.spells_list.push(new projectSUS.Cure());
        this.spells_list.push(new projectSUS.Cure());
        this.spells_list.push(new projectSUS.Cure());

        let x=120, y=300;
        for (let i=0; i<this.spells_list.length; i++) {
            x += 50;
            if (i%2 == 0) {
                x = 120;
                y -= 50;
            }
            this.spells_list[i].setPosition(x, y);
            this.addChild(this.spells_list[i]);
        }
    }
});