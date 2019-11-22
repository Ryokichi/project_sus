projSUS.MapScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.MapLayer();
        this.addChild(this.layer);
        this.layer.init();
    }
});

projSUS.MapLayer = cc.Layer.extend({
    init: function () {
        this.is_paused = false;
        this.spell_book = null;
        this.options = null;

        this.bg = pd.createSprite("map_bg.png", cc.p(320,180), this);

        this.btn_opt = pd.createSprite("btn_opt.png",cc.p(610,320), this);
        this.btn_book = pd.createSprite("book_icon.png",cc.p(540,320), this);
        this.btn_book.setScale(0.3);

        this.dungeon_pos = [
            cc.p(165,20),
            cc.p(380,120),
            cc.p(260,240),
        ];
        this.btn_opacity = 192;
        this.dungeon_list = [];
        for (var i = 0; i < this.dungeon_pos.length; i++) {
            var rect = new cc.LayerColor(cc.color(60,120,600,this.btn_opacity),40,60);
            rect.setPosition(this.dungeon_pos[i]);
            this.dungeon_list.push(rect);
            this.addChild(rect);
        }

        this.runAction(cc.sequence(
            cc.delayTime(0.5),
            cc.callFunc(function () {
                projSUS.input.addEventListener("onMouseDown", "onMouseDown", this);
            }, this),
            cc.callFunc(this.openSpellBook, this)
        ));
    },

    onMouseDown: function (e) {
        if (this.is_paused) return;

        if (cc.rectContainsPoint(this.btn_book.getBoundingBox(), e.getLocation())) {
            this.openSpellBook();
        }
        else if (cc.rectContainsPoint(this.btn_opt.getBoundingBox(), e.getLocation())) {
            this.openOptions();
        }
        else {
            for (var i = 0; i < this.dungeon_list.length; i++) {
                if (cc.rectContainsPoint(this.dungeon_list[i].getBoundingBox(), e.getLocation())) {
                    projSUS.input.removeEventListener(this);
                    pd.changeScene(new projSUS.BattleField(),0.5,1);
                }
            }
        }
    },

    openSpellBook: function () {
        this.pauseControl();
        this.spell_book = new projSUS.SpellBookLayer(this);
    },

    openOptions: function () {
        this.pauseControl();
        this.options = new projSUS.OptionsLayer(this);
    },

    pauseControl: function () {
        this.is_paused = true;
    },

    resumeControl: function () {
        this.is_paused = false;
    }

});