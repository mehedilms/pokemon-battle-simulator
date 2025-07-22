import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import BattleStatusIndicator from './BattleStatusIndicator';
import { BattleStatus } from '../types/battleStatus';

interface AnimatedHealthBarProps {
  currentHP: number;
  maxHP: number;
  pokemonName: string;
  level?: number;
  status?: BattleStatus | null;
  isPlayer?: boolean;
}

const AnimatedHealthBar: React.FC<AnimatedHealthBarProps> = ({ 
  currentHP, 
  maxHP, 
  pokemonName, 
  level = 50,
  status = null,
  isPlayer = false
}) => {
  const { language } = useLanguage();
  const [displayHP, setDisplayHP] = useState(currentHP);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (displayHP !== currentHP) {
      setAnimating(true);
      const difference = Math.abs(displayHP - currentHP);
      const steps = Math.min(difference, 30); // Maximum 30 steps for smooth animation
      const stepSize = difference / steps;
      const stepDelay = 50; // 50ms per step

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const newHP = displayHP + (currentHP - displayHP) * progress;
        
        setDisplayHP(Math.round(newHP));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setDisplayHP(currentHP);
          setAnimating(false);
        }
      }, stepDelay);

      return () => clearInterval(interval);
    }
  }, [currentHP, displayHP]);

  const hpPercentage = (displayHP / maxHP) * 100;
  
  const getHPColor = (): string => {
    if (hpPercentage > 50) return 'bg-green-500';
    if (hpPercentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getHPGlow = (): string => {
    if (animating) {
      if (hpPercentage > 50) return 'shadow-green-400';
      if (hpPercentage > 20) return 'shadow-yellow-400';
      return 'shadow-red-400';
    }
    return '';
  };

  return (
    <div className={`bg-white rounded-lg p-3 shadow-lg border-2 ${animating ? 'animate-pulse' : ''}`}>
      {/* Header avec nom et niveau */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-800 capitalize">
            {pokemonName}
          </h3>
          <span className="text-sm text-gray-600">
            {language === 'fr' ? 'N.' : 'Lv.'}{level}
          </span>
          {isPlayer && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {language === 'fr' ? 'Joueur' : 'Player'}
            </span>
          )}
        </div>
        <BattleStatusIndicator status={status} pokemonName={pokemonName} />
      </div>

      {/* Barre de vie */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>{language === 'fr' ? 'PV' : 'HP'}</span>
          <span>{Math.max(0, Math.round(displayHP))}/{maxHP}</span>
        </div>
        
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
          <div 
            className={`h-full transition-all duration-300 ${getHPColor()} ${getHPGlow()}`}
            style={{ 
              width: `${Math.max(0, hpPercentage)}%`,
              boxShadow: animating ? `0 0 10px ${getHPGlow()}` : 'none'
            }}
          />
          
          {/* Indicateur de dégâts récents */}
          {animating && (
            <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse" />
          )}
        </div>
        
        {/* Pourcentage de vie */}
        <div className="text-right">
          <span className={`text-xs font-medium ${
            hpPercentage > 50 ? 'text-green-600' : 
            hpPercentage > 20 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {Math.round(hpPercentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHealthBar;