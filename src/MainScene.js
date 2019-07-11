projectSUS.MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new projectSUS.MainLayer();
        this.addChild(layer);
        layer.init();
    }
});

projectSUS.MainLayer = cc.Layer.extend({
    init: function () {
        this.bg = pd.createSprite(res.main_bg, cc.p(320, 180), this);

        this.btn_1 = pd.createSprite("btn120x40_n.png", cc.p(70,330), this);
        this.btn_2 = pd.createSprite("btn120x40_n.png", cc.p(70,270), this);

        projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);

        // this.to_spell_book_btn = new pd.Button();
        // this.to_spell_book_btn.setSprites("btn120x40_n.png", "btn120x40_p.png", "btn120x40_d.png");
        // this.to_spell_book_btn.setLabel("Spell Book");
        // this.to_spell_book_btn.setPosition(70, 330);
        // this.addChild(this.to_spell_book_btn);
        //
        //
        // projectSUS.input.addEventListener("onMouseDown", "onMouseDown", this.to_spell_book_btn, 1);
        // this.to_spell_book_btn.onMouseDown = function (e) {
        //     var box = this.getBoundingBox();
        //     cc.log(box);
        //     // if (cc.rectContainsPoint(cc.rect(0,0,)this.convertToNodeSpace(e.getLocation())))
        //     // pd.changeScene(new projectSUS.MainScene(), 1, 0);
        // }
    },

    onMouseDown: function (e) {
        if (cc.rectContainsPoint(this.btn_1.getBoundingBox(), e.getLocation())){
            pd.changeScene(new projectSUS.SpellBookScene(), 1, type_num);
        }
    }
});


///todo  Animated button, Static button e button padarao

