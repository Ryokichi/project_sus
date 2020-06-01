projSUS.Petrerus = projSUS.Boss.extend({
    ctor: function (parent) {
        this._super(parent);

        this.setInitialLife(10000);
        this.setAnchorPoint(0.5, 0);

        this.target = null;

        this.time_next_attack = 3;
        this.next_attack = null;
        this.attack_list = [
            "basic",
            "criticar_codigo",
            "julgar_codigo",
            "comitar_codigo"
        ];

        this.createAnimations();

        this.runAction(cc.repeatForever(
            cc.sequence(
                cc.delayTime(3),
                cc.callFunc(function(){
                    this.changeAndPlay("attack");
                    // this.ataqueBasico(this.heroes_list[1]);
                    this.draftAttack();
                }, this),
                cc.delayTime(1),
                cc.callFunc(function(){
                    this.changeAndLoop("idle");
                },this),
                cc.delayTime(2)
            )
        ))
    },

    draftAttack: function () {
        var numb = Math.round(Math.random()*100);

        if (numb < 60) {
            this.ataqueBasico(this.heroes_list[1]);
        }
        else {
            this.criticarCodigo();
        }
    },

    createAnimations: function () {
        this.addAnimation("idle", 15, 22, "boss_", 8);
        this.addAnimation("attack", 1, 14, "boss_", 8);

        this.changeAndLoop("idle");
    },

    init: function () {
        this.scheduleUpdate();
    },

    update: function (dt) {
        this.time_next_attack -= dt;

        if (this.time_next_attack <=0) {
            switch (this.next_attack) {
                case "criticar_codigo":
                    this.criticarCodigo();
                    break;
                case "julgar_codigo":
                    this.julgarCodigo();
                    break;
                case "comitar_codigo":
                    this.comitarCodigo();
                    break;
                case "basic":
                default:
                    this.ataqueBasico();
            }
        }
    },

    ataqueBasico: function (target) {
        // cc.log("Ataque padrao");
        projSUS.controller.attackAnAlly(target, 5);
    },

    criticarCodigo: function () {
        cc.log("Criticando codigo");
        var allies  = projSUS.controller.allies;
        
        for (var i = 0; i < allies.length;  i++) {
            projSUS.controller.attackAnAlly(allies[i], 15);
        }

    },

    julgarCodigo: function () {
        cc.log("julgando codigo");
    },

    comitarCodigo: function () {
        cc.log("Comitando codigo");
    },

    takingHit: function (amount, type) {
        this.subtractLife(amount);
    }
});