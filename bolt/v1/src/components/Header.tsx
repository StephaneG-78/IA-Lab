import { Moon, Sun, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Concertation Publique
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => onNavigate('home')}
              className={`transition-all duration-300 ${
                currentPage === 'home' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white'
              }`}
            >
              Accueil
            </Button>
            <Button
              variant={currentPage === 'participate' ? 'default' : 'ghost'}
              onClick={() => onNavigate('participate')}
              className={`transition-all duration-300 ${
                currentPage === 'participate' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white'
              }`}
            >
              Participer
            </Button>
            <Button
              variant={currentPage === 'consultations' ? 'default' : 'ghost'}
              onClick={() => onNavigate('consultations')}
              className={`transition-all duration-300 ${
                currentPage === 'consultations' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white'
              }`}
            >
              Consultations
            </Button>
            <Button
              variant={currentPage === 'admin' ? 'default' : 'ghost'}
              onClick={() => onNavigate('admin')}
              className={`transition-all duration-300 ${
                currentPage === 'admin' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white'
              }`}
            >
              Administration
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}