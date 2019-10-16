pd.Button = cc.Node.extend ({
    /**
     normal sprite
     pressed sprite
     disabled sprite
     **/
    ctor: function () {
        this._super();

        this.is_enable = true;
        this.sprite = null;
        this.label = null;
        this.text_label = "";
        this.sprite_status = [null, null, null];
    },

    onMouseDown: function (e) {

    },

    onMouseUp: function (e) {

    },

    onMouseMove: function (e) {

    },

    onMouseScroll: function (e) {

    },

    setSprites: function (sprite_n, sprite_p, sprite_d) {
        this.sprite_status[0] = sprite_n;
        this.sprite_status[1] = sprite_p;
        this.sprite_status[2] = sprite_d;

        this.sprite = pd.createSprite(sprite_n, cc.p(0,0), this);
    },

    setLabel: function (label) {
        this.text_label = label;
        this.label = new cc.LabelTTF(this.text_label, "Arial", 10, this.sprite, cc.TEXT_ALIGNMENT_CENTER, cc.TEXT_ALIGNMENT_CENTER);
        this.label.setFontFillColor(cc.color(0,0,0,255));
        this.label.setPosition(this.sprite.width/2, this.sprite.height/2);
        this.sprite.addChild(this.label);
    },

    setEnable: function () {
        this.is_enable = true;
    },

    setDisable: function () {
        this.is_enable = false;
    }

});