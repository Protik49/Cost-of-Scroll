import React, { useEffect, useState } from 'react';
import { Recommendations } from './Recommendations';
import { EmissionsChart } from './EmissionsChart';
import { Comparisons } from './Comparisons';
import { EmissionsData } from '../types';

type ResultsProps = {
  data: EmissionsData;
};

export const Results: React.FC<ResultsProps> = ({ data }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 py-6 px-8 text-white">
          <h2 className="text-2xl font-bold">Your Digital Carbon Footprint Results</h2>
          <p className="text-green-50">Based on your social media usage patterns</p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div 
            className={`transform transition-all duration-500 ease-in-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} 
            style={{ transitionDelay: '0ms' }}
          >
            <Comparisons annualEmissions={data.annual.total} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className={`bg-green-50 rounded-lg p-6 shadow-sm transform transition-all duration-500 ease-in-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} 
              style={{ transitionDelay: '100ms' }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-3">Daily Emissions</h3>
              <p className="text-3xl font-bold text-green-600">{data.daily.total.toFixed(2)} g</p>
              <p className="text-sm text-gray-500 mt-1">CO₂ equivalent per day</p>
            </div>
            
            <div 
              className={`bg-blue-50 rounded-lg p-6 shadow-sm transform transition-all duration-500 ease-in-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} 
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-3">Annual Emissions</h3>
              <p className="text-3xl font-bold text-blue-600">{data.annual.total.toFixed(2)} kg</p>
              <p className="text-sm text-gray-500 mt-1">CO₂ equivalent per year</p>
            </div>
            
            <div 
              className={`bg-purple-50 rounded-lg p-6 shadow-sm transform transition-all duration-500 ease-in-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} 
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-3">Your Region</h3>
              <p className="text-3xl font-bold text-purple-600">{data.region.carbonIntensity} g</p>
              <p className="text-sm text-gray-500 mt-1"> CO₂/kWh in {data.region.name}</p>
            </div>
          </div>

          <div 
            className={`transform transition-all duration-500 ease-in-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} 
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Emissions by Platform</h3>
            <EmissionsChart data={data} />
          </div>
        </div>
      </div>

      <div 
        className={`transform transition-all duration-500 ease-in-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} 
        style={{ transitionDelay: '500ms' }}
      >
        <Recommendations data={data} />
      </div>
    </div>
  );
};