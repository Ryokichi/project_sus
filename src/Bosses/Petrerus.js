projSUS.Petrerus = projSUS.Boss.extend({
    ctor: function (parent) {
        this._super(parent);

        this.setAnchorPoint(0.5, 0);

        this.life     = 1;
        this.max_life = 1;
        this.heroes_list = null;
        this.time_next_attack = 0;
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
                }, this),
                cc.delayTime(1),
                cc.callFunc(function(){
                    this.changeAndLoop("idle");
                },this),
                cc.delayTime(2)
            )
        ))
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

    ataqueBasico: function () {
        cc.log("Ataque padrao");
    },

    criticarCodigo: function () {
        cc.log("Criticando codigo");

    },

    julgarCodigo: function () {
        cc.log("julgando codigo");
    },

    comitarCodigo: function () {
        cc.log("Comitando codigo");
    }
});