import React, { useState, useEffect } from 'react';
import { getEffectivenessColor } from '../utils/typeEffectiveness';

interface DamageIndicatorProps {
  damage: number;
  effectiveness: number;
  isCritical: boolean;
  isVisible: boolean;
  position: 'left' | 'right';
}

const DamageIndicator: React.FC<DamageIndicatorProps> = ({
  damage,
  effectiveness,
  isCritical,
  isVisible,
  position
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!show) return null;

  const positionClass = position === 'left' 
    ? 'left-1/4 transform -translate-x-1/2' 
    : 'right-1/4 transform translate-x-1/2';

  const effectivenessColorClass = getEffectivenessColor(effectiveness);
  const criticalClass = isCritical ? 'text-yellow-400 font-bold scale-110' : '';

  return (
    <div 
      className={`absolute top-1/2 ${positionClass} z-50 pointer-events-none animate-bounce`}
      style={{
        animation: 'bounce 0.5s ease-out, fadeOut 2s ease-out forwards'
      }}
    >
      <div className={`
        font-pixel text-2xl font-bold 
        ${effectivenessColorClass} 
        ${criticalClass}
        drop-shadow-lg
        bg-black/50 px-2 py-1 rounded
      `}>
        -{damage}
        {isCritical && <span className="text-yellow-400 ml-1">!</span>}
      </div>
    </div>
  );
};

export default DamageIndicator;