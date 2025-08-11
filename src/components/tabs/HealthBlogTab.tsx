
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, LineChart, Newspaper, Globe, BookHeart, ListOrdered, HeartHandshake, Baby } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { useState, useEffect } from 'react';
import { fetchHealthStatistics } from '@/app/actions';
import type { GetHealthStatisticsOutput } from '@/ai/flows/get-health-statistics';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export function HealthBlogTab() {
  const { language } = useAppContext();
  const t = translations[language].resourcesTab;

  const [stats, setStats] = useState<GetHealthStatisticsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      const fetchedStats = await fetchHealthStatistics();
      setStats(fetchedStats);
      setIsLoading(false);
    };

    loadStats();
  }, []);

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-primary p-3">
        <CardTitle className="flex items-center font-bold text-primary-foreground">
          <BookText className="mr-2 h-5 w-5" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <section>
            <h3 className="mb-3 flex items-center border-b pb-2 text-lg font-semibold text-gray-800">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              {t.internationalTitle}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {t.internationalReports.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border p-3 transition-shadow hover:shadow-md hover:border-primary/50"
                >
                  <h4 className="font-medium text-blue-600">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center border-b pb-2 text-lg font-semibold text-gray-800">
              <BookHeart className="mr-2 h-5 w-5 text-primary" />
              {t.localTitle}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {t.localReports.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border p-3 transition-shadow hover:shadow-md hover:border-primary/50"
                >
                  <h4 className="font-medium text-blue-600">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </a>
              ))}
            </div>
          </section>
        
        <section>
          <h3 className="mb-3 flex items-center border-b pb-2 text-lg font-semibold text-gray-800">
            <LineChart className="mr-2 h-5 w-5 text-primary" />
            {t.statsTitle}
          </h3>
            {isLoading ? (
               <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
              </div>
            ) : (
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-medium text-blue-800 hover:no-underline">
                      <div className="flex items-center">
                        <ListOrdered className="mr-2 h-5 w-5 text-blue-600" />
                        {t.topDiseasesTitle}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-blue-50 p-4 rounded-b-lg">
                      <ol className="list-decimal list-inside text-sm space-y-2 text-blue-900">
                          {stats?.topDiseases.map((disease, i) => <li key={i}>{disease}</li>)}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-medium text-green-800 hover:no-underline">
                      <div className="flex items-center">
                         <HeartHandshake className="mr-2 h-5 w-5 text-green-600" />
                        {t.maternalHealthTitle}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-green-50 p-4 rounded-b-lg">
                      <ul className="list-disc list-inside text-sm space-y-2 text-green-900">
                          {stats?.maternalHealth.map((stat, i) => <li key={i}>{stat}</li>)}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-medium text-yellow-800 hover:no-underline">
                       <div className="flex items-center">
                        <Baby className="mr-2 h-5 w-5 text-yellow-600" />
                        {t.childHealthTitle}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-yellow-50 p-4 rounded-b-lg">
                       <ul className="list-disc list-inside text-sm space-y-2 text-yellow-900">
                          {stats?.childHealth.map((stat, i) => <li key={i}>{stat}</li>)}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            )}
          </section>

        <section>
          <h3 className="mb-3 flex items-center border-b pb-2 text-lg font-semibold text-gray-800">
            <Newspaper className="mr-2 h-5 w-5 text-primary" />
            {t.newsTitle}
          </h3>
          <div className="space-y-3">
            {t.news.map((news) => (
              <a
                key={news.title}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b pb-3 last:border-b-0 last:pb-0 hover:bg-gray-50 -m-2 p-2 rounded-lg"
              >
                <h4 className="font-medium">{news.title}</h4>
                <p className="text-sm text-gray-600">{news.description}</p>
              </a>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
