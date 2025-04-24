
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Pen, Building2 } from "lucide-react";
import type { UserRole } from "@/types/onboarding";

interface RoleSelectionStepProps {
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
}

export function RoleSelectionStep({
  selectedRole,
  onSelectRole,
}: RoleSelectionStepProps) {
  const roles = [
    {
      id: "reader",
      title: "Lecteur",
      description: "Je souhaite découvrir et lire des livres",
      icon: BookOpen,
    },
    {
      id: "writer",
      title: "Écrivain",
      description: "Je souhaite publier et partager mes œuvres",
      icon: Pen,
    },
    {
      id: "publisher",
      title: "Maison d'édition",
      description: "Je représente une maison d'édition",
      icon: Building2,
    },
  ];

  // Animation variants pour les cartes de rôle
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {roles.map((role) => (
          <motion.div key={role.id} variants={itemVariants}>
            <Button
              variant={selectedRole === role.id ? "default" : "outline"}
              className={`h-auto w-full p-6 flex flex-col items-center justify-center gap-4 text-center transition-all ${
                selectedRole === role.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onSelectRole(role.id as UserRole)}
            >
              <role.icon className="h-8 w-8" />
              <div className="space-y-2">
                <h4 className="font-medium">{role.title}</h4>
                <p className="text-sm font-normal">{role.description}</p>
              </div>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground text-center"
      >
        Vous pourrez toujours modifier votre rôle plus tard dans vos paramètres
      </motion.p>
    </div>
  );
}
