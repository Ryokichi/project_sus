cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // var designSize = cc.size(1024, 768);
    // var screenSize = cc.view.getFrameSize();

    // if(!cc.sys.isNative && screenSize.height < 800){
    //     designSize = cc.size(320, 480);
    //     cc.loader.resPath = "res/Normal";
    // }else{
    //     cc.loader.resPath = "res/HD";
    // }
    // cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);

    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(640, 360, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    //load resources

    cc.LoaderScene.preload(game_resources, function () {
        cc.director.runScene(new projectSUS.StartScene());
        pd.addPlistAndPng();
    }, this);

};
cc.game.run();