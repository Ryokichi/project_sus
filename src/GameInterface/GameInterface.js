projSUS.GameInterface = cc.Node.extend({
    ctor: function (parent) {
        this._super();
        if (parent) parent.addChild(this, 1000);
        this.bg = pd.createSprite("spells_frame.png", cc.p(320, 25), this);

        this.slot = [];
        for (var spell in projSUS.SavedData.spell) {
            if (projSUS.SavedData.spell[spell] !== null) {
                this.slot.push(new projSUS[spell]);
            }
            else {
                this.slot.push("null")
            }
        }
    }
});