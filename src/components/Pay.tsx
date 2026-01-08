import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface PayProps {
  user: User;
  onBack: () => void;
}

export function Pay({ user, onBack }: PayProps) {
  const [step, setStep] = useState<'method' | 'merchant' | 'amount' | 'confirm' | 'success'>('method');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'direct' | null>(null);
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');

  const merchants = [
    { id: '1', name: 'Amazon', icon: '🛍️' },
    { id: '2', name: 'Spotify', icon: '🎵' },
    { id: '3', name: 'Netflix', icon: '📺' },
    { id: '4', name: 'Apple', icon: '🍎' },
    { id: '5', name: 'PlayStation', icon: '🎮' },
    { id: '6', name: 'Autre', icon: '➕' },
  ];

  const handleMethodSelect = (method: 'card' | 'direct') => {
    setPaymentMethod(method);
    setStep('merchant');
  };

  const handleMerchantSelect = (m: string) => {
    setMerchant(m);
    setStep('amount');
  };

  const handleConfirm = () => {
    if (amount && paymentMethod && merchant) {
      setStep('confirm');
    }
  };

  const handlePay = () => {
    setStep('success');
    setTimeout(() => {
      onBack();
    }, 3000);
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
          <h1 className="text-3xl font-bold text-neutral-50">Payer</h1>
        </div>

        {/* Content */}
        {step === 'method' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-neutral-50 mb-6">Sélectionner le mode de paiement</h2>
            
            <button
              onClick={() => handleMethodSelect('card')}
              className="w-full p-6 rounded-lg bg-gradient-to-br from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 border border-pink-500 border-opacity-50 transition-all duration-300 transform hover:scale-105 text-left group"
            >
              <CreditCard size={32} className="text-white mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Carte virtuelle</h3>
              <p className="text-white text-opacity-80">Utilisez votre carte VeloBank</p>
            </button>

            <button
              onClick={() => handleMethodSelect('direct')}
              className="w-full p-6 rounded-lg bg-gradient-to-br from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 border border-cyan-500 border-opacity-50 transition-all duration-300 transform hover:scale-105 text-left group"
            >
              <Wallet size={32} className="text-white mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Paiement direct</h3>
              <p className="text-white text-opacity-80">Débiter directement votre solde</p>
            </button>
          </div>
        )}

        {step === 'merchant' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-neutral-50 mb-4">Auprès de quel commerçant?</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {merchants.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleMerchantSelect(m.name)}
                  className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-pink-500 hover:bg-neutral-800 transition-all duration-300 flex flex-col items-center gap-2"
                >
                  <span className="text-3xl">{m.icon}</span>
                  <span className="text-sm font-medium text-neutral-50">{m.name}</span>
                </button>
              ))}
            </div>

            {/* Custom Merchant */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Ou entrer le nom du commerçant
              </label>
              <input
                type="text"
                placeholder="Nom du commerçant"
                className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-50 placeholder-neutral-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
              />
            </div>
          </div>
        )}

        {step === 'amount' && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
              <p className="text-neutral-400 text-sm mb-1">Mode de paiement</p>
              <p className="font-semibold text-neutral-50 mb-2">
                {paymentMethod === 'card' ? 'Carte virtuelle' : 'Paiement direct'}
              </p>
              <p className="text-neutral-400 text-sm mb-2">Commerçant</p>
              <p className="font-semibold text-neutral-50">{merchant}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Montant
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-pink-500">€</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 text-2xl font-bold rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-50 placeholder-neutral-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!amount}
              className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-white transition-all duration-300"
            >
              Continuer
            </button>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800">
              <p className="text-neutral-400 text-sm mb-2">Montant à payer</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
                €{parseFloat(amount).toFixed(2)}
              </p>
              <div className="space-y-4 border-t border-neutral-700 pt-6">
                <div>
                  <p className="text-neutral-400 text-sm mb-1">Commerçant</p>
                  <p className="font-medium text-neutral-50">{merchant}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm mb-1">Mode de paiement</p>
                  <p className="font-medium text-neutral-50">
                    {paymentMethod === 'card' ? 'Carte virtuelle VeloBank' : 'Solde du compte'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('amount')}
                className="flex-1 py-3 rounded-full border border-neutral-700 hover:border-neutral-600 font-semibold text-white transition-all duration-300"
              >
                Retour
              </button>
              <button
                onClick={handlePay}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-semibold text-white transition-all duration-300"
              >
                Payer
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <CreditCard size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-50 mb-2">Paiement réussi!</h2>
            <p className="text-neutral-400 mb-6">
              €{parseFloat(amount).toFixed(2)} payé à {merchant}
            </p>
            <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
              <p className="text-neutral-500 text-sm">Vous serez redirigé vers l'accueil dans quelques secondes...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}