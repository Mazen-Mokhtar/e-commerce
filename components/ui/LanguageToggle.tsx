'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './Button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      className="flex items-center space-x-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
      title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'ar' ? 'EN' : 'عربي'}</span>
    </Button>
  );
} 