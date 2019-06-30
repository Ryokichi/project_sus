var gb = {
    addPlistAndPng: function () {
        for (var plist_key in res) {
            if (plist_key.match("_plist")) {
                var png_key = plist_key.replace("_plist", "_png");
                cc.spriteFrameCache.addSpriteFrames(res[plist_key], res[png_key]);
            }
        }
    },

    createSprite: function (spriteName, position, parentNode, localZOrder) {
        ////para plist
        //// return cc.spriteFrameCache.getSpriteFrame(spriteFrameName);
        const name = cc.spriteFrameCache.getSpriteFrame(spriteName) || spriteName;
        const obj = new cc.Sprite(name);
        if (position)
            obj.setPosition(position);
        if (parentNode)
            parentNode.addChild(obj, localZOrder || 0);
        return obj;
    },

    createButtonFromPlist: function (spriteName, parent, zOrder) {
        const spriteNormal  = spriteName+"n.png";
        const spritePressed = spriteName+"p.png";
        const spriteDisable = spriteName+"d.png";
        const button = new ccui.Button();
        button.loadTextures(spriteNormal, spritePressed, spriteDisable, ccui.Widget.PLIST_TEXTURE);
        if (parent)
            parent.addChild(button, (zOrder || 0));
        return button;
    },

    createButtonFromLocal: function (spriteNormal, spritePressed, spriteDisable, parent, zOrder) {
        const button = new ccui.Button();
        button.loadTextures(spriteNormal, spritePressed, spriteDisable, ccui.Widget.LOCAL_TEXTURE);
        if (parent)
            parent.addChild(button, (zOrder || 0));
        return button;
    },

    changeScene: function (scene, delay, type) {
        var transition = [];
        transition.push(cc.TransitionCrossFade);
        transition.push(cc.TransitionFade);
        transition.push(cc.TransitionJumpZoom);
        transition.push(cc.TransitionMoveInB);
        transition.push(cc.TransitionMoveInR);
        transition.push(cc.TransitionMoveInT);
        transition.push(cc.TransitionProgressHorizontal);
        transition.push(cc.TransitionProgressInOut);
        transition.push(cc.TransitionProgressOutIn);
        transition.push(cc.TransitionProgressRadialCCW);
        transition.push(cc.TransitionProgressRadialCW);
        transition.push(cc.TransitionProgressVertical);
        transition.push(cc.TransitionRotoZoom);
        transition.push(cc.TransitionShrinkGrow);
        transition.push(cc.TransitionSlideInB);
        transition.push(cc.TransitionSlideInR);

        cc.director.runScene(new transition[type](delay, scene));
    },

    addMouseEvent: function (obj) {
        if (!cc.sys.capabilities.hasOwnProperty('mouse'))
            return false;

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(event.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0,0,s.width,s.height);

                if (cc.rectContainsPoint(rect, location)) {
                    cc.log("Mouse foi pressionado");
                    target.setScale(0.5);
                }
            },
            onMouseUp: function (event) {
                var target = event.getCurrentTarget();
                cc.log("Mouse foi solto");
                target.setScale(1);
            },
            onMouseMove: function (event) {
                // cc.log("Mouse Movendo");
                // cc.log(event);
            },
            onMouseScroll: function (event) {
                cc.log("Mouse Scrollando");
                cc.log(event);
            }
        }, obj);

        return true;
    }
};