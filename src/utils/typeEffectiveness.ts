// Système complet d'efficacité des types Pokémon
export const TypeEffectiveness = {
  // Super efficace (x2)
  superEffective: {
    normal: [],
    fire: ['grass', 'ice', 'bug', 'steel'],
    water: ['fire', 'ground', 'rock'],
    electric: ['water', 'flying'],
    grass: ['water', 'ground', 'rock'],
    ice: ['grass', 'ground', 'flying', 'dragon'],
    fighting: ['normal', 'ice', 'rock', 'dark', 'steel'],
    poison: ['grass', 'fairy'],
    ground: ['fire', 'electric', 'poison', 'rock', 'steel'],
    flying: ['electric', 'grass', 'fighting'],
    psychic: ['fighting', 'poison'],
    bug: ['grass', 'psychic', 'dark'],
    rock: ['fire', 'ice', 'flying', 'bug'],
    ghost: ['psychic', 'ghost'],
    dragon: ['dragon'],
    dark: ['psychic', 'ghost'],
    steel: ['ice', 'rock', 'fairy'],
    fairy: ['fighting', 'dragon', 'dark']
  },
  
  // Peu efficace (x0.5)
  notVeryEffective: {
    normal: ['rock', 'steel'],
    fire: ['fire', 'water', 'rock', 'dragon'],
    water: ['water', 'grass', 'dragon'],
    electric: ['electric', 'grass', 'dragon'],
    grass: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
    ice: ['water', 'ice', 'steel'],
    fighting: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    poison: ['poison', 'ground', 'rock', 'ghost'],
    ground: ['grass', 'bug'],
    flying: ['electric', 'rock', 'steel'],
    psychic: ['psychic', 'steel'],
    bug: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
    rock: ['fighting', 'ground', 'steel'],
    ghost: ['dark'],
    dragon: ['steel'],
    dark: ['fighting', 'dark', 'fairy'],
    steel: ['fire', 'water', 'electric', 'steel'],
    fairy: ['fire', 'poison', 'steel']
  },
  
  // Sans effet (x0)
  noEffect: {
    normal: ['ghost'],
    fighting: ['ghost'],
    poison: ['steel'],
    ground: ['flying'],
    psychic: ['dark'],
    ghost: ['normal'],
    electric: ['ground'],
    fire: [],
    water: [],
    grass: [],
    ice: [],
    flying: [],
    bug: [],
    rock: [],
    dragon: [],
    dark: [],
    steel: [],
    fairy: []
  }
};

export const calculateTypeEffectiveness = (moveType: string, defenderTypes: string[]): number => {
  let effectiveness = 1;
  
  for (const defenderType of defenderTypes) {
    // Vérifier si sans effet
    if (TypeEffectiveness.noEffect[moveType as keyof typeof TypeEffectiveness.noEffect]?.includes(defenderType)) {
      return 0;
    }
    
    // Vérifier si super efficace
    if (TypeEffectiveness.superEffective[moveType as keyof typeof TypeEffectiveness.superEffective]?.includes(defenderType)) {
      effectiveness *= 2;
    }
    
    // Vérifier si peu efficace
    if (TypeEffectiveness.notVeryEffective[moveType as keyof typeof TypeEffectiveness.notVeryEffective]?.includes(defenderType)) {
      effectiveness *= 0.5;
    }
  }
  
  return effectiveness;
};

export const getEffectivenessText = (effectiveness: number, language: 'fr' | 'en' = 'fr'): string => {
  if (effectiveness === 0) {
    return language === 'fr' ? "Ça n'a aucun effet..." : "It had no effect...";
  }
  if (effectiveness > 1) {
    return language === 'fr' ? "C'est super efficace!" : "It's super effective!";
  }
  if (effectiveness < 1) {
    return language === 'fr' ? "Ce n'est pas très efficace..." : "It's not very effective...";
  }
  return '';
};