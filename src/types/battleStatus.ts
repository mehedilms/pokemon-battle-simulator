export enum BattleStatusType {
  POISON = 'poison',
  BURN = 'burn',
  PARALYSIS = 'paralysis',
  SLEEP = 'sleep',
  FREEZE = 'freeze',
  CONFUSION = 'confusion'
}

export interface BattleStatus {
  type: BattleStatusType;
  name: string;
  duration: number; // Number of turns remaining
  damage?: number; // Damage per turn for poison/burn
  description: string;
}

export interface StatusEffect {
  canAct: boolean; // Can the Pokémon act this turn?
  damage: number; // Damage to apply at end of turn
  message: string; // Status message to display
}