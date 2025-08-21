import React, { useState } from 'react';
import { Trainer } from '../types/trainer';
import { trainers, getTrainersByRegion } from '../data/trainers';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PixelText from './PixelText';
import { useLanguage } from '../contexts/LanguageContext';

interface TrainerSelectorProps {
  onTrainerSelect: (trainer: Trainer) => void;
  side: 'player' | 'computer';
  selectedTrainer?: Trainer | null;
}

const TrainerSelector: React.FC<TrainerSelectorProps> = ({ 
  onTrainerSelect, 
  side, 
  selectedTrainer 
}) => {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'];
  const types = ['Champion', 'Gym Leader', 'Elite Four'];

  const getFilteredTrainers = () => {
    let filtered = trainers;
    
    if (selectedRegion !== 'all') {
      filtered = getTrainersByRegion(selectedRegion);
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(trainer => trainer.title === selectedType);
    }
    
    return filtered;
  };

  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      'normal': 'bg-gray-400',
      'fire': 'bg-red-500',
      'water': 'bg-blue-500',
      'electric': 'bg-yellow-400',
      'grass': 'bg-green-500',
      'ice': 'bg-blue-200',
      'fighting': 'bg-red-700',
      'poison': 'bg-purple-500',
      'ground': 'bg-yellow-600',
      'flying': 'bg-indigo-400',
      'psychic': 'bg-pink-500',
      'bug': 'bg-green-400',
      'rock': 'bg-yellow-800',
      'ghost': 'bg-purple-700',
      'dragon': 'bg-indigo-700',
      'dark': 'bg-gray-800',
      'steel': 'bg-gray-500',
      'fairy': 'bg-pink-300'
    };
    return colors[type] || 'bg-gray-400';
  };

  const getTitleColor = (title: string): string => {
    switch (title) {
      case 'Champion':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'Elite Four':
        return 'bg-gradient-to-r from-purple-500 to-blue-500';
      case 'Gym Leader':
        return 'bg-gradient-to-r from-green-500 to-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <PixelText className="text-primary mb-4 text-2xl">
          {side === 'player' ? 'Choisir votre dresseur' : 'Choisir le dresseur adverse'}
        </PixelText>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Région" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les régions</SelectItem>
            {regions.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {types.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Trainer Display */}
      {selectedTrainer && (
        <Card className="border-2 border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="text-center">
              <PixelText className="text-lg">
                Sélectionné: {selectedTrainer.name}
              </PixelText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <Badge className={getTitleColor(selectedTrainer.title)}>
                {selectedTrainer.title}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {selectedTrainer.region} - {selectedTrainer.game}
              </p>
                {selectedTrainer.type && (
                <Badge className={getTypeColor(selectedTrainer.type)}>
                  {selectedTrainer.type}
                </Badge>
              )}
              <div className="mt-4">
                <PixelText className="mb-2 text-sm font-bold">
                  Équipe:
                </PixelText>
                <div className="grid grid-cols-3 gap-2">
                  {selectedTrainer.team.map((pokemon, index) => (
                    <div key={index} className="text-xs bg-muted rounded p-2">
                      <div className="font-bold capitalize">{pokemon.name.replace('-', ' ')}</div>
                      <div className="text-muted-foreground">Lv. {pokemon.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trainer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {getFilteredTrainers().map(trainer => (
          <Card 
            key={trainer.id} 
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedTrainer?.id === trainer.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onTrainerSelect(trainer)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-center">
                <PixelText className="text-sm">
                  {trainer.name}
                </PixelText>
              </CardTitle>
              <CardDescription className="text-center">
                <Badge className={getTitleColor(trainer.title)}>
                  {trainer.title}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center space-y-1">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-100">
                  <img 
                    src={trainer.sprite} 
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {trainer.region} - {trainer.game}
                </p>
                {trainer.type && (
                  <Badge className={`${getTypeColor(trainer.type)} text-xs`}>
                    {trainer.type}
                  </Badge>
                )}
                <div className="text-xs mt-2">
                  <strong>{trainer.team.length}</strong> Pokémon
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainerSelector;