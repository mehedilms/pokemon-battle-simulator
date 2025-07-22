import { Pokemon, Move } from '../types/pokemon';
import { getTypeEffectiveness, getEffectivenessMessage } from '../utils/typeEffectiveness';
import { getStatusInflictionChance, createBattleStatus } from '../utils/battleStatus';
import { BattleStatus, BattleStatusType } from '../types/battleStatus';

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
  move: Move
): { damage: number; effectiveness: number; isCritical: boolean } => {
  if (!move.power) return { damage: 10, effectiveness: 1, isCritical: false }; // Default damage for status moves
  
  // Get attacker's attack stat (use special attack if move is special)
  const attackStat = move.damage_class.name === 'special' 
    ? attacker.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 50
    : attacker.stats.find(s => s.stat.name === 'attack')?.base_stat || 50;
  
  // Get defender's defense stat
  const defenseStat = move.damage_class.name === 'special'
    ? defender.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 50
    : defender.stats.find(s => s.stat.name === 'defense')?.base_stat || 50;
  
  // Calculate critical hit chance based on speed stat
  const speedStat = attacker.stats.find(s => s.stat.name === 'speed')?.base_stat || 50;
  const criticalChance = Math.min(0.25, speedStat / 512); // Max 25% chance
  const isCritical = Math.random() < criticalChance;
  
  // Simple damage formula (similar to Pokémon games but simplified)
  const level = 50; // Assume all Pokémon are level 50
  let damage = ((2 * level / 5 + 2) * move.power * (attackStat / defenseStat)) / 50 + 2;
  
  // Critical hit multiplier
  if (isCritical) {
    damage *= 1.5;
  }
  
  // Random factor (85-100%)
  damage *= (85 + Math.random() * 15) / 100;
  
  // Type effectiveness
  const moveType = move.type.name;
  const defenderTypes = defender.types.map(t => t.type.name);
  const typeEffectiveness = getTypeEffectiveness(moveType, defenderTypes);
  
  damage *= typeEffectiveness;
  
  // Cap damage to ensure battles last a reasonable time
  const finalDamage = Math.max(1, Math.min(Math.floor(damage), 150));
  
  return { 
    damage: finalDamage, 
    effectiveness: typeEffectiveness, 
    isCritical 
  };
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
  effectiveness: number,
  isCritical = false
): string => {
  const messages = [
    `${attacker} utilise ${moveName}!`,
    `${attacker} lance ${moveName}!`,
    `${attacker} attaque avec ${moveName}!`
  ];
  
  let damageMessage = `${defender} perd ${damage} PV!`;
  
  // Add effectiveness message
  const effectivenessMsg = getEffectivenessMessage(effectiveness, 'fr');
  if (effectivenessMsg) {
    damageMessage = `${effectivenessMsg} ${damageMessage}`;
  }
  
  const criticalMessage = "Coup critique!";
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  let finalMessage = `${randomMessage} ${damageMessage}`;
  if (isCritical) {
    finalMessage = `${randomMessage} ${criticalMessage} ${damageMessage}`;
  }
  
  return finalMessage;
};

/**
 * Check if a move can inflict a status condition and apply it
 */
export const tryInflictStatus = (move: Move, targetStatuses: BattleStatus[]): BattleStatus | null => {
  const statusChance = getStatusInflictionChance(move.name);
  
  if (!statusChance) return null;
  
  // Check if target already has this status
  const hasStatus = targetStatuses.some(status => status.type === statusChance.status);
  if (hasStatus) return null;
  
  // Roll for status infliction
  if (Math.random() < statusChance.chance) {
    return createBattleStatus(statusChance.status);
  }
  
  return null;
};
