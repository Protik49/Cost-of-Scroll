import React, { useState } from 'react';
import { UsageForm } from './UsageForm';
import { Results } from './Results';
import { calculateEmissions } from '../utils/calculations';
import { EmissionsData } from '../types';
import { Zap, Leaf, Globe, Server, Network, Clock } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [results, setResults] = useState<EmissionsData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (formData: Record<string, any>) => {
    const emissions = calculateEmissions(formData);
    setResults(emissions);
    
    setShowResults(true);
    
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="space-y-12">
      {/* Calculator Section */}
      <section id="calculator" className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-8 md:p-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Calculate the Cost of Your Scroll
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every scroll leaves a trace. Discover the environmental impact of your social media habits through our 
              data-driven calculator powered by real-world energy consumption metrics.
            </p>
          </div>
          
          <UsageForm onSubmit={handleCalculate} />
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section 
          id="results" 
          className={`transition-all duration-500 ease-in-out ${
            showResults ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          <Results data={results} />
        </section>
      )}

      {/* About Section */}
      <section id="about" className="relative overflow-hidden py-5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-blue-600/5 to-purple-600/5"></div>
        <div className="relative">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Understanding the Cost of Scroll
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Behind every like, share, and scroll lies a complex infrastructure that impacts our environment. 
                We're here to make that impact visible and actionable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-4 mx-auto">
                  <Server className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Center Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Modern data centers consume massive amounts of energy to keep your feed running. 
                  By 2025, they'll use 2.5% of global electricity.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-4 mx-auto">
                  <Network className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Network Efficiency</h3>
                <p className="text-gray-600 leading-relaxed">
                  Data travels thousands of miles through networks that are becoming more efficient. 
                  5G networks use 90% less energy per bit than 4G.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-4 mx-auto">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Time & Energy</h3>
                <p className="text-gray-600 leading-relaxed">
                  The average person spends 2.5 hours daily on social media, 
                  contributing to a significant collective energy footprint.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    We believe in making digital environmental impact visible and actionable. 
                    By understanding the cost of our online actions, we can make more conscious 
                    choices about our digital habits.
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm text-gray-600">Real-time data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-600">Actionable insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span className="text-sm text-gray-600">Global impact</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-lg transform rotate-3"></div>
                  <div className="relative bg-white rounded-lg p-6 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <p className="text-gray-600">42% renewable energy adoption</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="text-gray-600">90% network efficiency increase</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <p className="text-gray-600">1.55 average data center PUE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md p-8 md:p-10 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Latest Digital Impact Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4.1%</div>
              <p className="text-gray-600">Of global CO₂ emissions from digital tech by 2025</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.3B</div>
              <p className="text-gray-600">Daily active social media users worldwide</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">147min</div>
              <p className="text-gray-600">Average daily social media usage per person</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">8.9%</div>
              <p className="text-gray-600">Annual increase in digital carbon footprint</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Digital Sustainability Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center">Device Optimization</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600">Enable dark mode to reduce OLED screen energy by up to 83%</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600">Lower brightness reduces power consumption by 20%</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600">5G consumes 90% less energy per bit than 4G</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center">Network Usage</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-600">Wi-Fi uses 40% less energy than cellular data</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-600">HD video uses 2.5GB/hour vs 0.7GB for SD quality</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-600">Efficient caching reduces data transfer by 35%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};