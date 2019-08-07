projectSUS.Petrerus = projectSUS.Boss.extend({
    ctor: function (parent) {
        this._super(parent);

        this.sprite = pd.createSprite("boss.png", cc.p(0,0), this);
        this.sprite.setAnchorPoint(0.5,0);

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
    },

    init:function () {

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