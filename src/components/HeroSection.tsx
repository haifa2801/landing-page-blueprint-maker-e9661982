
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="section py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Welcome to Bookly
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              A digital platform connecting writers and readers. Discover,
              read, and publish books in digital and audio formats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium">
                Read Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                Publish Your Books
                <BookOpen className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/lovable-uploads/6ca72849-5774-4154-9d7c-f22991fb1fcb.png"
                alt="Books on a shelf" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -right-4 h-32 w-32 bg-secondary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
