import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email invalide');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Simulate successful login
    onLogin({
      id: '123',
      name: 'Sarah Martin',
      email: email,
      avatar: 'SM'
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 mb-4">
            <span className="text-2xl font-bold text-white">V</span>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 mb-2">
            VeloBank
          </h1>
          <p className="text-neutral-400">Votre banque digitale simplifiée</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@example.com"
              className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-50 placeholder-neutral-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-50 placeholder-neutral-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-semibold text-white transition-all duration-300 transform hover:scale-105"
          >
            Se connecter
          </button>

          <div className="text-center">
            <p className="text-neutral-400 text-sm">
              Pas encore de compte?{' '}
              <span className="text-pink-500 font-semibold cursor-pointer hover:text-pink-400">
                S'inscrire
              </span>
            </p>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-12 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
          <p className="text-xs text-neutral-500 mb-2">Identifiants de démo:</p>
          <p className="text-xs text-neutral-400">Email: demo@velobank.com</p>
          <p className="text-xs text-neutral-400">Mot de passe: password123</p>
        </div>
      </div>
    </div>
  );
}