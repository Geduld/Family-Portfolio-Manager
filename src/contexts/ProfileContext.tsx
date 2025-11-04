import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Asset {
  name: string;
  date: string;
  amountCZK: string;
  amountEUR: string;
  notes: string;
  assetValue: string;
}

export interface TableHeaders {
  asset: string;
  date: string;
  amountCZK: string;
  amountEUR: string;
  notes: string;
  assetValue: string;
}

export interface Profile {
  id: string;
  name: string;
  photo?: string;
  assets: Asset[];
  tableHeaders?: TableHeaders;
}

interface ProfileContextType {
  profiles: Profile[];
  currentProfile: Profile | null;
  setCurrentProfile: (profile: Profile) => void;
  addProfile: (profile: Profile) => void;
  updateAsset: (assetIndex: number, updatedAsset: Asset) => void;
  addAsset: (asset: Asset) => void;
  deleteAsset: (assetIndex: number) => void;
  updateTableHeaders: (headers: TableHeaders) => void;
}

const defaultProfiles: Profile[] = [
  {
    id: '1',
    name: 'John Smith',
    assets: [
      {
        name: 'Cash Holdings',
        date: '01.01.2025',
        amountCZK: '1.500.000 CZK',
        amountEUR: '61,728.39€',
        notes: 'X',
        assetValue: '1.500.000 CZK',
      },
      {
        name: 'Savings Account',
        date: '01.01.2025',
        amountCZK: '850.000 CZK',
        amountEUR: '34,979.42€',
        notes: '100% Ownership',
        assetValue: '850.000 CZK',
      },
      {
        name: 'Investment Land',
        date: '01.01.2025',
        amountCZK: 'X',
        amountEUR: 'X',
        notes: '3.200.000 CZK',
        assetValue: '0 CZK',
      },
      {
        name: 'Real Estate Property',
        date: '01.01.2025',
        amountCZK: 'X',
        amountEUR: '123,456.79€ (40%)',
        notes: '40% of 7.5M',
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
        date: '01.01.2025',
        amountCZK: '950.000 CZK',
        amountEUR: '39,094.65€',
        notes: 'X',
        assetValue: '950.000 CZK',
      },
      {
        name: 'Investment Portfolio',
        date: '01.01.2025',
        amountCZK: '2.100.000 CZK',
        amountEUR: '86,419.75€',
        notes: '100% Ownership',
        assetValue: '2.100.000 CZK',
      },
      {
        name: 'Commercial Property',
        date: '01.01.2025',
        amountCZK: 'X',
        amountEUR: '205,761.32€ (50%)',
        notes: '50% of 10M',
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

  const updateAsset = (assetIndex: number, updatedAsset: Asset) => {
    if (!currentProfile) return;
    
    const updatedAssets = [...currentProfile.assets];
    updatedAssets[assetIndex] = updatedAsset;
    
    const updatedProfile = { ...currentProfile, assets: updatedAssets };
    setCurrentProfile(updatedProfile);
    
    setProfiles(profiles.map(p => p.id === currentProfile.id ? updatedProfile : p));
  };

  const addAsset = (asset: Asset) => {
    if (!currentProfile) return;
    
    const updatedProfile = { 
      ...currentProfile, 
      assets: [...currentProfile.assets, asset] 
    };
    setCurrentProfile(updatedProfile);
    
    setProfiles(profiles.map(p => p.id === currentProfile.id ? updatedProfile : p));
  };

  const deleteAsset = (assetIndex: number) => {
    if (!currentProfile) return;
    
    const updatedAssets = currentProfile.assets.filter((_, index) => index !== assetIndex);
    const updatedProfile = { ...currentProfile, assets: updatedAssets };
    setCurrentProfile(updatedProfile);
    
    setProfiles(profiles.map(p => p.id === currentProfile.id ? updatedProfile : p));
  };

  const updateTableHeaders = (headers: TableHeaders) => {
    if (!currentProfile) return;
    
    const updatedProfile = { ...currentProfile, tableHeaders: headers };
    setCurrentProfile(updatedProfile);
    
    setProfiles(profiles.map(p => p.id === currentProfile.id ? updatedProfile : p));
  };

  return (
    <ProfileContext.Provider value={{ 
      profiles, 
      currentProfile, 
      setCurrentProfile, 
      addProfile,
      updateAsset,
      addAsset,
      deleteAsset,
      updateTableHeaders
    }}>
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
