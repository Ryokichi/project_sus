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

    removeEventListener: function (caller_node) {
        for (var i = 0; this.mouseDownListeners.length; i++) {
            if (this.mouseDownListeners[i].caller === caller_node){
                this.mouseDownListeners.splice(i, 1);
                break;
            }
        }

        for (var i = 0; this.mouseUpListeners.length; i++) {
            if (this.mouseUpListeners[i].caller === caller_node){
                this.mouseUpListeners.splice(i, 1);
                break;
            }
        }

        for (var i = 0; this.mouseMoveListeners.length; i++) {
            if (this.mouseMoveListeners[i].caller === caller_node){
                this.mouseMoveListeners.splice(i, 1);
                break;
            }
        }

        for (var i = 0; this.mouseScrollListeners.length; i++) {
            if (this.mouseScrollListeners[i].caller === caller_node){
                this.mouseScrollListeners.splice(i, 1);
                break;
            }
        }

        for (var i = 0; this.keyDownListeners.length; i++) {
            if (this.keyDownListeners[i].caller === caller_node){
                this.keyDownListeners.splice(i, 1);
                break;
            }
        }

        for (var i = 0; this.keyUpListeners.length; i++) {
            if (this.keyUpListeners[i].caller === caller_node){
                this.keyUpListeners.splice(i, 1);
                break;
            }
        }
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
        if (e.getButton() === cc.EventMouse.BUTTON_RIGHT){
            cc.log(e.getLocation());
        }

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
        var listener;
        var swallow = false;
        for (var i=0; i < this.mouseUpListeners.length; i++) {
            listener = this.mouseUpListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }
    },

    onMouseMove: function (e) {
        var listener;
        var swallow = false;
        for (var i=0; i < this.mouseMoveListeners.length; i++) {
            listener = this.mouseMoveListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }
    },

    onMouseScroll: function (e) {
        var listener;
        var swallow = false;
        for (var i=0; i < this.mouseScrollListeners.length; i++) {
            listener = this.mouseScrollListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }
    },

    onKeyPressed: function (key_code, event) {
        var listener;
        var swallow = false;
        for (var i=0; i < this.keyDownListeners.length; i++) {
            listener = this.keyDownListeners[i];
            swallow = listener.caller[listener.func](key_code, event);

            if (swallow)
                return;
        }

    },

    onKeyReleased: function (key_code, event) {
        var listener;
        var swallow = false;
        for (var i=0; i < this.keyUpListeners.length; i++) {
            listener = this.keyUpListeners[i];
            swallow = listener.caller[listener.func](key_code, event);

            if (swallow)
                return;
        }

    }
});