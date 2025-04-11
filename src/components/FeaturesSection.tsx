
import React from 'react';
import { Shield, Zap, BarChart, Globe } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Sécurité avancée",
    description: "Protection de vos données avec les dernières technologies de cryptage et d'authentification."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Performance optimisée",
    description: "Solution rapide et efficace qui s'adapte à vos besoins et à votre croissance."
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Analyses détaillées",
    description: "Suivez vos performances avec des tableaux de bord personnalisables et des rapports en temps réel."
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Accessibilité globale",
    description: "Accédez à vos données et services partout dans le monde, à tout moment."
  }
];

const FeaturesSection = () => {
  return (
    <section className="section" id="features">
      <div className="container">
        <h2 className="section-title">Nos caractéristiques principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card text-card-foreground p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
