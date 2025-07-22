import React from 'react';
import { BattleStatus, BattleStatusType } from '../types/battleStatus';
import { Badge } from './ui/badge';

interface BattleStatusIndicatorProps {
  statuses: BattleStatus[];
  className?: string;
}

const getStatusColor = (type: BattleStatusType): string => {
  switch (type) {
    case BattleStatusType.POISON:
      return 'bg-purple-600 text-white';
    case BattleStatusType.BURN:
      return 'bg-red-600 text-white';
    case BattleStatusType.PARALYSIS:
      return 'bg-yellow-600 text-white';
    case BattleStatusType.SLEEP:
      return 'bg-blue-600 text-white';
    case BattleStatusType.FREEZE:
      return 'bg-cyan-600 text-white';
    case BattleStatusType.CONFUSION:
      return 'bg-pink-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

const getStatusIcon = (type: BattleStatusType): string => {
  switch (type) {
    case BattleStatusType.POISON:
      return '🟣';
    case BattleStatusType.BURN:
      return '🔥';
    case BattleStatusType.PARALYSIS:
      return '⚡';
    case BattleStatusType.SLEEP:
      return '💤';
    case BattleStatusType.FREEZE:
      return '🧊';
    case BattleStatusType.CONFUSION:
      return '😵';
    default:
      return '❓';
  }
};

const BattleStatusIndicator: React.FC<BattleStatusIndicatorProps> = ({ 
  statuses, 
  className = '' 
}) => {
  if (statuses.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {statuses.map((status, index) => (
        <Badge
          key={index}
          variant="secondary"
          className={`${getStatusColor(status.type)} text-xs px-2 py-1 font-pixel`}
          title={status.description}
        >
          <span className="mr-1">{getStatusIcon(status.type)}</span>
          {status.name}
          {status.duration > 0 && (
            <span className="ml-1 opacity-75">({status.duration})</span>
          )}
        </Badge>
      ))}
    </div>
  );
};

export default BattleStatusIndicator;