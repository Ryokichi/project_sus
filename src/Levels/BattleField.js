projSUS.BattleFieldLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.objOrder = {
            "bg": -10,
            "selection": -9
        };

        this.boss = null;
        this.healer = null;
        this.healer_target = null;
        this.allies = [];

        this.hud = new projSUS.BattleHUD(this);

        this.selection = new pd.Animation();
        this.selection.addAnimation("roll", 1, 24, "seletor_");
        this.selection.changeAndLoop("roll");
        this.addChild(this.selection, this.objOrder["selection"]);

        projSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);

        projSUS.controller.setGameElements(this.hud, this.boss, this.player, this.allies);
    },

    update: function (dt) {
        if (this.healer_target != null) {
            var p = this.healer_target.getPosition();
            this.selection.setPosition(p.x, p.y+5);
        }

        for (var i = 0; i < this.allies.length; i++) {
            this.allies[i].setLocalZOrder(cc.view.getDesignResolutionSize().height - this.allies[i].getPosition().y);
        }
    },

    onMouseDown: function (e) {
        var found = false;
        for (var i = 0; i < this.allies.length && !found; i++) {
            if (cc.rectContainsPoint(this.allies[i].getBoundingBox(), e.getLocation())) {
                found = true;
                this.healer_target = this.allies[i];
            }
        }
    }
});