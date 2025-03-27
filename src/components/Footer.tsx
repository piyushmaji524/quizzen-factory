
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Github, Twitter, Linkedin, Brain } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-br from-background to-secondary/50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <Brain className="text-white w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-xl">QuizzenFactory</span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              A cutting-edge AI-powered quiz generation platform for education and entertainment.
              Create custom quizzes in seconds or explore daily challenges.
            </p>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com/piyushmaji524" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@piyushmaji.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/daily-quiz" label="Daily Quiz" />
              <FooterLink to="/create-quiz" label="Create Quiz" />
              <FooterLink to="/about" label="About" />
              <FooterLink to="/developer" label="Developer" />
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink to="/privacy-policy" label="Privacy Policy" />
              <FooterLink to="/terms-of-service" label="Terms of Service" />
              <FooterLink to="/cookies-policy" label="Cookies Policy" />
              <FooterLink to="/disclaimer" label="Disclaimer" />
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <p className="text-sm mb-2">Have questions or suggestions?</p>
            <a 
              href="mailto:contact@piyushmaji.com"
              className="text-primary hover:underline font-medium transition-colors"
            >
              contact@piyushmaji.com
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6 mt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} QuizzenFactory. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Built with <Heart className="w-4 h-4 text-destructive mx-1" /> by 
            <Link to="/developer" className="ml-1 font-medium hover:text-primary transition-colors">
              Piyush Maji
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link 
      to={to} 
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
