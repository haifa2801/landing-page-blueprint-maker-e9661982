
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { UserPreferences } from "@/types/onboarding";

const steps = [
  {
    id: "welcome",
    title: "Bienvenue sur TEPTAC SERVICES",
    description: "Nous sommes ravis de vous accueillir dans notre communauté de passionnés de lecture et d'écriture."
  },
  {
    id: "role",
    title: "Quel est votre rôle ?",
    description: "Dites-nous comment vous souhaitez utiliser notre plateforme."
  },
  {
    id: "genres",
    title: "Vos genres préférés",
    description: "Sélectionnez les genres littéraires qui vous intéressent le plus."
  },
  {
    id: "notifications",
    title: "Préférences de notification",
    description: "Configurez comment vous souhaitez être informé des nouveautés."
  }
];

const genres = [
  "Roman", "Science-Fiction", "Fantasy", "Policier", 
  "Thriller", "Romance", "Historique", "Biographie",
  "Développement personnel", "Business", "Jeunesse"
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    role: "reader",
    favoriteGenres: [],
    notificationPreferences: {
      email: true,
      push: false
    }
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // Save preferences and redirect
      toast({
        title: "Configuration terminée !",
        description: "Vos préférences ont été enregistrées avec succès.",
      });
      navigate("/dashboard");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleRoleSelect = (role: "writer" | "reader") => {
    setPreferences((prev) => ({ ...prev, role }));
  };

  const handleGenreToggle = (genre: string) => {
    setPreferences((prev) => {
      const genres = prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre];
      return { ...prev, favoriteGenres: genres };
    });
  };

  const handleNotificationToggle = (type: "email" | "push") => {
    setPreferences((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type]
      }
    }));
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "welcome":
        return (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Commençons l'aventure</h3>
            <p className="text-muted-foreground">
              Prenez quelques instants pour personnaliser votre expérience sur notre plateforme.
            </p>
          </div>
        );
      
      case "role":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={preferences.role === "reader" ? "default" : "outline"}
                className="h-24"
                onClick={() => handleRoleSelect("reader")}
              >
                Lecteur
              </Button>
              <Button
                variant={preferences.role === "writer" ? "default" : "outline"}
                className="h-24"
                onClick={() => handleRoleSelect("writer")}
              >
                Écrivain
              </Button>
            </div>
          </div>
        );
      
      case "genres":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={preferences.favoriteGenres.includes(genre) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleGenreToggle(genre)}
                  className="h-auto py-2 px-3"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case "notifications":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Button
                variant={preferences.notificationPreferences.email ? "default" : "outline"}
                onClick={() => handleNotificationToggle("email")}
                className="w-full justify-start"
              >
                Notifications par email
              </Button>
              <Button
                variant={preferences.notificationPreferences.push ? "default" : "outline"}
                onClick={() => handleNotificationToggle("push")}
                className="w-full justify-start"
              >
                Notifications push
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Progress value={progress} className="h-2" />
          <h2 className="text-2xl font-semibold mt-4">{steps[currentStep].title}</h2>
          <p className="text-muted-foreground">{steps[currentStep].description}</p>
        </CardHeader>
        
        <CardContent>
          {renderStepContent()}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? (
              "Terminer"
            ) : (
              <>
                Suivant
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
