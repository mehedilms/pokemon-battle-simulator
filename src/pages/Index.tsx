
import { useState } from 'react';
import { Pokemon } from '../types/pokemon';
import PokemonSelector from '../components/PokemonSelector';
import BattleField from '../components/BattleField';
import { Button } from '@/components/ui/button';
import PixelText from '../components/PixelText';
import { useLanguage } from '../contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null);
  const [computerPokemon, setComputerPokemon] = useState<Pokemon | null>(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [step, setStep] = useState<'select' | 'battle'>('select');

  const handleStartBattle = () => {
    if (playerPokemon && computerPokemon) {
      setBattleStarted(true);
      setStep('battle');
    }
  };

  const handleReset = () => {
    setPlayerPokemon(null);
    setComputerPokemon(null);
    setBattleStarted(false);
    setStep('select');
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="mb-4 pb-2 border-b-2 border-pixels-border shadow-pixels inline-block px-4 py-2 bg-white rounded-md">
            <PixelText className="text-xl">{t('app.title')}</PixelText>
          </h1>
          <p className="text-pixels-dark max-w-2xl mx-auto bg-white border border-pixels-border p-3 rounded-md shadow-pixels">
            <PixelText as="span">{t('app.description')}</PixelText>
          </p>
        </div>

        {step === 'select' ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-fade-in bg-white p-6 rounded-lg border border-pixels-border shadow-pixels">
              <h2 className="mb-4 text-center bg-pixels-primary py-2 rounded-md border border-transparent">
                <PixelText className="text-white">{t('player.pokemon')}</PixelText>
              </h2>
              <PokemonSelector onPokemonSelect={setPlayerPokemon} side="player" />
              
              {playerPokemon && (
                <div className="mt-4 pokemon-card">
                  <div className="relative mb-2">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black bg-opacity-10 rounded-full blur-sm"></div>
                    <img 
                      src={playerPokemon.sprites.front_default} 
                      alt={playerPokemon.name} 
                      className="w-32 h-32 object-contain mx-auto"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-pixels-dark mt-2 capitalize">
                    <PixelText>{playerPokemon.name.split('-')[0]}</PixelText>
                  </h3>
                  <div className="flex justify-center gap-2 mt-2">
                    {playerPokemon.types.map((type) => (
                      <span 
                        key={type.type.name}
                        className={`px-2 py-1 text-xs rounded-full capitalize text-white border-0 ${getTypeColor(type.type.name)}`}
                      >
                        <PixelText as="span">{type.type.name}</PixelText>
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-pixels-dark bg-white p-2 rounded-md border border-pixels-border">
                    <div className="flex flex-col items-center">
                      <PixelText as="span" className="font-bold">PV</PixelText>
                      <PixelText as="span">{playerPokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || '??'}</PixelText>
                    </div>
                    <div className="flex flex-col items-center">
                      <PixelText as="span" className="font-bold">ATT</PixelText>
                      <PixelText as="span">{playerPokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || '??'}</PixelText>
                    </div>
                    <div className="flex flex-col items-center">
                      <PixelText as="span" className="font-bold">DEF</PixelText>
                      <PixelText as="span">{playerPokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || '??'}</PixelText>
                    </div>
                    <div className="flex flex-col items-center">
                      <PixelText as="span" className="font-bold">VIT</PixelText>
                      <PixelText as="span">{playerPokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || '??'}</PixelText>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="animate-fade-in bg-white p-6 rounded-lg border border-pixels-border shadow-pixels" style={{animationDelay: '0.2s'}}>
              <h2 className="mb-4 text-center bg-pixels-primary py-2 rounded-md border border-transparent">
                <PixelText className="text-white">{t('opponent.pokemon')}</PixelText>
              </h2>
              <PokemonSelector onPokemonSelect={setComputerPokemon} side="computer" />
              
              {computerPokemon && (
                <div className="mt-4 pokemon-card">
                  <div className="relative mb-2">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black bg-opacity-10 rounded-full blur-sm"></div>
                    <img 
                      src={computerPokemon.sprites.front_default} 
                      alt={computerPokemon.name} 
                      className="w-32 h-32 object-contain mx-auto"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-pixels-dark mt-2 capitalize">
                    <PixelText>{computerPokemon.name.split('-')[0]}</PixelText>
                  </h3>
                  <div className="flex justify-center gap-2 mt-2">
                    {computerPokemon.types.map((type) => (
                      <span 
                        key={type.type.name}
                        className={`px-2 py-1 text-xs rounded-full capitalize text-white border-0 ${getTypeColor(type.type.name)}`}
                      >
                        <PixelText as="span">{type.type.name}</PixelText>
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-pixels-dark bg-white p-2 rounded-md border border-pixels-border">
                    <div className="flex flex-col items-center">
                      <PixelText as="span" className="font-bold">PV</PixelText>
                      <PixelText as="span">{computerPokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || '??'}</PixelText>
                    </div>
                    <div className="flex flex-col items-center">
                      <PixelText as="span" className="font-bold">ATT</PixelText>
                      <PixelText as="span">{computerPokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || '??'}</PixelText>
                    </div>
                    <div className="flex flex-col items-center">
                      <PixelText as="span" className="font-bold">DEF</PixelText>
                      <PixelText as="span">{computerPokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || '??'}</PixelText>
                    </div>
                    <div className="flex flex-col items-center">
                      <PixelText as="span" className="font-bold">VIT</PixelText>
                      <PixelText as="span">{computerPokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || '??'}</PixelText>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="col-span-2 text-center mt-8">
              <Button 
                onClick={handleStartBattle}
                disabled={!playerPokemon || !computerPokemon}
                variant="pokemon"
                className="px-8 py-6 disabled:opacity-50 disabled:pointer-events-none"
              >
                <PixelText>{t('battle.start')}</PixelText>
              </Button>
            </div>
          </div>
        ) : (
          <BattleField 
            playerPokemon={playerPokemon} 
            computerPokemon={computerPokemon} 
            onReset={handleReset}
          />
        )}
        
        <div className="mt-12 text-center">
          <div className="bg-pixels-dark text-white p-4 rounded-md inline-block shadow-pixels border border-transparent">
            <PixelText className="text-xs">{t('footer.disclaimer')}</PixelText>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for type badge colors
const getTypeColor = (type: string): string => {
  switch (type) {
    case 'fire':
      return 'bg-red-500';
    case 'water':
      return 'bg-blue-500';
    case 'grass':
      return 'bg-green-500';
    case 'electric':
      return 'bg-yellow-500';
    case 'ice':
      return 'bg-blue-300';
    case 'fighting':
      return 'bg-orange-600';
    case 'poison':
      return 'bg-purple-500';
    case 'ground':
      return 'bg-amber-600';
    case 'flying':
      return 'bg-indigo-400';
    case 'psychic':
      return 'bg-pink-500';
    case 'bug':
      return 'bg-lime-500';
    case 'rock':
      return 'bg-amber-700';
    case 'ghost':
      return 'bg-purple-700';
    case 'dragon':
      return 'bg-indigo-600';
    case 'dark':
      return 'bg-gray-700';
    case 'steel':
      return 'bg-gray-400';
    case 'fairy':
      return 'bg-pink-400';
    default:
      return 'bg-gray-500';
  }
};

export default Index;
