import React, { useState } from 'react';
import { ArrowLeft, Download, Filter } from 'lucide-react';
import { Coffee, ShoppingCart, Zap, Smartphone, MapPin, Home, Heart, Gamepad2, Music } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AccountProps {
  user: User;
  onBack: () => void;
}

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  time: string;
  icon: React.ReactNode;
  merchant?: string;
}

export function Account({ user, onBack }: AccountProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const transactions: Transaction[] = [
    {
      id: '1',
      name: 'Café du Commerce',
      category: 'Alimentation',
      amount: 4.50,
      type: 'expense',
      date: 'Aujourd\'hui',
      time: '14:32',
      icon: <Coffee size={24} className="text-amber-400" />,
      merchant: 'CAFE COMMERCE PARIS'
    },
    {
      id: '2',
      name: 'Amazon',
      category: 'Shopping',
      amount: 89.99,
      type: 'expense',
      date: 'Hier',
      time: '10:15',
      icon: <ShoppingCart size={24} className="text-orange-400" />,
      merchant: 'AMAZON EU SARL'
    },
    {
      id: '3',
      name: 'EDF Électricité',
      category: 'Factures',
      amount: 125.00,
      type: 'expense',
      date: 'Il y a 2 jours',
      time: '09:00',
      icon: <Zap size={24} className="text-yellow-400" />,
      merchant: 'EDF ENERGIE'
    },
    {
      id: '4',
      name: 'Orange Mobile',
      category: 'Téléphone',
      amount: 35.00,
      type: 'expense',
      date: 'Il y a 3 jours',
      time: '13:45',
      icon: <Smartphone size={24} className="text-blue-400" />,
      merchant: 'ORANGE TELECOM'
    },
    {
      id: '5',
      name: 'Virement reçu - Employeur',
      category: 'Revenus',
      amount: 2500.00,
      type: 'income',
      date: 'Il y a 5 jours',
      time: '08:00',
      icon: <MapPin size={24} className="text-emerald-400" />,
      merchant: 'TECH CORP SA'
    },
    {
      id: '6',
      name: 'Spotify Premium',
      category: 'Divertissement',
      amount: 12.99,
      type: 'expense',
      date: 'Il y a 6 jours',
      time: '11:20',
      icon: <Music size={24} className="text-purple-400" />,
      merchant: 'SPOTIFY AB'
    },
    {
      id: '7',
      name: 'Rent Payment',
      category: 'Logement',
      amount: 800.00,
      type: 'expense',
      date: 'Il y a 8 jours',
      time: '07:00',
      icon: <Home size={24} className="text-cyan-400" />,
      merchant: 'LANDLORD VIREMENT'
    },
    {
      id: '8',
      name: 'PlayStation Store',
      category: 'Jeux',
      amount: 29.99,
      type: 'expense',
      date: 'Il y a 10 jours',
      time: '19:30',
      icon: <Gamepad2 size={24} className="text-pink-400" />,
      merchant: 'PLAYSTATION STORE'
    },
  ];

  const categories = ['Tous', 'Alimentation', 'Shopping', 'Factures', 'Revenus', 'Divertissement', 'Logement', 'Jeux', 'Téléphone'];

  const filteredTransactions = selectedCategory && selectedCategory !== 'Tous'
    ? transactions.filter(t => t.category === selectedCategory)
    : transactions;

  const categoryTotals = categories.reduce((acc, cat) => {
    if (cat === 'Tous') return acc;
    const total = transactions
      .filter(t => t.category === cat)
      .reduce((sum, t) => sum + (t.type === 'expense' ? -t.amount : t.amount), 0);
    if (total !== 0) {
      acc[cat] = total;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-neutral-950 pt-8 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-pink-500" />
          </button>
          <h1 className="text-3xl font-bold text-neutral-50">Détails du compte</h1>
        </div>

        {/* Account Summary */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-bold text-2xl text-white">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-50">{user.name}</h2>
              <p className="text-neutral-400">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-neutral-800 bg-opacity-50">
              <p className="text-neutral-400 text-xs mb-1">Solde</p>
              <p className="text-xl font-bold text-pink-400">€4,850.75</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-800 bg-opacity-50">
              <p className="text-neutral-400 text-xs mb-1">ID Compte</p>
              <p className="text-sm font-mono text-neutral-300">****-****-****-7891</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-neutral-300 font-semibold mb-3">Filtrer par catégorie</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  (selectedCategory === cat || (cat === 'Tous' && !selectedCategory))
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-300 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Category Summary */}
        {selectedCategory && selectedCategory !== 'Tous' && (
          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 mb-8">
            <p className="text-neutral-400 text-sm">Total pour {selectedCategory}</p>
            <p className={`text-2xl font-bold ${categoryTotals[selectedCategory] < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {categoryTotals[selectedCategory] < 0 ? '-' : '+'}€{Math.abs(categoryTotals[selectedCategory] || 0).toFixed(2)}
            </p>
          </div>
        )}

        {/* Transactions List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-50">
              Historique des transactions ({filteredTransactions.length})
            </h3>
            <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
              <Download size={20} className="text-pink-500" />
            </button>
          </div>

          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all hover:bg-neutral-850 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-neutral-800 group-hover:bg-neutral-700 transition-colors">
                    {transaction.icon}
                  </div>
                  <div>
                    <p className="text-neutral-50 font-medium">{transaction.name}</p>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                    </div>
                    {transaction.merchant && (
                      <p className="text-xs text-neutral-600 mt-1">{transaction.merchant}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-base ${
                    transaction.type === 'expense' ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {transaction.type === 'expense' ? '-' : '+'} €{transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-neutral-500">{transaction.category}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg">Aucune transaction trouvée pour cette catégorie</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}