
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LanguageType = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>('fr');

  const handleSetLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    // Ici, vous pourriez également sauvegarder la préférence de langue dans localStorage
    localStorage.setItem('preferred-language', lang);
  };

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
