projSUS.Buff = cc.Class.extend({
    ctor:function (spell_target, spell_caller) {
        this._super();
        this.parent = spell_target;
        this.spell = spell_caller;

        this.time_duration = 0;
        this.tick_overtime = 0;

        this.scheduleUpdate();
    },

    update: function (dt) {
        if (this.time_duration > 0) {
            this.time_duration -= dt;
        }
        else {
            this.endLifeTime();
        }
    }

    
});