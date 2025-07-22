
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}

export interface Move {
  id: number;
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  type: {
    name: string;
  };
  damage_class: {
    name: string;
  };
}

export interface BattleState {
  playerPokemon: Pokemon | null;
  computerPokemon: Pokemon | null;
  playerHP: number;
  computerHP: number;
  playerMaxHP: number;
  computerMaxHP: number;
  playerMoves: Move[];
  message: string;
  turn: 'player' | 'computer' | null;
  playerAttacking: boolean;
  computerAttacking: boolean;
  battleStarted: boolean;
  battleEnded: boolean;
  winner: 'player' | 'computer' | null;
  spectatorMode: boolean;
  currentAttack: Move | null;
  backgroundImage: string;
  playerStatus: import('./battleStatus').BattleStatus[];
  computerStatus: import('./battleStatus').BattleStatus[];
  lastDamage: number;
  lastEffectiveness: number;
  criticalHit: boolean;
  playerItems: import('./item').BattleItem[];
  playerStatBoosts: {
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
  computerStatBoosts: {
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
}
