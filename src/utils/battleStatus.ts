import { BattleStatus, BattleStatusType, StatusEffect } from '../types/battleStatus';

/**
 * Apply status effect and return the effect for this turn
 */
export function applyStatusEffect(status: BattleStatus, maxHP: number, language: 'fr' | 'en' = 'fr'): StatusEffect {
  const effect: StatusEffect = {
    canAct: true,
    damage: 0,
    message: ''
  };

  switch (status.type) {
    case BattleStatusType.POISON:
      effect.damage = Math.floor(maxHP * 0.125); // 1/8 of max HP
      effect.message = language === 'fr' 
        ? `est empoisonné et perd ${effect.damage} PV!` 
        : `is poisoned and loses ${effect.damage} HP!`;
      break;

    case BattleStatusType.BURN:
      effect.damage = Math.floor(maxHP * 0.0625); // 1/16 of max HP
      effect.message = language === 'fr' 
        ? `est brûlé et perd ${effect.damage} PV!` 
        : `is burned and loses ${effect.damage} HP!`;
      break;

    case BattleStatusType.PARALYSIS:
      effect.canAct = Math.random() > 0.25; // 25% chance to be unable to act
      if (!effect.canAct) {
        effect.message = language === 'fr' 
          ? 'est paralysé et ne peut pas attaquer!' 
          : 'is paralyzed and cannot attack!';
      }
      break;

    case BattleStatusType.SLEEP:
      effect.canAct = false;
      effect.message = language === 'fr' 
        ? 'dort profondément et ne peut pas attaquer!' 
        : 'is fast asleep and cannot attack!';
      break;

    case BattleStatusType.FREEZE:
      effect.canAct = Math.random() > 0.8; // 20% chance to thaw
      if (!effect.canAct) {
        effect.message = language === 'fr' 
          ? 'est gelé et ne peut pas attaquer!' 
          : 'is frozen solid and cannot attack!';
      } else {
        effect.message = language === 'fr' 
          ? 'dégèle et peut attaquer!' 
          : 'thawed out and can attack!';
      }
      break;

    case BattleStatusType.CONFUSION:
      effect.canAct = Math.random() > 0.33; // 33% chance to hurt itself
      if (!effect.canAct) {
        effect.damage = Math.floor(maxHP * 0.1); // 10% of max HP
        effect.message = language === 'fr' 
          ? `est confus et se blesse dans sa confusion! Perd ${effect.damage} PV!` 
          : `is confused and hurts itself in confusion! Loses ${effect.damage} HP!`;
      }
      break;
  }

  return effect;
}

/**
 * Check if a status should be removed (duration expired or special conditions)
 */
export function shouldRemoveStatus(status: BattleStatus, turnsPassed: number): boolean {
  if (status.duration <= 0) return true;
  
  // Special cases for certain statuses
  switch (status.type) {
    case BattleStatusType.SLEEP:
      return Math.random() < 0.33; // 33% chance to wake up each turn
    case BattleStatusType.FREEZE:
      return Math.random() < 0.2; // 20% chance to thaw each turn
    case BattleStatusType.CONFUSION:
      return Math.random() < 0.5; // 50% chance to snap out each turn
    default:
      return false;
  }
}

/**
 * Get status infliction chance for moves that can cause status
 */
export function getStatusInflictionChance(moveName: string): { status: BattleStatusType; chance: number } | null {
  const statusMoves: { [key: string]: { status: BattleStatusType; chance: number } } = {
    'thunder-wave': { status: BattleStatusType.PARALYSIS, chance: 0.9 },
    'toxic': { status: BattleStatusType.POISON, chance: 0.9 },
    'poison-powder': { status: BattleStatusType.POISON, chance: 0.75 },
    'sleep-powder': { status: BattleStatusType.SLEEP, chance: 0.75 },
    'will-o-wisp': { status: BattleStatusType.BURN, chance: 0.85 },
    'confuse-ray': { status: BattleStatusType.CONFUSION, chance: 1.0 },
    'ice-beam': { status: BattleStatusType.FREEZE, chance: 0.1 },
    'blizzard': { status: BattleStatusType.FREEZE, chance: 0.1 },
    'thunderbolt': { status: BattleStatusType.PARALYSIS, chance: 0.1 },
    'thunder': { status: BattleStatusType.PARALYSIS, chance: 0.3 },
    'flamethrower': { status: BattleStatusType.BURN, chance: 0.1 },
    'fire-blast': { status: BattleStatusType.BURN, chance: 0.1 }
  };

  return statusMoves[moveName] || null;
}

/**
 * Create a new battle status
 */
export function createBattleStatus(type: BattleStatusType, duration: number = 5): BattleStatus {
  const statusNames = {
    [BattleStatusType.POISON]: { fr: 'Empoisonné', en: 'Poisoned' },
    [BattleStatusType.BURN]: { fr: 'Brûlé', en: 'Burned' },
    [BattleStatusType.PARALYSIS]: { fr: 'Paralysé', en: 'Paralyzed' },
    [BattleStatusType.SLEEP]: { fr: 'Endormi', en: 'Asleep' },
    [BattleStatusType.FREEZE]: { fr: 'Gelé', en: 'Frozen' },
    [BattleStatusType.CONFUSION]: { fr: 'Confus', en: 'Confused' }
  };

  const descriptions = {
    [BattleStatusType.POISON]: { fr: 'Perd des PV à chaque tour', en: 'Loses HP each turn' },
    [BattleStatusType.BURN]: { fr: 'Perd des PV et attaque réduite', en: 'Loses HP and reduced attack' },
    [BattleStatusType.PARALYSIS]: { fr: 'Peut être incapable d\'attaquer', en: 'May be unable to attack' },
    [BattleStatusType.SLEEP]: { fr: 'Incapable d\'attaquer', en: 'Unable to attack' },
    [BattleStatusType.FREEZE]: { fr: 'Incapable d\'attaquer', en: 'Unable to attack' },
    [BattleStatusType.CONFUSION]: { fr: 'Peut se blesser', en: 'May hurt itself' }
  };

  return {
    type,
    name: statusNames[type].fr,
    duration,
    description: descriptions[type].fr
  };
}