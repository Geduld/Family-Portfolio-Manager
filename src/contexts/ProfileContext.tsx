import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Asset {
  name: string;
  shortCode: string;
  date: string;
  amountCZK: string;
  amountEUR: string;
  estimatedValue: string;
  assetValue: string;
}

export interface Profile {
  id: string;
  name: string;
  photo?: string;
  assets: Asset[];
}

interface ProfileContextType {
  profiles: Profile[];
  currentProfile: Profile | null;
  setCurrentProfile: (profile: Profile) => void;
  addProfile: (profile: Profile) => void;
}

const defaultProfiles: Profile[] = [
  {
    id: '1',
    name: 'John Smith',
    assets: [
      {
        name: 'Cash Holdings',
        shortCode: 'CASH',
        date: '01.01.2025',
        amountCZK: '1.500.000 CZK',
        amountEUR: '61,728.39€',
        estimatedValue: 'X',
        assetValue: '1.500.000 CZK',
      },
      {
        name: 'Savings Account',
        shortCode: 'SAV',
        date: '01.01.2025',
        amountCZK: '850.000 CZK',
        amountEUR: '34,979.42€',
        estimatedValue: '100% Ownership',
        assetValue: '850.000 CZK',
      },
      {
        name: 'Investment Land',
        shortCode: 'LAND',
        date: '01.01.2025',
        amountCZK: 'X',
        amountEUR: 'X',
        estimatedValue: '3.200.000 CZK',
        assetValue: '0 CZK',
      },
      {
        name: 'Real Estate Property',
        shortCode: 'PROP',
        date: '01.01.2025',
        amountCZK: 'X',
        amountEUR: '123,456.79€ (40%)',
        estimatedValue: '40% of 7.5M',
        assetValue: '3.000.000 CZK',
      },
    ],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    assets: [
      {
        name: 'Cash Holdings',
        shortCode: 'CASH',
        date: '01.01.2025',
        amountCZK: '950.000 CZK',
        amountEUR: '39,094.65€',
        estimatedValue: 'X',
        assetValue: '950.000 CZK',
      },
      {
        name: 'Investment Portfolio',
        shortCode: 'INV',
        date: '01.01.2025',
        amountCZK: '2.100.000 CZK',
        amountEUR: '86,419.75€',
        estimatedValue: '100% Ownership',
        assetValue: '2.100.000 CZK',
      },
      {
        name: 'Commercial Property',
        shortCode: 'COMP',
        date: '01.01.2025',
        amountCZK: 'X',
        amountEUR: '205,761.32€ (50%)',
        estimatedValue: '50% of 10M',
        assetValue: '5.000.000 CZK',
      },
    ],
  },
];

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>(defaultProfiles);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(defaultProfiles[0]);

  const addProfile = (profile: Profile) => {
    setProfiles([...profiles, profile]);
  };

  return (
    <ProfileContext.Provider value={{ profiles, currentProfile, setCurrentProfile, addProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
