
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingCard } from "./OnboardingCard";
import { WelcomeStep } from "./steps/WelcomeStep";
import { RoleSelectionStep } from "./steps/RoleSelectionStep";
import { GenreSelectionStep } from "./steps/GenreSelectionStep";
import { NotificationPreferencesStep } from "./steps/NotificationPreferencesStep";
import { WriterQuestionsStep } from "./steps/WriterQuestionsStep";
import { ReaderQuestionsStep } from "./steps/ReaderQuestionsStep";
import { PublisherQuestionsStep } from "./steps/PublisherQuestionsStep";
import { CompletionStep } from "./steps/CompletionStep";
import { useToast } from "@/hooks/use-toast";
import type { UserRole, UserPreferences } from "@/types/onboarding";

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
    id: "specific-questions",
    title: "Questionnaire personnalisé",
    description: "Quelques questions spécifiques pour mieux vous connaître."
  },
  {
    id: "notifications",
    title: "Préférences de notification",
    description: "Configurez comment vous souhaitez être informé des nouveautés."
  },
  {
    id: "completion",
    title: "Configuration terminée",
    description: "Votre profil est maintenant configuré."
  }
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    role: "reader",
    favoriteGenres: [],
    notificationPreferences: {
      email: true,
      push: false
    },
    readingHabits: [],
    preferredFormats: [],
    experience: undefined,
    goals: [],
    publisherSize: undefined,
    catalogTypes: [],
    specificNeeds: []
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    // Si on est à l'étape du rôle et qu'aucun rôle n'est sélectionné
    if (currentStep === 1 && !preferences.role) {
      toast({
        title: "Veuillez sélectionner un rôle",
        description: "Vous devez choisir un rôle pour continuer.",
        variant: "destructive",
      });
      return;
    }

    // Si on est à l'étape des genres et qu'aucun genre n'est sélectionné
    if (currentStep === 2 && preferences.favoriteGenres.length === 0) {
      toast({
        title: "Veuillez sélectionner au moins un genre",
        description: "Vous devez choisir au moins un genre pour continuer.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === steps.length - 1) {
      // Redirection en fonction du rôle
      const route = getRedirectionRoute(preferences.role);
      
      // Save preferences and redirect
      toast({
        title: "Configuration terminée !",
        description: "Vos préférences ont été enregistrées avec succès.",
      });
      
      navigate(route);
      return;
    }
    
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleRoleSelect = (role: UserRole) => {
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

  const handleNotificationToggle = (type: "email" | "push", value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: value
      }
    }));
  };

  const handleReadingHabitsChange = (habits: string[]) => {
    setPreferences((prev) => ({
      ...prev,
      readingHabits: habits
    }));
  };

  const handlePreferredFormatsChange = (formats: ("ebook" | "audio" | "print")[]) => {
    setPreferences((prev) => ({
      ...prev,
      preferredFormats: formats
    }));
  };

  const handleExperienceChange = (experience: "beginner" | "intermediate" | "advanced") => {
    setPreferences((prev) => ({
      ...prev,
      experience
    }));
  };

  const handleGoalsChange = (goals: string[]) => {
    setPreferences((prev) => ({
      ...prev,
      goals
    }));
  };

  const handlePublisherSizeChange = (size: "small" | "medium" | "large") => {
    setPreferences((prev) => ({
      ...prev,
      publisherSize: size
    }));
  };

  const handleCatalogTypesChange = (types: string[]) => {
    setPreferences((prev) => ({
      ...prev,
      catalogTypes: types
    }));
  };

  const handleSpecificNeedsChange = (needs: string[]) => {
    setPreferences((prev) => ({
      ...prev,
      specificNeeds: needs
    }));
  };

  const handleStartJourney = () => {
    const route = getRedirectionRoute(preferences.role);
    navigate(route);
  };

  const getRedirectionRoute = (role: UserRole) => {
    switch (role) {
      case "writer":
        return "/writer-dashboard";
      case "publisher":
        return "/admin";
      case "reader":
      default:
        return "/";
    }
  };

  // Ajustement dynamique du titre et de la description en fonction du rôle
  const getStepInfo = (stepIndex: number) => {
    const step = steps[stepIndex];
    
    // Personnalisation pour l'étape des questions spécifiques
    if (step.id === "specific-questions") {
      switch (preferences.role) {
        case "reader":
          return {
            ...step,
            title: "Vos habitudes de lecture",
            description: "Aidez-nous à mieux comprendre comment vous lisez"
          };
        case "writer":
          return {
            ...step,
            title: "Votre expérience d'écriture",
            description: "Parlez-nous de votre parcours et de vos objectifs"
          };
        case "publisher":
          return {
            ...step,
            title: "Profil de votre maison d'édition",
            description: "Permettez-nous de comprendre vos besoins spécifiques"
          };
      }
    }
    
    return step;
  };

  const renderStepContent = () => {
    const currentStepInfo = getStepInfo(currentStep);
    
    switch (currentStepInfo.id) {
      case "welcome":
        return <WelcomeStep />;
      
      case "role":
        return (
          <RoleSelectionStep
            selectedRole={preferences.role}
            onSelectRole={handleRoleSelect}
          />
        );
      
      case "genres":
        return (
          <GenreSelectionStep
            selectedGenres={preferences.favoriteGenres}
            onGenreToggle={handleGenreToggle}
            userRole={preferences.role}
          />
        );
      
      case "specific-questions":
        switch (preferences.role) {
          case "reader":
            return (
              <ReaderQuestionsStep
                readingHabits={preferences.readingHabits || []}
                onReadingHabitsChange={handleReadingHabitsChange}
                preferredFormats={preferences.preferredFormats || []}
                onPreferredFormatsChange={handlePreferredFormatsChange}
              />
            );
          case "writer":
            return (
              <WriterQuestionsStep
                experience={preferences.experience}
                onExperienceChange={handleExperienceChange}
                goals={preferences.goals || []}
                onGoalsChange={handleGoalsChange}
              />
            );
          case "publisher":
            return (
              <PublisherQuestionsStep
                publisherSize={preferences.publisherSize}
                onPublisherSizeChange={handlePublisherSizeChange}
                catalogTypes={preferences.catalogTypes || []}
                onCatalogTypesChange={handleCatalogTypesChange}
                specificNeeds={preferences.specificNeeds || []}
                onSpecificNeedsChange={handleSpecificNeedsChange}
              />
            );
        }
        return null;
      
      case "notifications":
        return (
          <NotificationPreferencesStep
            emailNotifications={preferences.notificationPreferences.email}
            pushNotifications={preferences.notificationPreferences.push}
            onEmailNotificationsChange={(value) => handleNotificationToggle("email", value)}
            onPushNotificationsChange={(value) => handleNotificationToggle("push", value)}
            userRole={preferences.role}
          />
        );
      
      case "completion":
        return (
          <CompletionStep
            userRole={preferences.role}
            onStartJourney={handleStartJourney}
          />
        );
      
      default:
        return null;
    }
  };

  const currentStepInfo = getStepInfo(currentStep);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <OnboardingCard
              title={currentStepInfo.title}
              description={currentStepInfo.description}
              progress={progress}
              onNext={handleNext}
              onBack={handleBack}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
              nextButtonText={currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
            >
              {renderStepContent()}
            </OnboardingCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicateur de progression en bas */}
      <div className="flex justify-center mt-6 gap-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentStep
                ? "bg-primary scale-125"
                : index < currentStep
                ? "bg-primary/50"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
