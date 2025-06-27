import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/Header';
import { HomePage } from '@/components/HomePage';
import { ParticipationForm } from '@/components/ParticipationForm';
import { ConsultationsList } from '@/components/ConsultationsList';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleNavigation = (page: string) => {
    if (page === 'admin' && !isAdminAuthenticated) {
      setCurrentPage('admin-login');
    } else {
      setCurrentPage(page);
    }
  };

  const handleAdminLogin = (success: boolean) => {
    setIsAdminAuthenticated(success);
    if (success) {
      setCurrentPage('admin');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'participate':
        return <ParticipationForm />;
      case 'consultations':
        return <ConsultationsList />;
      case 'admin-login':
        return <AdminLogin onLogin={handleAdminLogin} />;
      case 'admin':
        return isAdminAuthenticated ? (
          <AdminDashboard onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} />
        );
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {currentPage !== 'admin-login' && (
          <Header currentPage={currentPage} onNavigate={handleNavigation} />
        )}
        {renderCurrentPage()}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;