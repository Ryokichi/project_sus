var res = {
    //sprites
    ability_effect_png :"res/img/ability_effect.png"
    ,ability_effect_plist :"res/img/ability_effect.plist"
    ,bg_png: "res/img/bg.png"
    ,bg_plist: "res/img/bg.plist"
    ,boss_png: "res/img/boss.png"
    ,boss_plist: "res/img/boss.plist"
    ,buttons_png: "res/img/buttons.png"
    ,buttons_plist: "res/img/buttons.plist"
    ,chars_png: "res/img/chars.png"
    ,chars_plist: "res/img/chars.plist"

    ,options_png: "res/img/options.png"
    ,options_plist: "res/img/options.plist"
    ,spell_book_png: "res/img/spell_book.png"
    ,spell_book_plist: "res/img/spell_book.plist"
    ,spells_icons_png: "res/img/spells_icons.png"
    ,spells_icons_plist: "res/img/spells_icons.plist"
    //
    ,char_01_png: "res/img/priest.png"
    ,char_01_plist: "res/img/priest.plist"
    ,char_02_png: "res/img/archer.png"
    ,char_02_plist: "res/img/archer.plist"
    ,char_03_png: "res/img/warrior.png"
    ,char_03_plist: "res/img/warrior.plist"
    ,selection : "res/img/seletor.png"


    ,interface_png: "res/img/interface.png"
    ,interface_plist: "res/img/interface.plist"
    ,selector_png : "res/img/selector.png"
    ,selector_plist : "res/img/selector.plist"

    //audio

    //font
    ,OperatorSC: "res/fonts/OperatorSC.fnt"
    ,splitter: "res/fonts/splitter.fnt"
    ,outline: "res/fonts/outline.fnt"
    ,mirrila: "res/fonts/mirrila.fnt"

};

var game_resources = [];
for (var i = 0; i < Object.values(res).length; i++) {
    game_resources.push(Object.values(res)[i]);
}