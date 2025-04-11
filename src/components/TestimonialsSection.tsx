
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "Cette solution a transformé notre approche du marketing digital et augmenté nos conversions de 40%.",
    author: "Marie Dupont",
    position: "Directrice Marketing, TechCorp",
    rating: 5
  },
  {
    quote: "Interface intuitive et support client exceptionnel. Je recommande vivement ce service à toutes les entreprises.",
    author: "Jean Martin",
    position: "CEO, StartupNext",
    rating: 4
  },
  {
    quote: "La flexibilité de la plateforme nous a permis d'adapter rapidement nos stratégies en période de crise.",
    author: "Sophie Laurent",
    position: "Responsable Digital, GrandGroupe",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section bg-secondary" id="testimonials">
      <div className="container">
        <h2 className="section-title">Ce que nos clients disent</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-none shadow-md transition-all hover:shadow-lg hover:translate-y-[-5px] duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="group">
            Voir plus de témoignages
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
