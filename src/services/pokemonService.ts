import { Pokemon, Move } from '../types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 151, offset = 0) => {
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
    // Get a random ID between 1 and 898 (total number of Pokémon as of Gen 8)
    const randomId = Math.floor(Math.random() * 898) + 1;
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
): number => {
  if (!move.power) return 10; // Default damage for status moves
  
  // Get attacker's attack stat (use special attack if move is special)
  const attackStat = move.damage_class.name === 'special' 
    ? attacker.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 50
    : attacker.stats.find(s => s.stat.name === 'attack')?.base_stat || 50;
  
  // Get defender's defense stat
  const defenseStat = move.damage_class.name === 'special'
    ? defender.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 50
    : defender.stats.find(s => s.stat.name === 'defense')?.base_stat || 50;
  
  // Simple damage formula (similar to Pokémon games but simplified)
  let damage = ((2 * 50 / 5 + 2) * move.power * (attackStat / defenseStat)) / 50 + 2;
  
  // Random factor (85-100%)
  damage *= (85 + Math.random() * 15) / 100;
  
  // Type effectiveness (simplified)
  const moveType = move.type.name;
  const defenderTypes = defender.types.map(t => t.type.name);
  
  // Very simplified type effectiveness
  const typeEffectiveness = 1.0; // In a real game, we would calculate this based on type matchups
  
  damage *= typeEffectiveness;
  
  // Cap damage to ensure battles last a reasonable time
  return Math.max(1, Math.min(Math.floor(damage), 100));
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
