
import React from "react";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface WriterQuestionsStepProps {
  experience: "beginner" | "intermediate" | "advanced" | undefined;
  onExperienceChange: (experience: "beginner" | "intermediate" | "advanced") => void;
  goals: string[];
  onGoalsChange: (goals: string[]) => void;
}

export function WriterQuestionsStep({
  experience,
  onExperienceChange,
  goals,
  onGoalsChange,
}: WriterQuestionsStepProps) {
  
  const handleGoalChange = (goal: string) => {
    if (goals.includes(goal)) {
      onGoalsChange(goals.filter(g => g !== goal));
    } else {
      onGoalsChange([...goals, goal]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h4 className="font-medium text-lg">Quelle est votre expérience en écriture ?</h4>
        <RadioGroup 
          value={experience} 
          onValueChange={(value) => onExperienceChange(value as "beginner" | "intermediate" | "advanced")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="beginner" id="exp-beginner" />
            <Label htmlFor="exp-beginner">Débutant - Je commence tout juste à écrire</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intermediate" id="exp-intermediate" />
            <Label htmlFor="exp-intermediate">Intermédiaire - J'ai écrit quelques œuvres</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="advanced" id="exp-advanced" />
            <Label htmlFor="exp-advanced">Avancé - J'ai déjà publié plusieurs œuvres</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium text-lg">Quels sont vos objectifs sur la plateforme ?</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="goal-visibility" 
              checked={goals.includes("visibility")}
              onCheckedChange={() => handleGoalChange("visibility")} 
            />
            <Label htmlFor="goal-visibility">Gagner en visibilité</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="goal-revenue" 
              checked={goals.includes("revenue")}
              onCheckedChange={() => handleGoalChange("revenue")} 
            />
            <Label htmlFor="goal-revenue">Générer des revenus</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="goal-community" 
              checked={goals.includes("community")}
              onCheckedChange={() => handleGoalChange("community")} 
            />
            <Label htmlFor="goal-community">Construire une communauté de lecteurs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="goal-feedback" 
              checked={goals.includes("feedback")}
              onCheckedChange={() => handleGoalChange("feedback")} 
            />
            <Label htmlFor="goal-feedback">Recevoir des retours sur mes écrits</Label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
