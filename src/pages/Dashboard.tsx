import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WealthChart from '@/components/dashboard/WealthChart';
import AssetsTable from '@/components/dashboard/AssetsTable';
import { useProfile } from '@/contexts/ProfileContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentProfile } = useProfile();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('authenticated');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  if (!currentProfile) return null;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
        <WealthChart assets={currentProfile.assets} />
        <AssetsTable assets={currentProfile.assets} />
      </main>
    </div>
  );
};

export default Dashboard;
