
import React from 'react';

interface PixelTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const PixelText = ({ children, className = '', as: Component = 'div' }: PixelTextProps) => {
  return (
    <Component className={`font-kemco tracking-normal leading-normal ${className}`}>
      {children}
    </Component>
  );
};

export default PixelText;
