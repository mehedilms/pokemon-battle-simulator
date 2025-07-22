import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BattleItem, COMMON_ITEMS } from '@/types/item';
import { BattleStatus } from '@/types/battleStatus';

interface ItemSelectorProps {
  items: BattleItem[];
  onItemUse: (item: BattleItem) => void;
  playerHP: number;
  playerMaxHP: number;
  playerStatus: BattleStatus[];
  disabled?: boolean;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  items,
  onItemUse,
  playerHP,
  playerMaxHP,
  playerStatus,
  disabled = false
}) => {
  const getItemTypeColor = (type: BattleItem['type']) => {
    switch (type) {
      case 'healing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'stat-boost':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'status-cure':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'battle-effect':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const isItemUseful = (item: BattleItem) => {
    // Check if healing item is useful
    if (item.type === 'healing' && playerHP >= playerMaxHP) {
      return false;
    }
    
    // Check if status cure item is useful
    if (item.type === 'status-cure' && item.statusCure) {
      const hasRelevantStatus = item.statusCure.some(status => 
        playerStatus.some(s => s.type === status)
      );
      if (!hasRelevantStatus) {
        return false;
      }
    }

    return true;
  };

  const formatItemName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-pixel text-center">Objets</h3>
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className={`relative transition-all duration-200 ${
              !isItemUseful(item) || disabled
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-md cursor-pointer'
            }`}
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 mb-2">
                <img 
                  src={item.sprite} 
                  alt={item.name}
                  className="w-8 h-8 pixelated"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-pixel text-sm truncate">
                    {formatItemName(item.name)}
                  </h4>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getItemTypeColor(item.type)}`}
                  >
                    {item.type.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {item.shortEffect}
              </p>
              
              <Button
                onClick={() => onItemUse(item)}
                disabled={!isItemUseful(item) || disabled}
                size="sm"
                className="w-full font-pixel text-xs"
                variant={isItemUseful(item) && !disabled ? "default" : "outline"}
              >
                Utiliser
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center text-muted-foreground font-pixel">
          Aucun objet disponible
        </div>
      )}
    </div>
  );
};

export default ItemSelector;