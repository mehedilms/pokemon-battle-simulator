// Type effectiveness chart based on official Pokémon games
export const TYPE_EFFECTIVENESS: { [key: string]: { [key: string]: number } } = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2
  },
  flying: {
    electric: 0.5,
    grass: 2,
    ice: 0.5,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5
  }
};

/**
 * Calculate type effectiveness multiplier
 * @param attackType - The type of the attacking move
 * @param defenderTypes - Array of defender's types
 * @returns Effectiveness multiplier (0, 0.25, 0.5, 1, 2, or 4)
 */
export function getTypeEffectiveness(attackType: string, defenderTypes: string[]): number {
  let effectiveness = 1;
  
  for (const defenderType of defenderTypes) {
    const typeChart = TYPE_EFFECTIVENESS[attackType];
    if (typeChart && typeChart[defenderType] !== undefined) {
      effectiveness *= typeChart[defenderType];
    }
  }
  
  return effectiveness;
}

/**
 * Get effectiveness message based on multiplier
 */
export function getEffectivenessMessage(effectiveness: number, language: 'fr' | 'en' = 'fr'): string {
  if (effectiveness === 0) {
    return language === 'fr' ? "Ça n'a aucun effet..." : "It had no effect...";
  } else if (effectiveness < 1) {
    return language === 'fr' ? "Ce n'est pas très efficace..." : "It's not very effective...";
  } else if (effectiveness > 1) {
    return language === 'fr' ? "C'est super efficace!" : "It's super effective!";
  }
  return '';
}

/**
 * Get color for effectiveness indicator
 */
export function getEffectivenessColor(effectiveness: number): string {
  if (effectiveness === 0) return 'text-gray-500';
  if (effectiveness < 1) return 'text-red-500';
  if (effectiveness > 1) return 'text-green-500';
  return 'text-foreground';
}