pd.gameInput = cc.Class.extend({
    ctor: function () {
        this.mouseDownListeners =[];
        this.mouseUpListeners =[];
        this.mouseMoveListeners =[];
        this.mouseScrollListeners =[];
        this.keyUpListeners =[];
        this.keyDownListeners =[];

        let controller = this;

        let mouseListener = cc.EventListener.create({
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

        let keyBoardListener = cc.EventListener.create({
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
        let nodeData = {caller: caller_node, func: funcName, priority: priority};

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

        let listener;
        let swallow = false;
        for (let i=0; i < this.mouseDownListeners.length; i++) {
            listener = this.mouseDownListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }
    },

    onMouseUp: function (e) {
        let listener;
        let swallow = false;
        for (let i=0; i < this.mouseUpListeners.length; i++) {
            listener = this.mouseUpListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }
    },

    onMouseMove: function (e) {
        let listener;
        let swallow = false;
        for (let i=0; i < this.mouseMoveListeners.length; i++) {
            listener = this.mouseMoveListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }
    },

    onMouseScroll: function (e) {
        let listener;
        let swallow = false;
        for (let i=0; i < this.mouseScrollListeners.length; i++) {
            listener = this.mouseScrollListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }
    },

    onKeyPressed: function (key_code, event) {
        let listener;
        let swallow = false;
        for (let i=0; i < this.keyDownListeners.length; i++) {
            listener = this.keyDownListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }

    },

    onKeyReleased: function (key_code, event) {
        let listener;
        let swallow = false;
        for (let i=0; i < this.keyUpListeners.length; i++) {
            listener = this.keyUpListeners[i];
            swallow = listener.caller[listener.func](e);

            if (swallow)
                return;
        }

    }
});