
import React from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationPreferencesStepProps {
  emailNotifications: boolean;
  pushNotifications: boolean;
  onEmailNotificationsChange: (enabled: boolean) => void;
  onPushNotificationsChange: (enabled: boolean) => void;
  userRole: "reader" | "writer" | "publisher";
}

export function NotificationPreferencesStep({
  emailNotifications,
  pushNotifications,
  onEmailNotificationsChange,
  onPushNotificationsChange,
  userRole,
}: NotificationPreferencesStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          Configurez comment vous souhaitez être informé(e) des nouveautés et mises à jour
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Notifications par email</h4>
            <p className="text-sm text-muted-foreground">
              {userRole === "reader" && "Recevez des recommandations de lecture et des alertes sur les nouveaux livres"}
              {userRole === "writer" && "Recevez des alertes sur les ventes, commentaires et performances de vos œuvres"}
              {userRole === "publisher" && "Recevez des alertes sur les ventes, rapports financiers et performances du catalogue"}
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={onEmailNotificationsChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Notifications push</h4>
            <p className="text-sm text-muted-foreground">
              {userRole === "reader" && "Recevez des notifications instantanées sur votre appareil"}
              {userRole === "writer" && "Soyez alerté(e) immédiatement des interactions avec vos œuvres"}
              {userRole === "publisher" && "Recevez des alertes en temps réel sur l'activité de votre catalogue"}
            </p>
          </div>
          <Switch
            checked={pushNotifications}
            onCheckedChange={onPushNotificationsChange}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-muted/50 p-4 rounded-md"
      >
        <p className="text-sm text-muted-foreground">
          Vous pourrez ajuster vos préférences de notification à tout moment dans les paramètres de votre compte.
        </p>
      </motion.div>
    </motion.div>
  );
}
