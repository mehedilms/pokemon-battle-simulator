export interface BattleStatus {
  type: 'burn' | 'poison' | 'paralysis' | 'sleep' | 'freeze' | 'confusion';
  turnsRemaining: number;
  message: string;
}

export interface StatModification {
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  accuracy: number;
  evasion: number;
}

export interface PokemonBattleState {
  hp: number;
  maxHP: number;
  status: BattleStatus | null;
  statModifications: StatModification;
  canMove: boolean;
}

export const createDefaultStatModifications = (): StatModification => ({
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
  accuracy: 0,
  evasion: 0
});

export const applyStatusEffect = (pokemon: PokemonBattleState, language: 'fr' | 'en' = 'fr'): { 
  damage: number; 
  message: string; 
  removeStatus: boolean 
} => {
  if (!pokemon.status) return { damage: 0, message: '', removeStatus: false };

  const { type, turnsRemaining } = pokemon.status;
  let damage = 0;
  let message = '';
  let removeStatus = false;

  switch (type) {
    case 'burn':
      damage = Math.floor(pokemon.maxHP * 0.0625); // 1/16 of max HP
      message = language === 'fr' 
        ? "est blessé par la brûlure!" 
        : "is hurt by its burn!";
      break;
      
    case 'poison':
      damage = Math.floor(pokemon.maxHP * 0.125); // 1/8 of max HP
      message = language === 'fr' 
        ? "est empoisonné!" 
        : "is poisoned!";
      break;
      
    case 'paralysis':
      // 25% chance d'être immobilisé
      if (Math.random() < 0.25) {
        pokemon.canMove = false;
        message = language === 'fr' 
          ? "est paralysé et ne peut pas attaquer!" 
          : "is paralyzed and can't move!";
      }
      break;
      
    case 'sleep':
      pokemon.canMove = false;
      message = language === 'fr' 
        ? "dort profondément!" 
        : "is fast asleep!";
      if (turnsRemaining <= 1) {
        removeStatus = true;
        message = language === 'fr' 
          ? "se réveille!" 
          : "woke up!";
      }
      break;
      
    case 'freeze':
      pokemon.canMove = false;
      message = language === 'fr' 
        ? "est gelé!" 
        : "is frozen solid!";
      // 20% chance de dégeler chaque tour
      if (Math.random() < 0.2) {
        removeStatus = true;
        message = language === 'fr' 
          ? "dégèle!" 
          : "thawed out!";
      }
      break;
      
    case 'confusion':
      // 33% chance de se blesser
      if (Math.random() < 0.33) {
        damage = Math.floor(pokemon.maxHP * 0.0625);
        pokemon.canMove = false;
        message = language === 'fr' 
          ? "se blesse dans sa confusion!" 
          : "hurt itself in its confusion!";
      }
      if (turnsRemaining <= 1) {
        removeStatus = true;
        message += language === 'fr' 
          ? " La confusion se dissipe!" 
          : " Snapped out of confusion!";
      }
      break;
  }

  // Décrémenter les tours restants
  if (pokemon.status && !removeStatus) {
    pokemon.status.turnsRemaining--;
    if (pokemon.status.turnsRemaining <= 0) {
      removeStatus = true;
    }
  }

  return { damage, message, removeStatus };
};

export const getStatusIcon = (status: BattleStatus | null): string => {
  if (!status) return '';
  
  switch (status.type) {
    case 'burn': return '🔥';
    case 'poison': return '☠️';
    case 'paralysis': return '⚡';
    case 'sleep': return '😴';
    case 'freeze': return '🧊';
    case 'confusion': return '😵';
    default: return '';
  }
};