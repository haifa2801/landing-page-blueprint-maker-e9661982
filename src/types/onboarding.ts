
export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
};

export type UserPreferences = {
  role: "writer" | "reader";
  favoriteGenres: string[];
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
  bio?: string;
};
