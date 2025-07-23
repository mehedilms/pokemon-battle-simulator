
import React, { useState, useEffect, useRef } from 'react';
import { Pokemon, Move, BattleState } from '../types/pokemon';
import { 
  fetchMoveDetails, 
  getRandomMoves, 
  calculateDamage, 
  formatPokemonName,
  generateRandomMessage,
  tryInflictStatus
} from '../services/pokemonService';
import { applyStatusEffect, shouldRemoveStatus } from '../utils/battleStatus';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { getRandomBackground, getTypeBasedBackground } from '../data/backgrounds';
import AttackAnimation from './AttackAnimation';
import PixelText from './PixelText';
import BattleStatusIndicator from './BattleStatusIndicator';
import DamageIndicator from './DamageIndicator';
import { useLanguage } from '../contexts/LanguageContext';
import { RefreshCcw, FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface BattleFieldProps {
  playerPokemon: Pokemon | null;
  computerPokemon: Pokemon | null;
  playerMoves: Move[];
  computerMoves: Move[];
  onReset: () => void;
}

const BattleField: React.FC<BattleFieldProps> = ({ 
  playerPokemon,
  computerPokemon,
  playerMoves,
  computerMoves,
  onReset 
}) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const [battleHistory, setBattleHistory] = useState<Array<BattleState>>([]);
  const battleFieldRef = useRef<HTMLDivElement>(null);
  const battleWindowRef = useRef<HTMLDivElement>(null);

  const [battleState, setBattleState] = useState<BattleState>({
    playerPokemon,
    computerPokemon,
    playerHP: 0,
    computerHP: 0,
    playerMaxHP: 0,
    computerMaxHP: 0,
    playerMoves: [],
    message: language === 'fr' ? "Que voulez-vous faire?" : "What do you want to do?",
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
    if (playerPokemon && computerPokemon && !battleState.battleStarted) {
      initializeBattle();
    }
  }, [playerPokemon, computerPokemon]);

  const initializeBattle = async () => {
    if (!playerPokemon || !computerPokemon) return;
    
    const playerMaxHP = playerPokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 100;
    const computerMaxHP = computerPokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 100;
    
    // Utiliser les moves sélectionnées ou des moves par défaut
    const movesToUse = playerMoves.length > 0 ? playerMoves : [{
      id: 1,
      name: "tackle",
      accuracy: 100,
      power: 40,
      pp: 35,
      type: { name: "normal" },
      damage_class: { name: "physical" }
    }];
    
    const initialState = {
      ...battleState,
      playerHP: playerMaxHP,
      computerHP: computerMaxHP,
      playerMaxHP,
      computerMaxHP,
      playerMoves: movesToUse,
      battleStarted: true,
      message: t('battle.wildAppears').replace('{pokemon}', formatPokemonName(computerPokemon.name))
    };
    
    setBattleState(initialState);
    setBattleHistory([initialState]);
    
    toast({
      title: language === 'fr' ? "Combat commencé!" : "Battle started!",
      description: language === 'fr' 
        ? `Votre ${formatPokemonName(playerPokemon.name)} affronte un ${formatPokemonName(computerPokemon.name)} sauvage!`
        : `Your ${formatPokemonName(playerPokemon.name)} is facing a wild ${formatPokemonName(computerPokemon.name)}!`,
    });
  };

  useEffect(() => {
    let spectatorTimer: NodeJS.Timeout;
    
    if (battleState.spectatorMode && !battleState.battleEnded && battleState.battleStarted) {
      if (battleState.turn === null) {
        spectatorTimer = setTimeout(() => {
          const randomMoveIndex = Math.floor(Math.random() * battleState.playerMoves.length);
          handleAttack(battleState.playerMoves[randomMoveIndex]);
        }, 2000);
      }
    }
    
    return () => {
      if (spectatorTimer) clearTimeout(spectatorTimer);
    };
  }, [
    battleState.spectatorMode, 
    battleState.turn, 
    battleState.battleEnded, 
    battleState.battleStarted,
    battleState.playerAttacking,
    battleState.computerAttacking
  ]);

  const handleAttack = async (move: Move) => {
    if (battleState.turn === 'computer' || battleState.battleEnded) return;
    
    // Check if player can act (status effects)
    const playerStatusEffects = battleState.playerStatus.map(status => 
      applyStatusEffect(status, battleState.playerMaxHP, language)
    );
    
    const canPlayerAct = playerStatusEffects.every(effect => effect.canAct);
    
    if (!canPlayerAct) {
      const statusMessage = playerStatusEffects
        .filter(effect => !effect.canAct)
        .map(effect => `${formatPokemonName(playerPokemon?.name || '')} ${effect.message}`)
        .join(' ');
      
      const statusState: BattleState = {
        ...battleState,
        message: statusMessage,
        turn: null
      };
      
      setBattleState(statusState);
      await new Promise(resolve => setTimeout(resolve, 2000));
      computerAttack(statusState);
      return;
    }
    
    const attackingState: BattleState = {
      ...battleState,
      turn: 'player',
      playerAttacking: true,
      message: `${formatPokemonName(playerPokemon?.name || '')} ${t('battle.uses')} ${formatMoveName(move.name)}!`,
      currentAttack: move
    };
    
    setBattleState(attackingState);
    setBattleHistory(prev => [...prev, attackingState]);
    
    const damageResult = calculateDamage(
      playerPokemon!,
      computerPokemon!,
      move
    );
    
    // Try to inflict status condition
    const newStatus = tryInflictStatus(move, attackingState.computerStatus);
    const updatedComputerStatus = newStatus 
      ? [...attackingState.computerStatus, newStatus]
      : attackingState.computerStatus;
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Apply damage
    const newComputerHP = Math.max(0, attackingState.computerHP - damageResult.damage);
    let message = generateRandomMessage(
      formatPokemonName(playerPokemon?.name || ''),
      formatPokemonName(computerPokemon?.name || ''),
      formatMoveName(move.name),
      damageResult.damage,
      damageResult.effectiveness,
      damageResult.isCritical
    );
    
    // Add status infliction message
    if (newStatus) {
      message += ` ${formatPokemonName(computerPokemon?.name || '')} est maintenant ${newStatus.name.toLowerCase()}!`;
    }
    
    const damageState: BattleState = {
      ...attackingState,
      computerHP: newComputerHP,
      computerStatus: updatedComputerStatus,
      playerAttacking: false,
      message,
      currentAttack: null,
      turn: null,
      lastDamage: damageResult.damage,
      lastEffectiveness: damageResult.effectiveness,
      criticalHit: damageResult.isCritical
    };
    
    setBattleState(damageState);
    setBattleHistory(prev => [...prev, damageState]);
    
    if (newComputerHP <= 0) {
      const winState: BattleState = {
        ...damageState,
        battleEnded: true,
        winner: 'player',
        message: `${formatPokemonName(computerPokemon?.name || '')} ${t('battle.isKo')} ${t('battle.won')}`
      };
      
      setBattleState(winState);
      setBattleHistory(prev => [...prev, winState]);
      return;
    }
    
    // Switch to computer turn after player attack
    await new Promise(resolve => setTimeout(resolve, 1000));
    computerAttack(damageState);
  };

  const applyEndOfTurnEffects = async (currentState: BattleState) => {
    // Apply status effects for both Pokemon
    let newPlayerHP = currentState.playerHP;
    let newComputerHP = currentState.computerHP;
    let playerStatusMessages: string[] = [];
    let computerStatusMessages: string[] = [];
    
    // Process player status effects
    const updatedPlayerStatus = currentState.playerStatus
      .map(status => {
        const effect = applyStatusEffect(status, currentState.playerMaxHP, language);
        if (effect.damage > 0) {
          newPlayerHP = Math.max(0, newPlayerHP - effect.damage);
          playerStatusMessages.push(`${formatPokemonName(playerPokemon?.name || '')} ${effect.message}`);
        }
        if (effect.message && effect.damage === 0) {
          playerStatusMessages.push(`${formatPokemonName(playerPokemon?.name || '')} ${effect.message}`);
        }
        return { ...status, duration: status.duration - 1 };
      })
      .filter(status => !shouldRemoveStatus(status, 1) && status.duration > 0);
    
    // Process computer status effects
    const updatedComputerStatus = currentState.computerStatus
      .map(status => {
        const effect = applyStatusEffect(status, currentState.computerMaxHP, language);
        if (effect.damage > 0) {
          newComputerHP = Math.max(0, newComputerHP - effect.damage);
          computerStatusMessages.push(`${formatPokemonName(computerPokemon?.name || '')} ${effect.message}`);
        }
        if (effect.message && effect.damage === 0) {
          computerStatusMessages.push(`${formatPokemonName(computerPokemon?.name || '')} ${effect.message}`);
        }
        return { ...status, duration: status.duration - 1 };
      })
      .filter(status => !shouldRemoveStatus(status, 1) && status.duration > 0);
    
    // Combine all status messages
    const allStatusMessages = [...playerStatusMessages, ...computerStatusMessages];
    
    if (allStatusMessages.length > 0) {
      const statusEffectState: BattleState = {
        ...currentState,
        playerHP: newPlayerHP,
        computerHP: newComputerHP,
        playerStatus: updatedPlayerStatus,
        computerStatus: updatedComputerStatus,
        message: allStatusMessages.join(' ')
      };
      
      setBattleState(statusEffectState);
      setBattleHistory(prev => [...prev, statusEffectState]);
      
      // Check for KO after status effects
      if (newPlayerHP <= 0) {
        const loseState: BattleState = {
          ...statusEffectState,
          battleEnded: true,
          winner: 'computer',
          message: `${formatPokemonName(playerPokemon?.name || '')} ${t('battle.isKo')} ${t('battle.lost')}`
        };
        setBattleState(loseState);
        setBattleHistory(prev => [...prev, loseState]);
        return;
      }
      
      if (newComputerHP <= 0) {
        const winState: BattleState = {
          ...statusEffectState,
          battleEnded: true,
          winner: 'player',
          message: `${formatPokemonName(computerPokemon?.name || '')} ${t('battle.isKo')} ${t('battle.won')}`
        };
        setBattleState(winState);
        setBattleHistory(prev => [...prev, winState]);
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // End of turn effects applied, turn continues normally
  };

  const computerAttack = async (currentBattleState?: BattleState) => {
    const stateToUse = currentBattleState || battleState;
    
    if (!stateToUse.battleStarted || stateToUse.battleEnded) return;
    
    // Check if computer can act (status effects)
    const computerStatusEffects = stateToUse.computerStatus.map(status => 
      applyStatusEffect(status, stateToUse.computerMaxHP, language)
    );
    
    const canComputerAct = computerStatusEffects.every(effect => effect.canAct);
    
    if (!canComputerAct) {
      const statusMessage = computerStatusEffects
        .filter(effect => !effect.canAct)
        .map(effect => `${formatPokemonName(computerPokemon?.name || '')} ${effect.message}`)
        .join(' ');
      
      const statusState: BattleState = {
        ...stateToUse,
        message: statusMessage,
        turn: null
      };
      
      setBattleState(statusState);
      await new Promise(resolve => setTimeout(resolve, 2000));
      await applyEndOfTurnEffects(statusState);
      return;
    }
    
    const computerTurnState: BattleState = {
      ...stateToUse,
      turn: 'computer',
      computerAttacking: true
    };
    
    setBattleState(computerTurnState);
    setBattleHistory(prev => [...prev, computerTurnState]);
    
    // Get computer move
    let computerMove: Move | null = null;
    
    if (computerMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * computerMoves.length);
      computerMove = computerMoves[randomIndex];
    } else {
      const computerMovesList = getRandomMoves(computerPokemon!, 1);
      if (computerMovesList.length > 0) {
        computerMove = await fetchMoveDetails(computerMovesList[0].move.url);
      }
    }
    
    if (!computerMove) {
      computerMove = {
        id: 1,
        name: "tackle",
        accuracy: 100,
        power: 40,
        pp: 35,
        type: { name: "normal" },
        damage_class: { name: "physical" }
      };
    }
    
    const computerAttackState: BattleState = {
      ...computerTurnState,
      message: `${formatPokemonName(computerPokemon?.name || '')} ${t('battle.uses')} ${formatMoveName(computerMove?.name || '')}!`,
      currentAttack: computerMove
    };
    
    setBattleState(computerAttackState);
    setBattleHistory(prev => [...prev, computerAttackState]);
    
    const damageResult = calculateDamage(
      computerPokemon!,
      playerPokemon!,
      computerMove
    );
    
    // Try to inflict status condition on player
    const newStatus = tryInflictStatus(computerMove, computerTurnState.playerStatus);
    const updatedPlayerStatus = newStatus 
      ? [...computerTurnState.playerStatus, newStatus]
      : computerTurnState.playerStatus;
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPlayerHP = Math.max(0, computerTurnState.playerHP - damageResult.damage);
    let message = generateRandomMessage(
      formatPokemonName(computerPokemon?.name || ''),
      formatPokemonName(playerPokemon?.name || ''),
      formatMoveName(computerMove.name),
      damageResult.damage,
      damageResult.effectiveness,
      damageResult.isCritical
    );
    
    // Add status infliction message
    if (newStatus) {
      message += ` ${formatPokemonName(playerPokemon?.name || '')} est maintenant ${newStatus.name.toLowerCase()}!`;
    }
    
    const computerDamageState: BattleState = {
      ...computerTurnState,
      playerHP: newPlayerHP,
      playerStatus: updatedPlayerStatus,
      computerAttacking: false,
      message,
      turn: 'player',
      currentAttack: null
    };
    
    setBattleState(computerDamageState);
    setBattleHistory(prev => [...prev, computerDamageState]);
    
    if (newPlayerHP <= 0) {
      const loseState: BattleState = {
        ...computerDamageState,
        battleEnded: true,
        winner: 'computer',
        message: `${formatPokemonName(playerPokemon?.name || '')} ${t('battle.isKo')} ${t('battle.lost')}`
      };
      
      setBattleState(loseState);
      setBattleHistory(prev => [...prev, loseState]);
      return;
    }
    
    // Status effects are applied, turn ends
  };

  const generateBattleReport = async () => {
    if (!battleHistory.length) {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Aucune donnée de combat disponible. Commencez un combat d'abord." 
          : "No battle data available. Start a battle first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Capture battle window for the PDF header
      let battleScreenshot: string | null = null;
      
      if (battleWindowRef.current) {
        const canvas = await html2canvas(battleWindowRef.current, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          scale: 1,
        });
        battleScreenshot = canvas.toDataURL('image/png');
      }
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(0, 0, 0);
      
      const title = language === 'fr' ? "Rapport de Combat Pokémon" : "Pokémon Battle Report";
      const titleWidth = pdf.getStringUnitWidth(title) * 20 / pdf.internal.scaleFactor;
      const titleX = (pageWidth - titleWidth) / 2;
      
      pdf.text(title, titleX, 20);
      
      // Add battle screenshot if available
      if (battleScreenshot) {
        pdf.addImage(battleScreenshot, 'PNG', 15, 25, pageWidth - 30, 50);
      }
      
      // Add battle info
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      
      const playerName = formatPokemonName(playerPokemon?.name || '');
      const computerName = formatPokemonName(computerPokemon?.name || '');
      
      pdf.text(language === 'fr' ? "Combattants:" : "Combatants:", 15, 85);
      
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(`${language === 'fr' ? "Joueur" : "Player"}: ${playerName}`, 20, 92);
      pdf.text(`${language === 'fr' ? "Adversaire" : "Opponent"}: ${computerName}`, 20, 99);
      
      // Add battle result
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text(language === 'fr' ? "Résultat:" : "Result:", 15, 110);
      
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      
      let resultText = "";
      if (battleState.battleEnded) {
        if (battleState.winner === 'player') {
          resultText = language === 'fr' 
            ? `Victoire! ${playerName} a battu ${computerName}` 
            : `Victory! ${playerName} defeated ${computerName}`;
        } else {
          resultText = language === 'fr' 
            ? `Défaite! ${computerName} a battu ${playerName}` 
            : `Defeat! ${computerName} defeated ${playerName}`;
        }
      } else {
        resultText = language === 'fr' ? "Combat en cours" : "Battle in progress";
      }
      
      pdf.text(resultText, 20, 117);
      
      // Attack history
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text(language === 'fr' ? "Historique des attaques:" : "Attack History:", 15, 130);
      
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      
      let yPosition = 137;
      const attacks = battleHistory.filter(state => state.currentAttack);
      
      for (let i = 0; i < attacks.length; i++) {
        const state = attacks[i];
        if (!state.currentAttack) continue;
        
        const round = Math.floor(i / 2) + 1;
        const attacker = state.turn === 'player' ? playerName : computerName;
        const defender = state.turn === 'player' ? computerName : playerName;
        const move = formatMoveName(state.currentAttack.name);
        const power = state.currentAttack.power || 0;
        const type = state.currentAttack.type.name;
        
        // Draw attack header
        const typeColorRGB = getTypeColorRGB(type);
        pdf.setFillColor(typeColorRGB[0], typeColorRGB[1], typeColorRGB[2]);
        pdf.rect(15, yPosition - 5, pageWidth - 30, 10, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${language === 'fr' ? "Tour" : "Round"} ${round}: ${attacker} → ${move}`, 17, yPosition);
        
        yPosition += 10;
        
        // Draw attack details
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        
        const damageResult = calculateDamage(
          state.turn === 'player' ? playerPokemon! : computerPokemon!,
          state.turn === 'player' ? computerPokemon! : playerPokemon!,
          state.currentAttack
        );
        
        const maxHP = state.turn === 'player' ? state.computerMaxHP : state.playerMaxHP;
        const damagePercent = ((damageResult.damage / maxHP) * 100).toFixed(1);
        
        pdf.text(`${language === 'fr' ? "Dégâts" : "Damage"}: ${damageResult.damage} (${damagePercent}%)`, 20, yPosition);
        yPosition += 5;
        
        pdf.text(`${language === 'fr' ? "Puissance" : "Power"}: ${power}`, 20, yPosition);
        yPosition += 5;
        
        pdf.text(`${language === 'fr' ? "Type" : "Type"}: ${capitalizeFirstLetter(type)}`, 20, yPosition);
        yPosition += 10;
        
        // Draw progress bars to visualize the battle state after this attack
        drawAttackTimeline(pdf, state, playerName, computerName, 20, yPosition, pageWidth - 40);
        
        yPosition += 20;
        
        // Add a new page if we're about to overflow
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
      }
      
      // Save PDF
      const filename = `pokemon-battle-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);
      
      toast({
        title: language === 'fr' ? "Rapport généré" : "Report generated",
        description: language === 'fr' 
          ? `Le rapport de combat a été téléchargé sous le nom "${filename}"` 
          : `Battle report has been downloaded as "${filename}"`,
      });
    } catch (error) {
      console.error("Error generating battle report:", error);
      
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Impossible de générer le rapport. " + (error instanceof Error ? error.message : "")
          : "Unable to generate report. " + (error instanceof Error ? error.message : ""),
        variant: "destructive",
      });
    }
  };
  
  const drawAttackTimeline = (
    pdf: jsPDF, 
    state: BattleState,
    playerName: string,
    computerName: string,
    x: number, 
    y: number, 
    width: number
  ) => {
    const barHeight = 3;
    const playerBarY = y;
    const computerBarY = y + 7;
    
    // Player HP bar
    const playerHPPercent = state.playerHP / state.playerMaxHP;
    const playerHPColorRGB = getHPColorRGB(state.playerHP, state.playerMaxHP);
    pdf.setFillColor(playerHPColorRGB[0], playerHPColorRGB[1], playerHPColorRGB[2]);
    pdf.rect(x, playerBarY, width * playerHPPercent, barHeight, 'F');
    
    // Player HP bar background
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.1);
    pdf.rect(x, playerBarY, width, barHeight, 'D');
    
    // Computer HP bar
    const computerHPPercent = state.computerHP / state.computerMaxHP;
    const computerHPColorRGB = getHPColorRGB(state.computerHP, state.computerMaxHP);
    pdf.setFillColor(computerHPColorRGB[0], computerHPColorRGB[1], computerHPColorRGB[2]);
    pdf.rect(x, computerBarY, width * computerHPPercent, barHeight, 'F');
    
    // Computer HP bar background
    pdf.rect(x, computerBarY, width, barHeight, 'D');
    
    // Add labels
    pdf.setFontSize(8);
    pdf.text(`${playerName}: ${state.playerHP}/${state.playerMaxHP}`, x, playerBarY - 1);
    pdf.text(`${computerName}: ${state.computerHP}/${state.computerMaxHP}`, x, computerBarY - 1);
  };

  const handleAnimationComplete = () => {
    setBattleState(prev => ({
      ...prev,
      currentAttack: null
    }));
  };

  const toggleSpectatorMode = () => {
    setBattleState(prev => ({
      ...prev,
      spectatorMode: !prev.spectatorMode
    }));
    
    toast({
      title: language === 'fr' 
        ? (battleState.spectatorMode ? "Mode Manuel activé" : "Mode Spectateur activé")
        : (battleState.spectatorMode ? "Manual Mode activated" : "Spectator Mode activated"),
      description: language === 'fr'
        ? (battleState.spectatorMode ? "Vous contrôlez maintenant les attaques" : "Le combat se déroulera automatiquement")
        : (battleState.spectatorMode ? "You now control the attacks" : "The battle will proceed automatically"),
    });
  };

  const getHPPercentage = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    return `${percentage}%`;
  };

  const getHPColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getHPColorRGB = (current: number, max: number): [number, number, number] => {
    const percentage = (current / max) * 100;
    
    if (percentage > 50) return [0, 200, 0]; // Green
    if (percentage > 20) return [255, 165, 0]; // Orange
    return [255, 0, 0]; // Red
  };
  
  const getTypeColorRGB = (type: string): [number, number, number] => {
    switch (type) {
      case 'fire': return [239, 68, 68]; // Red
      case 'water': return [59, 130, 246]; // Blue
      case 'grass': return [34, 197, 94]; // Green
      case 'electric': return [234, 179, 8]; // Yellow
      case 'ice': return [147, 197, 253]; // Light blue
      case 'fighting': return [234, 88, 12]; // Orange
      case 'poison': return [168, 85, 247]; // Purple
      case 'ground': return [180, 83, 9]; // Amber
      case 'flying': return [99, 102, 241]; // Indigo
      case 'psychic': return [236, 72, 153]; // Pink
      case 'bug': return [132, 204, 22]; // Lime
      case 'rock': return [161, 98, 7]; // Dark yellow
      case 'ghost': return [126, 34, 206]; // Dark purple
      case 'dragon': return [124, 58, 237]; // Violet
      case 'dark': return [55, 65, 81]; // Dark gray
      case 'steel': return [107, 114, 128]; // Gray
      case 'fairy': return [244, 114, 182]; // Light pink
      default: return [75, 85, 99]; // Gray
    }
  };

  const formatMoveName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function for getting the button color class based on move type
  const getTypeButtonClass = (type: string) => {
    switch (type) {
      case 'fire': return 'bg-red-500 hover:bg-red-600';
      case 'water': return 'bg-blue-500 hover:bg-blue-600';
      case 'grass': return 'bg-green-500 hover:bg-green-600';
      case 'electric': return 'bg-yellow-500 hover:bg-yellow-600 text-black';
      case 'ice': return 'bg-blue-300 hover:bg-blue-400 text-black';
      case 'fighting': return 'bg-orange-500 hover:bg-orange-600';
      case 'poison': return 'bg-purple-500 hover:bg-purple-600';
      case 'ground': return 'bg-amber-700 hover:bg-amber-800';
      case 'flying': return 'bg-indigo-500 hover:bg-indigo-600';
      case 'psychic': return 'bg-pink-500 hover:bg-pink-600';
      case 'bug': return 'bg-lime-500 hover:bg-lime-600 text-black';
      case 'rock': return 'bg-yellow-700 hover:bg-yellow-800';
      case 'ghost': return 'bg-purple-700 hover:bg-purple-800';
      case 'dragon': return 'bg-violet-500 hover:bg-violet-600';
      case 'dark': return 'bg-gray-700 hover:bg-gray-800';
      case 'steel': return 'bg-gray-500 hover:bg-gray-600';
      case 'fairy': return 'bg-pink-400 hover:bg-pink-500';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  if (!playerPokemon || !computerPokemon) {
    return <div className="text-center">
      {language === 'fr' 
        ? "Sélectionnez des Pokémon pour commencer le combat." 
        : "Select Pokemon to start the battle."}
    </div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg animate-fade-in border-2 border-black" ref={battleFieldRef}>
      <div 
        className="battle-background mb-4 relative overflow-hidden" 
        style={{ 
          backgroundImage: `url(${battleState.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '240px',
          backgroundColor: '#ffffff',
          background: '#ffffff',
          imageRendering: 'pixelated',
          border: '2px solid #000'
        }}
        ref={battleWindowRef}
      >
        <div className="absolute top-1 left-1 z-10">
          <div className="gba-stat-card bg-white border-2 border-black p-1 rounded-lg shadow min-w-[120px]">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="font-kemco text-xs uppercase">{formatPokemonName(playerPokemon.name)}</span>
                <span className="font-kemco text-xs">{t('battle.level')}50</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <span className="font-kemco text-xs">{t('battle.hp')}</span>
                <div className="hp-bar-container w-full h-1 bg-gray-300 rounded">
                  <div 
                    className={`hp-bar h-full rounded ${getHPColor(battleState.playerHP, battleState.playerMaxHP)}`}
                    style={{ width: getHPPercentage(battleState.playerHP, battleState.playerMaxHP) }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="font-kemco text-[10px]">
                  {battleState.playerHP}/{battleState.playerMaxHP}
                </span>
              </div>
              {battleState.playerStatus.length > 0 && (
                <div className="mt-1">
                  <BattleStatusIndicator statuses={battleState.playerStatus} className="justify-start" />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {computerPokemon.sprites.front_default && (
          <div className="absolute top-[20%] right-[20%]">
            <div className="relative">
              <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-16 h-2 bg-black rounded-full opacity-30"></div>
              
              <img 
                src={computerPokemon.sprites.front_default} 
                alt={computerPokemon.name}
                className={`w-24 h-24 object-contain pixelated ${battleState.playerAttacking ? 'animate-flash' : ''} ${
                  battleState.winner === 'player' ? 'animate-rotate-fade' : 'animate-bounce-light'
                }`}
              />
            </div>
          </div>
        )}
        
        <div className="absolute bottom-1 right-1 z-10">
          <div className="gba-stat-card bg-white border-2 border-black p-1 rounded-lg shadow min-w-[120px]">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="font-kemco text-xs uppercase">{formatPokemonName(computerPokemon.name)}</span>
                <span className="font-kemco text-xs">{t('battle.level')}50</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <span className="font-kemco text-xs">{t('battle.hp')}</span>
                <div className="hp-bar-container w-full h-1 bg-gray-300 rounded">
                  <div 
                    className={`hp-bar h-full rounded ${getHPColor(battleState.computerHP, battleState.computerMaxHP)}`}
                    style={{ width: getHPPercentage(battleState.computerHP, battleState.computerMaxHP) }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="font-kemco text-[10px]">
                  {battleState.computerHP}/{battleState.computerMaxHP}
                </span>
              </div>
              {battleState.computerStatus.length > 0 && (
                <div className="mt-1">
                  <BattleStatusIndicator statuses={battleState.computerStatus} className="justify-end" />
                </div>
              )}
            </div>
          </div>
        </div>
          
        {playerPokemon.sprites.back_default && (
          <div className="absolute bottom-[20%] left-[20%]">
            <div className="relative">
              <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-16 h-2 bg-black rounded-full opacity-30"></div>
              
              <img 
                src={playerPokemon.sprites.back_default}
                alt={playerPokemon.name}
                className={`w-32 h-32 object-contain pixelated ${battleState.computerAttacking ? 'animate-flash' : ''} ${
                  battleState.winner === 'computer' ? 'animate-rotate-fade' : 'animate-bounce-light'
                }`}
              />
            </div>
          </div>
        )}
        
        <AttackAnimation 
          move={battleState.currentAttack} 
          attacker={battleState.turn === 'player' ? 'player' : 'computer'} 
          onAnimationComplete={handleAnimationComplete}
          attackerName={battleState.turn === 'player' 
            ? formatPokemonName(playerPokemon.name) 
            : formatPokemonName(computerPokemon.name)}
        />
      </div>
      
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Switch 
          id="spectator-mode" 
          checked={battleState.spectatorMode}
          onCheckedChange={toggleSpectatorMode}
          disabled={battleState.battleEnded}
        />
        <Label htmlFor="spectator-mode" className="text-sm font-kemco">
          <PixelText as="span">{t('battle.spectatorMode')}</PixelText>
        </Label>
      </div>
      
      <div className="game-boy-dialog mb-4 min-h-[60px] bg-white text-black p-2 border-2 border-black rounded font-kemco">
        <p>
          <PixelText as="span">
            {`${t('battle.whatToDo')} ${formatPokemonName(playerPokemon.name)}?`}
          </PixelText>
        </p>
        {battleState.message !== "Que voulez-vous faire?" && 
         battleState.message !== "What do you want to do?" && 
         <p><PixelText as="span">{battleState.message}</PixelText></p>}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="game-boy-menu border-2 border-black p-2 rounded bg-white">
          <div className="grid grid-cols-2 gap-2">
            {battleState.playerMoves.map((move, index) => (
              <Button
                key={index}
                onClick={() => handleAttack(move)}
                disabled={battleState.turn === 'computer' || 
                          battleState.battleEnded || 
                          battleState.spectatorMode}
                className={`game-boy-button text-white border border-black h-10 relative overflow-hidden font-kemco ${
                  getTypeButtonClass(move.type.name)
                }`}
              >
                <span className="text-xs relative z-10 uppercase">
                  <PixelText as="span">{formatMoveName(move.name)}</PixelText>
                </span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="game-boy-menu border-2 border-black p-2 rounded bg-white">
          <div className="grid grid-cols-2 gap-2 h-full">
            <Button
              className="game-boy-button bg-red-500 text-white border border-black h-10 relative overflow-hidden font-kemco"
              onClick={() => window.location.reload()}
            >
              <span className="relative z-10 uppercase text-xs">
                <PixelText as="span">{t('battle.fight')}</PixelText>
              </span>
            </Button>
            
            <Button
              className="game-boy-button bg-purple-500 text-white border border-black h-10 relative overflow-hidden font-kemco"
              onClick={generateBattleReport}
              disabled={!battleHistory.length}
            >
              <span className="relative z-10 uppercase text-xs flex items-center justify-center">
                <FileDown className="h-3 w-3 mr-1" />
                <PixelText as="span">{language === 'fr' ? "RAPPORT" : "REPORT"}</PixelText>
              </span>
            </Button>
            
            <Button
              className="game-boy-button bg-green-500 text-white border border-black h-10 relative overflow-hidden font-kemco"
              onClick={onReset}
            >
              <span className="relative z-10 uppercase text-xs">
                <PixelText as="span">{t('battle.menuPokemon')}</PixelText>
              </span>
            </Button>
            
            <Button
              className="game-boy-button bg-blue-500 text-white border border-black h-10 relative overflow-hidden font-kemco"
              onClick={() => window.location.reload()}
            >
              <span className="relative z-10 uppercase text-xs">
                <PixelText as="span">{t('battle.run')}</PixelText>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleField;
