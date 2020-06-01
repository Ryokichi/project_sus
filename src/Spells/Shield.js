projSUS.Shield = projSUS.Spell.extend({
    ctor: function () {
        this._super();

        this.id = "Shield";
        this.name = "Bolha Protetora";
        this.sprite_name = "shield.png";

        this.base_mana      = 5;
        this.base_cast      = 1;
        this.base_cd        = 0.8;
        this.base_duration  = 3;
        this.mitigation_dmg = 25;

        this.cast_timer = 0;
        this.cd_timer   = 0;

        this.shilds_list = [];4

        this.init();
    },

    leveUP: function () {

    },

    beginCast: function (target) {
        this.target = target;
        if (this.curr_cd > 0) {
            cc.log("Magia ainda em cooldown:", this.curr_cd);
        }
        else if (projSUS.controller.healerHasMana(this.base_mana)) {
            projSUS.controller.healer.consumeMana(this.base_mana);
            this.curr_status = this.status["onCast"];
            this.scheduleUpdate();
        }
        else {
            cc.log("Jogador não tem mana suficiente")
        }
    },

    finishCast: function () {
        this.createNewShield(this.target);
        this.target = null;
        this.cast_timer = 0;
        this.curr_cd = this.base_cd;
        this.curr_status = this.status["onCD"];
    },

    setDescription: function () {
        this.description = "Lança uma bolha protetora sobre o aliado, que " +
                           "absorve até " + this.mitigation_dmg + " de dano durante " +
                           this.base_duration + " segundos."
    },

    createNewShield: function (target) {
        var shield = new projSUS.SpellShield(target);
        this.shilds_list.push(shield);
    }
});

projSUS.SpellShield = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        parent.addChild(this);

        var box = parent.getBoundingBox();
        this.image  =  pd.createSprite("a_shield.png", {x:box.width/2, y:-5}, this);
        this.image.setAnchorPoint(0.5, 0);
        this.animate();
        this.scheduleUpdate();

        this.timer = 0;
    },

    update: function (dt) {
        this.timer += dt;
        if  (this.timer  > 5) {
            this.image.stopAllActions();
            this.removeFromParent();
        }
    },

    animate: function ()  {
        this.image.runAction(cc.repeatForever(
            cc.sequence(
                cc.scaleTo(0.5, 1.1, 1.0),
                cc.scaleTo(0.5, 1.0, 1.0),
            )
        ));
    }
    
});