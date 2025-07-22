export interface Item {
  id: number;
  name: string;
  cost: number;
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }[];
  category: {
    name: string;
  };
  attributes: {
    name: string;
  }[];
  sprites: {
    default: string;
  };
}

export interface BattleItem {
  id: number;
  name: string;
  type: 'healing' | 'stat-boost' | 'status-cure' | 'battle-effect' | 'held-item';
  effect: string;
  shortEffect: string;
  sprite: string;
  // Effets spécifiques
  healAmount?: number;
  statBoosts?: {
    attack?: number;
    defense?: number;
    'special-attack'?: number;
    'special-defense'?: number;
    speed?: number;
  };
  statusCure?: string[];
  battleEffect?: string;
}

export const COMMON_ITEMS: BattleItem[] = [
  {
    id: 1,
    name: 'potion',
    type: 'healing',
    effect: 'Restores 20 HP',
    shortEffect: 'Heals 20 HP',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',
    healAmount: 20
  },
  {
    id: 2,
    name: 'super-potion',
    type: 'healing',
    effect: 'Restores 50 HP',
    shortEffect: 'Heals 50 HP',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',
    healAmount: 50
  },
  {
    id: 3,
    name: 'hyper-potion',
    type: 'healing',
    effect: 'Restores 120 HP',
    shortEffect: 'Heals 120 HP',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png',
    healAmount: 120
  },
  {
    id: 4,
    name: 'full-restore',
    type: 'healing',
    effect: 'Fully restores HP and cures all status conditions',
    shortEffect: 'Full heal + cure status',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/full-restore.png',
    healAmount: 999,
    statusCure: ['poison', 'burn', 'paralysis', 'sleep', 'freeze', 'confusion']
  },
  {
    id: 5,
    name: 'antidote',
    type: 'status-cure',
    effect: 'Cures poison',
    shortEffect: 'Cures poison',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/antidote.png',
    statusCure: ['poison']
  },
  {
    id: 6,
    name: 'burn-heal',
    type: 'status-cure',
    effect: 'Cures burn',
    shortEffect: 'Cures burn',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/burn-heal.png',
    statusCure: ['burn']
  },
  {
    id: 7,
    name: 'paralyze-heal',
    type: 'status-cure',
    effect: 'Cures paralysis',
    shortEffect: 'Cures paralysis',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/paralyze-heal.png',
    statusCure: ['paralysis']
  },
  {
    id: 8,
    name: 'awakening',
    type: 'status-cure',
    effect: 'Cures sleep',
    shortEffect: 'Cures sleep',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/awakening.png',
    statusCure: ['sleep']
  },
  {
    id: 9,
    name: 'ice-heal',
    type: 'status-cure',
    effect: 'Cures freeze',
    shortEffect: 'Cures freeze',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ice-heal.png',
    statusCure: ['freeze']
  },
  {
    id: 10,
    name: 'x-attack',
    type: 'stat-boost',
    effect: 'Sharply raises Attack for the battle',
    shortEffect: '+2 Attack',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/x-attack.png',
    statBoosts: { attack: 2 }
  },
  {
    id: 11,
    name: 'x-defense',
    type: 'stat-boost',
    effect: 'Sharply raises Defense for the battle',
    shortEffect: '+2 Defense',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/x-defense.png',
    statBoosts: { defense: 2 }
  },
  {
    id: 12,
    name: 'x-sp-atk',
    type: 'stat-boost',
    effect: 'Sharply raises Special Attack for the battle',
    shortEffect: '+2 Sp. Attack',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/x-sp-atk.png',
    statBoosts: { 'special-attack': 2 }
  },
  {
    id: 13,
    name: 'x-sp-def',
    type: 'stat-boost',
    effect: 'Sharply raises Special Defense for the battle',
    shortEffect: '+2 Sp. Defense',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/x-sp-def.png',
    statBoosts: { 'special-defense': 2 }
  },
  {
    id: 14,
    name: 'x-speed',
    type: 'stat-boost',
    effect: 'Sharply raises Speed for the battle',
    shortEffect: '+2 Speed',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/x-speed.png',
    statBoosts: { speed: 2 }
  }
];