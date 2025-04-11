
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, Heart, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recherche pour:", searchQuery);
    // Logique de recherche à implémenter
  };

  return (
    <header className="py-4 border-b">
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">LOGO</span>
        </a>

        {/* Barre de recherche */}
        <div className="hidden md:flex mx-4 flex-1 max-w-md">
          <form onSubmit={handleSearch} className="w-full flex">
            <Input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none px-3">
              <Search size={18} />
            </Button>
          </form>
        </div>

        {/* Navigation pour desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Caractéristiques
          </a>
          <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
            Témoignages
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </a>
          
          {/* Icônes e-commerce */}
          <div className="flex items-center space-x-4 ml-4">
            {/* Dropdown de l'utilisateur */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <a href="/connexion" className="w-full">Connexion</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/inscription" className="w-full">Inscription</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
            
            {/* Panier */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72">
                <div className="space-y-3">
                  <h3 className="text-base font-medium">Votre panier</h3>
                  <div className="text-sm text-muted-foreground">
                    Votre panier est vide.
                  </div>
                  <Button className="w-full">Voir le panier</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
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
            {/* Barre de recherche mobile */}
            <form onSubmit={handleSearch} className="w-full flex">
              <Input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none px-3">
                <Search size={18} />
              </Button>
            </form>
            
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
            
            {/* Options e-commerce pour mobile */}
            <div className="flex justify-between items-center pt-2 border-t">
              <a href="/connexion" className="flex items-center gap-2">
                <User size={18} />
                <span>Connexion</span>
              </a>
              <a href="/wishlist" className="flex items-center gap-2">
                <Heart size={18} />
                <span>Wishlist</span>
              </a>
              <a href="/panier" className="flex items-center gap-2">
                <ShoppingCart size={18} />
                <span>Panier</span>
              </a>
            </div>
            
            <Button className="w-full">Commencer</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
