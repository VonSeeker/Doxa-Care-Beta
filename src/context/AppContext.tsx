'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'krio';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  isEmergencyModalOpen: boolean;
  setEmergencyModalOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setLanguage: (lang: Language) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isEmergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'krio' : 'en'));
  };

  const value = {
    language,
    toggleLanguage,
    setLanguage,
    isEmergencyModalOpen,
    setEmergencyModalOpen,
    activeTab,
    setActiveTab,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
