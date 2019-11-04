projSUS.Char = pd.Animation.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this);

        this.hsg = new projSUS.HSG();
        this.addChild(this.hsg, 2);

        this.health_bar = new projSUS.HealthBar(this);

        this.max_life = 100;
        this.curr_life = this.max_life;

        this.createAnimations();
        this.adjustInterfaceElements();
    },

    createAnimations: function() {
        cc.warn("Essa funcao deve ser sobrescrita");
    },

    adjustInterfaceElements: function() {
        var pos_x = this.width/2 - this.health_bar.life_frame.width/2;
        var pos_y = this.height + this.health_bar.life_frame.height;
        this.health_bar.setPosition(pos_x, pos_y);

        this.hsg.setPosition(this.width/2,this.height/2);
    },

    heal: function(qtd) {
        this.curr_life += qtd;
        if (this.curr_life > this.max_life) {
            this.curr_life = this.max_life;
        }
        this.health_bar.setLifePerc(this.curr_life/this.max_life);

        this.hsg.generateString(cc.color(0,255,0), qtd, this.height*0.45);
    }
});