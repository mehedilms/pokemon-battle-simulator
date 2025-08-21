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
  },
  
  // Ajout de plus de dresseurs Kanto
  {
    id: 'erika-kanto',
    name: 'Erika',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'grass',
    sprite: 'https://archives.bulbagarden.net/media/upload/2/24/FireRed_LeafGreen_Erika.png',
    team: [
      { name: 'victreebel', level: 29, moves: ['stun-spore', 'acid', 'petal-dance', 'sleep-powder'] },
      { name: 'tangela', level: 24, moves: ['constrict', 'bind', 'absorb', 'poisonpowder'] },
      { name: 'vileplume', level: 29, moves: ['sleep-powder', 'acid', 'petal-dance', 'toxic'] }
    ]
  },
  {
    id: 'koga-kanto',
    name: 'Koga',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'poison',
    sprite: 'https://archives.bulbagarden.net/media/upload/4/45/FireRed_LeafGreen_Koga.png',
    team: [
      { name: 'koffing', level: 37, moves: ['tackle', 'smog', 'sludge', 'smokescreen'] },
      { name: 'muk', level: 39, moves: ['minimize', 'sludge', 'acid-armor', 'toxic'] },
      { name: 'koffing', level: 37, moves: ['tackle', 'smog', 'sludge', 'smokescreen'] },
      { name: 'weezing', level: 43, moves: ['tackle', 'smog', 'sludge', 'smokescreen'] }
    ]
  },
  {
    id: 'sabrina-kanto',
    name: 'Sabrina',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'psychic',
    sprite: 'https://archives.bulbagarden.net/media/upload/0/09/FireRed_LeafGreen_Sabrina.png',
    team: [
      { name: 'kadabra', level: 38, moves: ['kinesis', 'psybeam', 'recover', 'psychic'] },
      { name: 'mr-mime', level: 37, moves: ['barrier', 'psybeam', 'bide', 'substitute'] },
      { name: 'venomoth', level: 38, moves: ['leech-life', 'supersonic', 'psybeam', 'psychic'] },
      { name: 'alakazam', level: 43, moves: ['kinesis', 'psybeam', 'recover', 'psychic'] }
    ]
  },
  {
    id: 'blaine-kanto',
    name: 'Blaine',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'fire',
    sprite: 'https://archives.bulbagarden.net/media/upload/1/1c/FireRed_LeafGreen_Blaine.png',
    team: [
      { name: 'growlithe', level: 42, moves: ['bite', 'roar', 'ember', 'leer'] },
      { name: 'ponyta', level: 40, moves: ['stomp', 'growl', 'ember', 'tail-whip'] },
      { name: 'rapidash', level: 42, moves: ['stomp', 'growl', 'fire-spin', 'take-down'] },
      { name: 'arcanine', level: 47, moves: ['bite', 'roar', 'take-down', 'fire-blast'] }
    ]
  },
  {
    id: 'giovanni-kanto',
    name: 'Giovanni',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'ground',
    sprite: 'https://archives.bulbagarden.net/media/upload/8/8c/FireRed_LeafGreen_Giovanni.png',
    team: [
      { name: 'rhyhorn', level: 45, moves: ['stomp', 'tail-whip', 'fury-attack', 'horn-drill'] },
      { name: 'dugtrio', level: 42, moves: ['growl', 'dig', 'sand-attack', 'slash'] },
      { name: 'nidoqueen', level: 44, moves: ['scratch', 'tail-whip', 'body-slam', 'double-kick'] },
      { name: 'nidoking', level: 45, moves: ['thrash', 'double-kick', 'poison-sting', 'focus-energy'] },
      { name: 'rhydon', level: 50, moves: ['stomp', 'tail-whip', 'fury-attack', 'horn-drill'] }
    ]
  },

  // Elite Four Kanto
  {
    id: 'lorelei-kanto',
    name: 'Lorelei',
    title: 'Elite Four',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'ice',
    sprite: 'https://archives.bulbagarden.net/media/upload/8/8c/FireRed_LeafGreen_Lorelei.png',
    team: [
      { name: 'dewgong', level: 54, moves: ['growl', 'aurora-beam', 'rest', 'take-down'] },
      { name: 'cloyster', level: 53, moves: ['withdraw', 'aurora-beam', 'clamp', 'spike-cannon'] },
      { name: 'slowbro', level: 54, moves: ['growl', 'water-gun', 'withdraw', 'amnesia'] },
      { name: 'jynx', level: 56, moves: ['doubleslap', 'ice-punch', 'rest', 'psywave'] },
      { name: 'lapras', level: 56, moves: ['water-gun', 'body-slam', 'confuse-ray', 'ice-beam'] }
    ]
  },
  {
    id: 'bruno-kanto',
    name: 'Bruno',
    title: 'Elite Four',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'fighting',
    sprite: 'https://archives.bulbagarden.net/media/upload/9/97/FireRed_LeafGreen_Bruno.png',
    team: [
      { name: 'onix', level: 53, moves: ['bind', 'rock-throw', 'rage', 'slam'] },
      { name: 'hitmonchan', level: 55, moves: ['comet-punch', 'fire-punch', 'ice-punch', 'thunder-punch'] },
      { name: 'hitmonlee', level: 55, moves: ['double-kick', 'meditate', 'rolling-kick', 'hi-jump-kick'] },
      { name: 'onix', level: 56, moves: ['bind', 'rock-throw', 'rage', 'slam'] },
      { name: 'machamp', level: 58, moves: ['karate-chop', 'leer', 'focus-energy', 'submission'] }
    ]
  },
  {
    id: 'agatha-kanto',
    name: 'Agatha',
    title: 'Elite Four',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'ghost',
    sprite: 'https://archives.bulbagarden.net/media/upload/a/ab/FireRed_LeafGreen_Agatha.png',
    team: [
      { name: 'gengar', level: 56, moves: ['substitute', 'lick', 'confuse-ray', 'night-shade'] },
      { name: 'golbat', level: 56, moves: ['supersonic', 'confuse-ray', 'wing-attack', 'haze'] },
      { name: 'haunter', level: 55, moves: ['lick', 'confuse-ray', 'night-shade', 'toxic'] },
      { name: 'arbok', level: 58, moves: ['wrap', 'poison-sting', 'bite', 'glare'] }
    ]
  },

  // Johto Gym Leaders
  {
    id: 'falkner-johto',
    name: 'Falkner',
    title: 'Gym Leader',
    region: 'Johto',
    game: 'Gold/Silver',
    type: 'flying',
    sprite: 'https://archives.bulbagarden.net/media/upload/f/f2/HeartGold_SoulSilver_Falkner.png',
    team: [
      { name: 'pidgey', level: 7, moves: ['tackle', 'sand-attack'] },
      { name: 'pidgeotto', level: 9, moves: ['tackle', 'sand-attack', 'gust'] }
    ]
  },
  {
    id: 'bugsy-johto',
    name: 'Bugsy',
    title: 'Gym Leader',
    region: 'Johto',
    game: 'Gold/Silver',
    type: 'bug',
    sprite: 'https://archives.bulbagarden.net/media/upload/9/9a/HeartGold_SoulSilver_Bugsy.png',
    team: [
      { name: 'metapod', level: 14, moves: ['tackle', 'string-shot', 'harden'] },
      { name: 'kakuna', level: 14, moves: ['poison-sting', 'string-shot', 'harden'] },
      { name: 'scyther', level: 16, moves: ['quick-attack', 'leer', 'focus-energy', 'fury-cutter'] }
    ]
  },
  {
    id: 'whitney-johto',
    name: 'Whitney',
    title: 'Gym Leader',
    region: 'Johto',
    game: 'Gold/Silver',
    type: 'normal',
    sprite: 'https://archives.bulbagarden.net/media/upload/e/e6/HeartGold_SoulSilver_Whitney.png',
    team: [
      { name: 'clefairy', level: 18, moves: ['growl', 'encore', 'doubleslap', 'metronome'] },
      { name: 'miltank', level: 20, moves: ['growl', 'stomp', 'milk-drink', 'rollout'] }
    ]
  },
  {
    id: 'morty-johto',
    name: 'Morty',
    title: 'Gym Leader',
    region: 'Johto',
    game: 'Gold/Silver',
    type: 'ghost',
    sprite: 'https://archives.bulbagarden.net/media/upload/1/14/HeartGold_SoulSilver_Morty.png',
    team: [
      { name: 'gastly', level: 21, moves: ['lick', 'spite', 'mean-look', 'curse'] },
      { name: 'haunter', level: 21, moves: ['lick', 'spite', 'mean-look', 'curse'] },
      { name: 'haunter', level: 23, moves: ['lick', 'spite', 'mean-look', 'curse'] },
      { name: 'gengar', level: 25, moves: ['lick', 'spite', 'mean-look', 'curse'] }
    ]
  },

  // Hoenn Gym Leaders additionnels  
  {
    id: 'roxanne-hoenn',
    name: 'Roxanne',  
    title: 'Gym Leader',
    region: 'Hoenn',
    game: 'Ruby/Sapphire',
    type: 'rock',
    sprite: 'https://archives.bulbagarden.net/media/upload/3/38/Omega_Ruby_Alpha_Sapphire_Roxanne.png',
    team: [
      { name: 'geodude', level: 12, moves: ['tackle', 'defense-curl', 'rock-throw'] },
      { name: 'nosepass', level: 15, moves: ['tackle', 'harden', 'rock-throw', 'block'] }
    ]
  },
  {
    id: 'brawly-hoenn',
    name: 'Brawly',
    title: 'Gym Leader', 
    region: 'Hoenn',
    game: 'Ruby/Sapphire',
    type: 'fighting',
    sprite: 'https://archives.bulbagarden.net/media/upload/b/b0/Omega_Ruby_Alpha_Sapphire_Brawly.png',
    team: [
      { name: 'machop', level: 16, moves: ['karate-chop', 'low-kick', 'seismic-toss'] },
      { name: 'makuhita', level: 18, moves: ['tackle', 'focus-energy', 'arm-thrust', 'vital-throw'] }
    ]
  },
  {
    id: 'wattson-hoenn',
    name: 'Wattson',
    title: 'Gym Leader',
    region: 'Hoenn', 
    game: 'Ruby/Sapphire',
    type: 'electric',
    sprite: 'https://archives.bulbagarden.net/media/upload/5/5a/Omega_Ruby_Alpha_Sapphire_Wattson.png',
    team: [
      { name: 'voltorb', level: 20, moves: ['tackle', 'screech', 'sonic-boom', 'spark'] },
      { name: 'electrike', level: 20, moves: ['tackle', 'thunder-wave', 'leer', 'quick-attack'] },
      { name: 'magneton', level: 22, moves: ['tackle', 'thunder-wave', 'sonic-boom', 'supersonic'] },
      { name: 'manectric', level: 24, moves: ['tackle', 'thunder-wave', 'leer', 'quick-attack'] }
    ]
  },

  // Unova Gym Leaders additionnels
  {
    id: 'cilan-unova',
    name: 'Cilan',
    title: 'Gym Leader',
    region: 'Unova',
    game: 'Black/White',
    type: 'grass',
    sprite: 'https://archives.bulbagarden.net/media/upload/2/26/Black_White_Cilan.png',
    team: [
      { name: 'lillipup', level: 12, moves: ['work-up', 'bite', 'baby-doll-eyes', 'retaliate'] },
      { name: 'pansage', level: 14, moves: ['scratch', 'play-nice', 'lick', 'vine-whip'] }
    ]
  },
  {
    id: 'chili-unova',
    name: 'Chili',
    title: 'Gym Leader',
    region: 'Unova',
    game: 'Black/White',
    type: 'fire',
    sprite: 'https://archives.bulbagarden.net/media/upload/3/3a/Black_White_Chili.png',
    team: [
      { name: 'lillipup', level: 12, moves: ['work-up', 'bite', 'baby-doll-eyes', 'retaliate'] },
      { name: 'pansear', level: 14, moves: ['scratch', 'play-nice', 'lick', 'incinerate'] }
    ]
  },
  {
    id: 'cress-unova',
    name: 'Cress',
    title: 'Gym Leader',
    region: 'Unova',
    game: 'Black/White',
    type: 'water',
    sprite: 'https://archives.bulbagarden.net/media/upload/7/71/Black_White_Cress.png',
    team: [
      { name: 'lillipup', level: 12, moves: ['work-up', 'bite', 'baby-doll-eyes', 'retaliate'] },
      { name: 'panpour', level: 14, moves: ['scratch', 'play-nice', 'lick', 'water-gun'] }
    ]
  },
  {
    id: 'lenora-unova',
    name: 'Lenora',
    title: 'Gym Leader',
    region: 'Unova',
    game: 'Black/White',
    type: 'normal',
    sprite: 'https://archives.bulbagarden.net/media/upload/9/92/Black_White_Lenora.png',
    team: [
      { name: 'herdier', level: 18, moves: ['leer', 'bite', 'take-down', 'work-up'] },
      { name: 'watchog', level: 20, moves: ['leer', 'bite', 'bide', 'detect'] }
    ]
  },

  // Rivaux célèbres
  {
    id: 'silver-johto',
    name: 'Silver',
    title: 'Rival',
    region: 'Johto',
    game: 'Gold/Silver',
    sprite: 'https://archives.bulbagarden.net/media/upload/4/41/HeartGold_SoulSilver_Silver.png',
    team: [
      { name: 'crobat', level: 40, moves: ['quick-attack', 'wing-attack', 'bite', 'astonish'] },
      { name: 'magneton', level: 38, moves: ['thunder-wave', 'sonic-boom', 'thunder-shock', 'screech'] },
      { name: 'gengar', level: 40, moves: ['mean-look', 'curse', 'shadow-ball', 'confuse-ray'] },
      { name: 'alakazam', level: 38, moves: ['disable', 'recover', 'psychic', 'future-sight'] },
      { name: 'meganium', level: 42, moves: ['reflect', 'razor-leaf', 'poisonpowder', 'body-slam'] }
    ]
  },
  {
    id: 'may-hoenn',
    name: 'May',
    title: 'Rival',
    region: 'Hoenn',
    game: 'Ruby/Sapphire',
    sprite: 'https://archives.bulbagarden.net/media/upload/1/1b/Omega_Ruby_Alpha_Sapphire_May.png',
    team: [
      { name: 'swellow', level: 31, moves: ['focus-energy', 'quick-attack', 'wing-attack', 'endeavor'] },
      { name: 'mightyena', level: 32, moves: ['roar', 'swagger', 'assurance', 'crunch'] },
      { name: 'wailmer', level: 32, moves: ['rollout', 'whirlpool', 'astonish', 'water-pulse'] },
      { name: 'combusken', level: 34, moves: ['double-kick', 'peck', 'sand-attack', 'bulk-up'] }
    ]
  },
  {
    id: 'barry-sinnoh',
    name: 'Barry',
    title: 'Rival',
    region: 'Sinnoh',
    game: 'Diamond/Pearl',
    sprite: 'https://archives.bulbagarden.net/media/upload/3/39/Platinum_Barry.png',
    team: [
      { name: 'staraptor', level: 48, moves: ['close-combat', 'brave-bird', 'endeavor', 'take-down'] },
      { name: 'heracross', level: 48, moves: ['night-slash', 'brick-break', 'aerial-ace', 'shadow-claw'] },
      { name: 'rapidash', level: 47, moves: ['flare-blitz', 'bounce', 'fire-blast', 'solar-beam'] },
      { name: 'floatzel', level: 49, moves: ['ice-fang', 'crunch', 'aqua-jet', 'swift'] },
      { name: 'snorlax', level: 49, moves: ['giga-impact', 'crunch', 'rest', 'sleep-talk'] },
      { name: 'empoleon', level: 51, moves: ['drill-peck', 'hydro-pump', 'metal-claw', 'earthquake'] }
    ]
  },

  // Plus de champions Kalos
  {
    id: 'korrina-kalos',
    name: 'Korrina',
    title: 'Gym Leader',
    region: 'Kalos',
    game: 'X/Y',
    type: 'fighting',
    sprite: 'https://archives.bulbagarden.net/media/upload/9/9f/XY_Korrina.png',
    team: [
      { name: 'mienfoo', level: 29, moves: ['fake-out', 'double-slap', 'force-palm', 'drain-punch'] },
      { name: 'machoke', level: 28, moves: ['rock-tomb', 'revenge', 'vital-throw', 'wake-up-slap'] },
      { name: 'hawlucha', level: 32, moves: ['karate-chop', 'wing-attack', 'roost', 'flying-press'] }
    ]
  },

  // Champions Galar additionnels
  {
    id: 'raihan-galar',
    name: 'Raihan',
    title: 'Gym Leader',
    region: 'Galar',
    game: 'Sword/Shield',
    type: 'dragon',
    sprite: 'https://archives.bulbagarden.net/media/upload/b/b7/Sword_Shield_Raihan.png',
    team: [
      { name: 'flygon', level: 46, moves: ['dragon-pulse', 'crunch', 'earth-power', 'u-turn'] },
      { name: 'sandaconda', level: 46, moves: ['bulldoze', 'body-slam', 'glare', 'sandstorm'] },
      { name: 'goodra', level: 47, moves: ['dragon-pulse', 'muddy-water', 'power-whip', 'breaking-swipe'] },
      { name: 'duraludon', level: 48, moves: ['flash-cannon', 'dragon-pulse', 'thunderbolt', 'hyper-beam'] }
    ]
  },

  // Membres Team Rocket
  {
    id: 'jessie-rocket',
    name: 'Jessie',
    title: 'Team Rocket',
    region: 'Kanto',
    game: 'Anime',
    sprite: 'https://archives.bulbagarden.net/media/upload/c/cb/Jessie_anime.png',
    team: [
      { name: 'arbok', level: 35, moves: ['poison-sting', 'bite', 'glare', 'acid'] },
      { name: 'wobbuffet', level: 35, moves: ['counter', 'mirror-coat', 'safeguard', 'destiny-bond'] },
      { name: 'seviper', level: 35, moves: ['poison-tail', 'crunch', 'glare', 'haze'] }
    ]
  },
  {
    id: 'james-rocket',
    name: 'James',
    title: 'Team Rocket',
    region: 'Kanto',
    game: 'Anime',
    sprite: 'https://archives.bulbagarden.net/media/upload/7/7a/James_anime.png',
    team: [
      { name: 'weezing', level: 35, moves: ['sludge', 'smokescreen', 'tackle', 'self-destruct'] },
      { name: 'cacnea', level: 35, moves: ['pin-missile', 'sand-attack', 'needle-arm', 'cotton-spore'] },
      { name: 'dustox', level: 35, moves: ['gust', 'psybeam', 'whirlwind', 'toxic'] }
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