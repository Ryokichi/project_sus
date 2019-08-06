projectSUS.Petrerus = cc.Node.extend({
    ctor: function (heroes) {
        this._super();

        this.heroes_list = heroes;


        this.is_atacking = false;
        this.time_to_attack = 0;


    },

    init:function () {


        this.scheduleUpdate();
    },

    update: function (dt) {

    }
});