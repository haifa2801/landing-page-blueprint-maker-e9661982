
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 border-b">
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">LOGO</span>
        </a>

        {/* Navigation pour desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Caractéristiques
          </a>
          <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
            Témoignages
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </a>
          <Button>Commencer</Button>
        </nav>

        {/* Bouton hamburger pour mobile */}
        <button 
          className="md:hidden p-2" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg z-50">
          <div className="container py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Caractéristiques
            </a>
            <a 
              href="#testimonials" 
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Témoignages
            </a>
            <a 
              href="#contact" 
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </a>
            <Button className="w-full">Commencer</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
