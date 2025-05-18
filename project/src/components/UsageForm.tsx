import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  TrendingUp,
  Globe
} from 'lucide-react';
import { regions } from '../data/regions';

type PlatformInputProps = {
  name: string;
  icon: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
};

const PlatformInput: React.FC<PlatformInputProps> = ({ name, icon, value, onChange }) => {
  const displayName = name === 'Twitter' ? 'X' : name;
  
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor={`input-${name}`} className="block text-sm font-medium text-gray-700">
            {displayName}
          </label>
          <span className="text-sm text-gray-600 font-medium">{value} hrs/day</span>
        </div>
        <input
          id={`input-${name}`}
          type="range"
          min="0"
          max="24"
          step="0.5"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0h</span>
          <span>12h</span>
          <span>24h</span>
        </div>
      </div>
    </div>
  );
};

type UsageFormProps = {
  onSubmit: (data: Record<string, any>) => void;
};

export const UsageForm: React.FC<UsageFormProps> = ({ onSubmit }) => {
  const [instagram, setInstagram] = useState(1);
  const [facebook, setFacebook] = useState(1);
  const [twitter, setTwitter] = useState(0.5);
  const [youtube, setYoutube] = useState(2);
  const [tiktok, setTiktok] = useState(1);
  const [region, setRegion] = useState('global');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      platforms: {
        instagram,
        facebook,
        twitter,
        youtube,
        tiktok
      },
      region
    });
  };

  // Group regions by continent
  const groupedRegions = regions.reduce((acc, region) => {
    const getContinent = (id: string) => {
      if (id === 'global' || id === 'eu') return 'Global & Unions';
      if (['uk', 'france', 'germany', 'italy', 'spain', 'sweden', 'norway', 'finland', 'denmark', 'netherlands', 'belgium', 'switzerland', 'austria', 'poland', 'ireland', 'portugal', 'greece'].includes(id)) return 'Europe';
      if (['us', 'canada', 'mexico'].includes(id)) return 'North America';
      if (['brazil', 'argentina', 'chile', 'colombia', 'peru'].includes(id)) return 'South America';
      if (['china', 'japan', 'india', 'south_korea', 'indonesia', 'vietnam', 'thailand', 'malaysia', 'singapore', 'taiwan'].includes(id)) return 'Asia';
      if (['australia', 'new_zealand'].includes(id)) return 'Oceania';
      if (['south_africa', 'egypt', 'nigeria', 'kenya', 'morocco'].includes(id)) return 'Africa';
      return 'Other';
    };

    const continent = getContinent(region.id);
    if (!acc[continent]) acc[continent] = [];
    acc[continent].push(region);
    return acc;
  }, {} as Record<string, typeof regions>);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Social Media Usage
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <PlatformInput 
            name="Instagram" 
            icon={<Instagram className="h-6 w-6 text-pink-600" />} 
            value={instagram} 
            onChange={setInstagram}
          />
          <PlatformInput 
            name="Facebook" 
            icon={<Facebook className="h-6 w-6 text-blue-600" />} 
            value={facebook} 
            onChange={setFacebook}
          />
          <PlatformInput 
            name="Twitter" 
            icon={<Twitter className="h-6 w-6 text-blue-400" />} 
            value={twitter} 
            onChange={setTwitter}
          />
          <PlatformInput 
            name="YouTube" 
            icon={<Youtube className="h-6 w-6 text-red-600" />} 
            value={youtube} 
            onChange={setYoutube}
          />
          <PlatformInput 
            name="TikTok" 
            icon={<div className="h-6 w-6 flex items-center justify-center bg-black text-white rounded-full font-bold text-xs">TT</div>} 
            value={tiktok} 
            onChange={setTiktok}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-green-600" />
          Your Location
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Select your location to calculate emissions based on your region's electricity carbon intensity.
        </p>
        <div className="max-w-md">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          >
            {Object.entries(groupedRegions).map(([continent, regions]) => (
              <optgroup key={continent} label={continent}>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.carbonIntensity} g CO₂/kWh)
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          Calculate My Footprint
        </button>
      </div>
    </form>
  );
};