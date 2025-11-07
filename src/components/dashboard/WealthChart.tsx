import { useMemo, useState, useEffect } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Asset } from '@/contexts/ProfileContext';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WealthChartProps {
  assets: Asset[];
}

const COLORS = [
  'hsl(185, 90%, 60%)',   // Bright teal
  'hsl(220, 75%, 50%)',   // Deep blue
  'hsl(175, 85%, 45%)',   // Turquoise
  'hsl(200, 70%, 55%)',   // Sky blue
  'hsl(165, 80%, 40%)',   // Dark teal
  'hsl(210, 85%, 48%)',   // Ocean blue
  'hsl(190, 95%, 65%)',   // Light cyan
  'hsl(215, 70%, 42%)',   // Navy blue
  'hsl(180, 75%, 52%)',   // Aqua
  'hsl(205, 80%, 58%)',   // Bright blue
  'hsl(170, 70%, 38%)',   // Deep aqua
  'hsl(195, 85%, 50%)',   // Caribbean blue
];

const WealthChart = ({ assets }: WealthChartProps) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currency, setCurrency] = useState<'CZK' | 'EUR'>('CZK');
  const [exchangeRate, setExchangeRate] = useState(24.34);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await response.json();
        if (data.rates?.CZK) {
          setExchangeRate(data.rates.CZK);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);

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

  const displayValue = useMemo(() => {
    if (currency === 'EUR') {
      return Math.round(totalWealth / exchangeRate);
    }
    return totalWealth;
  }, [currency, totalWealth, exchangeRate]);

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 20}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side - Legend */}
        <div className="flex flex-col justify-center space-y-4 w-full md:w-[30%]">
          {dataWithPercentages.map((item, index) => (
            <div 
              key={item.name} 
              className="flex items-center gap-1 text-base cursor-pointer transition-all duration-300 hover:opacity-80"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 transition-transform duration-300"
                style={{ 
                  backgroundColor: COLORS[index % COLORS.length],
                  transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)'
                }}
              />
              <span className="text-foreground flex-1">{item.name}</span>
              <span className="text-primary font-medium">{item.percentage}%</span>
            </div>
          ))}
        </div>

        {/* Right side - Chart */}
        <div className="relative w-full md:w-[70%]">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dataWithPercentages}
                cx="50%"
                cy="50%"
                innerRadius={120}
                outerRadius={180}
                paddingAngle={5}
                dataKey="value"
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {dataWithPercentages.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all duration-300 cursor-pointer"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <div className="text-center">
              <div className="text-4xl font-light text-primary">
                {formatNumber(displayValue)}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  {currency}
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-card border-border/50">
                  <DropdownMenuItem 
                    onClick={() => setCurrency('CZK')} 
                    className={currency === 'CZK' ? 'bg-primary/10 text-primary' : ''}
                  >
                    CZK
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setCurrency('EUR')} 
                    className={currency === 'EUR' ? 'bg-primary/10 text-primary' : ''}
                  >
                    EUR
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WealthChart;
