
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookText, BarChart3, Users, DollarSign, Settings, Upload, FileText, Calendar, HelpCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * Layout complet pour l'espace écrivain avec sidebar et structure dédiée
 */
export default function WriterLayout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("dashboard");
  
  // Simuler un état de connexion (à remplacer par une véritable authentification)
  const [writer, setWriter] = useState({
    name: "Sophie Marceau",
    email: "sophie.marceau@example.com",
    avatar: null,
    role: "Écrivain"
  });

  // Navigation dans les sections du dashboard
  const handleNavigation = (section) => {
    setActiveSection(section);
    // Pour le moment, tout redirige vers le dashboard général
    // À terme, chaque section pourrait avoir sa propre route
    navigate("/writer-dashboard");
    
    // Simuler une navigation vers des sections futures
    if (section !== "dashboard") {
      toast({
        title: "Fonctionnalité en développement",
        description: `La section "${section}" sera bientôt disponible.`,
        duration: 3000
      });
    }
  };

  // Menu principal de la sidebar
  const mainMenuItems = [
    { 
      id: "dashboard", 
      title: "Tableau de bord", 
      icon: BarChart3,
      action: () => handleNavigation("dashboard")
    },
    { 
      id: "publications", 
      title: "Publications", 
      icon: BookText,
      action: () => handleNavigation("publications")
    },
    { 
      id: "readers", 
      title: "Mes lecteurs", 
      icon: Users,
      action: () => handleNavigation("readers")
    },
    { 
      id: "finances", 
      title: "Finances", 
      icon: DollarSign,
      action: () => handleNavigation("finances")
    },
    { 
      id: "planning", 
      title: "Calendrier", 
      icon: Calendar,
      action: () => handleNavigation("planning")
    }
  ];

  // Menu secondaire de la sidebar
  const secondaryMenuItems = [
    { 
      id: "upload", 
      title: "Publier un livre", 
      icon: Upload,
      action: () => handleNavigation("upload")
    },
    { 
      id: "documents", 
      title: "Documents", 
      icon: FileText,
      action: () => handleNavigation("documents")
    },
    { 
      id: "settings", 
      title: "Paramètres", 
      icon: Settings,
      action: () => handleNavigation("settings")
    },
    { 
      id: "help", 
      title: "Aide & Support", 
      icon: HelpCircle,
      action: () => handleNavigation("help")
    }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
                <BookText size={18} />
              </div>
              <div className="text-lg font-semibold tracking-tight">Espace Écrivain</div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            {/* Menu principal */}
            <SidebarGroup>
              <SidebarGroupLabel>Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainMenuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        onClick={item.action}
                        tooltip={item.title}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            {/* Menu secondaire */}
            <SidebarGroup>
              <SidebarGroupLabel>Outils & Gestion</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {secondaryMenuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        onClick={item.action}
                        tooltip={item.title}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={writer.avatar} alt={writer.name} />
                <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden text-sm">
                <span className="font-medium truncate">{writer.name}</span>
                <span className="text-xs text-muted-foreground truncate">{writer.email}</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        {/* Contenu principal */}
        <div className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="text-2xl font-bold">Tableau de Bord Écrivain</h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Publier un livre
                </Button>
              </div>
            </div>
            
            {/* Contenu dynamique via Outlet */}
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
