var res = {
    bg: "res/img/bg/bg.png",
    main_bg: "res/img/bg/main_bg.png",
    spell_book: "res/img/spell_book/interface.png",

    bg_plist: "res/img/bg.plist",
    bg_png: "res/img/bg.png",
    buttons_plist: "res/img/buttons.plist",
    buttons_png: "res/img/buttons.png",
    chars_plist: "res/img/chars.plist",
    chars_png: "res/img/chars.png",
    interface_plist: "res/img/interface.plist",
    interface_png: "res/img/interface.png",
    // life_plist: "res/img/life.plist",
    // life_png: "res/img/life.png",
    spell_book_plist: "res/img/spell_book.plist",
    spell_book_png: "res/img/spell_book.png",
    options_plist: "res/img/options.plist",
    options_book_png: "res/img/options.png",

    //audio
    bmg: "res/audios/placeholders/editados/battle_theme_1_loop.mp3",
    click: "res/audios/placeholders/editados/click_1.mp3",
    sfx_spell_1: "res/audios/placeholders/editados/spell_cast_1.mp3",
    sfx_spell_2: "res/audios/placeholders/editados/spell_cast_1.mp3",
    sfx_spell_3: "res/audios/placeholders/editados/spell_cast_2.mp3",
    sfx_spell_4: "res/audios/placeholders/editados/spell_cast_3.mp3",
    sfx_spell_5: "res/audios/placeholders/editados/spell_cast_3.mp3",

    sfx_hit_1: "res/audios/placeholders/editados/hit_fleshy.mp3",
    sfx_hit_2: "res/audios/placeholders/editados/hit_low.mp3",
    sfx_hit_3: "res/audios/placeholders/editados/hit_low2.mp3",
    sfx_hit_4: "res/audios/placeholders/editados/hit_mid.mp3",

};


var game_resources = [];
for (var i = 0; i < Object.values(res).length; i++) {
    game_resources.push(Object.values(res)[i]);
}