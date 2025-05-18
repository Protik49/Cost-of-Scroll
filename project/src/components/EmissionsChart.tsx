import React, { useEffect, useRef } from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { EmissionsData } from '../types';

const COLORS = {
  instagram: '#E1306C',
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  youtube: '#FF0000',
  tiktok: '#000000',
};

const PLATFORM_ICONS = {
  instagram: <Instagram className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  tiktok: <span className="text-xs font-bold">TT</span>,
};

type EmissionsChartProps = {
  data: EmissionsData;
};

export const EmissionsChart: React.FC<EmissionsChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Calculate the platform percentages
  const platforms = Object.keys(data.daily.platforms);
  const totalEmissions = data.daily.total;
  
  const platformData = platforms.map(platform => ({
    name: platform === 'twitter' ? 'X' : platform,
    value: data.daily.platforms[platform],
    percentage: (data.daily.platforms[platform] / totalEmissions) * 100,
    color: COLORS[platform as keyof typeof COLORS],
    icon: PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS],
  }));

  // Sort platforms by emissions (highest first)
  platformData.sort((a, b) => b.value - a.value);

  // Bar chart animation
  useEffect(() => {
    const bars = document.querySelectorAll('.emissions-bar');
    
    bars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('w-full');
      }, index * 100);
    });
  }, []);

  return (
    <div ref={chartRef} className="space-y-6">
      {/* Platform breakdown */}
      <div className="space-y-4">
        {platformData.map(platform => (
          <div key={platform.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: platform.color }}
                >
                  {platform.icon}
                </div>
                <span className="text-gray-700 capitalize">{platform.name}</span>
              </div>
              <div className="text-right">
                <span className="font-medium">{platform.value.toFixed(2)} g CO₂e/day</span>
                <span className="text-gray-500 text-sm ml-2">({platform.percentage.toFixed(1)}%)</span>
              </div>
            </div>
            
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
              <div 
                className="emissions-bar h-full w-0 transition-all duration-1000 rounded-full absolute top-0 left-0"
                style={{ 
                  backgroundColor: platform.color,
                  width: '0%',
                  transitionProperty: 'width',
                  maxWidth: `${platform.percentage}%` 
                }}
              ></div>
              <div 
                className="h-full opacity-20"
                style={{ 
                  width: `${platform.percentage}%`,
                  backgroundColor: platform.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Emissions calculations are based on average energy consumption per platform, 
          data transfer rates, and the carbon intensity of electricity in your region 
          ({data.region.name}: {data.region.carbonIntensity} g CO₂/kWh).
        </p>
      </div>
    </div>
  );
};