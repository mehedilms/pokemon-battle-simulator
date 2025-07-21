import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    'app.title': 'Simulateur de Combat Pokémon',
    'app.description': 'Sélectionnez deux Pokémon et faites-les s\'affronter dans un combat épique!',
    'player.pokemon': 'Votre Pokémon',
    'opponent.pokemon': 'Pokémon Adversaire',
    'battle.start': 'COMMENCER LE COMBAT!',
    'battle.hp': 'PV',
    'battle.attack': 'ATT',
    'battle.defense': 'DEF',
    'battle.speed': 'VIT',
    'footer.disclaimer': 'Développé avec PokéAPI - Ce simulateur n\'est pas affilié à Nintendo ou The Pokémon Company',
    'language.switch': 'English',
    // Battle interface translations
    'battle.whatToDo': 'Que doit faire',
    'battle.spectatorMode': 'Mode Spectateur',
    'battle.menuPokemon': 'POKÉMON',
    'battle.menuRun': 'FUITE',
    'battle.wildAppears': 'Un {pokemon} sauvage apparaît!',
    'battle.uses': 'utilise',
    'battle.won': 'Vous avez gagné!',
    'battle.lost': 'Vous avez perdu!',
    'battle.isKo': 'est K.O.!',
    'battle.fight': 'ATTAQUE',
    'battle.bag': 'SAC',
    'battle.run': 'FUITE',
    'battle.level': 'N',
    'moves.selection': 'Sélection des Attaques'
  },
  en: {
    'app.title': 'Pokemon Battle Simulator',
    'app.description': 'Select two Pokemon and make them battle in an epic fight!',
    'player.pokemon': 'Your Pokemon',
    'opponent.pokemon': 'Opponent Pokemon',
    'battle.start': 'START BATTLE!',
    'battle.hp': 'HP',
    'battle.attack': 'ATK',
    'battle.defense': 'DEF',
    'battle.speed': 'SPD',
    'footer.disclaimer': 'Developed with PokeAPI - This simulator is not affiliated with Nintendo or The Pokemon Company',
    'language.switch': 'Français',
    // Battle interface translations
    'battle.whatToDo': 'What should',
    'battle.spectatorMode': 'Spectator Mode',
    'battle.menuPokemon': 'POKEMON',
    'battle.menuRun': 'RUN',
    'battle.wildAppears': 'A wild {pokemon} appears!',
    'battle.uses': 'used',
    'battle.won': 'You won!',
    'battle.lost': 'You lost!',
    'battle.isKo': 'is KO!',
    'battle.fight': 'FIGHT',
    'battle.bag': 'BAG',
    'battle.run': 'RUN',
    'battle.level': 'L',
    'moves.selection': 'Move Selection'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'fr' ? 'en' : 'fr');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
