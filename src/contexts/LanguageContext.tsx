import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en' | 'cz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  de: {
    login: 'Anmelden',
    password: 'Passwort',
    enterPassword: 'Passwort eingeben',
    invalidPassword: 'Ungültiges Passwort',
    assetOverview: 'Vermögensübersicht',
    totalAssets: 'Gesamtvermögen',
    welcome: 'Willkommen',
    asset: 'Anlage',
    shortCode: 'Kürzel',
    date: 'Stand',
    amountCZK: 'Anzahl in CZK',
    amountEUR: 'Anzahl in EUR',
    estimatedValue: 'Schätzwert',
    assetValue: 'Vermögenswert',
    cash: 'Bargeld',
    realEstate: 'Immobilie (Tschechien)',
    possibleBuilding: 'Mögliches Bauland',
    addProfile: 'Profil hinzufügen',
    profiles: 'Profile',
  },
  en: {
    login: 'Login',
    password: 'Password',
    enterPassword: 'Enter password',
    invalidPassword: 'Invalid password',
    assetOverview: 'Asset Overview',
    totalAssets: 'Total Assets',
    welcome: 'Welcome',
    asset: 'Asset',
    shortCode: 'Code',
    date: 'Date',
    amountCZK: 'Amount in CZK',
    amountEUR: 'Amount in EUR',
    estimatedValue: 'Estimated Value',
    assetValue: 'Asset Value',
    cash: 'Cash',
    realEstate: 'Real Estate (Czech Rep.)',
    possibleBuilding: 'Possible Building Land',
    addProfile: 'Add Profile',
    profiles: 'Profiles',
  },
  cz: {
    login: 'Přihlásit se',
    password: 'Heslo',
    enterPassword: 'Zadat heslo',
    invalidPassword: 'Neplatné heslo',
    assetOverview: 'Přehled majetku',
    totalAssets: 'Celkový majetek',
    welcome: 'Vítejte',
    asset: 'Aktivum',
    shortCode: 'Kód',
    date: 'Datum',
    amountCZK: 'Částka v CZK',
    amountEUR: 'Částka v EUR',
    estimatedValue: 'Odhadovaná hodnota',
    assetValue: 'Hodnota majetku',
    cash: 'Hotovost',
    realEstate: 'Nemovitost (Česko)',
    possibleBuilding: 'Možný stavební pozemek',
    addProfile: 'Přidat profil',
    profiles: 'Profily',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.de] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
