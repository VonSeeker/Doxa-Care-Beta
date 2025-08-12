
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Hospital, Phone, MapPin, Loader2, Search } from 'lucide-react';
import { clinics, type Clinic } from '@/lib/data';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';

export function FindClinicsTab() {
  const { language } = useAppContext();
  const t = translations[language].clinicsTab;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredClinics, setFilteredClinics] = React.useState<Clinic[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredClinics(clinics);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const results = clinics.filter(
          (clinic) =>
            clinic.district.toLowerCase().includes(lowercasedQuery) ||
            clinic.name.toLowerCase().includes(lowercasedQuery) ||
            clinic.location.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredClinics(results);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-primary p-3">
        <CardTitle className="flex items-center font-bold text-primary-foreground">
          <Hospital className="mr-2 h-5 w-5" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSearch} className="mb-4">
          <label htmlFor="locationInput" className="mb-2 block text-gray-700">
            {t.locationLabel}
          </label>
          <div className="flex">
            <Input
              id="locationInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none border-gray-300 focus:ring-primary/50"
              placeholder={t.locationPlaceholder}
            />
            <Button type="submit" className="rounded-l-none" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.searchButton}
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="mr-3 h-8 w-8 animate-spin text-primary" />
              <span>{t.loading}</span>
            </div>
          ) : filteredClinics === null ? (
            <div className="py-8 text-center text-gray-500">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4">Please enter a location to find clinics near you.</p>
            </div>
          ) : filteredClinics.length > 0 ? (
            filteredClinics.map((clinic) => <ClinicCard key={clinic.name} clinic={clinic} t={t} />)
          ) : (
            <p className="py-4 text-center text-gray-600">{t.noResults}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const ClinicCard = ({ clinic, t }: { clinic: Clinic, t: any }) => (
  <div className="rounded-lg border p-3 transition-shadow hover:shadow-md">
    <div className="flex flex-col items-start justify-between sm:flex-row">
      <div>
        <h3 className="font-semibold text-gray-800">{clinic.name}</h3>
        <p className="text-sm text-gray-600">{clinic.type}</p>
      </div>
      {clinic.is24Hour && (
        <span className="mt-2 rounded bg-green-100 px-2 py-1 text-xs text-green-800 sm:mt-0">
          24-Hour
        </span>
      )}
    </div>
    <div className="mt-2 space-y-1 text-sm">
        <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-blue-500" />
            <span>{clinic.location}</span>
        </div>
        {clinic.phone && (
        <div className="flex items-center text-sm">
            <Phone className="mr-2 h-4 w-4 text-blue-500" />
            <a href={`tel:${clinic.phone}`} className="hover:underline">{clinic.phone}</a>
        </div>
        )}
    </div>
  </div>
);
