projSUS.BattleFieldLayer = cc.Layer.extend({
    objOrder : {
        "bg": -10,
        "selection": -9
    },

    boss: null,
    healer: null,
    healer_target: null,
    allies : [],

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.hud = new projSUS.BattleHUD(this);

        this.selection = new pd.Animation();
        this.selection.addAnimation("roll", 1, 24, "seletor_");
        this.selection.changeAndLoop("roll");
        this.addChild(this.selection, this.objOrder["selection"]);

        projSUS.input.addEventListener("onMouseDown", "onMouseDown", this, 1);
    },

    update: function (dt) {
        if (this.healer_target != null) {
            var p = this.healer_target.getPosition();
            this.selection.setPosition(p.x, p.y+5);
        }

        for (var i = 0; i < this.allies.length; i++) {
            this.allies[i].setLocalZOrder(cc.winSize.height - this.allies[i].getPosition().y);
        }
    },

    onMouseDown: function (e) {
        var found = false;
        for (var i = 0; i < this.allies.length && !found; i++) {
            if (cc.rectContainsPoint(this.allies[i].getBoundingBox(), e.getLocation())) {
                found = true;
                this.healer_target = this.allies[i];
                this.healer.setTargetAlly(this.healer_target);
            }
        }
    }
});