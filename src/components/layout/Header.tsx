
'use client';

import { useAppContext, Language } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HeartPulse, TriangleAlert, Languages, ChevronDown } from 'lucide-react';
import { EmergencyModal } from './EmergencyModal';
import Link from 'next/link';

export function Header() {
  const { language, setLanguage, setEmergencyModalOpen } = useAppContext();
  const t = translations[language];

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'krio' : 'en';
    setLanguage(newLang);
  }

  return (
    <>
      <header className="bg-gradient-to-r from-primary to-accent shadow-md print:hidden">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/main" className="flex items-center space-x-2">
            <HeartPulse className="h-7 w-7 text-white" />
            <h1 className="text-xl font-bold text-white md:text-2xl">{t.header.title}</h1>
          </Link>
          <div className="flex items-center space-x-2 md:space-x-4">
             <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-white/90 text-sm font-medium text-primary transition hover:bg-white hover:scale-105"
                onClick={toggleLanguage}
              >
                <Languages className="mr-1 h-4 w-4" />
                <span>{language === 'en' ? t.header.krio : t.header.english}</span>
              </Button>

            <Button
              onClick={() => setEmergencyModalOpen(true)}
              variant="destructive"
              size="sm"
              className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700 animate-shake"
            >
              <TriangleAlert className="mr-1 h-4 w-4" />
              {t.header.emergency}
            </Button>
          </div>
        </div>
      </header>
      <EmergencyModal />
    </>
  );
}
