
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import PixelText from './PixelText';

const LanguageSwitchButton = () => {
  const { toggleLanguage, t } = useLanguage();

  return (
    <Button 
      onClick={toggleLanguage} 
      variant="outline" 
      size="sm" 
      className="fixed top-4 right-4 z-10 bg-white"
    >
      <Languages size={16} className="mr-1" />
      <PixelText as="span" className="text-xs">{t('language.switch')}</PixelText>
    </Button>
  );
};

export default LanguageSwitchButton;
