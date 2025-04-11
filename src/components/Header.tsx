
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, Heart, ShoppingCart, ChevronDown, BookOpen, Mail } from "lucide-react";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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

  // Définition des catégories et sous-catégories
  const categories = [
    {
      name: 'Inspiration & Personal Growth',
      subcategories: ['Personal Development', 'Motivation & Inspiration']
    },
    {
      name: 'Health & Meditation',
      subcategories: ['Productivity', 'Religion & Spirituality']
    },
    {
      name: 'Career & Business',
      subcategories: ['Communication Skills', 'Education']
    },
    {
      name: 'Relationship & Family',
      subcategories: ['Philosophy']
    },
    {
      name: 'Science & Technology',
      subcategories: ['Creativity']
    },
    {
      name: 'Culture & Humanity',
      subcategories: ['Biography & Memoir']
    },
    {
      name: 'Money & Economics',
      subcategories: []
    },
    {
      name: 'Fiction',
      subcategories: []
    }
  ];

  return (
    <header className="py-4 border-b">
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">BOOKLY</span>
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

        {/* Navigation pour desktop avec menu de catégories */}
        <nav className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Catégories <ChevronDown className="h-4 w-4" />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <div className="grid grid-cols-2 w-[800px] gap-0">
                    <div className="border-r">
                      <ul className="p-2 space-y-1">
                        {categories.map((category, index) => (
                          <li key={index} className="hover:bg-accent rounded-md">
                            <NavigationMenuLink asChild>
                              <a href="#" className="flex items-center justify-between px-3 py-2 text-sm">
                                {category.name}
                                {category.subcategories.length > 0 && <ChevronDown className="h-4 w-4" />}
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <ul className="p-4 space-y-3">
                        <li>
                          <a href="#" className="flex items-center gap-3">
                            <span className="bg-accent p-2 rounded-md">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m2 7 5 3 5-6 5 6 5-3v8l-5 3-5-6-5 6-5-3z" />
                              </svg>
                            </span>
                            <span>Personal Development</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center gap-3">
                            <span className="bg-accent p-2 rounded-md">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 2v8L5 8l5 8v4" />
                                <path d="M14 2v4l5 8-5 2v8" />
                              </svg>
                            </span>
                            <span>Productivity</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center gap-3">
                            <span className="bg-accent p-2 rounded-md">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
                                <path d="M12 8v4l2 2" />
                              </svg>
                            </span>
                            <span>Motivation & Inspiration</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center gap-3">
                            <span className="bg-accent p-2 rounded-md">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                            </span>
                            <span>Communication Skills</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center gap-3">
                            <span className="bg-accent p-2 rounded-md">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                              </svg>
                            </span>
                            <span>Biography & Memoir</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a href="#apropos" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors px-3 py-2">
                  <BookOpen size={18} />
                  <span>À propos</span>
                </a>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a href="#contact" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors px-3 py-2">
                  <Mail size={18} />
                  <span>Contact</span>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
            
            {/* Menu navigation mobile */}
            <div className="border p-2 rounded-md">
              <Button variant="ghost" className="w-full flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <ChevronDown size={16} />
                  <span>Catégories</span>
                </span>
              </Button>
            </div>
            
            <a 
              href="#apropos" 
              className="text-sm font-medium py-2 hover:text-primary transition-colors flex items-center gap-2"
              onClick={toggleMenu}
            >
              <BookOpen size={18} />
              <span>À propos</span>
            </a>
            
            <a 
              href="#contact" 
              className="text-sm font-medium py-2 hover:text-primary transition-colors flex items-center gap-2"
              onClick={toggleMenu}
            >
              <Mail size={18} />
              <span>Contact</span>
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
