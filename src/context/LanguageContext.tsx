
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageType = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Récupérer la langue sauvegardée dans localStorage ou utiliser 'fr' par défaut
  const [language, setLanguage] = useState<LanguageType>(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    return (savedLanguage as LanguageType) || 'fr';
  });

  const handleSetLanguage = (lang: LanguageType) => {
    console.log(`Changing language to: ${lang}`);
    setLanguage(lang);
    document.documentElement.lang = lang;
    localStorage.setItem('preferred-language', lang);
  };

  // Effet pour initialiser la langue du document au chargement
  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
