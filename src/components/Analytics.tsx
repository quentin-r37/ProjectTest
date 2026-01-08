import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AnalyticsProps {
  user: User;
  onBack: () => void;
}

export function Analytics({ user, onBack }: AnalyticsProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const monthlyData = [
    { name: 'Sem 1', revenus: 2500, dépenses: 450 },
    { name: 'Sem 2', revenus: 0, dépenses: 320 },
    { name: 'Sem 3', revenus: 0, dépenses: 680 },
    { name: 'Sem 4', revenus: 700, dépenses: 0 },
  ];

  const categoryData = [
    { name: 'Alimentation', value: 380, color: '#ec4899' },
    { name: 'Transport', value: 280, color: '#a855f7' },
    { name: 'Shopping', value: 450, color: '#06b6d4' },
    { name: 'Factures', value: 340, color: '#10b981' },
  ];

  const transactionStats = [
    { label: 'Revenus', value: 3200, color: 'text-emerald-400', bgColor: 'bg-emerald-500 bg-opacity-10', icon: '📈' },
    { label: 'Dépenses', value: 1450, color: 'text-red-400', bgColor: 'bg-red-500 bg-opacity-10', icon: '📉' },
    { label: 'Solde restant', value: 1750, color: 'text-pink-400', bgColor: 'bg-pink-500 bg-opacity-10', icon: '💰' },
  ];

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
          <h1 className="text-3xl font-bold text-neutral-50">Analyse financière</h1>
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-2 mb-8">
          {['week', 'month', 'year'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-300'
              }`}
            >
              {tf === 'week' ? 'Semaine' : tf === 'month' ? 'Mois' : 'Année'}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {transactionStats.map((stat) => (
            <div key={stat.label} className={`p-4 rounded-lg ${stat.bgColor} border border-neutral-800`}>
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="text-neutral-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>
                €{stat.value.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue vs Expenses Chart */}
        <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800 mb-8">
          <h2 className="text-lg font-semibold text-neutral-50 mb-6">Revenus vs Dépenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="name" stroke="#a3a3a3" />
              <YAxis stroke="#a3a3a3" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #404040' }}
                labelStyle={{ color: '#f5f5f5' }}
              />
              <Legend />
              <Bar dataKey="revenus" fill="#10b981" name="Revenus" radius={[8, 8, 0, 0]} />
              <Bar dataKey="dépenses" fill="#ec4899" name="Dépenses" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-50 mb-6">Répartition des dépenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} €${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #404040' }}
                  labelStyle={{ color: '#f5f5f5' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-50 mb-6">Catégories</h2>
            <div className="space-y-3">
              {categoryData.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  className={`w-full p-4 rounded-lg transition-all text-left ${
                    selectedCategory === category.name
                      ? 'bg-neutral-800 border border-pink-500'
                      : 'bg-neutral-800 bg-opacity-50 border border-neutral-700 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium text-neutral-50">{category.name}</span>
                    </div>
                    <span className="text-pink-400 font-semibold">€{category.value.toFixed(2)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trends */}
        <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-50 mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-emerald-400" />
            Tendances
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-800 bg-opacity-50">
              <span className="text-neutral-300">Dépense moyenne par jour</span>
              <span className="font-semibold text-pink-400">€{(1450 / 30).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-800 bg-opacity-50">
              <span className="text-neutral-300">Catégorie principal</span>
              <span className="font-semibold text-pink-400">Shopping (€450)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-800 bg-opacity-50">
              <span className="text-neutral-300">Épargne ce mois</span>
              <span className="font-semibold text-emerald-400">€1,750.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}