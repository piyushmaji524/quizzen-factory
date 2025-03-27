
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, PlusCircle, List, Brain, Home, Info, FileText, User, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'glassmorphism py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center animate-pulse-soft">
            <Brain className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-heading font-bold text-xl tracking-tight">QuizzenFactory</span>
            <span className="text-xs text-muted-foreground leading-tight">AI-Powered Quiz Creation</span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" />
          <NavLink to="/daily-quiz" icon={<List className="w-4 h-4" />} label="Daily Quiz" />
          <NavLink to="/create-quiz" icon={<PlusCircle className="w-4 h-4" />} label="Create Quiz" />
          <NavLink to="/about" icon={<Info className="w-4 h-4" />} label="About" />
          <NavLink to="/developer" icon={<User className="w-4 h-4" />} label="Developer" />
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <SearchButton />
          <a 
            href="https://github.com/piyushmaji524" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground p-1"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-background/95 backdrop-blur-lg z-50 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="container h-full flex flex-col pt-20 pb-6 px-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-5 right-5 text-foreground p-1"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col space-y-3 items-center">
              <MobileNavLink to="/" icon={<Home className="w-5 h-5" />} label="Home" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/daily-quiz" icon={<List className="w-5 h-5" />} label="Daily Quiz" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/create-quiz" icon={<PlusCircle className="w-5 h-5" />} label="Create Quiz" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/about" icon={<Info className="w-5 h-5" />} label="About" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/developer" icon={<User className="w-5 h-5" />} label="Developer" onClick={() => setIsMobileMenuOpen(false)} />
            </div>

            <div className="mt-auto">
              <div className="w-full mb-6">
                <SearchButton />
              </div>
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://github.com/piyushmaji524" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <Link
    to={to}
    className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:text-primary transition-colors"
  >
    <span className="mr-2 text-muted-foreground group-hover:text-primary transition-colors">{icon}</span>
    <span>{label}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, label, onClick }: { to: string; icon: React.ReactNode; label: string; onClick: () => void }) => (
  <Link
    to={to}
    className="flex items-center w-full py-3 px-4 text-lg font-medium rounded-lg hover:bg-muted transition-colors"
    onClick={onClick}
  >
    <span className="mr-3 text-muted-foreground">{icon}</span>
    <span>{label}</span>
  </Link>
);

const SearchButton = () => (
  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
    <Search className="w-5 h-5" />
  </Button>
);

export default Navbar;
