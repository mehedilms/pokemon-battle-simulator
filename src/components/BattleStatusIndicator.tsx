import React from 'react';
import { BattleStatus, getStatusIcon } from '../types/battleStatus';
import { useLanguage } from '../contexts/LanguageContext';

interface BattleStatusIndicatorProps {
  status: BattleStatus | null;
  pokemonName: string;
}

const BattleStatusIndicator: React.FC<BattleStatusIndicatorProps> = ({ status, pokemonName }) => {
  const { language } = useLanguage();
  
  if (!status) return null;

  const getStatusName = (statusType: string): string => {
    const statusNames = {
      fr: {
        burn: 'Brûlure',
        poison: 'Poison',
        paralysis: 'Paralysie',
        sleep: 'Sommeil',
        freeze: 'Gel',
        confusion: 'Confusion'
      },
      en: {
        burn: 'Burn',
        poison: 'Poison',
        paralysis: 'Paralysis',
        sleep: 'Sleep',
        freeze: 'Freeze',
        confusion: 'Confusion'
      }
    };
    
    return statusNames[language][statusType as keyof typeof statusNames.fr] || statusType;
  };

  const getStatusColor = (statusType: string): string => {
    const colors = {
      burn: 'bg-red-500',
      poison: 'bg-purple-500',
      paralysis: 'bg-yellow-500',
      sleep: 'bg-blue-500',
      freeze: 'bg-cyan-500',
      confusion: 'bg-pink-500'
    };
    
    return colors[statusType as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(status.type)} animate-pulse`}>
      <span>{getStatusIcon(status)}</span>
      <span>{getStatusName(status.type)}</span>
      {status.turnsRemaining > 0 && (
        <span className="bg-white bg-opacity-20 rounded-full px-1">
          {status.turnsRemaining}
        </span>
      )}
    </div>
  );
};

export default BattleStatusIndicator;