import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from 'lucide-react';
import type { Profile } from '@/contexts/ProfileContext';

interface ProfileSectionProps {
  profile: Profile;
}

const ProfileSection = ({ profile }: ProfileSectionProps) => {
  const { t } = useLanguage();

  return (
    <Card className="p-4 sm:p-6 bg-card border-border flex flex-col items-center justify-center h-full">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mb-3 sm:mb-4 border border-border">
        {profile.photo ? (
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover rounded-full" />
        ) : (
          <User className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
        )}
      </div>
      
      <h2 className="text-base sm:text-lg font-light text-foreground text-center">
        {t('welcome')},
      </h2>
      <p className="text-lg sm:text-xl font-medium text-foreground text-center mt-1">
        {profile.name}
      </p>
    </Card>
  );
};

export default ProfileSection;
