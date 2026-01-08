import React from 'react';
import { Wifi } from 'lucide-react';

export function VirtualCard() {
  return (
    <div className="relative h-56 rounded-2xl overflow-hidden group cursor-pointer perspective">
      {/* Card Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-500 opacity-90" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-multiply blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full mix-blend-multiply blur-3xl" />
      </div>

      {/* Card Content */}
      <div className="relative h-full p-6 flex flex-col justify-between text-white">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/>
            </svg>
            <Wifi size={20} />
          </div>
          <span className="text-xs font-semibold opacity-75">VELOBANK</span>
        </div>

        {/* Middle Section */}
        <div>
          <p className="text-xs opacity-75 mb-2">Numéro de carte</p>
          <p className="text-2xl font-mono tracking-wider">
            •••• •••• •••• 4829
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-75">Titulaire</p>
            <p className="text-sm font-semibold">Sarah Martin</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Expire</p>
            <p className="text-sm font-semibold">12/26</p>
          </div>
          <div className="w-12 h-8 rounded bg-white bg-opacity-20 flex items-center justify-center">
            <span className="text-xs font-bold">MV</span>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </div>
  );
}