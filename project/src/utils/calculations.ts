import { regions } from '../data/regions';
import { EmissionsData } from '../types';

// Updated energy consumption values based on 2024 research data
// Values in kWh per hour of usage including data center, network, and device energy
const PLATFORM_ENERGY = {
  instagram: 0.018,  // Mixed media, stories, reels
  facebook: 0.022,   // Rich content, video autoplay
  twitter: 0.012,    // Text-heavy, some media
  youtube: 0.108,    // HD video streaming
  tiktok: 0.085,     // Video-focused, continuous streaming
};

// Network transmission factors
const NETWORK_FACTORS = {
  dataCenter: 0.85,  // PUE (Power Usage Effectiveness)
  network: 0.75,     // Network efficiency factor
  device: 0.90,      // Device energy efficiency
};

export function calculateEmissions(formData: Record<string, any>): EmissionsData {
  const { platforms, region: regionId } = formData;
  const region = regions.find(r => r.id === regionId) || regions[0];
  
  const dailyEmissions: Record<string, number> = {};
  const annualEmissions: Record<string, number> = {};
  
  Object.entries(platforms).forEach(([platform, hours]) => {
    if (typeof hours === 'number' && hours > 0) {
      // Calculate total energy consumption with efficiency factors
      const baseEnergy = PLATFORM_ENERGY[platform as keyof typeof PLATFORM_ENERGY] * (hours as number);
      const totalEnergy = baseEnergy * NETWORK_FACTORS.dataCenter * 
                         NETWORK_FACTORS.network * NETWORK_FACTORS.device;
      
      // Convert to CO2 emissions (grams)
      dailyEmissions[platform] = totalEnergy * region.carbonIntensity;
      
      // Annual emissions in kg
      annualEmissions[platform] = (dailyEmissions[platform] * 365) / 1000;
    } else {
      dailyEmissions[platform] = 0;
      annualEmissions[platform] = 0;
    }
  });
  
  const dailyTotal = Object.values(dailyEmissions).reduce((sum, val) => sum + val, 0);
  const annualTotal = Object.values(annualEmissions).reduce((sum, val) => sum + val, 0);
  
  return {
    daily: {
      platforms: dailyEmissions,
      total: dailyTotal
    },
    annual: {
      platforms: annualEmissions,
      total: annualTotal
    },
    region,
    usage: platforms
  };
}