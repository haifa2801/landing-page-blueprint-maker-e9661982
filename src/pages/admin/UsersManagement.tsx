
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Eye, Ban, UserCheck, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Données fictives pour la démonstration
const MOCK_USERS = Array(50).fill(0).map((_, i) => ({
  id: i + 1,
  name: `Utilisateur ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "writer" : "reader",
  registrationDate: new Date(2025, 3, 15 - i % 30).toISOString(),
  status: i % 10 === 0 ? "banned" : "active"
}));

export default function UsersManagement() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialog states
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  const { toast } = useToast();

  // Simulation du chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage des utilisateurs
  useEffect(() => {
    let results = users;
    
    if (searchTerm) {
      results = results.filter(
        user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (roleFilter !== "all") {
      results = results.filter(user => user.role === roleFilter);
    }
    
    if (statusFilter !== "all") {
      results = results.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(results);
  }, [searchTerm, roleFilter, statusFilter, users]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Actions handlers
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };
  
  const handleActionClick = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setIsActionDialogOpen(true);
  };
  
  const performAction = () => {
    setIsActionDialogOpen(false);
    
    // Dans une application réelle, ceci appellerait une API
    if (actionType === "ban") {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, status: "banned" } : user
      ));
      
      toast({
        title: "Utilisateur banni",
        description: `${selectedUser.name} a été banni avec succès`,
      });
    } else if (actionType === "activate") {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, status: "active" } : user
      ));
      
      toast({
        title: "Utilisateur activé",
        description: `${selectedUser.name} a été activé avec succès`,
      });
    } else if (actionType === "changeRole") {
      const newRole = selectedUser.role === "reader" ? "writer" : "reader";
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, role: newRole } : user
      ));
      
      toast({
        title: "Rôle modifié",
        description: `${selectedUser.name} est maintenant un ${newRole === "writer" ? "écrivain" : "lecteur"}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <Select 
                value={roleFilter} 
                onValueChange={setRoleFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="writer">Écrivains</SelectItem>
                  <SelectItem value="reader">Lecteurs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-1/3">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="banned">Bannis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    {Array(7).fill(0).map((_, j) => (
                      <TableCell key={j}>
                        <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role === "writer" ? "Écrivain" : "Lecteur"}</TableCell>
                    <TableCell>{formatDate(user.registrationDate)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {user.status === "active" ? "Actif" : "Banni"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {user.status === "active" ? (
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleActionClick(user, "ban")}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleActionClick(user, "activate")}
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          onClick={() => handleActionClick(user, "changeRole")}
                        >
                          {user.role === "writer" ? "→ Lecteur" : "→ Écrivain"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink 
                isActive={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          {totalPages > 5 && (
            <PaginationItem>
              <span className="px-2">...</span>
            </PaginationItem>
          )}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      {/* Détails de l'utilisateur */}
      {selectedUser && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Détails de l'utilisateur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID</p>
                  <p>{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nom</p>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rôle</p>
                  <p>{selectedUser.role === "writer" ? "Écrivain" : "Lecteur"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date d'inscription</p>
                  <p>{formatDate(selectedUser.registrationDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <p>{selectedUser.status === "active" ? "Actif" : "Banni"}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Dialogue de confirmation d'action */}
      {selectedUser && (
        <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer l'action</DialogTitle>
              <DialogDescription>
                {actionType === "ban" && `Êtes-vous sûr de vouloir bannir ${selectedUser.name} ?`}
                {actionType === "activate" && `Êtes-vous sûr de vouloir activer ${selectedUser.name} ?`}
                {actionType === "changeRole" && `Êtes-vous sûr de vouloir changer le rôle de ${selectedUser.name} de ${selectedUser.role === "writer" ? "écrivain à lecteur" : "lecteur à écrivain"} ?`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={performAction}>
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Fonction pour formater les dates
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}
