
import React, { useEffect, useState } from 'react';
import { Move } from '../types/pokemon';
import { useLanguage } from '../contexts/LanguageContext';

interface AttackAnimationProps {
  move: Move | null;
  attacker: 'player' | 'computer';
  onAnimationComplete: () => void;
  attackerName: string;
}

const AttackAnimation: React.FC<AttackAnimationProps> = ({ 
  move, 
  attacker, 
  onAnimationComplete,
  attackerName
}) => {
  const [visible, setVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const { t, language } = useLanguage();
  
  useEffect(() => {
    if (move) {
      setVisible(true);
      setAnimationStep(1);
      
      // Animation sequence
      const step1Timer = setTimeout(() => {
        setAnimationStep(2);
      }, 300);
      
      const step2Timer = setTimeout(() => {
        setAnimationStep(3);
      }, 800);
      
      const step3Timer = setTimeout(() => {
        setVisible(false);
        onAnimationComplete();
      }, 1500);
      
      return () => {
        clearTimeout(step1Timer);
        clearTimeout(step2Timer);
        clearTimeout(step3Timer);
      };
    }
  }, [move, onAnimationComplete]);
  
  if (!move || !visible) return null;
  
  // Format the move name for display
  const formatMoveName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Determine the animation class based on move type
  const getAnimationClass = () => {
    if (!move) return '';
    
    const moveType = move.type.name;
    switch (moveType) {
      case 'fire':
        return 'animate-fire-attack';
      case 'water':
        return 'animate-water-attack';
      case 'grass':
        return 'animate-grass-attack';
      case 'electric':
        return 'animate-electric-attack';
      case 'psychic':
        return 'animate-psychic-attack';
      case 'dark':
        return 'animate-dark-attack';
      case 'fighting':
        return 'animate-fighting-attack';
      case 'rock':
      case 'ground':
        return 'animate-rock-attack';
      case 'poison':
        return 'animate-poison-attack';
      case 'ghost':
        return 'animate-ghost-attack';
      case 'flying':
        return 'animate-flying-attack';
      default:
        return 'animate-normal-attack';
    }
  };
  
  // Get the animation color based on move type
  const getAnimationColor = () => {
    if (!move) return 'bg-white';
    
    const moveType = move.type.name;
    switch (moveType) {
      case 'fire':
        return 'bg-red-500';
      case 'water':
        return 'bg-blue-500';
      case 'grass':
        return 'bg-green-500';
      case 'electric':
        return 'bg-yellow-400';
      case 'psychic':
        return 'bg-pink-500';
      case 'dark':
        return 'bg-gray-800';
      case 'fighting':
        return 'bg-orange-600';
      case 'rock':
      case 'ground':
        return 'bg-amber-700';
      case 'poison':
        return 'bg-purple-600';
      case 'ghost':
        return 'bg-purple-800';
      case 'flying':
        return 'bg-indigo-400';
      case 'ice':
        return 'bg-blue-300';
      case 'dragon':
        return 'bg-violet-600';
      case 'steel':
        return 'bg-gray-500';
      case 'fairy':
        return 'bg-pink-300';
      default:
        return 'bg-gray-100';
    }
  };
  
  // Get animation shape based on move type
  const getAnimationShape = () => {
    if (!move) return 'rounded-full';
    
    const moveType = move.type.name;
    switch (moveType) {
      case 'fire':
        return 'rounded-tr-none';
      case 'water':
        return 'rounded-full';
      case 'grass':
        return 'rounded-lg rotate-45';
      case 'electric':
        return 'zigzag-shape';
      case 'psychic':
        return 'rounded-full';
      case 'fighting':
        return 'rounded-sm';
      case 'rock':
      case 'ground':
        return 'rounded-sm';
      default:
        return 'rounded-full';
    }
  };
  
  // Determine if animation should be on player or computer side
  const animationPosition = attacker === 'player' 
    ? 'top-[20%] right-[25%]' 
    : 'bottom-[20%] left-[25%]';
  
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Animation element */}
      {animationStep >= 2 && (
        <div className={`absolute ${animationPosition} z-20`}>
          <div 
            className={`w-16 h-16 ${getAnimationColor()} ${getAnimationShape()} ${getAnimationClass()} opacity-70`}
            style={{ boxShadow: `0 0 20px 5px ${getAnimationColor().replace('bg-', '')}` }}
          />
        </div>
      )}
      
      {/* GBA-style text box with the move name */}
      <div className="absolute bottom-0 w-full px-2 pb-2 z-30">
        <div className="bg-white border-2 border-black rounded p-2 text-left">
          <p className="font-kemco text-sm">
            {attackerName} {t('battle.uses')} <span className="uppercase">{formatMoveName(move.name)}</span>!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttackAnimation;
