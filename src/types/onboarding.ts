
export type UserRole = "reader" | "writer" | "publisher";

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
};

export type UserPreferences = {
  role: UserRole;
  favoriteGenres: string[];
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
  experience?: "beginner" | "intermediate" | "advanced";
  goals?: string[];
  readingHabits?: string[];
  preferredFormats?: ("ebook" | "audio" | "print")[];
  publisherSize?: "small" | "medium" | "large";
  catalogTypes?: string[];
  specificNeeds?: string[];
  bio?: string;
};

export type OnboardingProgress = {
  completedSteps: string[];
  currentStep: string;
  percentComplete: number;
};
