import React from 'react';
import { EmissionsData } from '../types';
import { 
  Clock, 
  Wifi, 
  Settings, 
  Monitor, 
  DownloadCloud, 
  Moon,
  Smartphone,
  Power,
  Trash2,
  RefreshCw,
  Database,
  Zap
} from 'lucide-react';

type RecommendationItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  saving: string;
  delay: number;
};

const RecommendationItem: React.FC<RecommendationItemProps> = ({ icon, title, description, saving, delay }) => {
  return (
    <div 
      className="flex p-4 border rounded-lg bg-white hover:bg-green-50 transition-colors duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mr-4 mt-1">
        <div className="p-2 rounded-full bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <div className="text-xs font-medium text-green-700 bg-green-100 rounded-full px-2 py-1 inline-block">
          Potential saving: {saving}
        </div>
      </div>
    </div>
  );
};

type RecommendationsProps = {
  data: EmissionsData;
};

export const Recommendations: React.FC<RecommendationsProps> = ({ data }) => {
  const platforms = Object.entries(data.daily.platforms).sort((a, b) => b[1] - a[1]);
  const highestPlatform = platforms[0][0];
  const totalHours = Object.values(data.usage).reduce((sum, hours) => sum + hours, 0);
  const videoHeavy = data.daily.platforms.youtube > (data.daily.total * 0.4) || data.daily.platforms.tiktok > (data.daily.total * 0.3);
  const highUsage = totalHours > 6;
  const multiPlatform = Object.values(data.usage).filter(hours => hours > 1).length >= 3;
  
  // Generate personalized recommendations based on usage patterns
  const recommendations = [
    // High usage of specific platform
    highUsage && {
      icon: <Clock className="h-5 w-5" />,
      title: `Digital Detox from ${highestPlatform}`,
      description: `You spend significant time on ${highestPlatform}. Try a 30-minute daily reduction.`,
      saving: `${(data.daily.platforms[highestPlatform] * 0.25).toFixed(2)} g CO₂e daily`,
      delay: 100
    },

    // Video-heavy usage
    videoHeavy && {
      icon: <Settings className="h-5 w-5" />,
      title: "Optimize Video Quality",
      description: "Lower resolution for casual viewing, save HD for important content.",
      saving: `${(data.daily.platforms.youtube * 0.4).toFixed(2)} g CO₂e daily`,
      delay: 200
    },

    // Multi-platform user
    multiPlatform && {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Consolidate Social Media Time",
      description: "Use a social media dashboard to reduce multiple app launches.",
      saving: `${(data.daily.total * 0.15).toFixed(2)} g CO₂e daily`,
      delay: 300
    },

    // High daily usage
    totalHours > 8 && {
      icon: <Power className="h-5 w-5" />,
      title: "Screen Time Management",
      description: "Set daily limits using your device's screen time features.",
      saving: `${(data.daily.total * 0.3).toFixed(2)} g CO₂e daily`,
      delay: 400
    },

    // Cache management
    data.daily.total > 50 && {
      icon: <Database className="h-5 w-5" />,
      title: "Clear App Cache",
      description: "Regular cache cleaning reduces unnecessary data transfers.",
      saving: `${(data.daily.total * 0.1).toFixed(2)} g CO₂e daily`,
      delay: 500
    },

    // Network optimization
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Network Efficiency",
      description: data.daily.total > 100 
        ? "Switch to Wi-Fi, it's 4x more energy-efficient than mobile data."
        : "Use Wi-Fi when available for better energy efficiency.",
      saving: `${(data.daily.total * 0.2).toFixed(2)} g CO₂e daily`,
      delay: 600
    },

    // Content storage
    videoHeavy && {
      icon: <DownloadCloud className="h-5 w-5" />,
      title: "Download for Offline",
      description: "Save frequently watched content locally to reduce streaming.",
      saving: `${(data.daily.total * 0.25).toFixed(2)} g CO₂e daily`,
      delay: 700
    },

    // Display settings
    {
      icon: <Monitor className="h-5 w-5" />,
      title: "Display Optimization",
      description: "Enable dark mode and adjust brightness to save energy.",
      saving: `${(data.daily.total * 0.1).toFixed(2)} g CO₂e daily`,
      delay: 800
    }
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-500 py-6 px-8 text-white">
        <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
        <p className="text-green-50">
          Based on your {totalHours.toFixed(1)} hours of daily social media usage
        </p>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <RecommendationItem
              key={index}
              icon={rec.icon}
              title={rec.title}
              description={rec.description}
              saving={rec.saving}
              delay={rec.delay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};