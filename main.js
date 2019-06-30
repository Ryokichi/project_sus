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
    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    //load resources

    cc.LoaderScene.preload(game_resources, function () {
        cc.director.runScene(new MainScene());
        gb.addPlistAndPng();
        // cc.director.runScene(new Stage1Scene());
        // cc.spriteFrameCache.addSpriteFrames(res.buttons_plist, res.buttons_png); // sprite cache
    }, this);

};
cc.game.run();






// cc.game.onStart = function() {
//     cc.view.adjustViewPort(true);
//     cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.SHOW_ALL);
//     cc.view.resizeWithBrowserSize(true);
//
//     cc.loader.loadJson("paths.json", function(err, data) {
//         const paths = cc.sys.isMobile ? data.mobile : data.desktop;
//         cc.loader.loadJs(paths.padroesPath, ["src/Boot.js"], function() {
//             pd.boot(paths);
//         });
//     });
// };
//
// cc.game.run();
