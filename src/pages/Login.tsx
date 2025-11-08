import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ['Anmelden', 'Přihlásit', 'Login'];

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 30 : 100;
    const pauseTime = 1500;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setDisplayText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }, isDeleting ? typingSpeed : charIndex === currentWord.length ? pauseTime : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

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
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* M1-style background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-md px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-3 font-mono">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="?"
              className="h-48 text-center text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary transition-all duration-300"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg transition-all duration-300 rounded-lg flex items-center justify-center"
          >
            <ArrowRight className="w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
