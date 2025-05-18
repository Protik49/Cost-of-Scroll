import React from 'react';
import { Car, Zap, Droplet, PlaneTakeoff, TreeDeciduous, Lightbulb } from 'lucide-react';

type ComparisonItemProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
  delay: number;
};

const ComparisonItem: React.FC<ComparisonItemProps> = ({ icon, title, value, color, delay }) => {
  return (
    <div 
      className={`group relative overflow-hidden ${color} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 opacity-5 bg-white"></div>
      <div className="p-6 flex items-center space-x-4">
        <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm">
          {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-white" })}
        </div>
        <div className="text-white">
          <h4 className="font-semibold text-xl">{title}</h4>
          <p className="text-lg opacity-95">{value}</p>
        </div>
      </div>
    </div>
  );
};

type ComparisonsProps = {
  annualEmissions: number;
};

export const Comparisons: React.FC<ComparisonsProps> = ({ annualEmissions }) => {
  const drivingDistance = (annualEmissions / 0.192).toFixed(1);
  const phoneCharges = Math.round(annualEmissions * 1000 / 50);
  const showerMinutes = Math.round(annualEmissions * 1000 / 500);
  const flightPercentage = ((annualEmissions / 250) * 100).toFixed(1);
  const treeDays = Math.round(annualEmissions * 1000 / 27);
  const lightbulbHours = Math.round(annualEmissions * 1000 / 60);
  
  const comparisons = [
    {
      icon: <Car />,
      title: "Road Trip Distance",
      value: `${drivingDistance} km by car`,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      delay: 100
    },
    {
      icon: <Zap />,
      title: "Phone Power",
      value: `${phoneCharges} full charges`,
      color: "bg-gradient-to-br from-yellow-600 to-yellow-700",
      delay: 200
    },
    {
      icon: <Droplet />,
      title: "Shower Time",
      value: `${showerMinutes} min hot shower`,
      color: "bg-gradient-to-br from-teal-600 to-teal-700",
      delay: 300
    },
    {
      icon: <PlaneTakeoff />,
      title: "Flight Impact",
      value: `${flightPercentage}% of 1h flight`,
      color: "bg-gradient-to-br from-purple-600 to-purple-700",
      delay: 400
    },
    {
      icon: <TreeDeciduous />,
      title: "Tree Power",
      value: `${treeDays} days of absorption`,
      color: "bg-gradient-to-br from-green-600 to-green-700",
      delay: 500
    },
    {
      icon: <Lightbulb />,
      title: "Light Energy",
      value: `${lightbulbHours}h bulb usage`,
      color: "bg-gradient-to-br from-orange-600 to-orange-700",
      delay: 600
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Your Digital Impact Visualized
        </h3>
        <p className="text-lg text-gray-600">
          Here's how your <span className='font-medium'>annual</span> digital carbon footprint compares to everyday activities
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisons.map((comparison, index) => (
          <ComparisonItem 
            key={index}
            icon={comparison.icon}
            title={comparison.title}
            value={comparison.value}
            color={comparison.color}
            delay={comparison.delay}
          />
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-100">
        <p className="text-sm text-gray-700 leading-relaxed">
          These visualizations help you understand your digital carbon footprint in terms of familiar activities. 
          While individual impacts may seem small, our collective digital actions add up to make a significant environmental difference.
        </p>
      </div>
    </div>
  );
};