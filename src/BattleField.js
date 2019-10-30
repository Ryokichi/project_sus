projSUS.BattleField = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.layer = new projSUS.BattleFieldLayer();
        this.addChild(this.layer);
        this.layer.init();
    }
});

projSUS.BattleFieldLayer = cc.Layer.extend({
    init: function () {
        this.bg = pd.createSprite("bg.png", cc.p(320,180), this);
        this.allies_list = [];
        this.target = null;
        
        this.boss = new projSUS.Petrerus(this);
        this.boss.setPosition(320,215);

        this.player = new projSUS.Hero(this);
        this.player.setPosition(200,200);

        this.tanker = new projSUS.Warrior(this);
        this.tanker.setPosition(290,155);

        this.paladin = new projSUS.Warrior(this);
        this.paladin.setPosition(350,155);

        this.game_interface = new projSUS.GameInterface(this);
        this.game_interface.setLocalZOrder(100000);
        this.game_interface.setBoss(this.boss);
        this.game_interface.setPlayer(this.player);

        this.allies_list = [this.player, this.tanker, this.paladin];
        this.game_elements = [
            this.boss, this.player, this.tanker, this.paladin
        ];
        projSUS.input.addEventListener("onKeyPressed", "onKeyDown", this);
        projSUS.input.addEventListener("onKeyReleased", "onKeyUp", this);
        projSUS.input.addEventListener("onMouseDown", "onMouseDown", this);
        this.scheduleUpdate();
    },

    update: function (dt) {
        for (var i = 0; i < this.game_elements.length; i++) {
            this.game_elements[i].setLocalZOrder(this.game_interface.getLocalZOrder() - this.game_elements[i].y);
        }
    },

    onMouseDown: function (e) {
        if (e.getButton() === cc.EventMouse.BUTTON_RIGHT){
            this.player.moveTo(e.getLocation())
        }
        else if (e.getButton() === cc.EventMouse.BUTTON_LEFT) {
            for (var i = 0; i < this.allies_list.length; i++) {
                this.allies_list[i].health_bar.unselect();
                if (cc.rectContainsPoint(this.allies_list[i].getBoundingBoxToWorld(), e.getLocation())) {
                    this.allies_list[i].health_bar.select();
                    this.target = this.allies_list[i];
                }
            }
        }
    },

    onKeyDown: function (key, e) {
        if (projSUS.gameConfig.spell_btn_a0 == key || projSUS.gameConfig.spell_btn_b0 == key) {

        }else if (projSUS.gameConfig.spell_btn_a1 == key|| projSUS.gameConfig.spell_btn_b1 == key) {

        }
        else if (projSUS.gameConfig.spell_btn_a2 == key || projSUS.gameConfig.spell_btn_b2 == key) {

        }
        else if (projSUS.gameConfig.spell_btn_a3 == key|| projSUS.gameConfig.spell_btn_b3 == key) {

        }
        else if (projSUS.gameConfig.spell_btn_a4 == key || projSUS.gameConfig.spell_btn_b4 == key) {

        }

        if (projSUS.gameConfig.btn_a_left  == key|| projSUS.gameConfig.btn_b_left == key) {

        }
        else if (projSUS.gameConfig.btn_a_up  == key|| projSUS.gameConfig.btn_b_up == key) {

        }
        else if (projSUS.gameConfig.btn_a_right  == key|| projSUS.gameConfig.btn_b_right == key) {

        }
        else if (projSUS.gameConfig.btn_a_down == key || projSUS.gameConfig.btn_b_down == key) {

        }
    },

    onKeyUp: function (key, e) {

    },

    addBoss: function () {

    },

    addChar: function () {

    }
});