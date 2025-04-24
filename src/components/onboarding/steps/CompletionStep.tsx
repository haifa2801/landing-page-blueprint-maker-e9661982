
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";
import type { UserRole } from "@/types/onboarding";

interface CompletionStepProps {
  userRole: UserRole;
  onStartJourney: () => void;
}

export function CompletionStep({ userRole, onStartJourney }: CompletionStepProps) {
  let nextDestination = "";
  let features: { title: string; description: string }[] = [];

  switch (userRole) {
    case "reader":
      nextDestination = "votre bibliothèque personnalisée";
      features = [
        {
          title: "Découvertes personnalisées",
          description: "Des recommandations basées sur vos goûts littéraires"
        },
        {
          title: "Outils de lecture avancés",
          description: "Marque-pages, surlignage, notes et annotations"
        },
        {
          title: "Communauté de lecteurs",
          description: "Partagez vos avis et découvrez les recommandations d'autres lecteurs"
        }
      ];
      break;
    case "writer":
      nextDestination = "votre tableau de bord d'écrivain";
      features = [
        {
          title: "Outils de publication",
          description: "Tout ce dont vous avez besoin pour publier et gérer vos œuvres"
        },
        {
          title: "Analyses de performance",
          description: "Suivez les lectures, téléchargements et revenus en temps réel"
        },
        {
          title: "Protection contre le piratage",
          description: "Vos œuvres sont protégées par nos technologies avancées"
        }
      ];
      break;
    case "publisher":
      nextDestination = "votre tableau de bord d'éditeur";
      features = [
        {
          title: "Gestion de catalogue",
          description: "Outils avancés pour gérer votre catalogue complet"
        },
        {
          title: "Analytics détaillés",
          description: "Données précises sur les performances par auteur, genre et format"
        },
        {
          title: "Distribution optimisée",
          description: "Solutions pour maximiser la diffusion et les ventes"
        }
      ];
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto"
      >
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-primary-foreground" />
        </div>
      </motion.div>

      <div>
        <h3 className="text-2xl font-bold">Félicitations !</h3>
        <p className="text-muted-foreground mt-2">
          Votre profil est maintenant configuré. Vous êtes prêt(e) à commencer.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border rounded-lg p-6 space-y-4"
      >
        <h4 className="font-medium">Fonctionnalités débloquées</h4>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start"
            >
              <Check className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h5 className="font-medium">{feature.title}</h5>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={onStartJourney} size="lg" className="mt-4">
          Découvrir {nextDestination}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
