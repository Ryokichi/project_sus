var res = {
    bg: "res/img/bg/bg.png",
    main_bg: "res/img/bg/main_bg.png",
    spell_book: "res/img/spell_book/interface.png",


    buttons_plist: "res/img/buttons.plist",
    buttons_png: "res/img/buttons.png",
    chars_plist: "res/img/chars.plist",
    chars_png: "res/img/chars.png",
    life_plist: "res/img/life.plist",
    life_png: "res/img/life.png",
    spell_book_plist: "res/img/spell_book.plist",
    spell_book_png: "res/img/spell_book.png",
    options_plist: "res/img/options.plist",
    options_book_png: "res/img/options.png"

    //audio
};


var game_resources = [];
for (var i = 0; i < Object.values(res).length; i++) {
    game_resources.push(Object.values(res)[i]);
}