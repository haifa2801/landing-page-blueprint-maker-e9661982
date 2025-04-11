
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, Heart, ShoppingCart, ChevronDown, BookOpen, Mail, Book, Bookmark, Star, MessageCircle } from "lucide-react";
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
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";

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

  // Définition des sous-catégories populaires avec leurs icônes
  const popularSubcategories = [
    {
      name: "Personal Development",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Productivity",
      icon: <Bookmark className="h-5 w-5" />,
    },
    {
      name: "Motivation & Inspiration",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "Communication Skills",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      name: "Biography & Memoir",
      icon: <Book className="h-5 w-5" />,
    },
  ];

  return (
    <header className="py-4 border-b sticky top-0 bg-background z-40">
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
          {/* Menu avec sous-menus */}
          <Menubar className="border-none bg-transparent p-0">
            <MenubarMenu>
              <MenubarTrigger className="font-medium text-sm hover:text-primary transition-colors">
                Catégories <ChevronDown className="h-4 w-4 ml-1" />
              </MenubarTrigger>
              <MenubarContent className="bg-background min-w-[220px]">
                {categories.map((category, index) => (
                  category.subcategories.length > 0 ? (
                    <MenubarSub key={index}>
                      <MenubarSubTrigger className="cursor-pointer">
                        {category.name}
                      </MenubarSubTrigger>
                      <MenubarSubContent className="bg-background min-w-[220px]">
                        {category.subcategories.map((subcat, subIndex) => (
                          <MenubarItem key={subIndex}>
                            <a 
                              href={`/category/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                              className="w-full block"
                            >
                              {subcat}
                            </a>
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  ) : (
                    <MenubarItem key={index}>
                      <a 
                        href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="w-full block"
                      >
                        {category.name}
                      </a>
                    </MenubarItem>
                  )
                ))}
              </MenubarContent>
            </MenubarMenu>
            
            <MenubarMenu>
              <MenubarTrigger className="font-medium text-sm hover:text-primary transition-colors">
                À propos
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <a href="#about-us" className="w-full block">Notre histoire</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="#team" className="w-full block">Notre équipe</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="#mission" className="w-full block">Notre mission</a>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            
            <MenubarMenu>
              <MenubarTrigger className="font-medium text-sm hover:text-primary transition-colors">
                Contact
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <a href="#contact-form" className="w-full block">Formulaire de contact</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="#support" className="w-full block">Support client</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="#faq" className="w-full block">FAQ</a>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          
          {/* Icônes e-commerce */}
          <div className="flex items-center space-x-4 ml-4">
            {/* Dropdown de l'utilisateur */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/50">
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
            <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-accent/50">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
            
            {/* Panier */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-accent/50">
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
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-background border-b shadow-lg z-50 overflow-auto">
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
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="border rounded-md">
                  <Button 
                    variant="ghost" 
                    className="w-full flex justify-between items-center text-left font-normal"
                    onClick={() => {
                      const elem = document.getElementById(`mobile-category-${index}`);
                      if (elem) {
                        elem.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span>{category.name}</span>
                    <ChevronDown size={16} />
                  </Button>
                  
                  {category.subcategories.length > 0 && (
                    <div id={`mobile-category-${index}`} className="hidden px-4 py-2 space-y-2">
                      {category.subcategories.map((subcat, subIndex) => (
                        <a 
                          key={subIndex} 
                          href={`/category/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block py-1 text-sm hover:text-primary transition-colors"
                        >
                          {subcat}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <a 
                href="#apropos" 
                className="block text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                À propos
              </a>
              
              <a 
                href="#contact" 
                className="block text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </a>
            </div>
            
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
