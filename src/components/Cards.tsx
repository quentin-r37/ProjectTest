import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Copy } from 'lucide-react';
import { VirtualCard } from './VirtualCard';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface CardsProps {
  user: User;
  onBack: () => void;
}

interface Card {
  id: string;
  last4: string;
  name: string;
  limit: number;
  color: string;
}

export function Cards({ user, onBack }: CardsProps) {
  const [cards, setCards] = useState<Card[]>([
    { id: '1', last4: '4829', name: 'Carte Principale', limit: 5000, color: 'from-pink-600 to-purple-600' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', limit: '' });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.limit) {
      const colors = [
        'from-cyan-600 to-emerald-600',
        'from-purple-600 to-pink-600',
        'from-red-600 to-yellow-600',
      ];
      const newCard: Card = {
        id: Date.now().toString(),
        last4: Math.floor(Math.random() * 9000 + 1000).toString(),
        name: formData.name,
        limit: parseFloat(formData.limit),
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setCards([...cards, newCard]);
      setFormData({ name: '', limit: '' });
      setShowForm(false);
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-8 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-pink-500" />
          </button>
          <h1 className="text-3xl font-bold text-neutral-50">Mes cartes</h1>
        </div>

        {/* Cards List */}
        <div className="space-y-6 mb-8">
          {cards.map((card, index) => (
            <div key={card.id} className="space-y-3">
              {index === 0 && (
                <div>
                  <VirtualCard />
                </div>
              )}
              
              <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-neutral-50 font-semibold">{card.name}</p>
                  <p className="text-sm text-neutral-500">•••• •••• •••• {card.last4}</p>
                  <p className="text-xs text-neutral-600 mt-2">Limite: €{card.limit.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                    <Edit2 size={18} className="text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Card Form */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full p-4 rounded-lg border-2 border-dashed border-neutral-700 hover:border-pink-500 transition-colors flex items-center justify-center gap-2 text-neutral-400 hover:text-pink-500 font-semibold"
          >
            <Plus size={24} />
            <span>Créer une nouvelle carte</span>
          </button>
        ) : (
          <form onSubmit={handleAddCard} className="space-y-4 p-6 rounded-lg bg-neutral-900 border border-neutral-800">
            <h3 className="text-lg font-semibold text-neutral-50 mb-4">Nouvelle carte</h3>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Nom de la carte
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Carte Shopping"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-50 placeholder-neutral-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Limite de dépense
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">€</span>
                <input
                  type="number"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  placeholder="1000.00"
                  className="w-full pl-8 pr-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-50 placeholder-neutral-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ name: '', limit: '' });
                }}
                className="flex-1 py-3 rounded-full border border-neutral-700 hover:border-neutral-600 font-semibold text-white transition-all duration-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-semibold text-white transition-all duration-300"
              >
                Créer
              </button>
            </div>
          </form>
        )}

        {/* Card Info */}
        <div className="mt-8 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
          <h3 className="font-semibold text-neutral-50 mb-3">💡 Conseils d'utilisation</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>• Créez plusieurs cartes pour mieux organiser vos dépenses</li>
            <li>• Définissez des limites pour chaque carte</li>
            <li>• Les cartes virtuelles peuvent être supprimées à tout moment</li>
            <li>• Consultez vos transactions par carte dans l'historique</li>
          </ul>
        </div>
      </div>
    </div>
  );
}