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
    <Card className="p-4 sm:p-6 bg-card border-border flex flex-col items-center justify-center">
      <div className="w-32 h-32 sm:w-48 sm:h-48 bg-muted rounded-lg flex items-center justify-center mb-4 sm:mb-6 border border-border">
        {profile.photo ? (
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <User className="w-16 h-16 sm:w-24 sm:h-24 text-muted-foreground" />
        )}
      </div>
      
      <h2 className="text-xl sm:text-2xl font-light text-foreground italic text-center">
        {t('welcome')}, {profile.name}.
      </h2>
    </Card>
  );
};

export default ProfileSection;
