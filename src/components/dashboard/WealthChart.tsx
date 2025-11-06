import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Asset } from '@/contexts/ProfileContext';

interface WealthChartProps {
  assets: Asset[];
}

const COLORS = [
  '#79a7b8',  // muted teal
  '#355486',  // deep navy blue
  '#a9bed5',  // soft blue-gray
  '#edf1f6',  // light gray-blue
  '#2c81a2',  // medium blue
  '#79a7b8',  // muted teal (repeat)
  '#355486',  // deep navy blue (repeat)
  '#a9bed5',  // soft blue-gray (repeat)
  '#edf1f6',  // light gray-blue (repeat)
  '#2c81a2',  // medium blue (repeat)
  '#79a7b8',  // muted teal (repeat)
  '#355486',  // deep navy blue (repeat)
  '#a9bed5',  // soft blue-gray (repeat)
  '#edf1f6',  // light gray-blue (repeat)
  '#2c81a2',  // medium blue (repeat)
];

const WealthChart = ({ assets }: WealthChartProps) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
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
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-4xl font-light text-primary">
                {formatNumber(totalWealth)}
              </div>
              <div className="text-sm text-muted-foreground">CZK</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WealthChart;
