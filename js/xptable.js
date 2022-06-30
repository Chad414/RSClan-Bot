exports.virtualLevelForXP = (xp) => {
  switch (true) {
    case (xp < 14391160):
      return '';
    case (xp < 15889109):
      return '(100)';
    case (xp < 17542976):
      return '(101)';
    case (xp < 19368992):
      return '(102)';
    case (xp < 21385073):
      return '(103)';
    case (xp < 23611006):
      return '(104)';
    case (xp < 26068632):
      return '(105)';
    case (xp < 28782069):
      return '(106)';
    case (xp < 31777943):
      return '(107)';
    case (xp < 35085654):
      return '(108)';
    case (xp < 38737661):
      return '(109)';
    case (xp < 42769801):
      return '(110)';
    case (xp < 47221641):
      return '(111)';
    case (xp < 52136869):
      return '(112)';
    case (xp < 57563718):
      return '(113)';
    case (xp < 63555443):
      return '(114)';
    case (xp < 70170840):
      return '(115)';
    case (xp < 77474828):
      return '(116)';
    case (xp < 85539082):
      return '(117)';
    case (xp < 94442737):
      return '(118)';
    case (xp < 104273167):
      return '(119)';
    case (xp >= 104273167):
      return '(120)';
    default:
      return ''
  }
};