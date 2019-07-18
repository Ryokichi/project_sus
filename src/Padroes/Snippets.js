pd = {};

pd.label = function (parent) {
        let label =  new cc.LabelTTF("-", "Arial", 10, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        label.setFontFillColor(cc.color(0,0,0,255));
        label.setAnchorPoint(0,1);

        if (parent)
            parent.addChild(label);

        return label;
};

pd.addPlistAndPng = function () {
        for (var plist_key in res) {
            if (plist_key.match("_plist")) {
                var png_key = plist_key.replace("_plist", "_png");
                cc.spriteFrameCache.addSpriteFrames(res[plist_key], res[png_key]);
            }
        }
    };

    pd.createSprite = function (spriteName, position, parentNode, localZOrder) {
        ////para plist
        //// return cc.spriteFrameCache.getSpriteFrame(spriteFrameName);
        const name = cc.spriteFrameCache.getSpriteFrame(spriteName) || spriteName;
        const obj = new cc.Sprite(name);
        if (position)
            obj.setPosition(position);
        if (parentNode)
            parentNode.addChild(obj, localZOrder || 0);
        return obj;
    };

    pd.createButtonFromPlist = function (spriteName, parent, zOrder) {
        const spriteNormal  = spriteName+"n.png";
        const spritePressed = spriteName+"p.png";
        const spriteDisable = spriteName+"d.png";
        const button = new ccui.Button();
        button.loadTextures(spriteNormal, spritePressed, spriteDisable, ccui.Widget.PLIST_TEXTURE);
        if (parent)
            parent.addChild(button, (zOrder || 0));
        return button;
    };

    pd.createButtonFromLocal  = function (spriteNormal, spritePressed, spriteDisable, parent, zOrder) {
        const button = new ccui.Button();
        button.loadTextures(spriteNormal, spritePressed, spriteDisable, ccui.Widget.LOCAL_TEXTURE);
        if (parent)
            parent.addChild(button, (zOrder || 0));
        return button;
    };

    pd.changeScene = function (scene, delay, type) {
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
    };
/**
 * Embaralha um array.
 * @type {Function}
 * @param {Array} array
 * @returns {Array}
 */
pd.shuffle = function(array) {
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};

/**
 * Troca a posição de dois elementos de um array entre eles.
 * @type {Function}
 * @param {Array} array
 * @param {Number} i - índice do primeiro elemento.
 * @param {Number} j - índice do segundo elemento.
 */
pd.arraySwap = function(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

/**
 * Ordena um array.
 * @type {Function}
 * @param {Array} array
 * @param {Number} [key = null] - a propriedade dos elementos do array que será usada como chave de ordenação. Se for null, o elemento do array será a própria chave.
 * @param {boolean} [crescentOrder=false]
 */
pd.orderBy = function(array, key, crescentOrder) {
    crescentOrder = crescentOrder == null || crescentOrder == undefined ? false : crescentOrder;
    for(var i = 0 ; i < array.length ; i++) {
        for(var j = i + 1 ; j < array.length; j++) {
            if(((array[j][key] || array[j]) < (array[i][key] || array[i])) == !crescentOrder) {
                pd.arraySwap(array, j, i);
            }
        }
    }
};

/**
 * Calcula a distância entre dois pontos.
 * @param {Number|cc.Point} x1_or_p1
 * @param {Number|cc.Point} y1_or_p2
 * @param {Number} [x2]
 * @param {Number} [y2]
 * @returns {number}
 * @author Ricardo Petrére
 */
pd.pointDistance = function(x1_or_p1, y1_or_p2, x2, y2) {
    var x1 = typeof x1_or_p1 == "number" ? x1_or_p1 : x1_or_p1.x;
    var y1 = typeof x1_or_p1 == "number" ? y1_or_p2 : x1_or_p1.y;
    x2 = typeof y1_or_p2 == "number" ? x2 : y1_or_p2.x;
    y2 = typeof y1_or_p2 == "number" ? y2 : y1_or_p2.y;

    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
