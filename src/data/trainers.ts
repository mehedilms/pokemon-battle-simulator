import { Trainer } from '../types/trainer';

export const trainers: Trainer[] = [
  // Kanto Champions & Elite Four
  {
    id: 'red-kanto',
    name: 'Red',
    title: 'Champion',
    region: 'Kanto',
    game: 'Red/Blue',
    sprite: '/trainers/red.png',
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
    sprite: '/trainers/blue.png',
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
    sprite: '/trainers/brock.png',
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
    sprite: '/trainers/misty.png',
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
    sprite: '/trainers/surge.png',
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
    sprite: '/trainers/lance.png',
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
    sprite: '/trainers/steven.png',
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
    sprite: '/trainers/wallace.png',
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
    sprite: '/trainers/cynthia.png',
    team: [
      { name: 'spiritomb', level: 61, moves: ['silver-wind', 'embargo', 'psychic', 'dark-pulse'] },
      { name: 'roserade', level: 60, moves: ['energy-ball', 'sludge-bomb', 'extrasensory', 'shadow-ball'] },
      { name: 'togekiss', level: 60, moves: ['shock-wave', 'psychic', 'aura-sphere', 'air-slash'] },
      { name: 'lucario', level: 60, moves: ['aura-sphere', 'dragon-pulse', 'psychic', 'earthquake'] },
      { name: 'milotic', level: 60, moves: ['surf', 'ice-beam', 'mirror-coat', 'aqua-ring'] },
      { name: 'garchomp', level: 62, moves: ['dragon-rush', 'earthquake', 'brick-break', 'giga-impact'] }
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