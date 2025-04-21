
import { Outlet } from "react-router-dom";

/**
 * Layout simple pour la dashboard écrivain, sans sidebar admin.
 * Juste un conteneur principal pour inclure la dashboard écrivain et autres pages futures d'écrivain.
 */
export default function WriterLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6">Espace Écrivain</h1>
      <Outlet />
    </div>
  );
}
