
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="section bg-gradient-to-br from-secondary via-background to-background">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
            Créez une expérience numérique exceptionnelle avec nous
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Notre plateforme combine technologie de pointe et design intuitif pour vous aider à atteindre vos objectifs commerciaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="font-medium">
              Commencer gratuitement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Demander une démo
            </Button>
          </div>
          <div className="w-full max-w-4xl mt-16">
            <div className="aspect-video bg-muted rounded-lg shadow-xl flex items-center justify-center">
              <p className="text-muted-foreground">Aperçu vidéo ou image</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
