cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(640, 360, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(game_resources, function () {
        cc.director.runScene(new projSUS.MainScene());
        pd.addPlistAndPng();
    }, this);

};
cc.game.run();