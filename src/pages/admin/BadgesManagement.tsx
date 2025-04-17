
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Award, PlusCircle, CheckCircle2, XCircle, Pencil, Trash2, Search, Users, BookText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Données fictives pour la démonstration
const MOCK_BADGES = [
  { id: 1, name: "Top Writer", description: "Écrivains avec une note moyenne supérieure à 4.5", icon: "star", color: "gold", type: "writer" },
  { id: 2, name: "Verified", description: "Écrivain vérifié par la plateforme", icon: "check-circle", color: "blue", type: "writer" },
  { id: 3, name: "Rising Star", description: "Nouvel écrivain avec croissance rapide", icon: "trending-up", color: "purple", type: "writer" },
  { id: 4, name: "Premium", description: "Lecteur avec un abonnement premium", icon: "crown", color: "amber", type: "reader" },
  { id: 5, name: "Book Worm", description: "Lecteur avec plus de 50 livres achetés", icon: "book", color: "green", type: "reader" },
  { id: 6, name: "Beta Reader", description: "Lecteur qui participe aux tests bêta", icon: "flag", color: "red", type: "reader" },
];

const MOCK_BADGE_ASSIGNMENTS = Array(25).fill(0).map((_, i) => {
  const badgeId = (i % 6) + 1;
  const badge = MOCK_BADGES.find(b => b.id === badgeId);
  const userType = badge.type;
  
  return {
    id: i + 1,
    badgeId,
    badgeName: badge.name,
    userId: i % 10 + 1,
    userName: `${userType === "writer" ? "Écrivain" : "Lecteur"} ${i % 10 + 1}`,
    userType,
    assignedDate: new Date(2025, 3, 15 - i % 30).toISOString(),
  };
});

const MOCK_BUSINESS_REQUESTS = Array(10).fill(0).map((_, i) => ({
  id: i + 1,
  companyName: `Entreprise ${i + 1}`,
  contactName: `Contact ${i + 1}`,
  email: `business${i + 1}@example.com`,
  phone: `0123456${i.toString().padStart(3, '0')}`,
  requestDate: new Date(2025, 3, 15 - i % 30).toISOString(),
  status: i % 3 === 0 ? "approved" : i % 3 === 1 ? "rejected" : "pending",
  booksQuantity: Math.floor(Math.random() * 990) + 10,
  notes: `Demande d'achat en gros pour une bibliothèque d'entreprise. Intéressé par ${i % 2 === 0 ? "les ebooks" : "les livres audio"}.`
}));

export default function BadgesManagement() {
  const [badges, setBadges] = useState(MOCK_BADGES);
  const [badgeAssignments, setBadgeAssignments] = useState(MOCK_BADGE_ASSIGNMENTS);
  const [businessRequests, setBusinessRequests] = useState(MOCK_BUSINESS_REQUESTS);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtres et pagination pour les badges
  const [badgesPage, setBadgesPage] = useState(1);
  const [badgeSearch, setBadgeSearch] = useState("");
  const [filteredBadges, setFilteredBadges] = useState(badges);
  
  // Filtres et pagination pour les assignments
  const [assignmentsPage, setAssignmentsPage] = useState(1);
  const [assignmentSearch, setAssignmentSearch] = useState("");
  const [filteredAssignments, setFilteredAssignments] = useState(badgeAssignments);
  
  // Filtres et pagination pour les demandes business
  const [businessPage, setBusinessPage] = useState(1);
  const [businessStatusFilter, setBusinessStatusFilter] = useState("all");
  const [filteredBusinessRequests, setFilteredBusinessRequests] = useState(businessRequests);
  
  // Dialog states
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isBadgeDialogOpen, setIsBadgeDialogOpen] = useState(false);
  const [badgeFormMode, setBadgeFormMode] = useState("add");
  
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  
  const [selectedBusinessRequest, setSelectedBusinessRequest] = useState(null);
  const [isBusinessDialogOpen, setIsBusinessDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  
  // Formulaire badge
  const [badgeForm, setBadgeForm] = useState({
    name: "",
    description: "",
    icon: "star",
    color: "blue",
    type: "writer"
  });
  
  // Nombre d'éléments par page
  const itemsPerPage = 10;
  
  const { toast } = useToast();

  // Simulation du chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage des badges
  useEffect(() => {
    let results = badges;
    
    if (badgeSearch) {
      results = results.filter(
        badge => badge.name.toLowerCase().includes(badgeSearch.toLowerCase()) || 
                 badge.description.toLowerCase().includes(badgeSearch.toLowerCase())
      );
    }
    
    setFilteredBadges(results);
  }, [badgeSearch, badges]);

  // Filtrage des assignments
  useEffect(() => {
    let results = badgeAssignments;
    
    if (assignmentSearch) {
      results = results.filter(
        assignment => assignment.userName.toLowerCase().includes(assignmentSearch.toLowerCase()) || 
                      assignment.badgeName.toLowerCase().includes(assignmentSearch.toLowerCase())
      );
    }
    
    setFilteredAssignments(results);
  }, [assignmentSearch, badgeAssignments]);

  // Filtrage des demandes business
  useEffect(() => {
    let results = businessRequests;
    
    if (businessStatusFilter !== "all") {
      results = results.filter(request => request.status === businessStatusFilter);
    }
    
    setFilteredBusinessRequests(results);
  }, [businessStatusFilter, businessRequests]);

  // Pagination
  const badgeItems = filteredBadges.slice((badgesPage - 1) * itemsPerPage, badgesPage * itemsPerPage);
  const badgesTotalPages = Math.ceil(filteredBadges.length / itemsPerPage);

  const assignmentItems = filteredAssignments.slice((assignmentsPage - 1) * itemsPerPage, assignmentsPage * itemsPerPage);
  const assignmentsTotalPages = Math.ceil(filteredAssignments.length / itemsPerPage);

  const businessItems = filteredBusinessRequests.slice((businessPage - 1) * itemsPerPage, businessPage * itemsPerPage);
  const businessTotalPages = Math.ceil(filteredBusinessRequests.length / itemsPerPage);

  // Handlers pour les badges
  const handleAddBadge = () => {
    setBadgeForm({
      name: "",
      description: "",
      icon: "star",
      color: "blue",
      type: "writer"
    });
    setBadgeFormMode("add");
    setIsBadgeDialogOpen(true);
  };

  const handleEditBadge = (badge) => {
    setSelectedBadge(badge);
    setBadgeForm({
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      color: badge.color,
      type: badge.type
    });
    setBadgeFormMode("edit");
    setIsBadgeDialogOpen(true);
  };
  
  const handleDeleteBadge = (badge) => {
    setSelectedBadge(badge);
    setActionType("deleteBadge");
    setIsActionDialogOpen(true);
  };

  const saveBadge = () => {
    setIsBadgeDialogOpen(false);
    
    if (badgeFormMode === "add") {
      const newBadge = {
        id: Math.max(...badges.map(b => b.id)) + 1,
        ...badgeForm
      };
      
      setBadges([...badges, newBadge]);
      
      toast({
        title: "Badge créé",
        description: `Le badge "${badgeForm.name}" a été créé avec succès`,
      });
    } else {
      setBadges(badges.map(b => 
        b.id === selectedBadge.id ? { ...b, ...badgeForm } : b
      ));
      
      toast({
        title: "Badge mis à jour",
        description: `Le badge "${badgeForm.name}" a été mis à jour avec succès`,
      });
    }
  };

  // Handlers pour les assignments
  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setIsAssignmentDialogOpen(true);
  };
  
  const handleDeleteAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setActionType("deleteAssignment");
    setIsActionDialogOpen(true);
  };

  // Handlers pour les demandes business
  const handleViewBusinessRequest = (request) => {
    setSelectedBusinessRequest(request);
    setIsBusinessDialogOpen(true);
  };
  
  const handleBusinessAction = (request, action) => {
    setSelectedBusinessRequest(request);
    setActionType(action);
    setIsActionDialogOpen(true);
  };

  // Effectuer une action
  const performAction = () => {
    setIsActionDialogOpen(false);
    
    if (actionType === "deleteBadge") {
      // Supprimer le badge
      setBadges(badges.filter(b => b.id !== selectedBadge.id));
      // Supprimer également les assignments liés
      setBadgeAssignments(badgeAssignments.filter(a => a.badgeId !== selectedBadge.id));
      
      toast({
        title: "Badge supprimé",
        description: `Le badge "${selectedBadge.name}" a été supprimé avec succès`,
      });
    } else if (actionType === "deleteAssignment") {
      setBadgeAssignments(badgeAssignments.filter(a => a.id !== selectedAssignment.id));
      
      toast({
        title: "Attribution supprimée",
        description: `L'attribution du badge "${selectedAssignment.badgeName}" à "${selectedAssignment.userName}" a été supprimée`,
      });
    } else if (actionType === "approveRequest" || actionType === "rejectRequest") {
      const newStatus = actionType === "approveRequest" ? "approved" : "rejected";
      
      setBusinessRequests(businessRequests.map(r => 
        r.id === selectedBusinessRequest.id ? { ...r, status: newStatus } : r
      ));
      
      const actionText = newStatus === "approved" ? "approuvée" : "rejetée";
      toast({
        title: `Demande ${actionText}`,
        description: `La demande de "${selectedBusinessRequest.companyName}" a été ${actionText} avec succès`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des badges et demandes business</h1>
      
      <Tabs defaultValue="badges">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="badges">
            <Award className="h-4 w-4 mr-2" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <Users className="h-4 w-4 mr-2" />
            Attributions
          </TabsTrigger>
          <TabsTrigger value="business">
            <BookText className="h-4 w-4 mr-2" />
            Demandes Business
          </TabsTrigger>
        </TabsList>
        
        {/* Onglet Badges */}
        <TabsContent value="badges" className="space-y-6 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Liste des badges</CardTitle>
              <Button onClick={handleAddBadge}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouveau badge
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <div className="relative w-full md:w-1/2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un badge..."
                    className="pl-8"
                    value={badgeSearch}
                    onChange={(e) => setBadgeSearch(e.target.value)}
                  />
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        {Array(5).fill(0).map((_, j) => (
                          <TableCell key={j}>
                            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : badgeItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        Aucun badge trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    badgeItems.map((badge) => (
                      <TableRow key={badge.id}>
                        <TableCell>{badge.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`p-1 rounded-full bg-${badge.color}-100`}>
                              <Award className={`h-4 w-4 text-${badge.color}-500`} />
                            </span>
                            {badge.name}
                          </div>
                        </TableCell>
                        <TableCell>{badge.description}</TableCell>
                        <TableCell>
                          {badge.type === "writer" ? "Écrivain" : "Lecteur"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleEditBadge(badge)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleDeleteBadge(badge)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              {badgesTotalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setBadgesPage(prev => Math.max(prev - 1, 1))}
                          disabled={badgesPage === 1}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, badgesTotalPages) }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            isActive={badgesPage === i + 1}
                            onClick={() => setBadgesPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setBadgesPage(prev => Math.min(prev + 1, badgesTotalPages))}
                          disabled={badgesPage === badgesTotalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Onglet Attributions */}
        <TabsContent value="assignments" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Attributions des badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <div className="relative w-full md:w-1/2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une attribution..."
                    className="pl-8"
                    value={assignmentSearch}
                    onChange={(e) => setAssignmentSearch(e.target.value)}
                  />
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Badge</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date d'attribution</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        {Array(5).fill(0).map((_, j) => (
                          <TableCell key={j}>
                            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : assignmentItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        Aucune attribution trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    assignmentItems.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>{assignment.badgeName}</TableCell>
                        <TableCell>{assignment.userName}</TableCell>
                        <TableCell>
                          {assignment.userType === "writer" ? "Écrivain" : "Lecteur"}
                        </TableCell>
                        <TableCell>{formatDate(assignment.assignedDate)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleViewAssignment(assignment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleDeleteAssignment(assignment)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              {assignmentsTotalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setAssignmentsPage(prev => Math.max(prev - 1, 1))}
                          disabled={assignmentsPage === 1}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, assignmentsTotalPages) }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            isActive={assignmentsPage === i + 1}
                            onClick={() => setAssignmentsPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setAssignmentsPage(prev => Math.min(prev + 1, assignmentsTotalPages))}
                          disabled={assignmentsPage === assignmentsTotalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Onglet Business */}
        <TabsContent value="business" className="space-y-6 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Demandes d'achat en gros</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant={businessStatusFilter === "all" ? "default" : "outline"} 
                  onClick={() => setBusinessStatusFilter("all")}
                >
                  Toutes
                </Button>
                <Button 
                  variant={businessStatusFilter === "pending" ? "default" : "outline"} 
                  onClick={() => setBusinessStatusFilter("pending")}
                >
                  En attente
                </Button>
                <Button 
                  variant={businessStatusFilter === "approved" ? "default" : "outline"} 
                  onClick={() => setBusinessStatusFilter("approved")}
                >
                  Approuvées
                </Button>
                <Button 
                  variant={businessStatusFilter === "rejected" ? "default" : "outline"} 
                  onClick={() => setBusinessStatusFilter("rejected")}
                >
                  Rejetées
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Quantité</TableHead>
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
                  ) : businessItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        Aucune demande trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    businessItems.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.companyName}</TableCell>
                        <TableCell>{request.contactName}</TableCell>
                        <TableCell>{formatDate(request.requestDate)}</TableCell>
                        <TableCell>{request.booksQuantity} livres</TableCell>
                        <TableCell>
                          <BusinessStatusBadge status={request.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleViewBusinessRequest(request)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            {request.status === "pending" && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => handleBusinessAction(request, "approveRequest")}
                                >
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                </Button>
                                
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => handleBusinessAction(request, "rejectRequest")}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              {businessTotalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setBusinessPage(prev => Math.max(prev - 1, 1))}
                          disabled={businessPage === 1}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, businessTotalPages) }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            isActive={businessPage === i + 1}
                            onClick={() => setBusinessPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setBusinessPage(prev => Math.min(prev + 1, businessTotalPages))}
                          disabled={businessPage === businessTotalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog pour ajouter/modifier un badge */}
      <Dialog open={isBadgeDialogOpen} onOpenChange={setIsBadgeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {badgeFormMode === "add" ? "Ajouter un nouveau badge" : "Modifier le badge"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="badge-name">Nom du badge</label>
              <Input
                id="badge-name"
                value={badgeForm.name}
                onChange={(e) => setBadgeForm({ ...badgeForm, name: e.target.value })}
                placeholder="Ex: Top Writer"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="badge-description">Description</label>
              <Input
                id="badge-description"
                value={badgeForm.description}
                onChange={(e) => setBadgeForm({ ...badgeForm, description: e.target.value })}
                placeholder="Ex: Écrivains avec une note moyenne supérieure à 4.5"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="badge-color">Couleur</label>
                <select
                  id="badge-color"
                  value={badgeForm.color}
                  onChange={(e) => setBadgeForm({ ...badgeForm, color: e.target.value })}
                  className="w-full rounded-md border p-2"
                >
                  <option value="blue">Bleu</option>
                  <option value="green">Vert</option>
                  <option value="red">Rouge</option>
                  <option value="purple">Violet</option>
                  <option value="amber">Ambre</option>
                  <option value="gold">Or</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="badge-type">Type d'utilisateur</label>
                <select
                  id="badge-type"
                  value={badgeForm.type}
                  onChange={(e) => setBadgeForm({ ...badgeForm, type: e.target.value })}
                  className="w-full rounded-md border p-2"
                >
                  <option value="writer">Écrivain</option>
                  <option value="reader">Lecteur</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBadgeDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={saveBadge} disabled={!badgeForm.name.trim()}>
              {badgeFormMode === "add" ? "Ajouter" : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog pour voir les détails d'une attribution */}
      {selectedAssignment && (
        <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Détails de l'attribution</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID</p>
                  <p>{selectedAssignment.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date d'attribution</p>
                  <p>{formatDate(selectedAssignment.assignedDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Badge</p>
                  <p>{selectedAssignment.badgeName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Badge</p>
                  <p>{selectedAssignment.badgeId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Utilisateur</p>
                  <p>{selectedAssignment.userName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Utilisateur</p>
                  <p>{selectedAssignment.userId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type d'utilisateur</p>
                  <p>{selectedAssignment.userType === "writer" ? "Écrivain" : "Lecteur"}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Dialog pour voir les détails d'une demande business */}
      {selectedBusinessRequest && (
        <Dialog open={isBusinessDialogOpen} onOpenChange={setIsBusinessDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Détails de la demande</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID</p>
                  <p>{selectedBusinessRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{formatDate(selectedBusinessRequest.requestDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Entreprise</p>
                  <p>{selectedBusinessRequest.companyName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contact</p>
                  <p>{selectedBusinessRequest.contactName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{selectedBusinessRequest.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                  <p>{selectedBusinessRequest.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Quantité</p>
                  <p>{selectedBusinessRequest.booksQuantity} livres</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <BusinessStatusBadge status={selectedBusinessRequest.status} />
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Notes</p>
                  <p className="text-sm mt-1">{selectedBusinessRequest.notes}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Dialog de confirmation d'action */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer l'action</DialogTitle>
            <DialogDescription>
              {actionType === "deleteBadge" && `Êtes-vous sûr de vouloir supprimer le badge "${selectedBadge?.name}" ?`}
              {actionType === "deleteAssignment" && `Êtes-vous sûr de vouloir supprimer l'attribution du badge "${selectedAssignment?.badgeName}" à "${selectedAssignment?.userName}" ?`}
              {actionType === "approveRequest" && `Êtes-vous sûr de vouloir approuver la demande de "${selectedBusinessRequest?.companyName}" ?`}
              {actionType === "rejectRequest" && `Êtes-vous sûr de vouloir rejeter la demande de "${selectedBusinessRequest?.companyName}" ?`}
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
    </div>
  );
}

// Composant pour afficher le statut des demandes business avec un badge
function BusinessStatusBadge({ status }) {
  switch (status) {
    case "pending":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
          En attente
        </span>
      );
    case "approved":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Approuvée
        </span>
      );
    case "rejected":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
          Rejetée
        </span>
      );
    default:
      return null;
  }
}

// Fonction pour formater les dates
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}
