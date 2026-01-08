import React from 'react';
import { Coffee, ShoppingCart, Zap, Smartphone, MapPin } from 'lucide-react';

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  icon: React.ReactNode;
}

export function RecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: '1',
      name: 'Café du Commerce',
      category: 'Alimentation',
      amount: 4.50,
      type: 'expense',
      date: 'Aujourd\'hui',
      icon: <Coffee size={24} className="text-amber-400" />
    },
    {
      id: '2',
      name: 'Amazon',
      category: 'Shopping',
      amount: 89.99,
      type: 'expense',
      date: 'Hier',
      icon: <ShoppingCart size={24} className="text-orange-400" />
    },
    {
      id: '3',
      name: 'EDF Électricité',
      category: 'Factures',
      amount: 125.00,
      type: 'expense',
      date: 'Il y a 2 jours',
      icon: <Zap size={24} className="text-yellow-400" />
    },
    {
      id: '4',
      name: 'Orange Mobile',
      category: 'Téléphone',
      amount: 35.00,
      type: 'expense',
      date: 'Il y a 3 jours',
      icon: <Smartphone size={24} className="text-blue-400" />
    },
    {
      id: '5',
      name: 'Virement reçu - Employeur',
      category: 'Revenus',
      amount: 2500.00,
      type: 'income',
      date: 'Il y a 5 jours',
      icon: <MapPin size={24} className="text-emerald-400" />
    }
  ];

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-neutral-800 group-hover:bg-neutral-700 transition-colors">
              {transaction.icon}
            </div>
            <div>
              <p className="text-neutral-50 font-medium text-sm">{transaction.name}</p>
              <p className="text-neutral-500 text-xs">{transaction.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold text-sm ${
              transaction.type === 'expense' ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {transaction.type === 'expense' ? '-' : '+'} €{transaction.amount.toFixed(2)}
            </p>
            <p className="text-neutral-500 text-xs">{transaction.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}