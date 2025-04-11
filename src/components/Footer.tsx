
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground" id="contact">
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">LOGO</h3>
            <p className="text-sm">
              Nous créons des expériences numériques pour les marques et les entreprises à travers le monde.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">À propos</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Caractéristiques</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Témoignages</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <address className="not-italic text-sm space-y-2">
              <p>123 Rue Exemple</p>
              <p>75000 Paris, France</p>
              <p>Email: contact@exemple.com</p>
              <p>Tél: +33 1 23 45 67 89</p>
            </address>
          </div>
        </div>

        <div className="border-t border-muted mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm">
          <p>&copy; {currentYear} VotreEntreprise. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">Conçu avec passion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
