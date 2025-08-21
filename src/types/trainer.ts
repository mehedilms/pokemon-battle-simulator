export interface TrainerPokemon {
  name: string;
  level: number;
  moves: string[];
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  region: string;
  game: string;
  sprite: string;
  team: TrainerPokemon[];
  type?: string; // gym leader type specialty
}

export interface TrainerBattleState {
  playerTrainer: Trainer | null;
  computerTrainer: Trainer | null;
  playerCurrentPokemon: number;
  computerCurrentPokemon: number;
  playerTeamHP: number[];
  computerTeamHP: number[];
}