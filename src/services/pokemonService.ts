import { Pokemon, Move } from '../types/pokemon';
import { calculateTypeEffectiveness, getEffectivenessText } from '../utils/typeEffectiveness';
import { BattleStatus } from '../types/battleStatus';

const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 1010, offset = 0) => {
  try {
    const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    return [];
  }
};

export const fetchAllPokemonGenerations = async () => {
  try {
    const response = await fetch(`${API_URL}/generation`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokemon generations:', error);
    return [];
  }
};

export const fetchPokemonByGeneration = async (generationId: number) => {
  try {
    const response = await fetch(`${API_URL}/generation/${generationId}`);
    const data = await response.json();
    return data.pokemon_species;
  } catch (error) {
    console.error(`Error fetching Pokemon for generation ${generationId}:`, error);
    return [];
  }
};

export const fetchPokemonByNameOrId = async (nameOrId: string | number): Promise<Pokemon | null> => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${nameOrId.toString().toLowerCase()}`);
    const data = await response.json();
    return data as Pokemon;
  } catch (error) {
    console.error(`Error fetching Pokemon ${nameOrId}:`, error);
    return null;
  }
};

export const fetchMoveDetails = async (moveUrl: string): Promise<Move | null> => {
  try {
    const response = await fetch(moveUrl);
    const data = await response.json();
    return data as Move;
  } catch (error) {
    console.error('Error fetching move details:', error);
    return null;
  }
};

export const fetchRandomPokemon = async (): Promise<Pokemon | null> => {
  try {
    // Get a random ID between 1 and 1010 (total number of Pokémon as of Gen 9)
    const randomId = Math.floor(Math.random() * 1010) + 1;
    return await fetchPokemonByNameOrId(randomId);
  } catch (error) {
    console.error('Error fetching random Pokemon:', error);
    return null;
  }
};

export const getRandomMoves = (pokemon: Pokemon, count = 4): { move: { name: string; url: string } }[] => {
  if (!pokemon.moves || pokemon.moves.length === 0) {
    return [];
  }
  
  // Shuffle moves and take the first 'count' moves
  const shuffled = [...pokemon.moves].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const calculateDamage = (
  attacker: Pokemon, 
  defender: Pokemon, 
  move: Move,
  isCritical: boolean = false,
  statModifications?: { attack: number; defense: number; specialAttack: number; specialDefense: number }
): { damage: number; effectiveness: number } => {
  if (!move.power) return { damage: 10, effectiveness: 1 }; // Default damage for status moves
  
  // Get base stats
  let attackStat = move.damage_class.name === 'special' 
    ? attacker.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 50
    : attacker.stats.find(s => s.stat.name === 'attack')?.base_stat || 50;
  
  let defenseStat = move.damage_class.name === 'special'
    ? defender.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 50
    : defender.stats.find(s => s.stat.name === 'defense')?.base_stat || 50;
  
  // Apply stat modifications
  if (statModifications) {
    const attackMod = move.damage_class.name === 'special' ? statModifications.specialAttack : statModifications.attack;
    const defenseMod = move.damage_class.name === 'special' ? statModifications.specialDefense : statModifications.defense;
    
    attackStat = Math.floor(attackStat * getStatMultiplier(attackMod));
    defenseStat = Math.floor(defenseStat * getStatMultiplier(defenseMod));
  }
  
  // Calculate type effectiveness
  const moveType = move.type.name;
  const defenderTypes = defender.types.map(t => t.type.name);
  const effectiveness = calculateTypeEffectiveness(moveType, defenderTypes);
  
  // Return no damage if no effect
  if (effectiveness === 0) {
    return { damage: 0, effectiveness };
  }
  
  // STAB (Same Type Attack Bonus)
  const attackerTypes = attacker.types.map(t => t.type.name);
  const stab = attackerTypes.includes(moveType) ? 1.5 : 1;
  
  // Critical hit multiplier
  const criticalMultiplier = isCritical ? 1.5 : 1;
  
  // Calculate damage using Pokémon damage formula (simplified)
  let damage = ((2 * 50 / 5 + 2) * move.power * (attackStat / defenseStat)) / 50 + 2;
  
  // Apply modifiers
  damage *= stab;
  damage *= effectiveness;
  damage *= criticalMultiplier;
  
  // Random factor (85-100%)
  damage *= (85 + Math.random() * 15) / 100;
  
  // Cap damage to ensure battles last a reasonable time
  const finalDamage = Math.max(1, Math.min(Math.floor(damage), 120));
  
  return { damage: finalDamage, effectiveness };
};

// Helper function for stat stage multipliers
const getStatMultiplier = (stages: number): number => {
  const multipliers = [0.25, 0.28, 0.33, 0.4, 0.5, 0.66, 1, 1.5, 2, 2.5, 3, 3.5, 4];
  const index = Math.max(0, Math.min(12, stages + 6));
  return multipliers[index];
};

// Calculate critical hit chance
export const calculateCriticalHit = (pokemon: Pokemon): boolean => {
  // Base critical hit ratio is 1/24 (about 4.17%)
  // Some moves and abilities can increase this
  const criticalRatio = 24;
  return Math.random() < (1 / criticalRatio);
};

// Generate status effect from certain moves
export const generateStatusEffect = (move: Move): BattleStatus | null => {
  const statusMoves: { [key: string]: { status: BattleStatus['type']; chance: number; turns: number } } = {
    'thunder-wave': { status: 'paralysis', chance: 1, turns: -1 }, // Permanent until cured
    'toxic': { status: 'poison', chance: 1, turns: -1 },
    'will-o-wisp': { status: 'burn', chance: 1, turns: -1 },
    'sleep-powder': { status: 'sleep', chance: 0.75, turns: 3 },
    'confuse-ray': { status: 'confusion', chance: 1, turns: 3 },
    'ice-beam': { status: 'freeze', chance: 0.1, turns: -1 },
    'flamethrower': { status: 'burn', chance: 0.1, turns: -1 },
    'thunderbolt': { status: 'paralysis', chance: 0.1, turns: -1 },
    'sludge-bomb': { status: 'poison', chance: 0.3, turns: -1 }
  };
  
  const statusInfo = statusMoves[move.name];
  if (statusInfo && Math.random() < statusInfo.chance) {
    return {
      type: statusInfo.status,
      turnsRemaining: statusInfo.turns,
      message: `${move.name} caused a status effect!`
    };
  }
  
  return null;
};

export const formatPokemonName = (name: string): string => {
  return name.split('-')[0].replace(/^\w/, c => c.toUpperCase());
};

export const formatMoveName = (name: string): string => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const generateRandomMessage = (
  attacker: string, 
  defender: string, 
  moveName: string, 
  damage: number, 
  isCritical = false
): string => {
  const messages = [
    `${attacker} utilise ${moveName}!`,
    `${attacker} lance ${moveName}!`,
    `${attacker} attaque avec ${moveName}!`
  ];
  
  const damageMessages = [
    `C'est super efficace! ${defender} perd ${damage} PV!`,
    `${defender} perd ${damage} PV!`,
    `${defender} est touché et perd ${damage} PV!`
  ];
  
  const criticalMessage = "Coup critique!";
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const randomDamageMessage = damageMessages[Math.floor(Math.random() * damageMessages.length)];
  
  return isCritical 
    ? `${randomMessage} ${criticalMessage} ${randomDamageMessage}`
    : `${randomMessage} ${randomDamageMessage}`;
};
