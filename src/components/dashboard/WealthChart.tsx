import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Asset } from '@/contexts/ProfileContext';

interface WealthChartProps {
  assets: Asset[];
}

const COLORS = ['hsl(var(--wealth-gold))', 'hsl(var(--wealth-blue))', 'hsl(var(--wealth-green))', 'hsl(var(--wealth-brown))'];

const WealthChart = ({ assets }: WealthChartProps) => {
  const { t } = useLanguage();

  const chartData = useMemo(() => {
    const dataMap = new Map<string, number>();
    
    assets.forEach((asset) => {
      const value = parseInt(asset.assetValue.replace(/[^\d]/g, ''));
      if (value > 0) {
        const existing = dataMap.get(asset.name) || 0;
        dataMap.set(asset.name, existing + value);
      }
    });

    return Array.from(dataMap.entries()).map(([name, value]) => ({
      name,
      value,
      percentage: 0,
    }));
  }, [assets]);

  const totalWealth = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  // Calculate percentages
  const dataWithPercentages = useMemo(() => {
    return chartData.map((item) => ({
      ...item,
      percentage: ((item.value / totalWealth) * 100).toFixed(1),
    }));
  }, [chartData, totalWealth]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('de-DE');
  };

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-light mb-6 text-foreground">{t('totalAssets')}</h2>
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dataWithPercentages}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {dataWithPercentages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-light text-primary">
              {formatNumber(totalWealth)}
            </div>
            <div className="text-sm text-muted-foreground">CZK</div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {dataWithPercentages.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-foreground">{item.name}</span>
            </div>
            <span className="text-muted-foreground">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WealthChart;
