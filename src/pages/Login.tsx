import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, this would be handled by backend
    const correctPassword = 'wealth2025'; // This should be environment variable in production
    
    if (password === correctPassword) {
      sessionStorage.setItem('authenticated', 'true');
      navigate('/dashboard');
    } else {
      toast.error(t('invalidPassword'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-8">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('enterPassword')}
              className="h-14 text-center text-lg bg-card border-border focus:border-primary transition-all duration-300"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300"
          >
            {t('login')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
