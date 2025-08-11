
'use client';

import * as React from 'react';
import { Home as HomeIcon, ClipboardList, BookText, Hospital } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HomeTab } from '@/components/tabs/HomeTab';
import { HealthTopicsTab } from '@/components/tabs/HealthTopicsTab';
import { HealthBlogTab } from '@/components/tabs/HealthBlogTab';
import { FindClinicsTab } from '@/components/tabs/FindClinicsTab';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState('home');
  const isMobile = useIsMobile();
  const { language } = useAppContext();
  const t = translations[language];

  const TABS = [
    { value: 'home', label: t.tabs.home, icon: <HomeIcon className="mr-2 h-5 w-5" /> },
    { value: 'symptoms', label: t.tabs.healthCheck, icon: <ClipboardList className="mr-2 h-5 w-5" /> },
    { value: 'blog', label: t.tabs.blog, icon: <BookText className="mr-2 h-5 w-5" /> },
    { value: 'clinics', label: t.tabs.clinics, icon: <Hospital className="mr-2 h-5 w-5" /> },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <TabsList className="h-auto bg-transparent p-0">
              <div className="flex w-full overflow-x-auto">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="whitespace-nowrap rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-gray-600 data-[state=active]:border-primary data-[state=active]:bg-green-50 data-[state=active]:text-primary data-[state=active]:shadow-none"
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </div>
        </div>

        <div className="flex-grow bg-background">
          <div className="container mx-auto px-4 py-6">
            <TabsContent value="home">
              <HomeTab setActiveTab={setActiveTab} />
            </TabsContent>
            <TabsContent value="symptoms">
              <HealthTopicsTab />
            </TabsContent>
            <TabsContent value="blog">
              <HealthBlogTab />
            </TabsContent>
            <TabsContent value="clinics">
              <FindClinicsTab />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
