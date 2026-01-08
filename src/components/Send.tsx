import React, { useState } from 'react';
import { ArrowLeft, Send as SendIcon, Plus, User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface SendProps {
  user: User;
  onBack: () => void;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  initials: string;
}

export function Send({ user, onBack }: SendProps) {
  const [step, setStep] = useState<'select' | 'amount' | 'confirm' | 'success'>('select');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const recentContacts: Contact[] = [
    { id: '1', name: 'Alexandre Dubois', email: 'alex@example.com', initials: 'AD' },
    { id: '2', name: 'Emma Rousseau', email: 'emma@example.com', initials: 'ER' },
    { id: '3', name: 'Marc Lefevre', email: 'marc@example.com', initials: 'ML' },
    { id: '4', name: 'Isabelle Moreau', email: 'isabelle@example.com', initials: 'IM' },
  ];

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setStep('amount');
  };

  const handleConfirm = () => {
    if (amount && selectedContact) {
      setStep('confirm');
    }
  };

  const handleSend = () => {
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
          <h1 className="text-3xl font-bold text-neutral-50">Envoyer de l'argent</h1>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {['select', 'amount', 'confirm', 'success'].map((s, i) => (
            <React.Fragment key={s}>
              <div className={`w-2 h-2 rounded-full transition-colors ${
                step === s ? 'bg-pink-500' : ['select', 'amount', 'confirm', 'success'].indexOf(step) > i ? 'bg-emerald-500' : 'bg-neutral-700'
              }`} />
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        {step === 'select' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-neutral-50 mb-4">Sélectionner un destinataire</h2>

            {/* Recent Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleSelectContact(contact)}
                  className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-pink-500 hover:bg-neutral-800 transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-semibold text-white">
                      {contact.initials}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-50 group-hover:text-pink-400 transition-colors">{contact.name}</p>
                      <p className="text-xs text-neutral-500">{contact.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Add New Contact */}
            <button className="w-full p-4 rounded-lg border-2 border-dashed border-neutral-700 hover:border-pink-500 transition-colors flex items-center justify-center gap-2 text-neutral-400 hover:text-pink-500">
              <Plus size={20} />
              <span>Ajouter un nouveau contact</span>
            </button>
          </div>
        )}

        {step === 'amount' && selectedContact && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-semibold text-white">
                {selectedContact.initials}
              </div>
              <div>
                <p className="font-medium text-neutral-50">{selectedContact.name}</p>
                <p className="text-sm text-neutral-500">{selectedContact.email}</p>
              </div>
              <button
                onClick={() => setStep('select')}
                className="ml-auto text-pink-500 hover:text-pink-400 font-medium text-sm"
              >
                Changer
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Montant à envoyer
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

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Message optionnel
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ajouter une note..."
                className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-50 placeholder-neutral-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none h-24"
              />
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

        {step === 'confirm' && selectedContact && (
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800">
              <p className="text-neutral-400 text-sm mb-2">Vous envoyez</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
                €{parseFloat(amount).toFixed(2)}
              </p>
              <div className="border-t border-neutral-700 pt-6">
                <p className="text-neutral-400 text-sm mb-2">À</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-semibold text-white">
                    {selectedContact.initials}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-50">{selectedContact.name}</p>
                    <p className="text-sm text-neutral-500">{selectedContact.email}</p>
                  </div>
                </div>
              </div>
              {message && (
                <div className="border-t border-neutral-700 mt-6 pt-6">
                  <p className="text-neutral-400 text-sm mb-2">Message</p>
                  <p className="text-neutral-50">{message}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('amount')}
                className="flex-1 py-3 rounded-full border border-neutral-700 hover:border-neutral-600 font-semibold text-white transition-all duration-300"
              >
                Retour
              </button>
              <button
                onClick={handleSend}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <SendIcon size={20} />
                Envoyer
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <SendIcon size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-50 mb-2">Argent envoyé!</h2>
            <p className="text-neutral-400 mb-6">
              €{parseFloat(amount).toFixed(2)} envoyé à {selectedContact?.name}
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