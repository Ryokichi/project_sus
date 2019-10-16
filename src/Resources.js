var res = {
    //sprites
     bg_png : "res/img/bg.png"
    ,bg_plist : "res/img/bg.plist"
    ,buttons_png : "res/img/buttons.png"
    ,buttons_plist : "res/img/buttons.plist"

    //audio

};


var game_resources = [];
for (var i = 0; i < Object.values(res).length; i++) {
    game_resources.push(Object.values(res)[i]);
}

cc.log(game_resources);