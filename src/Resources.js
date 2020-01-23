var res = {
    //sprites
     bg_png: "res/img/bg.png"
    ,bg_plist: "res/img/bg.plist"
    ,boss_png: "res/img/boss.png"
    ,boss_plist: "res/img/boss.plist"
    ,buttons_png: "res/img/buttons.png"
    ,buttons_plist: "res/img/buttons.plist"
    ,chars_png: "res/img/chars.png"
    ,chars_plist: "res/img/chars.plist"
    // ,interface_png: "res/img/chars.png"
    // ,interface_plist: "res/img/chars.plist"
    ,options_png: "res/img/options.png"
    ,options_plist: "res/img/options.plist"
    ,spell_book_png: "res/img/spell_book.png"
    ,spell_book_plist: "res/img/spell_book.plist"
    ,spells_icons_png: "res/img/spells_icons.png"
    ,spells_icons_plist: "res/img/spells_icons.plist"
    //
    ,teste_png: "res/img/priest.png"
    ,teste_plist: "res/img/priest.plist"
    ,interface_png: "res/img/interface.png"
    ,interface_plist: "res/img/interface.plist"

    //audio

    //font
    ,OperatorSC: "res/fonts/OperatorSC.fnt"
    ,splitter: "res/fonts/splitter.fnt"
    ,outline: "res/fonts/outline.fnt"

};

var game_resources = [];
for (var i = 0; i < Object.values(res).length; i++) {
    game_resources.push(Object.values(res)[i]);
}