import React from 'react';
import { Leaf, Calculator, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-400" />
                <h3 className="text-lg font-medium">About Cost of Scroll</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We help you understand the environmental impact of your digital habits,
                transforming abstract data into actionable insights for a more sustainable
                online presence.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-medium">How We Calculate</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Energy consumption metrics from 2024 data center reports
                </li>
                <li className="text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Network transmission efficiency factors from IEEE standards
                </li>
                <li className="text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Device power consumption data from Energy Star
                </li>
                <li className="text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Regional carbon intensity data from Climate TRACE
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-medium">Research & Methodology</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  IEA Data Centers and Data Transmission Networks Report 2024
                </li>
                <li className="text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Uptime Institute Global Data Center Survey 2024
                </li>
                <li className="text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Carbon Trust ICT Sector Guidance 2024
                </li>
                <li className="text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Green Software Foundation Standards
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700/50 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Cost of Scroll. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};