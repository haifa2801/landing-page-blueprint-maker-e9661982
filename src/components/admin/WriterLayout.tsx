
import { Outlet } from "react-router-dom";
import { useState } from "react";
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

export default function WriterLayout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [writer] = useState({
    name: "Sophie Marceau",
    email: "sophie.marceau@example.com",
    avatar: null,
    role: "Écrivain"
  });

  const handleNavigation = (section) => {
    setActiveSection(section);
    navigate("/writer-dashboard");
    if (section !== "dashboard") {
      toast({
        title: "Fonctionnalité en développement",
        description: `La section "${section}" sera bientôt disponible.`,
        duration: 3000
      });
    }
  };

  // Sidebar : titres plus courts et uniformes
  const mainMenuItems = [
    { id: "dashboard", title: "Tableau de bord", icon: BarChart3, action: () => handleNavigation("dashboard") },
    { id: "publications", title: "Publications", icon: BookText, action: () => handleNavigation("publications") },
    { id: "readers", title: "Lecteurs", icon: Users, action: () => handleNavigation("readers") },
    { id: "finances", title: "Finance", icon: DollarSign, action: () => handleNavigation("finances") },
    { id: "planning", title: "Calendrier", icon: Calendar, action: () => handleNavigation("planning") }
  ];

  const secondaryMenuItems = [
    { id: "upload", title: "Publier", icon: Upload, action: () => handleNavigation("upload") },
    { id: "documents", title: "Documents", icon: FileText, action: () => handleNavigation("documents") },
    { id: "settings", title: "Paramètres", icon: Settings, action: () => handleNavigation("settings") },
    { id: "help", title: "Aide", icon: HelpCircle, action: () => handleNavigation("help") }
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
              <span className="text-lg font-semibold tracking-tight">Espace Écrivain</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
            <SidebarGroup>
              <SidebarGroupLabel>Outils</SidebarGroupLabel>
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
          <div className="container py-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="text-2xl font-bold">Tableau de bord écrivain</h1>
              </div>
              <Button size="sm" className="flex items-center gap-2" variant="outline" onClick={() => handleNavigation("upload")}>
                <Upload className="h-4 w-4" />
                Publier un livre
              </Button>
            </div>
            {/* Le Outlet s’occupe de l’affichage dynamique */}
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
