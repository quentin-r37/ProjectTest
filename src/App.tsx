import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Send } from './components/Send';
import { Pay } from './components/Pay';
import { Cards } from './components/Cards';
import { Analytics } from './components/Analytics';
import { Account } from './components/Account';
import { Header } from './components/Header';

type ViewType = 'dashboard' | 'send' | 'pay' | 'cards' | 'analytics' | 'account' | 'login';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export function App() {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const renderView = () => {
    if (!user) {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setCurrentView} />;
      case 'send':
        return <Send user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'pay':
        return <Pay user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'cards':
        return <Cards user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'analytics':
        return <Analytics user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'account':
        return <Account user={user} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard user={user} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-montserrat">
      {user && (
        <Header user={user} onLogout={handleLogout} />
      )}
      <main className={user ? 'pt-16' : ''}>
        {renderView()}
      </main>
    </div>
  );
}

export default App;