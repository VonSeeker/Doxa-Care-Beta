
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ChatInterface, { type ChatInterfaceHandles } from '@/components/chat/ChatInterface';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { Bell, Globe, type LucideIcon, Bug, Baby, Droplets, HeartPulse, Sparkles, MapPin } from 'lucide-react';
import * as React from 'react';

type HomeTabProps = {
  setActiveTab: (tab: string) => void;
};

export function HomeTab({ setActiveTab }: HomeTabProps) {
  const { language } = useAppContext();
  const t = translations[language].homeTab;
  const chatRef = React.useRef<ChatInterfaceHandles>(null);

  const handleQuickChatClick = (query: string) => {
    chatRef.current?.submitQuery(query);
  };

  const quickChats = [
    { key: 'malaria', icon: <Bug className="mr-1 h-4 w-4" />, query: "What are the symptoms of malaria?", className: "bg-green-100 text-green-800 hover:bg-green-200" },
    { key: 'pregnancy', icon: <Baby className="mr-1 h-4 w-4" />, query: "What are early signs of pregnancy?", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
    { key: 'diarrhea', icon: <Droplets className="mr-1 h-4 w-4" />, query: "How to treat diarrhea at home?", className: "bg-red-100 text-red-800 hover:bg-red-200" },
    { key: 'hypertension', icon: <HeartPulse className="mr-1 h-4 w-4" />, query: "What is hypertension and how to manage it?", className: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  ];

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-primary font-headline text-lg">{t.welcome.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
            <p className="text-gray-700 text-sm">{t.welcome.text}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-800 text-base flex items-center">
              <Bell className="text-yellow-600 mr-2 h-5 w-5" />
              {t.alerts.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              {t.alerts.text.map((alert, i) => <li key={i}>{alert}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800 text-base flex items-center">
              <MapPin className="text-blue-600 mr-2 h-5 w-5" />
              {t.quickChats.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {quickChats.map((chat) => (
                <Button 
                  key={chat.key}
                  variant="outline" 
                  className={chat.className}
                  onClick={() => handleQuickChatClick(t.quickChats[chat.key as keyof typeof t.quickChats])}
                >
                  {chat.icon}
                  {t.quickChats[chat.key as keyof typeof t.quickChats]}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ChatInterface ref={chatRef} />

      <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-yellow-50">
        <CardHeader className="bg-transparent p-4">
          <CardTitle className="text-primary font-bold flex items-center text-base">
            <Globe className="mr-2 h-5 w-5" />{t.cultural.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <h3 className="font-semibold text-gray-800 mb-3">{t.cultural.tipTitle}</h3>
            <div className="space-y-3">
              {t.cultural.tips.map((tip, i) => (
                <div key={i} className="flex items-start">
                   <Sparkles className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 shrink-0" />
                   <p className="text-gray-700 text-sm">{tip}</p>
                </div>
              ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
