pd.gameInput = cc.Class.extend({
    ctor: function () {
        this.mouseDownListeners =[];
        this.mouseUpListeners =[];
        this.mouseMoveListeners =[];
        this.mouseScrollListeners =[];
        this.keyUpListeners =[];
        this.keyDownListeners =[];

        var controller = this;

        var mouseListener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                controller.onMouseDown(event);
            },
            onMouseUp: function (event) {
                controller.onMouseUp(event);
            },
            onMouseMove: function (event) {
                controller.onMouseMove(event);
            },
            onMouseScroll: function (event) {
                controller.onMouseScroll(event);
            }
        });

        var keyBoardListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (key_code, event) {
                controller.onKeyPressed(key_code, event)
            },
            onKeyReleased: function (key_code, event) {
                controller.onKeyReleased(key_code, event)
            }
        });
        
        cc.eventManager.addListener(mouseListener, 1);
        cc.eventManager.addListener(keyBoardListener, 2);
    },

    removeEventListener: function () {

    },

    addEventListener: function(typeFunc, funcName, caller_node, priority) {
        var nodeData = {caller: caller_node, func: funcName, priority: priority};

        if (typeFunc === "onMouseDown") {
            this.mouseDownListeners.push(nodeData);
        }
        else if (typeFunc === "onMouseUp") {
            this.mouseUpListeners.push(nodeData);
        }
        else if (typeFunc === "onMouseMove") {
            this.mouseMoveListeners.push(nodeData);
        }
        else if (typeFunc === "onMouseScroll") {
            this.mouseScrollListeners.push(nodeData);
        }
        else if (typeFunc === "onKeyPressed") {
            this.keyDownListeners.push(nodeData);
        }
        else if (typeFunc === "onKeyReleased") {
            this.keyUpListeners.push(nodeData);
        }

        this.organize();
    },

    cleanup: function () {
        this.mouseDownListeners =[];
        this.mouseUpListeners =[];
        this.mouseMoveListeners =[];
        this.mouseScrollListeners =[];
        this.keyUpListeners =[];
        this.keyDownListeners =[];
    },

    organize: function () {
        pd.orderBy(this.mouseDownListeners, "priority", true);
        pd.orderBy(this.mouseUpListeners, "priority", true);
        pd.orderBy(this.mouseMoveListeners, "priority", true);
        pd.orderBy(this.mouseScrollListeners, "priority", true);
        pd.orderBy(this.keyUpListeners, "priority", true);
        pd.orderBy(this.keyDownListeners, "priority", true);
    },

    onMouseDown: function (e) {
        var listener;
        var swallow = false;
        for (var i=0; i < this.mouseDownListeners.length; i++) {
            listener = this.mouseDownListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }
    },

    onMouseUp: function (e) {
        for (var i=0; i < this.mouseUpListeners.length; i++) {

        }
    },

    onMouseMove: function (e) {
        for (var i=0; i < this.mouseMoveListeners.length; i++) {

        }
    },

    onMouseScroll: function (e) {
        for (var i=0; i < this.mouseScrollListeners.length; i++) {

        }
    },

    onKeyPressed: function (key_code, event) {
        for (var i=0; i < this.keyDownListeners.length; i++) {

        }

    },

    onKeyReleased: function (key_code, event) {
        for (var i=0; i < this.keyUpListeners.length; i++) {

        }

    }
});