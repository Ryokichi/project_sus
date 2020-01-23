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


pd.ComplexBar = cc.Node.extend({
    ctor: function (mainImg, backgroundImg, parentNode, localZOrder) {
        this._super();

        this.bg_img      = null;
        this.main_img    = pd.createSprite(mainImg);
        this.progressBar = new cc.ProgressTimer(this.main_img);
        this.progressBar.setType(cc.ProgressTimer.TYPE_BAR);
        this.progressBar.setMidpoint(cc.p(0,0.5));
        this.progressBar.setBarChangeRate(cc.p(1,0));
        this.progressBar.setPercentage(100);
        this.addChild(this.progressBar);

        this.width = this.main_img.width;
        this.height = this.main_img.height;

        if (backgroundImg) {
            this.bg_img = pd.createSprite(backgroundImg, cc.p(0,0), this, -1);
            this.width = this.bg_img.width;
            this.height = this.bg_img.height;
        }

        if (parentNode) {
            parentNode.addChild(this, localZOrder || 0);
        }
    },

    setPercentage: function (perc) {
        this.progressBar.setPercentage(perc);
    }
});