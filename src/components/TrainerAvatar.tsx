import React from 'react';
import { User, Crown, Trophy, Shield, Zap, Flame, Droplets, Leaf, Mountain, Bird, Eye, Bug, Diamond, Ghost, Sparkles, Moon, Wrench, Heart } from 'lucide-react';

interface TrainerAvatarProps {
  name: string;
  sprite: string;
  title: string;
  type?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TrainerAvatar: React.FC<TrainerAvatarProps> = ({ 
  name, 
  sprite, 
  title, 
  type, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const getTypeIcon = (pokemonType: string) => {
    const iconProps = { size: size === 'sm' ? 12 : size === 'md' ? 16 : 20, className: 'text-white' };
    
    switch (pokemonType) {
      case 'fire': return <Flame {...iconProps} />;
      case 'water': return <Droplets {...iconProps} />;
      case 'grass': return <Leaf {...iconProps} />;
      case 'electric': return <Zap {...iconProps} />;
      case 'rock': return <Mountain {...iconProps} />;
      case 'ground': return <Mountain {...iconProps} />;
      case 'flying': return <Bird {...iconProps} />;
      case 'psychic': return <Eye {...iconProps} />;
      case 'bug': return <Bug {...iconProps} />;
      case 'steel': return <Wrench {...iconProps} />;
      case 'ghost': return <Ghost {...iconProps} />;
      case 'dragon': return <Sparkles {...iconProps} />;
      case 'dark': return <Moon {...iconProps} />;
      case 'fairy': return <Heart {...iconProps} />;
      case 'ice': return <Diamond {...iconProps} />;
      default: return <Shield {...iconProps} />;
    }
  };

  const getTitleIcon = (trainerTitle: string) => {
    const iconProps = { size: size === 'sm' ? 8 : size === 'md' ? 10 : 12, className: 'text-yellow-400' };
    
    switch (trainerTitle) {
      case 'Champion': return <Crown {...iconProps} />;
      case 'Elite Four': return <Trophy {...iconProps} />;
      case 'Gym Leader': return <Shield {...iconProps} />;
      default: return <User {...iconProps} />;
    }
  };

  const getTypeColor = (trainerType?: string) => {
    if (!trainerType) return 'bg-gray-500';
    
    const colors: { [key: string]: string } = {
      'fire': 'bg-red-500',
      'water': 'bg-blue-500',
      'grass': 'bg-green-500',
      'electric': 'bg-yellow-400',
      'rock': 'bg-amber-700',
      'ground': 'bg-yellow-600',
      'flying': 'bg-indigo-400',
      'psychic': 'bg-pink-500',
      'bug': 'bg-green-400',
      'steel': 'bg-gray-500',
      'ghost': 'bg-purple-700',
      'dragon': 'bg-indigo-700',
      'dark': 'bg-gray-800',
      'fairy': 'bg-pink-300',
      'ice': 'bg-blue-300'
    };
    
    return colors[trainerType] || 'bg-gray-500';
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main avatar circle */}
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white shadow-lg relative`}>
        <img 
          src={sprite} 
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to a default avatar with appropriate icon
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center ${getTypeColor(type)}">
                  ${type ? getTypeIcon(type).type.render(getTypeIcon(type).props).props.children : '<div class="w-4 h-4 bg-white rounded-full"></div>'}
                </div>
              `;
            }
          }}
        />
      </div>
      
      {/* Type indicator (for gym leaders) */}
      {type && (
        <div className={`absolute -bottom-1 -right-1 ${getTypeColor(type)} rounded-full p-1 border border-white shadow-sm`}>
          {getTypeIcon(type)}
        </div>
      )}
      
      {/* Title indicator */}
      <div className="absolute -top-1 -left-1 bg-yellow-500 rounded-full p-1 border border-white shadow-sm">
        {getTitleIcon(title)}
      </div>
    </div>
  );
};

export default TrainerAvatar;