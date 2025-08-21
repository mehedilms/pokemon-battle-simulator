import { Trainer } from '../types/trainer';

export const trainers: Trainer[] = [
  // Kanto Champions & Elite Four
  {
    id: 'red-kanto',
    name: 'Red',
    title: 'Champion',
    region: 'Kanto',
    game: 'Red/Blue',
    sprite: 'https://www.serebii.net/heartgoldsoulsilver/trainer/red.png',
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
    sprite: 'https://www.serebii.net/redblue/trainer/blue.png',
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
    sprite: 'https://www.serebii.net/redblue/trainer/brock.png',
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
    sprite: 'https://www.serebii.net/redblue/trainer/misty.png',
    team: [
      { name: 'staryu', level: 18, moves: ['tackle', 'water-gun', 'harden', 'swift'] },
      { name: 'starmie', level: 21, moves: ['tackle', 'water-gun', 'bubblebeam', 'swift'] }
    ]
  },
  {
    id: 'lt-surge-kanto',
    name: 'Lt. Surge',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'electric',
    sprite: 'https://www.serebii.net/redblue/trainer/ltsurge.png',
    team: [
      { name: 'voltorb', level: 21, moves: ['tackle', 'sonic-boom', 'screech', 'self-destruct'] },
      { name: 'pikachu', level: 18, moves: ['thunder-wave', 'quick-attack', 'double-kick', 'thunderbolt'] },
      { name: 'raichu', level: 24, moves: ['thunder-wave', 'quick-attack', 'double-kick', 'thunderbolt'] }
    ]
  },
  {
    id: 'erika-kanto',
    name: 'Erika',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'grass',
    sprite: 'https://www.serebii.net/redblue/trainer/erika.png',
    team: [
      { name: 'victreebel', level: 29, moves: ['stun-spore', 'acid', 'petal-dance', 'razor-leaf'] },
      { name: 'tangela', level: 24, moves: ['bind', 'poison-powder', 'stun-spore', 'mega-drain'] },
      { name: 'vileplume', level: 29, moves: ['petal-dance', 'poison-powder', 'mega-drain', 'sleep-powder'] }
    ]
  },
  {
    id: 'koga-kanto',
    name: 'Koga',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'poison',
    sprite: 'https://www.serebii.net/redblue/trainer/koga.png',
    team: [
      { name: 'koffing', level: 37, moves: ['tackle', 'sludge', 'smokescreen', 'self-destruct'] },
      { name: 'muk', level: 39, moves: ['disable', 'poison-gas', 'minimize', 'sludge'] },
      { name: 'koffing', level: 37, moves: ['tackle', 'sludge', 'smokescreen', 'self-destruct'] },
      { name: 'weezing', level: 43, moves: ['tackle', 'sludge', 'smokescreen', 'explosion'] }
    ]
  },
  {
    id: 'sabrina-kanto',
    name: 'Sabrina',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'psychic',
    sprite: 'https://www.serebii.net/redblue/trainer/sabrina.png',
    team: [
      { name: 'kadabra', level: 38, moves: ['disable', 'psybeam', 'recover', 'psychic'] },
      { name: 'mr-mime', level: 37, moves: ['barrier', 'confusion', 'light-screen', 'double-slap'] },
      { name: 'venomoth', level: 38, moves: ['poison-powder', 'leech-life', 'stun-spore', 'psybeam'] },
      { name: 'alakazam', level: 43, moves: ['disable', 'psybeam', 'recover', 'psychic'] }
    ]
  },
  {
    id: 'blaine-kanto',
    name: 'Blaine',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'fire',
    sprite: 'https://www.serebii.net/redblue/trainer/blaine.png',
    team: [
      { name: 'growlithe', level: 42, moves: ['ember', 'leer', 'take-down', 'agility'] },
      { name: 'ponyta', level: 40, moves: ['ember', 'tail-whip', 'stomp', 'growl'] },
      { name: 'rapidash', level: 42, moves: ['ember', 'tail-whip', 'stomp', 'fire-spin'] },
      { name: 'arcanine', level: 47, moves: ['leer', 'ember', 'take-down', 'fire-blast'] }
    ]
  },
  {
    id: 'giovanni-kanto',
    name: 'Giovanni',
    title: 'Gym Leader',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'ground',
    sprite: 'https://www.serebii.net/redblue/trainer/giovanni.png',
    team: [
      { name: 'rhyhorn', level: 45, moves: ['stomp', 'tail-whip', 'fury-attack', 'horn-drill'] },
      { name: 'dugtrio', level: 42, moves: ['growl', 'dig', 'sand-attack', 'slash'] },
      { name: 'nidoqueen', level: 44, moves: ['scratch', 'tail-whip', 'body-slam', 'double-kick'] },
      { name: 'nidoking', level: 45, moves: ['tackle', 'horn-attack', 'poison-sting', 'thrash'] },
      { name: 'rhyhorn', level: 50, moves: ['leer', 'stomp', 'tail-whip', 'earthquake'] }
    ]
  },
  // Kanto Elite Four
  {
    id: 'lorelei-kanto',
    name: 'Lorelei',
    title: 'Elite Four',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'ice',
    sprite: 'https://www.serebii.net/redblue/trainer/lorelei.png',
    team: [
      { name: 'dewgong', level: 54, moves: ['aurora-beam', 'rest', 'take-down', 'ice-beam'] },
      { name: 'cloyster', level: 53, moves: ['spike-cannon', 'supersonic', 'clamp', 'ice-beam'] },
      { name: 'slowbro', level: 54, moves: ['withdraw', 'amnesia', 'psychic', 'ice-beam'] },
      { name: 'jynx', level: 56, moves: ['double-slap', 'ice-punch', 'body-slam', 'thrash'] },
      { name: 'lapras', level: 56, moves: ['body-slam', 'confuse-ray', 'blizzard', 'hydro-pump'] }
    ]
  },
  {
    id: 'bruno-kanto',
    name: 'Bruno', 
    title: 'Elite Four',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'fighting',
    sprite: 'https://www.serebii.net/redblue/trainer/bruno.png',
    team: [
      { name: 'onix', level: 53, moves: ['rock-throw', 'rage', 'slam', 'harden'] },
      { name: 'hitmonchan', level: 55, moves: ['ice-punch', 'fire-punch', 'thunderpunch', 'mega-punch'] },
      { name: 'hitmonlee', level: 55, moves: ['double-kick', 'meditate', 'rolling-kick', 'hi-jump-kick'] },
      { name: 'onix', level: 56, moves: ['rock-throw', 'rage', 'slam', 'harden'] },
      { name: 'machamp', level: 58, moves: ['leer', 'focus-energy', 'fissure', 'cross-chop'] }
    ]
  },
  {
    id: 'agatha-kanto',
    name: 'Agatha',
    title: 'Elite Four',
    region: 'Kanto',
    game: 'Red/Blue',
    type: 'ghost',
    sprite: 'https://www.serebii.net/redblue/trainer/agatha.png',
    team: [
      { name: 'gengar', level: 56, moves: ['substitute', 'hypnosis', 'dream-eater', 'shadow-ball'] },
      { name: 'golbat', level: 56, moves: ['supersonic', 'confuse-ray', 'wing-attack', 'haze'] },
      { name: 'haunter', level: 55, moves: ['hypnosis', 'lick', 'spite', 'dream-eater'] },
      { name: 'arbok', level: 58, moves: ['wrap', 'poison-sting', 'bite', 'glare'] },
      { name: 'gengar', level: 60, moves: ['confuse-ray', 'night-shade', 'toxic', 'dream-eater'] }
    ]
  },
  {
    id: 'lance-kanto',
    name: 'Lance',
    title: 'Elite Four',
    region: 'Kanto',
    game: 'Red/Blue',  
    type: 'dragon',
    sprite: 'https://www.serebii.net/redblue/trainer/lance.png',
    team: [
      { name: 'gyarados', level: 58, moves: ['dragon-rage', 'leer', 'hydro-pump', 'hyper-beam'] },
      { name: 'dragonair', level: 56, moves: ['wrap', 'thunder-wave', 'agility', 'hyper-beam'] },
      { name: 'dragonair', level: 56, moves: ['wrap', 'thunder-wave', 'agility', 'hyper-beam'] },
      { name: 'aerodactyl', level: 60, moves: ['supersonic', 'bite', 'take-down', 'hyper-beam'] },
      { name: 'dragonite', level: 62, moves: ['wrap', 'agility', 'slam', 'hyper-beam'] }
    ]
  },
  // Johto Champions & Elite Four  
  {
    id: 'gold-johto',
    name: 'Gold',
    title: 'Champion',
    region: 'Johto',
    game: 'Gold/Silver',
    sprite: 'https://www.serebii.net/goldsilver/trainer/gold.png',
    team: [
      { name: 'typhlosion', level: 77, moves: ['eruption', 'fire-blast', 'thunder-punch', 'earthquake'] },
      { name: 'ampharos', level: 77, moves: ['thunderbolt', 'fire-punch', 'focus-punch', 'signal-beam'] },
      { name: 'meganium', level: 77, moves: ['frenzy-plant', 'earthquake', 'synthesis', 'light-screen'] },
      { name: 'feraligatr', level: 77, moves: ['hydro-cannon', 'earthquake', 'ice-punch', 'crunch'] },
      { name: 'lapras', level: 75, moves: ['surf', 'psychic', 'thunderbolt', 'ice-beam'] },
      { name: 'snorlax', level: 75, moves: ['body-slam', 'earthquake', 'shadow-ball', 'rest'] }
    ]
  },
  {
    id: 'silver-johto',
    name: 'Silver',
    title: 'Rival',
    region: 'Johto',  
    game: 'Gold/Silver',
    sprite: 'https://www.serebii.net/goldsilver/trainer/silver.png',
    team: [
      { name: 'crobat', level: 40, moves: ['wing-attack', 'bite', 'confuse-ray', 'swift'] },
      { name: 'magneton', level: 38, moves: ['thunderbolt', 'supersonic', 'swift', 'double-team'] },
      { name: 'gengar', level: 38, moves: ['shadow-ball', 'confuse-ray', 'hypnosis', 'dream-eater'] },
      { name: 'alakazam', level: 38, moves: ['psychic', 'disable', 'recover', 'future-sight'] },
      { name: 'meganium', level: 42, moves: ['body-slam', 'razor-leaf', 'synthesis', 'reflect'] },
      { name: 'sneasel', level: 42, moves: ['quick-attack', 'screech', 'faint-attack', 'fury-cutter'] }
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
    sprite: 'https://www.serebii.net/goldsilver/trainer/falkner.png',
    team: [
      { name: 'pidgey', level: 7, moves: ['tackle', 'sand-attack', 'gust'] },
      { name: 'pidgeotto', level: 9, moves: ['tackle', 'sand-attack', 'gust', 'quick-attack'] }
    ]
  },
  {
    id: 'bugsy-johto',
    name: 'Bugsy',
    title: 'Gym Leader',
    region: 'Johto',
    game: 'Gold/Silver',
    type: 'bug',
    sprite: 'https://www.serebii.net/goldsilver/trainer/bugsy.png',
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
    sprite: 'https://www.serebii.net/goldsilver/trainer/whitney.png',
    team: [
      { name: 'clefairy', level: 18, moves: ['doubleslap', 'mimic', 'encore', 'metronome'] },
      { name: 'miltank', level: 20, moves: ['rollout', 'attract', 'stomp', 'milk-drink'] }
    ]
  },
  {
    id: 'morty-johto',
    name: 'Morty',
    title: 'Gym Leader',
    region: 'Johto',
    game: 'Gold/Silver',
    type: 'ghost',
    sprite: 'https://www.serebii.net/goldsilver/trainer/morty.png',
    team: [
      { name: 'gastly', level: 21, moves: ['lick', 'spite', 'mean-look', 'curse'] },
      { name: 'haunter', level: 21, moves: ['hypnosis', 'mimic', 'curse', 'night-shade'] },
      { name: 'haunter', level: 23, moves: ['hypnosis', 'mimic', 'curse', 'night-shade'] },
      { name: 'gengar', level: 25, moves: ['hypnosis', 'shadow-ball', 'mean-look', 'dream-eater'] }
    ]
  },
  // Hoenn Champions  
  {
    id: 'brendan-hoenn',
    name: 'Brendan',
    title: 'Champion',
    region: 'Hoenn',
    game: 'Ruby/Sapphire',
    sprite: 'https://www.serebii.net/rubysapphire/trainer/brendan.png',
    team: [
      { name: 'swampert', level: 57, moves: ['surf', 'earthquake', 'muddy-water', 'protect'] },
      { name: 'altaria', level: 55, moves: ['dragon-dance', 'earthquake', 'dragon-claw', 'fire-blast'] },
      { name: 'shiftry', level: 55, moves: ['torment', 'double-team', 'swagger', 'extrasensory'] },
      { name: 'slaking', level: 56, moves: ['counter', 'yawn', 'facade', 'earthquake'] },
      { name: 'tropius', level: 56, moves: ['sunny-day', 'aerial-ace', 'synthesis', 'solar-beam'] },
      { name: 'blazeken', level: 58, moves: ['overheat', 'focus-punch', 'rock-slide', 'bulk-up'] }
    ]
  },
  {
    id: 'may-hoenn',
    name: 'May', 
    title: 'Rival',
    region: 'Hoenn',
    game: 'Ruby/Sapphire',
    sprite: 'https://www.serebii.net/rubysapphire/trainer/may.png',
    team: [
      { name: 'altaria', level: 31, moves: ['aerial-ace', 'dragon-breath', 'dragon-dance', 'refresh'] },
      { name: 'roselia', level: 32, moves: ['petal-dance', 'toxic', 'sweet-scent', 'grass-whistle'] },
      { name: 'delcatty', level: 32, moves: ['sing', 'assist', 'charm', 'faint-attack'] },
      { name: 'blaziken', level: 34, moves: ['double-kick', 'slash', 'bulk-up', 'flame-wheel'] }
    ]
  },
  // Hoenn Gym Leaders
  {
    id: 'roxanne-hoenn',
    name: 'Roxanne',
    title: 'Gym Leader',
    region: 'Hoenn',
    game: 'Ruby/Sapphire',
    type: 'rock',
    sprite: 'https://www.serebii.net/rubysapphire/trainer/roxanne.png',
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
    sprite: 'https://www.serebii.net/rubysapphire/trainer/brawly.png',
    team: [
      { name: 'machop', level: 16, moves: ['karate-chop', 'low-kick', 'seismic-toss', 'bulk-up'] },
      { name: 'makuhita', level: 18, moves: ['tackle', 'focus-energy', 'arm-thrust', 'bulk-up'] }
    ]
  },
  {
    id: 'wattson-hoenn',
    name: 'Wattson',
    title: 'Gym Leader',
    region: 'Hoenn',
    game: 'Ruby/Sapphire',
    type: 'electric',
    sprite: 'https://www.serebii.net/rubysapphire/trainer/wattson.png',
    team: [
      { name: 'voltorb', level: 20, moves: ['rollout', 'spark', 'self-destruct', 'shock-wave'] },
      { name: 'electrike', level: 18, moves: ['thunder-wave', 'leer', 'quick-attack', 'shock-wave'] },
      { name: 'magneton', level: 19, moves: ['supersonic', 'sonic-boom', 'thunder-wave', 'shock-wave'] },
      { name: 'manectric', level: 22, moves: ['quick-attack', 'thunder-wave', 'shock-wave', 'howl'] }
    ]
  },
  // Unova Gym Leaders
  {
    id: 'cilan-unova',
    name: 'Cilan',
    title: 'Gym Leader',
    region: 'Unova',
    game: 'Black/White',
    type: 'grass',
    sprite: 'https://www.serebii.net/blackwhite/trainer/cilan.png',
    team: [
      { name: 'lillipup', level: 12, moves: ['bite', 'odor-sleuth', 'baby-doll-eyes', 'tackle'] },
      { name: 'pansage', level: 14, moves: ['leer', 'lick', 'vine-whip', 'bite'] }
    ]
  },
  {
    id: 'chili-unova',
    name: 'Chili',
    title: 'Gym Leader',
    region: 'Unova',
    game: 'Black/White',
    type: 'fire',
    sprite: 'https://www.serebii.net/blackwhite/trainer/chili.png',
    team: [
      { name: 'lillipup', level: 12, moves: ['bite', 'odor-sleuth', 'baby-doll-eyes', 'tackle'] },
      { name: 'pansear', level: 14, moves: ['leer', 'lick', 'incinerate', 'bite'] }
    ]
  },
  {
    id: 'cress-unova',
    name: 'Cress',
    title: 'Gym Leader',
    region: 'Unova',
    game: 'Black/White',
    type: 'water',
    sprite: 'https://www.serebii.net/blackwhite/trainer/cress.png',
    team: [
      { name: 'lillipup', level: 12, moves: ['bite', 'odor-sleuth', 'baby-doll-eyes', 'tackle'] },
      { name: 'panpour', level: 14, moves: ['leer', 'lick', 'water-gun', 'bite'] }
    ]
  },
  {
    id: 'lenora-unova',
    name: 'Lenora',
    title: 'Gym Leader',
    region: 'Unova',
    game: 'Black/White',
    type: 'normal',
    sprite: 'https://www.serebii.net/blackwhite/trainer/lenora.png',
    team: [
      { name: 'herdier', level: 18, moves: ['bite', 'helping-hand', 'take-down', 'work-up'] },
      { name: 'watchog', level: 20, moves: ['low-kick', 'bite', 'hypnosis', 'retaliate'] }
    ]
  },
  // Kalos Gym Leaders
  {
    id: 'korrina-kalos',
    name: 'Korrina',
    title: 'Gym Leader',
    region: 'Kalos',
    game: 'X/Y',
    type: 'fighting',
    sprite: 'https://www.serebii.net/xy/trainer/korrina.png',
    team: [
      { name: 'mienfoo', level: 29, moves: ['fake-out', 'double-slap', 'force-palm', 'drain-punch'] },
      { name: 'machoke', level: 28, moves: ['rock-tomb', 'vital-throw', 'revenge', 'karate-chop'] },
      { name: 'hawlucha', level: 32, moves: ['hone-claws', 'karate-chop', 'wing-attack', 'roost'] }
    ]
  },
  // Galar Gym Leaders
  {
    id: 'raihan-galar',
    name: 'Raihan',
    title: 'Gym Leader',
    region: 'Galar',
    game: 'Sword/Shield',
    type: 'dragon',
    sprite: 'https://www.serebii.net/swordshield/trainer/raihan.png',
    team: [
      { name: 'flygon', level: 47, moves: ['dragon-pulse', 'crunch', 'earth-power', 'stone-edge'] },
      { name: 'sandaconda', level: 46, moves: ['stone-edge', 'fire-fang', 'earthquake', 'glare'] },
      { name: 'goodra', level: 46, moves: ['power-whip', 'muddy-water', 'fire-blast', 'thunder'] },
      { name: 'duraludon', level: 48, moves: ['flash-cannon', 'dragon-pulse', 'thunderbolt', 'hyper-beam'] }
    ]
  },
  // Sinnoh Rivals
  {
    id: 'barry-sinnoh',
    name: 'Barry',
    title: 'Rival',
    region: 'Sinnoh',
    game: 'Diamond/Pearl',
    sprite: 'https://www.serebii.net/diamondpearl/trainer/barry.png',
    team: [
      { name: 'staraptor', level: 47, moves: ['aerial-ace', 'endeavor', 'facade', 'take-down'] },
      { name: 'heracross', level: 47, moves: ['night-slash', 'brick-break', 'aerial-ace', 'shadow-claw'] },
      { name: 'rapidash', level: 47, moves: ['bounce', 'flare-blitz', 'solar-beam', 'quick-attack'] },
      { name: 'floatzel', level: 49, moves: ['ice-fang', 'crunch', 'aqua-jet', 'brine'] },
      { name: 'roserade', level: 49, moves: ['shadow-ball', 'sludge-bomb', 'grass-knot', 'extrasensory'] },
      { name: 'empoleon', level: 51, moves: ['drill-peck', 'metal-claw', 'surf', 'earthquake'] }
    ]
  },
  // Team Rocket
  {
    id: 'jessie-rocket',
    name: 'Jessie',
    title: 'Team Rocket',
    region: 'Kanto',
    game: 'Yellow',
    sprite: 'https://www.serebii.net/yellow/trainer/jessie.png',
    team: [
      { name: 'arbok', level: 33, moves: ['wrap', 'poison-sting', 'bite', 'glare'] },
      { name: 'weezing', level: 33, moves: ['sludge', 'smokescreen', 'haze', 'self-destruct'] }
    ]
  },
  {
    id: 'james-rocket',
    name: 'James',
    title: 'Team Rocket',
    region: 'Kanto',
    game: 'Yellow',
    sprite: 'https://www.serebii.net/yellow/trainer/james.png',
    team: [
      { name: 'weezing', level: 33, moves: ['sludge', 'smokescreen', 'haze', 'self-destruct'] },
      { name: 'arbok', level: 33, moves: ['wrap', 'poison-sting', 'bite', 'glare'] }
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