import { Trainer } from '../types/trainer';

export const trainers: Trainer[] = [
  // Kanto Champions & Elite Four
  {
    id: 'red-kanto',
    name: 'Red',
    title: 'Champion',
    region: 'Kanto',
    game: 'Red/Blue',
    sprite: 'https://archives.bulbagarden.net/media/upload/2/2f/FireRed_LeafGreen_Red.png',
    team: [
      { name: 'pikachu', level: 81, moves: ['thunderbolt', 'quick-attack', 'thunder-wave', 'seismic-toss'] },
      { name: 'charizard', level: 77, moves: ['flamethrower', 'slash', 'fire-blast', 'earthquake'] },
      { name: 'venusaur', level: 77, moves: ['razor-leaf', 'sleep-powder', 'sludge-bomb', 'frenzy-plant'] },
      { name: 'blastoise', level: 77, moves: ['surf', 'ice-beam', 'earthquake', 'hydro-cannon'] },
      { name: 'lapras', level: 75, moves: ['surf', 'psychic', 'thunderbolt', 'ice-beam'] },
      { name: 'snorlax', level: 75, moves: ['body-slam', 'earthquake', 'shadow-ball', 'rest'] }
    ]
  },
  {
    id: 'blue-kanto',
    name: 'Blue',
    title: 'Champion',
    region: 'Kanto',
    game: 'Red/Blue',
    sprite: 'https://archives.bulbagarden.net/media/upload/c/c1/FireRed_LeafGreen_Blue.png',
    team: [
      { name: 'pidgeot', level: 59, moves: ['sky-attack', 'mirror-move', 'whirlwind', 'quick-attack'] },
      { name: 'alakazam', level: 57, moves: ['psychic', 'recover', 'reflect', 'psybeam'] },
      { name: 'rhydon', level: 59, moves: ['earthquake', 'rock-slide', 'horn-drill', 'fury-attack'] },
      { name: 'gyarados', level: 58, moves: ['hydro-pump', 'dragon-rage', 'leer', 'hyper-beam'] },
      { name: 'arcanine', level: 59, moves: ['fire-blast', 'roar', 'take-down', 'leer'] },
      { name: 'venusaur', level: 61, moves: ['petal-dance', 'toxic', 'razor-leaf', 'growth'] }
    ]
  },
  // Kanto Gym Leaders
  {
    id: 'brock-kanto',
    name: 'Brock',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'rock',
    sprite: 'https://archives.bulbagarden.net/media/upload/7/78/FireRed_LeafGreen_Brock.png',
    team: [
      { name: 'geodude', level: 12, moves: ['tackle', 'defense-curl', 'rock-throw'] },
      { name: 'onix', level: 14, moves: ['tackle', 'screech', 'bind', 'rock-throw'] }
    ]
  },
  {
    id: 'misty-kanto',
    name: 'Misty',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'water',
    sprite: 'https://archives.bulbagarden.net/media/upload/b/bf/FireRed_LeafGreen_Misty.png',
    team: [
      { name: 'staryu', level: 18, moves: ['tackle', 'water-gun', 'harden'] },
      { name: 'starmie', level: 21, moves: ['tackle', 'water-gun', 'harden', 'bubble-beam'] }
    ]
  },
  {
    id: 'surge-kanto',
    name: 'Lt. Surge',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'electric',
    sprite: 'https://archives.bulbagarden.net/media/upload/c/c3/FireRed_LeafGreen_Lt_Surge.png',
    team: [
      { name: 'voltorb', level: 21, moves: ['tackle', 'screech', 'sonic-boom'] },
      { name: 'pikachu', level: 18, moves: ['thunder-wave', 'quick-attack', 'double-team'] },
      { name: 'raichu', level: 24, moves: ['thunder-wave', 'thunderbolt', 'double-team', 'seismic-toss'] }
    ]
  },
  // Johto Champions
  {
    id: 'lance-johto',
    name: 'Lance',
    title: 'Champion',
    region: 'Johto',
    game: 'Gold/Silver',
    sprite: 'https://archives.bulbagarden.net/media/upload/5/5a/HeartGold_SoulSilver_Lance.png',
    team: [
      { name: 'gyarados', level: 44, moves: ['flamethrower', 'dragon-rage', 'leer', 'hyper-beam'] },
      { name: 'dragonite', level: 47, moves: ['barrier', 'slam', 'blizzard', 'hyper-beam'] },
      { name: 'dragonite', level: 47, moves: ['thunder-wave', 'twister', 'thunder', 'hyper-beam'] },
      { name: 'aerodactyl', level: 46, moves: ['wing-attack', 'ancient-power', 'scary-face', 'hyper-beam'] },
      { name: 'charizard', level: 46, moves: ['flamethrower', 'wing-attack', 'slash', 'hyper-beam'] },
      { name: 'dragonite', level: 50, moves: ['fire-blast', 'safeguard', 'outrage', 'hyper-beam'] }
    ]
  },
  // Hoenn Champions
  {
    id: 'steven-hoenn',
    name: 'Steven',
    title: 'Champion',
    region: 'Hoenn',
    game: 'Ruby/Sapphire',
    sprite: 'https://archives.bulbagarden.net/media/upload/8/81/Omega_Ruby_Alpha_Sapphire_Steven.png',
    team: [
      { name: 'skarmory', level: 57, moves: ['toxic', 'aerial-ace', 'spikes', 'steel-wing'] },
      { name: 'aggron', level: 56, moves: ['thunder', 'earthquake', 'solar-beam', 'dragon-claw'] },
      { name: 'cradily', level: 56, moves: ['giga-drain', 'ancient-power', 'ingrain', 'confuse-ray'] },
      { name: 'armaldo', level: 56, moves: ['water-pulse', 'ancient-power', 'aerial-ace', 'slash'] },
      { name: 'claydol', level: 55, moves: ['reflect', 'light-screen', 'ancient-power', 'earthquake'] },
      { name: 'metagross', level: 58, moves: ['earthquake', 'psychic', 'meteor-mash', 'hyper-beam'] }
    ]
  },
  {
    id: 'wallace-hoenn',
    name: 'Wallace',
    title: 'Champion',
    region: 'Hoenn',
    game: 'Emerald',
    sprite: 'https://archives.bulbagarden.net/media/upload/1/1f/Omega_Ruby_Alpha_Sapphire_Wallace.png',
    team: [
      { name: 'wailord', level: 57, moves: ['water-spout', 'double-edge', 'blizzard', 'amnesia'] },
      { name: 'tentacruel', level: 55, moves: ['toxic', 'hydro-pump', 'sludge-bomb', 'ice-beam'] },
      { name: 'ludicolo', level: 56, moves: ['giga-drain', 'surf', 'ice-beam', 'double-team'] },
      { name: 'whiscash', level: 56, moves: ['earthquake', 'surf', 'amnesia', 'hyper-beam'] },
      { name: 'gyarados', level: 56, moves: ['dragon-dance', 'earthquake', 'hyper-beam', 'surf'] },
      { name: 'milotic', level: 58, moves: ['recover', 'surf', 'ice-beam', 'toxic'] }
    ]
  },
  // Sinnoh Champion
  {
    id: 'cynthia-sinnoh',
    name: 'Cynthia',
    title: 'Champion',
    region: 'Sinnoh',
    game: 'Diamond/Pearl',
    sprite: 'https://archives.bulbagarden.net/media/upload/4/4d/Platinum_Cynthia.png',
    team: [
      { name: 'spiritomb', level: 61, moves: ['silver-wind', 'embargo', 'psychic', 'dark-pulse'] },
      { name: 'roserade', level: 60, moves: ['energy-ball', 'sludge-bomb', 'extrasensory', 'shadow-ball'] },
      { name: 'togekiss', level: 60, moves: ['shock-wave', 'psychic', 'aura-sphere', 'air-slash'] },
      { name: 'lucario', level: 60, moves: ['aura-sphere', 'dragon-pulse', 'psychic', 'earthquake'] },
      { name: 'milotic', level: 60, moves: ['surf', 'ice-beam', 'mirror-coat', 'aqua-ring'] },
      { name: 'garchomp', level: 62, moves: ['dragon-rush', 'earthquake', 'brick-break', 'giga-impact'] }
    ]
  },
  
  // Unys Champions
  {
    id: 'alder-unova',
    name: 'Alder',
    title: 'Champion',
    region: 'Unova',
    game: 'Black/White',
    sprite: 'https://archives.bulbagarden.net/media/upload/c/c7/Black_White_Alder.png',
    team: [
      { name: 'accelgor', level: 75, moves: ['bug-buzz', 'focus-blast', 'encore', 'swift'] },
      { name: 'bouffalant', level: 75, moves: ['head-charge', 'earthquake', 'stone-edge', 'swords-dance'] },
      { name: 'braviary', level: 75, moves: ['brave-bird', 'shadow-claw', 'rock-slide', 'bulk-up'] },
      { name: 'conkeldurr', level: 75, moves: ['hammer-arm', 'stone-edge', 'grass-knot', 'bulk-up'] },
      { name: 'druddigon', level: 75, moves: ['dragon-claw', 'flamethrower', 'thunder-punch', 'focus-blast'] },
      { name: 'volcarona', level: 77, moves: ['fire-dance', 'bug-buzz', 'heat-wave', 'quiver-dance'] }
    ]
  },
  {
    id: 'iris-unova',
    name: 'Iris',
    title: 'Champion',
    region: 'Unova',
    game: 'Black 2/White 2',
    sprite: 'https://archives.bulbagarden.net/media/upload/2/2c/Black_2_White_2_Iris.png',
    team: [
      { name: 'hydreigon', level: 57, moves: ['dragon-pulse', 'fire-blast', 'focus-blast', 'surf'] },
      { name: 'druddigon', level: 57, moves: ['dragon-claw', 'thunder-punch', 'fire-punch', 'rock-slide'] },
      { name: 'aggron', level: 57, moves: ['head-smash', 'earthquake', 'dragon-claw', 'thunder-wave'] },
      { name: 'archeops', level: 57, moves: ['acrobatics', 'stone-edge', 'dragon-claw', 'shadow-claw'] },
      { name: 'lapras', level: 57, moves: ['surf', 'thunderbolt', 'psychic', 'dragon-pulse'] },
      { name: 'haxorus', level: 59, moves: ['outrage', 'earthquake', 'poison-jab', 'shadow-claw'] }
    ]
  },

  // Kalos Champion
  {
    id: 'diantha-kalos',
    name: 'Diantha',
    title: 'Champion',
    region: 'Kalos',
    game: 'X/Y',
    sprite: 'https://archives.bulbagarden.net/media/upload/5/52/XY_Diantha.png',
    team: [
      { name: 'hawlucha', level: 64, moves: ['flying-press', 'x-scissor', 'hone-claws', 'roost'] },
      { name: 'tyrantrum', level: 65, moves: ['head-smash', 'earthquake', 'crunch', 'dragon-claw'] },
      { name: 'aurorus', level: 65, moves: ['blizzard', 'hyper-beam', 'thunder', 'ancient-power'] },
      { name: 'gourgeist', level: 65, moves: ['phantom-force', 'seed-bomb', 'flamethrower', 'shadow-sneak'] },
      { name: 'goodra', level: 66, moves: ['dragon-pulse', 'sludge-bomb', 'focus-blast', 'thunderbolt'] },
      { name: 'gardevoir', level: 68, moves: ['moonblast', 'psychic', 'shadow-ball', 'focus-blast'] }
    ]
  },

  // Alola Champion
  {
    id: 'kukui-alola',
    name: 'Professor Kukui',
    title: 'Champion',
    region: 'Alola',
    game: 'Sun/Moon',
    sprite: 'https://archives.bulbagarden.net/media/upload/4/4c/Sun_Moon_Professor_Kukui.png',
    team: [
      { name: 'lycanroc', level: 57, moves: ['stone-edge', 'crunch', 'accelerock', 'fire-fang'] },
      { name: 'braviary', level: 57, moves: ['brave-bird', 'shadow-claw', 'rock-slide', 'bulk-up'] },
      { name: 'magnezone', level: 56, moves: ['thunderbolt', 'flash-cannon', 'tri-attack', 'thunder-wave'] },
      { name: 'komala', level: 57, moves: ['last-resort', 'wood-hammer', 'earthquake', 'u-turn'] },
      { name: 'ninetales-alola', level: 56, moves: ['blizzard', 'dazzling-gleam', 'psychic', 'aurora-veil'] },
      { name: 'incineroar', level: 58, moves: ['darkest-lariat', 'flare-blitz', 'throat-chop', 'earthquake'] }
    ]
  },

  // Galar Champions
  {
    id: 'leon-galar',
    name: 'Leon',
    title: 'Champion',
    region: 'Galar',
    game: 'Sword/Shield',
    sprite: 'https://archives.bulbagarden.net/media/upload/f/f4/Sword_Shield_Leon.png',
    team: [
      { name: 'aegislash', level: 62, moves: ['shadow-ball', 'flash-cannon', 'shadow-sneak', 'kings-shield'] },
      { name: 'dragapult', level: 62, moves: ['dragon-darts', 'phantom-force', 'u-turn', 'thunder-wave'] },
      { name: 'haxorus', level: 63, moves: ['outrage', 'earthquake', 'poison-jab', 'shadow-claw'] },
      { name: 'seismitoad', level: 64, moves: ['liquidation', 'earthquake', 'poison-jab', 'stealth-rock'] },
      { name: 'mr-rime', level: 64, moves: ['psychic', 'dazzling-gleam', 'freeze-dry', 'focus-blast'] },
      { name: 'charizard', level: 65, moves: ['air-slash', 'flamethrower', 'thunder-punch', 'dragon-pulse'] }
    ]
  },

  // Paldea Champions
  {
    id: 'nemona-paldea',
    name: 'Nemona',
    title: 'Champion',
    region: 'Paldea',
    game: 'Scarlet/Violet',
    sprite: 'https://archives.bulbagarden.net/media/upload/3/3e/Scarlet_Violet_Nemona.png',
    team: [
      { name: 'lycanroc', level: 65, moves: ['stone-edge', 'psychic-fangs', 'play-rough', 'accelerock'] },
      { name: 'altaria', level: 65, moves: ['dragon-pulse', 'moonblast', 'flamethrower', 'roost'] },
      { name: 'goodra', level: 65, moves: ['dragon-pulse', 'flamethrower', 'sludge-bomb', 'thunderbolt'] },
      { name: 'dudunsparce', level: 65, moves: ['hyper-drill', 'dragon-rush', 'poison-jab', 'roost'] },
      { name: 'orthworm', level: 65, moves: ['iron-tail', 'earthquake', 'body-press', 'smack-down'] },
      { name: 'meowscarada', level: 66, moves: ['flower-trick', 'night-slash', 'u-turn', 'shadow-claw'] }
    ]
  },

  // More Gym Leaders across generations
  {
    id: 'volkner-sinnoh',
    name: 'Volkner',
    title: 'Gym Leader',
    region: 'Sinnoh',
    game: 'Diamond/Pearl',
    type: 'electric',
    sprite: 'https://archives.bulbagarden.net/media/upload/f/fb/Diamond_Pearl_Volkner.png',
    team: [
      { name: 'jolteon', level: 46, moves: ['thunder', 'shadow-ball', 'signal-beam', 'double-kick'] },
      { name: 'raichu', level: 46, moves: ['thunder', 'focus-blast', 'grass-knot', 'brick-break'] },
      { name: 'luxray', level: 48, moves: ['thunder-fang', 'crunch', 'fire-fang', 'superpower'] },
      { name: 'electivire', level: 50, moves: ['thunder-punch', 'fire-punch', 'ice-punch', 'earthquake'] }
    ]
  },
  {
    id: 'flannery-hoenn',
    name: 'Flannery',
    title: 'Gym Leader',
    region: 'Hoenn',
    game: 'Ruby/Sapphire',
    type: 'fire',
    sprite: 'https://archives.bulbagarden.net/media/upload/d/d0/Omega_Ruby_Alpha_Sapphire_Flannery.png',
    team: [
      { name: 'numel', level: 24, moves: ['overheat', 'take-down', 'magnitude', 'sunny-day'] },
      { name: 'slugma', level: 24, moves: ['overheat', 'rock-slide', 'light-screen', 'sunny-day'] },
      { name: 'camerupt', level: 26, moves: ['overheat', 'tackle', 'sunny-day', 'attract'] },
      { name: 'torkoal', level: 29, moves: ['overheat', 'body-slam', 'white-smoke', 'attract'] }
    ]
  },
  {
    id: 'elesa-unova',
    name: 'Elesa',
    title: 'Gym Leader',
    region: 'Unova',
    game: 'Black/White',
    type: 'electric',
    sprite: 'https://archives.bulbagarden.net/media/upload/9/94/Black_White_Elesa.png',
    team: [
      { name: 'emolga', level: 25, moves: ['volt-switch', 'aerial-ace', 'pursuit', 'double-team'] },
      { name: 'emolga', level: 25, moves: ['volt-switch', 'aerial-ace', 'pursuit', 'double-team'] },
      { name: 'zebstrika', level: 27, moves: ['spark', 'pursuit', 'stomp', 'thunder-wave'] }
    ]
  },
  {
    id: 'clemont-kalos',
    name: 'Clemont',
    title: 'Gym Leader',
    region: 'Kalos',
    game: 'X/Y',
    type: 'electric',
    sprite: 'https://archives.bulbagarden.net/media/upload/e/e7/XY_Clemont.png',
    team: [
      { name: 'emolga', level: 35, moves: ['volt-switch', 'acrobatics', 'u-turn', 'light-screen'] },
      { name: 'magneton', level: 35, moves: ['thunderbolt', 'flash-cannon', 'volt-switch', 'thunder-wave'] },
      { name: 'heliolisk', level: 37, moves: ['thunderbolt', 'hyper-voice', 'grass-knot', 'thunder-wave'] }
    ]
  }
];

export const getTrainersByRegion = (region: string): Trainer[] => {
  return trainers.filter(trainer => trainer.region === region);
};

export const getTrainersByType = (type: string): Trainer[] => {
  return trainers.filter(trainer => trainer.type === type);
};

export const getTrainerById = (id: string): Trainer | undefined => {
  return trainers.find(trainer => trainer.id === id);
};