import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/contexts/ProfileContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Users, Plus, Trash2 } from 'lucide-react';
import AddProfileDialog from './AddProfileDialog';

const DashboardHeader = () => {
  const { language, setLanguage, t } = useLanguage();
  const { profiles, currentProfile, setCurrentProfile, deleteProfile } = useProfile();
  const [exchangeRate, setExchangeRate] = useState(24.34);
  const [rateUpdateTime, setRateUpdateTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddProfile, setShowAddProfile] = useState(false);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await response.json();
        if (data.rates?.CZK) {
          setExchangeRate(data.rates.CZK);
          setRateUpdateTime(new Date());
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      }
    };

    fetchExchangeRate();
    const rateInterval = setInterval(fetchExchangeRate, 3600000); // Update every hour

    return () => clearInterval(rateInterval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-foreground">
            {t('assetOverview')}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 w-full lg:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentProfile?.name}</span>
                  <span className="sm:hidden">{currentProfile?.name.split(' ')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {profiles.map((profile) => (
                  <DropdownMenuItem
                    key={profile.id}
                    className={`justify-between ${currentProfile?.id === profile.id ? 'bg-accent' : ''}`}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span
                      onClick={() => setCurrentProfile(profile)}
                      className="flex-1 cursor-pointer"
                    >
                      {profile.name}
                    </span>
                    {profiles.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProfile(profile.id);
                        }}
                        className="ml-2 p-1 hover:bg-destructive/10 rounded"
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </button>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowAddProfile(true)}
                  className="text-primary font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('de')}>Deutsch</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('cz')}>Čeština</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="text-left sm:text-right space-y-1 w-full lg:w-auto">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                EURO : CZK
                <span className="ml-2 sm:ml-3 text-foreground">1€ : {exchangeRate.toFixed(2)}CZK</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Stand: <span className="text-foreground">{formatDateTime(rateUpdateTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddProfileDialog open={showAddProfile} onOpenChange={setShowAddProfile} />
    </header>
  );
};

export default DashboardHeader;
