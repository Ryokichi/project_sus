var res = {
    bg: "res/img/bg/bg.png",
    main_bg: "res/img/bg/main_bg.png",
    spell_book: "res/img/spell_book/interface.png",


    buttons_plist: "res/img/buttons.plist",
    chars_plist: "res/img/chars.plist",
    life_plist: "res/img/life.plist",

    buttons_png: "res/img/buttons.png",
    chars_png: "res/img/chars.png",
    life_png: "res/img/life.png",

    //audio
};


var game_resources = [];
for (var i = 0; i < Object.values(res).length; i++) {
    game_resources.push(Object.values(res)[i]);
}