import React, { useState, useEffect } from 'react';

interface DamageIndicatorProps {
  damage: number;
  isCritical: boolean;
  effectiveness: number;
  position: { x: number; y: number };
  onComplete: () => void;
}

const DamageIndicator: React.FC<DamageIndicatorProps> = ({ 
  damage, 
  isCritical, 
  effectiveness, 
  position, 
  onComplete 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const getTextColor = (): string => {
    if (isCritical) return 'text-yellow-400';
    if (effectiveness > 1) return 'text-green-400';
    if (effectiveness < 1) return 'text-red-400';
    return 'text-white';
  };

  const getTextSize = (): string => {
    if (isCritical) return 'text-4xl';
    if (effectiveness > 1) return 'text-3xl';
    return 'text-2xl';
  };

  if (!visible) return null;

  return (
    <div
      className={`absolute pointer-events-none font-bold ${getTextColor()} ${getTextSize()} animate-bounce`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        zIndex: 1000,
        animation: `
          ${visible ? 'damage-float' : 'damage-fade'} 2s ease-out forwards
        `
      }}
    >
      -{damage}
      {isCritical && <span className="text-yellow-300 ml-1">!</span>}
    </div>
  );
};

export default DamageIndicator;