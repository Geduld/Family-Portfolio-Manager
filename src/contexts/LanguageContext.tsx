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
    amountCZK: 'CZK',
    amountEUR: 'EUR',
    estimatedValue: 'Schätzwert',
    assetValue: 'Wert',
    cash: 'Bargeld',
    realEstate: 'Immobilie (Tschechien)',
    possibleBuilding: 'Mögliches Bauland',
    addProfile: 'Profil hinzufügen',
    profiles: 'Profile',
    addMember: 'Mitglied hinzufügen',
    addRow: 'Zeile hinzufügen',
    actions: 'Löschen',
    notes: 'Notizen',
    asOf: 'Stand',
    addNewMember: 'Neues Mitglied hinzufügen',
    name: 'Name',
    enterMemberName: 'Namen des Mitglieds eingeben',
    cancel: 'Abbrechen',
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
    amountCZK: 'CZK',
    amountEUR: 'EUR',
    estimatedValue: 'Estimated Value',
    assetValue: 'Asset Value',
    cash: 'Cash',
    realEstate: 'Real Estate (Czech Rep.)',
    possibleBuilding: 'Possible Building Land',
    addProfile: 'Add Profile',
    profiles: 'Profiles',
    addMember: 'Add Member',
    addRow: 'Add Row',
    actions: 'Delete',
    notes: 'Notes',
    asOf: 'As of',
    addNewMember: 'Add New Member',
    name: 'Name',
    enterMemberName: 'Enter member name',
    cancel: 'Cancel',
  },
  cz: {
    login: 'Přihlásit se',
    password: 'Heslo',
    enterPassword: 'Zadat heslo',
    invalidPassword: 'Neplatné heslo',
    assetOverview: 'Přehled Majetku',
    totalAssets: 'Celkový majetek',
    welcome: 'Vítejte',
    asset: 'Majetek',
    shortCode: 'Kód',
    date: 'Datum',
    amountCZK: 'CZK',
    amountEUR: 'EUR',
    estimatedValue: 'Odhadovaná hodnota',
    assetValue: 'Hodnota',
    cash: 'Hotovost',
    realEstate: 'Nemovitost (Česko)',
    possibleBuilding: 'Možný stavební pozemek',
    addProfile: 'Přidat profil',
    profiles: 'Profily',
    addMember: 'Přidat člena',
    addRow: 'Přidat řádek',
    actions: 'Smazat',
    notes: 'Poznámky',
    asOf: 'K datu',
    addNewMember: 'Přidat nového člena',
    name: 'Jméno',
    enterMemberName: 'Zadejte jméno člena',
    cancel: 'Zrušit',
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
