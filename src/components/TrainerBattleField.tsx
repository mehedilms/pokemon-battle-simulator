import React, { useState, useEffect } from 'react';
import { Pokemon, Move } from '../types/pokemon';
import { Trainer, TrainerBattleState } from '../types/trainer';
import { fetchPokemonByNameOrId, fetchMoveDetails, calculateDamage, formatPokemonName, generateRandomMessage } from '../services/pokemonService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getRandomBackground } from '../data/backgrounds';
import AttackAnimation from './AttackAnimation';
import PixelText from './PixelText';
import BattleStatusIndicator from './BattleStatusIndicator';
import DamageIndicator from './DamageIndicator';
import { useLanguage } from '../contexts/LanguageContext';
import { RefreshCcw } from 'lucide-react';

interface TrainerBattleFieldProps {
  playerTrainer: Trainer | null;
  computerTrainer: Trainer | null;
  onReset: () => void;
}

const TrainerBattleField: React.FC<TrainerBattleFieldProps> = ({ 
  playerTrainer,
  computerTrainer,
  onReset 
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const [battleState, setBattleState] = useState<TrainerBattleState>({
    playerTrainer,
    computerTrainer,
    playerCurrentPokemon: 0,
    computerCurrentPokemon: 0,
    playerTeamHP: [],
    computerTeamHP: []
  });

  const [currentPlayerPokemon, setCurrentPlayerPokemon] = useState<Pokemon | null>(null);
  const [currentComputerPokemon, setCurrentComputerPokemon] = useState<Pokemon | null>(null);
  const [playerMoves, setPlayerMoves] = useState<Move[]>([]);
  const [computerMoves, setComputerMoves] = useState<Move[]>([]);
  
  const [message, setMessage] = useState("Que voulez-vous faire?");
  const [turn, setTurn] = useState<'player' | 'computer' | null>(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const [winner, setWinner] = useState<'player' | 'computer' | null>(null);
  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [computerAttacking, setComputerAttacking] = useState(false);
  const [backgroundImage] = useState(getRandomBackground());

  useEffect(() => {
    if (playerTrainer && computerTrainer && !battleStarted) {
      initializeBattle();
    }
  }, [playerTrainer, computerTrainer]);

  const initializeBattle = async () => {
    if (!playerTrainer || !computerTrainer) return;
    
    try {
      // Load first Pokémon for each trainer
      const playerPokemon = await fetchPokemonByNameOrId(playerTrainer.team[0].name);
      const computerPokemon = await fetchPokemonByNameOrId(computerTrainer.team[0].name);
      
      if (!playerPokemon || !computerPokemon) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les Pokémon des dresseurs",
          variant: "destructive"
        });
        return;
      }

      // Initialize HP arrays for all team members
      const playerTeamHP = playerTrainer.team.map(async (teamMember) => {
        const pokemon = await fetchPokemonByNameOrId(teamMember.name);
        return pokemon ? pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 100 : 100;
      });
      
      const computerTeamHP = computerTrainer.team.map(async (teamMember) => {
        const pokemon = await fetchPokemonByNameOrId(teamMember.name);
        return pokemon ? pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 100 : 100;
      });

      const resolvedPlayerHP = await Promise.all(playerTeamHP);
      const resolvedComputerHP = await Promise.all(computerTeamHP);

      // Load moves for current Pokémon
      const playerMoveList = await loadPokemonMoves(playerTrainer.team[0]);
      const computerMoveList = await loadPokemonMoves(computerTrainer.team[0]);

      setCurrentPlayerPokemon(playerPokemon);
      setCurrentComputerPokemon(computerPokemon);
      setPlayerMoves(playerMoveList);
      setComputerMoves(computerMoveList);
      
      setBattleState(prev => ({
        ...prev,
        playerTeamHP: resolvedPlayerHP,
        computerTeamHP: resolvedComputerHP
      }));

      setBattleStarted(true);
      setMessage(`Le dresseur ${computerTrainer.name} veut se battre!`);
      
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

  const loadPokemonMoves = async (trainerPokemon: any): Promise<Move[]> => {
    try {
      const moves = await Promise.all(
        trainerPokemon.moves.slice(0, 4).map(async (moveName: string) => {
          // Create a mock move URL
          const moveUrl = `https://pokeapi.co/api/v2/move/${moveName}`;
          const move = await fetchMoveDetails(moveUrl);
          return move || {
            id: 1,
            name: moveName,
            accuracy: 100,
            power: 40,
            pp: 35,
            type: { name: "normal" },
            damage_class: { name: "physical" }
          };
        })
      );
      return moves;
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
    if (turn === 'computer' || battleEnded || !currentPlayerPokemon || !currentComputerPokemon) return;
    
    setPlayerAttacking(true);
    setTurn('player');
    setMessage(`${formatPokemonName(currentPlayerPokemon.name)} utilise ${formatPokemonName(move.name)}!`);

    const damageResult = calculateDamage(currentPlayerPokemon, currentComputerPokemon, move);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Apply damage to current computer Pokémon
    const newComputerHP = Math.max(0, battleState.computerTeamHP[battleState.computerCurrentPokemon] - damageResult.damage);
    const updatedComputerHP = [...battleState.computerTeamHP];
    updatedComputerHP[battleState.computerCurrentPokemon] = newComputerHP;
    
    const battleMessage = generateRandomMessage(
      formatPokemonName(currentPlayerPokemon.name),
      formatPokemonName(currentComputerPokemon.name),
      formatPokemonName(move.name),
      damageResult.damage,
      damageResult.effectiveness,
      damageResult.isCritical
    );

    setBattleState(prev => ({ ...prev, computerTeamHP: updatedComputerHP }));
    setMessage(battleMessage);
    setPlayerAttacking(false);
    
    if (newComputerHP <= 0) {
      await handlePokemonKO('computer');
    } else {
      setTimeout(() => computerAttack(), 1000);
    }
  };

  const computerAttack = async () => {
    if (!currentComputerPokemon || !currentPlayerPokemon || battleEnded) return;
    
    setComputerAttacking(true);
    setTurn('computer');
    
    const randomMove = computerMoves[Math.floor(Math.random() * computerMoves.length)];
    setMessage(`${formatPokemonName(currentComputerPokemon.name)} utilise ${formatPokemonName(randomMove.name)}!`);

    const damageResult = calculateDamage(currentComputerPokemon, currentPlayerPokemon, randomMove);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPlayerHP = Math.max(0, battleState.playerTeamHP[battleState.playerCurrentPokemon] - damageResult.damage);
    const updatedPlayerHP = [...battleState.playerTeamHP];
    updatedPlayerHP[battleState.playerCurrentPokemon] = newPlayerHP;
    
    const battleMessage = generateRandomMessage(
      formatPokemonName(currentComputerPokemon.name),
      formatPokemonName(currentPlayerPokemon.name),
      formatPokemonName(randomMove.name),
      damageResult.damage,
      damageResult.effectiveness,
      damageResult.isCritical
    );

    setBattleState(prev => ({ ...prev, playerTeamHP: updatedPlayerHP }));
    setMessage(battleMessage);
    setComputerAttacking(false);
    setTurn('player');
    
    if (newPlayerHP <= 0) {
      await handlePokemonKO('player');
    }
  };

  const handlePokemonKO = async (side: 'player' | 'computer') => {
    const isPlayer = side === 'player';
    const currentTrainer = isPlayer ? playerTrainer : computerTrainer;
    const currentPokemonIndex = isPlayer ? battleState.playerCurrentPokemon : battleState.computerCurrentPokemon;
    const teamHP = isPlayer ? battleState.playerTeamHP : battleState.computerTeamHP;
    
    if (!currentTrainer) return;

    setMessage(`${formatPokemonName(currentTrainer.team[currentPokemonIndex].name)} est K.O.!`);
    
    // Check if there are any remaining Pokémon
    const remainingPokemon = teamHP.slice(currentPokemonIndex + 1).some(hp => hp > 0);
    
    if (!remainingPokemon) {
      // No more Pokémon, battle ends
      setBattleEnded(true);
      setWinner(isPlayer ? 'computer' : 'player');
      const winnerTrainer = isPlayer ? computerTrainer : playerTrainer;
      setMessage(`${winnerTrainer?.name} remporte le combat!`);
      return;
    }
    
    // Switch to next Pokémon
    const nextPokemonIndex = currentPokemonIndex + 1;
    const nextPokemon = await fetchPokemonByNameOrId(currentTrainer.team[nextPokemonIndex].name);
    
    if (nextPokemon) {
      const nextMoves = await loadPokemonMoves(currentTrainer.team[nextPokemonIndex]);
      
      if (isPlayer) {
        setBattleState(prev => ({ ...prev, playerCurrentPokemon: nextPokemonIndex }));
        setCurrentPlayerPokemon(nextPokemon);
        setPlayerMoves(nextMoves);
      } else {
        setBattleState(prev => ({ ...prev, computerCurrentPokemon: nextPokemonIndex }));
        setCurrentComputerPokemon(nextPokemon);
        setComputerMoves(nextMoves);
      }
      
      setMessage(`${currentTrainer.name} envoie ${formatPokemonName(nextPokemon.name)}!`);
      setTurn('player');
    }
  };

  const getCurrentPlayerHP = () => {
    return battleState.playerTeamHP[battleState.playerCurrentPokemon] || 0;
  };

  const getCurrentComputerHP = () => {
    return battleState.computerTeamHP[battleState.computerCurrentPokemon] || 0;
  };

  const getMaxHP = (pokemon: Pokemon | null) => {
    return pokemon ? pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 100 : 100;
  };

  if (!battleStarted || !currentPlayerPokemon || !currentComputerPokemon) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <PixelText className="text-xl">Chargement du combat...</PixelText>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <div className="relative z-10 p-4">
        {/* Trainer Info */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-center bg-white bg-opacity-90 rounded-lg p-3">
            <PixelText className="font-bold text-blue-600">
              {playerTrainer?.name}
            </PixelText>
            <div className="text-xs mt-1">
              {playerTrainer?.team.filter((_, i) => battleState.playerTeamHP[i] > 0).length} Pokémon restants
            </div>
          </div>
          
          <div className="text-center bg-white bg-opacity-90 rounded-lg p-3">
            <PixelText className="font-bold text-red-600">
              {computerTrainer?.name}
            </PixelText>
            <div className="text-xs mt-1">
              {computerTrainer?.team.filter((_, i) => battleState.computerTeamHP[i] > 0).length} Pokémon restants
            </div>
          </div>
        </div>

        {/* Battle Field */}
        <div className="bg-white bg-opacity-95 rounded-lg p-6 max-w-4xl mx-auto">
          {/* Computer Pokémon */}
          <div className="flex justify-end mb-4">
            <div className="text-center">
              <div className="bg-red-100 rounded-lg p-4 mb-2">
                <PixelText className="text-sm mb-2">
                  {formatPokemonName(currentComputerPokemon.name)} Niv.{computerTrainer?.team[battleState.computerCurrentPokemon].level}
                </PixelText>
                <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(getCurrentComputerHP() / getMaxHP(currentComputerPokemon)) * 100}%`,
                      backgroundColor: getCurrentComputerHP() / getMaxHP(currentComputerPokemon) > 0.5 ? '#22c55e' : 
                                       getCurrentComputerHP() / getMaxHP(currentComputerPokemon) > 0.2 ? '#eab308' : '#ef4444'
                    }}
                  ></div>
                </div>
                <PixelText className="text-xs">
                  {getCurrentComputerHP()}/{getMaxHP(currentComputerPokemon)} HP
                </PixelText>
              </div>
              <div className="relative">
                {computerAttacking && (
                  <AttackAnimation 
                    move={computerMoves[0] || null}
                    attacker="computer"
                    onAnimationComplete={() => {}}
                    attackerName={formatPokemonName(currentComputerPokemon.name)}
                  />
                )}
                <img 
                  src={currentComputerPokemon.sprites.front_default} 
                  alt={currentComputerPokemon.name}
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Player Pokémon */}
          <div className="flex justify-start mb-6">
            <div className="text-center">
              <div className="relative">
                {playerAttacking && (
                  <AttackAnimation 
                    move={playerMoves[0] || null}
                    attacker="player"
                    onAnimationComplete={() => {}}
                    attackerName={formatPokemonName(currentPlayerPokemon.name)}
                  />
                )}
                <img 
                  src={currentPlayerPokemon.sprites.back_default} 
                  alt={currentPlayerPokemon.name}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="bg-blue-100 rounded-lg p-4 mt-2">
                <PixelText className="text-sm mb-2">
                  {formatPokemonName(currentPlayerPokemon.name)} Niv.{playerTrainer?.team[battleState.playerCurrentPokemon].level}
                </PixelText>
                <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(getCurrentPlayerHP() / getMaxHP(currentPlayerPokemon)) * 100}%`,
                      backgroundColor: getCurrentPlayerHP() / getMaxHP(currentPlayerPokemon) > 0.5 ? '#22c55e' : 
                                       getCurrentPlayerHP() / getMaxHP(currentPlayerPokemon) > 0.2 ? '#eab308' : '#ef4444'
                    }}
                  ></div>
                </div>
                <PixelText className="text-xs">
                  {getCurrentPlayerHP()}/{getMaxHP(currentPlayerPokemon)} HP
                </PixelText>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4 min-h-[60px] flex items-center">
            <PixelText className="text-center w-full">{message}</PixelText>
          </div>

          {/* Action Buttons */}
          {!battleEnded && turn === 'player' && !playerAttacking && !computerAttacking && (
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
          {battleEnded && (
            <div className="text-center space-y-4">
              <PixelText className="text-xl font-bold">
                {winner === 'player' ? 'Victoire!' : 'Défaite!'}
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

export default TrainerBattleField;