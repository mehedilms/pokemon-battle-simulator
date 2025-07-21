import { useState, useEffect } from 'react';
import { Pokemon, Move } from '../types/pokemon';
import { fetchMoveDetails } from '../services/pokemonService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PixelText from './PixelText';

interface MoveSelectorProps {
  pokemon: Pokemon;
  onMovesSelect: (moves: Move[]) => void;
  selectedMoves: Move[];
}

const MoveSelector = ({ pokemon, onMovesSelect, selectedMoves }: MoveSelectorProps) => {
  const [availableMoves, setAvailableMoves] = useState<Move[]>([]);
  const [loading, setLoading] = useState(false);
  const maxMoves = 4;

  useEffect(() => {
    const loadMoves = async () => {
      if (!pokemon?.moves || pokemon.moves.length === 0) return;
      
      setLoading(true);
      try {
        // Prendre beaucoup plus d'attaques et inclure aussi les attaques de statut
        const movesToFetch = pokemon.moves.slice(0, Math.min(60, pokemon.moves.length));
        const movePromises = movesToFetch.map(moveData => 
          fetchMoveDetails(moveData.move.url)
        );
        
        const moves = await Promise.all(movePromises);
        // Inclure toutes les attaques valides (avec ou sans puissance)
        const validMoves = moves.filter((move): move is Move => 
          move !== null && (move.power > 0 || move.damage_class.name === 'status')
        );
        
        setAvailableMoves(validMoves);
      } catch (error) {
        console.error('Error loading moves:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMoves();
  }, [pokemon]);

  const handleMoveToggle = (move: Move) => {
    const isSelected = selectedMoves.some(m => m.id === move.id);
    
    if (isSelected) {
      // Retirer l'attaque
      const newMoves = selectedMoves.filter(m => m.id !== move.id);
      onMovesSelect(newMoves);
    } else if (selectedMoves.length < maxMoves) {
      // Ajouter l'attaque
      const newMoves = [...selectedMoves, move];
      onMovesSelect(newMoves);
    }
  };

  const getMoveTypeColor = (type: string): string => {
    switch (type) {
      case 'fire': return 'bg-red-500';
      case 'water': return 'bg-blue-500';
      case 'grass': return 'bg-green-500';
      case 'electric': return 'bg-yellow-500';
      case 'ice': return 'bg-blue-300';
      case 'fighting': return 'bg-orange-600';
      case 'poison': return 'bg-purple-500';
      case 'ground': return 'bg-amber-600';
      case 'flying': return 'bg-indigo-400';
      case 'psychic': return 'bg-pink-500';
      case 'bug': return 'bg-lime-500';
      case 'rock': return 'bg-amber-700';
      case 'ghost': return 'bg-purple-700';
      case 'dragon': return 'bg-indigo-600';
      case 'dark': return 'bg-gray-700';
      case 'steel': return 'bg-gray-400';
      case 'fairy': return 'bg-pink-400';
      case 'normal': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatMoveName = (name: string): string => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <PixelText>Chargement des attaques...</PixelText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pixels-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-pixels-border">
      <CardHeader>
        <CardTitle className="text-center">
          <PixelText>
            Choisir les attaques ({selectedMoves.length}/{maxMoves})
          </PixelText>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto scrollbar-thin">
          {availableMoves.map((move) => {
            const isSelected = selectedMoves.some(m => m.id === move.id);
            const canSelect = selectedMoves.length < maxMoves || isSelected;
            
            return (
              <Button
                key={move.id}
                variant={isSelected ? "default" : "outline"}
                className={`h-auto p-3 flex flex-col items-start text-left ${
                  !canSelect ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => canSelect && handleMoveToggle(move)}
                disabled={!canSelect}
              >
                <div className="w-full flex justify-between items-start mb-1">
                  <PixelText className="text-sm font-bold">
                    {formatMoveName(move.name)}
                  </PixelText>
                  <Badge 
                    className={`text-xs text-white ${getMoveTypeColor(move.type.name)}`}
                  >
                    {move.type.name.toUpperCase()}
                  </Badge>
                </div>
                <div className="w-full flex justify-between text-xs">
                  <span>Puissance: {move.power || 'N/A'}</span>
                  <span>Précision: {move.accuracy}%</span>
                </div>
                <div className="w-full flex justify-between text-xs">
                  <span>PP: {move.pp}</span>
                  <span className="capitalize">{move.damage_class.name}</span>
                </div>
              </Button>
            );
          })}
        </div>
        
        {availableMoves.length === 0 && !loading && (
          <div className="text-center text-pixels-dark py-4">
            <PixelText>Chargement des attaques en cours...</PixelText>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoveSelector;