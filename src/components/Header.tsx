import React from 'react';
import { LogOut, Bell, Settings } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-neutral-900 to-neutral-950 border-b border-neutral-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-50">{user.name}</p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
              <Bell size={20} className="text-pink-500" />
            </button>
            <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
              <Settings size={20} className="text-pink-500" />
            </button>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-red-600 hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <LogOut size={20} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}