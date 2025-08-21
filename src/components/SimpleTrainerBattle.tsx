import React, { useState, useEffect } from 'react';
import { Pokemon, Move, BattleState } from '../types/pokemon';
import { Trainer } from '../types/trainer';
import { 
  fetchPokemonByNameOrId, 
  fetchMoveDetails, 
  calculateDamage, 
  formatPokemonName, 
  generateRandomMessage 
} from '../services/pokemonService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getRandomBackground } from '../data/backgrounds';
import AttackAnimation from './AttackAnimation';
import PixelText from './PixelText';
import { useLanguage } from '../contexts/LanguageContext';
import { RefreshCcw } from 'lucide-react';

interface SimpleTrainerBattleProps {
  playerTrainer: Trainer | null;
  computerTrainer: Trainer | null;
  onReset: () => void;
}

const SimpleTrainerBattle: React.FC<SimpleTrainerBattleProps> = ({ 
  playerTrainer,
  computerTrainer,
  onReset 
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null);
  const [computerPokemon, setComputerPokemon] = useState<Pokemon | null>(null);
  const [playerMoves, setPlayerMoves] = useState<Move[]>([]);
  const [computerMoves, setComputerMoves] = useState<Move[]>([]);

  const [battleState, setBattleState] = useState<BattleState>({
    playerPokemon: null,
    computerPokemon: null,
    playerHP: 0,
    computerHP: 0,
    playerMaxHP: 0,
    computerMaxHP: 0,
    playerMoves: [],
    message: "Que voulez-vous faire?",
    turn: null,
    playerAttacking: false,
    computerAttacking: false,
    battleStarted: false,
    battleEnded: false,
    winner: null,
    spectatorMode: false,
    currentAttack: null,
    backgroundImage: getRandomBackground(),
    playerStatus: [],
    computerStatus: [],
    lastDamage: 0,
    lastEffectiveness: 1,
    criticalHit: false
  });

  useEffect(() => {
    if (playerTrainer && computerTrainer && !battleState.battleStarted) {
      initializeTrainerBattle();
    }
  }, [playerTrainer, computerTrainer]);

  const initializeTrainerBattle = async () => {
    if (!playerTrainer || !computerTrainer) return;
    
    try {
      // Load first Pokémon from each trainer's team
      const firstPlayerPokemon = await fetchPokemonByNameOrId(playerTrainer.team[0].name);
      const firstComputerPokemon = await fetchPokemonByNameOrId(computerTrainer.team[0].name);
      
      if (!firstPlayerPokemon || !firstComputerPokemon) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les Pokémon des dresseurs",
          variant: "destructive"
        });
        return;
      }

      // Load moves for both Pokémon
      const playerMovesList = await loadTrainerPokemonMoves(playerTrainer.team[0]);
      const computerMovesList = await loadTrainerPokemonMoves(computerTrainer.team[0]);

      const playerMaxHP = firstPlayerPokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 100;
      const computerMaxHP = firstComputerPokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 100;

      setPlayerPokemon(firstPlayerPokemon);
      setComputerPokemon(firstComputerPokemon);
      setPlayerMoves(playerMovesList);
      setComputerMoves(computerMovesList);

      const initialState: BattleState = {
        ...battleState,
        playerPokemon: firstPlayerPokemon,
        computerPokemon: firstComputerPokemon,
        playerHP: playerMaxHP,
        computerHP: computerMaxHP,
        playerMaxHP,
        computerMaxHP,
        playerMoves: playerMovesList,
        battleStarted: true,
        message: `Le dresseur ${computerTrainer.name} veut se battre! Il envoie ${formatPokemonName(firstComputerPokemon.name)}!`
      };

      setBattleState(initialState);
      
      toast({
        title: "Combat de dresseurs commencé!",
        description: `${playerTrainer.name} VS ${computerTrainer.name}`,
      });
    } catch (error) {
      console.error('Error initializing trainer battle:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'initialiser le combat de dresseurs",
        variant: "destructive"
      });
    }
  };

  const loadTrainerPokemonMoves = async (trainerPokemon: any): Promise<Move[]> => {
    try {
      const moves = await Promise.all(
        trainerPokemon.moves.slice(0, 4).map(async (moveName: string) => {
          try {
            const moveUrl = `https://pokeapi.co/api/v2/move/${moveName}`;
            const move = await fetchMoveDetails(moveUrl);
            return move;
          } catch (error) {
            // Return a default move if fetch fails
            return {
              id: 1,
              name: moveName,
              accuracy: 100,
              power: 40,
              pp: 35,
              type: { name: "normal" },
              damage_class: { name: "physical" }
            };
          }
        })
      );
      return moves.filter(move => move !== null) as Move[];
    } catch (error) {
      console.error('Error loading moves:', error);
      return [{
        id: 1,
        name: "tackle",
        accuracy: 100,
        power: 40,
        pp: 35,
        type: { name: "normal" },
        damage_class: { name: "physical" }
      }];
    }
  };

  const handleAttack = async (move: Move) => {
    if (battleState.turn === 'computer' || battleState.battleEnded || !playerPokemon || !computerPokemon) return;
    
    const attackingState: BattleState = {
      ...battleState,
      turn: 'player',
      playerAttacking: true,
      message: `${formatPokemonName(playerPokemon.name)} utilise ${formatPokemonName(move.name)}!`,
      currentAttack: move
    };
    
    setBattleState(attackingState);
    
    const damageResult = calculateDamage(playerPokemon, computerPokemon, move);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newComputerHP = Math.max(0, attackingState.computerHP - damageResult.damage);
    const message = generateRandomMessage(
      formatPokemonName(playerPokemon.name),
      formatPokemonName(computerPokemon.name),
      formatPokemonName(move.name),
      damageResult.damage,
      damageResult.effectiveness,
      damageResult.isCritical
    );
    
    const damageState: BattleState = {
      ...attackingState,
      computerHP: newComputerHP,
      playerAttacking: false,
      message,
      currentAttack: null,
      turn: null,
      lastDamage: damageResult.damage,
      lastEffectiveness: damageResult.effectiveness,
      criticalHit: damageResult.isCritical
    };
    
    setBattleState(damageState);
    
    if (newComputerHP <= 0) {
      const winState: BattleState = {
        ...damageState,
        battleEnded: true,
        winner: 'player',
        message: `${formatPokemonName(computerPokemon.name)} est K.O.! ${playerTrainer?.name} remporte le combat!`
      };
      
      setBattleState(winState);
      return;
    }
    
    setTimeout(() => computerAttack(damageState), 1000);
  };

  const computerAttack = async (currentState?: BattleState) => {
    const stateToUse = currentState || battleState;
    
    if (!computerPokemon || !playerPokemon || stateToUse.battleEnded) return;
    
    const computerTurnState: BattleState = {
      ...stateToUse,
      turn: 'computer',
      computerAttacking: true
    };
    
    setBattleState(computerTurnState);
    
    const randomMove = computerMoves[Math.floor(Math.random() * computerMoves.length)];
    
    const computerAttackState: BattleState = {
      ...computerTurnState,
      message: `${formatPokemonName(computerPokemon.name)} utilise ${formatPokemonName(randomMove.name)}!`,
      currentAttack: randomMove
    };
    
    setBattleState(computerAttackState);
    
    const damageResult = calculateDamage(computerPokemon, playerPokemon, randomMove);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPlayerHP = Math.max(0, computerTurnState.playerHP - damageResult.damage);
    const message = generateRandomMessage(
      formatPokemonName(computerPokemon.name),
      formatPokemonName(playerPokemon.name),
      formatPokemonName(randomMove.name),
      damageResult.damage,
      damageResult.effectiveness,
      damageResult.isCritical
    );
    
    const computerDamageState: BattleState = {
      ...computerTurnState,
      playerHP: newPlayerHP,
      computerAttacking: false,
      message,
      turn: 'player',
      currentAttack: null
    };
    
    setBattleState(computerDamageState);
    
    if (newPlayerHP <= 0) {
      const loseState: BattleState = {
        ...computerDamageState,
        battleEnded: true,
        winner: 'computer',
        message: `${formatPokemonName(playerPokemon.name)} est K.O.! ${computerTrainer?.name} remporte le combat!`
      };
      
      setBattleState(loseState);
      return;
    }
  };

  if (!battleState.battleStarted || !playerPokemon || !computerPokemon) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <PixelText className="text-xl">Chargement du combat...</PixelText>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${battleState.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <div className="relative z-10 p-4">
        {/* Trainer Info */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-center bg-white bg-opacity-90 rounded-lg p-3 flex items-center gap-3">
            <img 
              src={playerTrainer?.sprite} 
              alt={playerTrainer?.name}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';
              }}
            />
            <div>
              <PixelText className="font-bold text-blue-600">
                {playerTrainer?.name}
              </PixelText>
              <div className="text-xs">{playerTrainer?.title}</div>
            </div>
          </div>
          
          <div className="text-center bg-white bg-opacity-90 rounded-lg p-3 flex items-center gap-3">
            <div>
              <PixelText className="font-bold text-red-600">
                {computerTrainer?.name}
              </PixelText>
              <div className="text-xs">{computerTrainer?.title}</div>
            </div>
            <img 
              src={computerTrainer?.sprite} 
              alt={computerTrainer?.name}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';
              }}
            />
          </div>
        </div>

        {/* Battle Field - Same as regular Pokemon battle */}
        <div className="bg-white bg-opacity-95 rounded-lg p-6 max-w-4xl mx-auto">
          {/* Computer Pokémon */}
          <div className="flex justify-end mb-4">
            <div className="text-center">
              <div className="bg-red-100 rounded-lg p-4 mb-2">
                <PixelText className="text-sm mb-2">
                  {formatPokemonName(computerPokemon.name)} Niv.{computerTrainer?.team[0].level}
                </PixelText>
                <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(battleState.computerHP / battleState.computerMaxHP) * 100}%`,
                      backgroundColor: battleState.computerHP / battleState.computerMaxHP > 0.5 ? '#22c55e' : 
                                       battleState.computerHP / battleState.computerMaxHP > 0.2 ? '#eab308' : '#ef4444'
                    }}
                  ></div>
                </div>
                <PixelText className="text-xs">
                  {battleState.computerHP}/{battleState.computerMaxHP} HP
                </PixelText>
              </div>
              <div className="relative">
                {battleState.computerAttacking && (
                  <AttackAnimation 
                    move={battleState.currentAttack}
                    attacker="computer"
                    onAnimationComplete={() => {}}
                    attackerName={formatPokemonName(computerPokemon.name)}
                  />
                )}
                <img 
                  src={computerPokemon.sprites.front_default} 
                  alt={computerPokemon.name}
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Player Pokémon */}
          <div className="flex justify-start mb-6">
            <div className="text-center">
              <div className="relative">
                {battleState.playerAttacking && (
                  <AttackAnimation 
                    move={battleState.currentAttack}
                    attacker="player"
                    onAnimationComplete={() => {}}
                    attackerName={formatPokemonName(playerPokemon.name)}
                  />
                )}
                <img 
                  src={playerPokemon.sprites.back_default} 
                  alt={playerPokemon.name}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="bg-blue-100 rounded-lg p-4 mt-2">
                <PixelText className="text-sm mb-2">
                  {formatPokemonName(playerPokemon.name)} Niv.{playerTrainer?.team[0].level}
                </PixelText>
                <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(battleState.playerHP / battleState.playerMaxHP) * 100}%`,
                      backgroundColor: battleState.playerHP / battleState.playerMaxHP > 0.5 ? '#22c55e' : 
                                       battleState.playerHP / battleState.playerMaxHP > 0.2 ? '#eab308' : '#ef4444'
                    }}
                  ></div>
                </div>
                <PixelText className="text-xs">
                  {battleState.playerHP}/{battleState.playerMaxHP} HP
                </PixelText>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4 min-h-[60px] flex items-center">
            <PixelText className="text-center w-full">{battleState.message}</PixelText>
          </div>

          {/* Action Buttons */}
          {!battleState.battleEnded && battleState.turn === 'player' && !battleState.playerAttacking && !battleState.computerAttacking && (
            <div className="grid grid-cols-2 gap-2">
              {playerMoves.map((move, index) => (
                <Button
                  key={index}
                  onClick={() => handleAttack(move)}
                  className="p-3 text-left"
                  variant="outline"
                >
                  <div>
                    <PixelText className="font-bold text-sm">
                      {formatPokemonName(move.name)}
                    </PixelText>
                    <div className="text-xs text-gray-600 mt-1">
                      Type: {move.type.name} | Puissance: {move.power || '—'}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {/* Battle End */}
          {battleState.battleEnded && (
            <div className="text-center space-y-4">
              <PixelText className="text-xl font-bold">
                {battleState.winner === 'player' ? 'Victoire!' : 'Défaite!'}
              </PixelText>
              <Button onClick={onReset} className="px-6 py-3">
                <RefreshCcw className="w-4 h-4 mr-2" />
                <PixelText>Nouveau Combat</PixelText>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleTrainerBattle;