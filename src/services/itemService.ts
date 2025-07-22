import { BattleItem, COMMON_ITEMS } from '@/types/item';
import { BattleStatus } from '@/types/battleStatus';

export const getRandomItems = (count: number = 3): BattleItem[] => {
  const shuffled = [...COMMON_ITEMS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const useItem = (
  item: BattleItem,
  currentHP: number,
  maxHP: number,
  currentStatus: BattleStatus[],
  currentStatBoosts: {
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  }
): {
  newHP: number;
  newStatus: BattleStatus[];
  newStatBoosts: {
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
  message: string;
} => {
  let newHP = currentHP;
  let newStatus = [...currentStatus];
  let newStatBoosts = { ...currentStatBoosts };
  let message = '';

  switch (item.type) {
    case 'healing':
      if (item.healAmount) {
        const healAmount = item.healAmount === 999 ? maxHP : item.healAmount;
        newHP = Math.min(currentHP + healAmount, maxHP);
        const actualHeal = newHP - currentHP;
        message = `${item.name} restaure ${actualHeal} HP!`;
        
        // Full restore also cures status
        if (item.statusCure) {
          newStatus = newStatus.filter(status => !item.statusCure!.includes(status.type));
          if (currentStatus.length > 0) {
            message += ' Tous les statuts ont été soignés!';
          }
        }
      }
      break;

    case 'status-cure':
      if (item.statusCure) {
        const initialStatusCount = newStatus.length;
        newStatus = newStatus.filter(status => !item.statusCure!.includes(status.type));
        
        if (newStatus.length < initialStatusCount) {
          const curedStatuses = item.statusCure.filter(statusType => 
            currentStatus.some(s => s.type === statusType)
          );
          message = `${item.name} soigne ${curedStatuses.join(', ')}!`;
        } else {
          message = `${item.name} n'a eu aucun effet.`;
        }
      }
      break;

    case 'stat-boost':
      if (item.statBoosts) {
        const boostedStats: string[] = [];
        
        Object.entries(item.statBoosts).forEach(([stat, boost]) => {
          const statKey = stat as keyof typeof newStatBoosts;
          const currentBoost = newStatBoosts[statKey];
          
          // Cap à +6/-6 comme dans les vrais jeux Pokémon  
          if (currentBoost < 6) {
            const actualBoost = Math.min(boost, 6 - currentBoost);
            newStatBoosts[statKey] = currentBoost + actualBoost;
            
            if (actualBoost > 0) {
              const statName = stat === 'special-attack' ? 'Attaque Spé' :
                             stat === 'special-defense' ? 'Défense Spé' :
                             stat === 'attack' ? 'Attaque' :
                             stat === 'defense' ? 'Défense' :
                             stat === 'speed' ? 'Vitesse' : stat;
              boostedStats.push(statName);
            }
          }
        });
        
        if (boostedStats.length > 0) {
          const boostText = item.statBoosts && Object.values(item.statBoosts)[0] === 2 ? 
            'augmente fortement' : 'augmente';
          message = `${item.name} ${boostText} ${boostedStats.join(', ')}!`;
        } else {
          message = `Les statistiques ne peuvent pas être augmentées davantage!`;
        }
      }
      break;

    default:
      message = `${item.name} est utilisé mais n'a pas d'effet connu.`;
  }

  return {
    newHP,
    newStatus,
    newStatBoosts,
    message
  };
};

export const formatItemName = (name: string): string => {
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const getItemDescription = (item: BattleItem): string => {
  return item.effect;
};