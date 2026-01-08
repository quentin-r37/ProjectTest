import React, { useState } from 'react';
import { Send as SendIcon, CreditCard, TrendingUp, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, MoreVertical } from 'lucide-react';
import { VirtualCard } from './VirtualCard';
import { RecentTransactions } from './RecentTransactions';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface DashboardProps {
  user: User;
  onNavigate: (view: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const balance = 4850.75;
  const monthlyIncome = 3200.00;
  const monthlyExpense = 1450.25;

  const quickActions = [
    { icon: SendIcon, label: 'Envoyer', action: 'send' },
    { icon: CreditCard, label: 'Payer', action: 'pay' },
    { icon: CreditCard, label: 'Cartes', action: 'cards' },
    { icon: TrendingUp, label: 'Analyser', action: 'analytics' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 pt-8 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-50 mb-2">
            Bienvenue, {user.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-neutral-400">Gérez vos finances en toute simplicité</p>
        </div>

        {/* Main Card */}
        <div className="mb-8">
          <VirtualCard />
        </div>

        {/* Balance Section */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 border border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-400 text-sm font-medium">Solde actuel</h3>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              {showBalance ? (
                <Eye size={18} className="text-pink-500" />
              ) : (
                <EyeOff size={18} className="text-pink-500" />
              )}
            </button>
          </div>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
            {showBalance ? `€ ${balance.toFixed(2)}` : '••••••'}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-neutral-800 bg-opacity-50">
              <div className="flex items-center gap-2 mb-1">
                <ArrowDownLeft size={16} className="text-emerald-400" />
                <span className="text-xs text-neutral-500">Revenus</span>
              </div>
              <p className="text-lg font-semibold text-emerald-400">+ €{monthlyIncome.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-800 bg-opacity-50">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUpRight size={16} className="text-red-400" />
                <span className="text-xs text-neutral-500">Dépenses</span>
              </div>
              <p className="text-lg font-semibold text-red-400">- €{monthlyExpense.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-neutral-300 font-semibold mb-4">Actions rapides</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.action}
                  onClick={() => onNavigate(action.action as any)}
                  className="p-4 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 hover:border-pink-500 hover:from-neutral-700 hover:to-neutral-800 transition-all duration-300 transform hover:scale-105 group"
                >
                  <Icon size={24} className="text-pink-500 mb-2 group-hover:text-purple-400 transition-colors" />
                  <p className="text-sm font-medium text-neutral-300 group-hover:text-neutral-50 transition-colors">
                    {action.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-300 font-semibold">Transactions récentes</h3>
            <button
              onClick={() => onNavigate('account')}
              className="text-pink-500 hover:text-pink-400 text-sm font-medium transition-colors"
            >
              Voir tout
            </button>
          </div>
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}