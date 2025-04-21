
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  BookText, DollarSign, Download, Users, 
  TrendingUp, Upload, BarChart3, MapPin 
} from "lucide-react";
import {
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Area, 
  AreaChart,
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Cell
} from "recharts";

// Données fictives pour la démonstration
const MOCK_DATA = {
  summary: {
    totalSales: 2457,
    totalRevenue: 18695.75,
    totalDownloads: 5863,
    weeklyGrowth: "+8.3%",
  },
  books: [
    { id: 101, title: "Le Secret des Étoiles", status: "published", sales: 847, downloads: 1245, avgReading: "72%", revenue: 3580.25 },
    { id: 102, title: "Les Chroniques d'Amalthée", status: "published", sales: 653, downloads: 987, avgReading: "85%", revenue: 2765.50 },
    { id: 103, title: "Voyage au Centre de l'Âme", status: "pending", sales: 0, downloads: 0, avgReading: "0%", revenue: 0 },
    { id: 104, title: "Échos du Passé", status: "draft", sales: 0, downloads: 0, avgReading: "0%", revenue: 0 },
    { id: 105, title: "L'Envol des Corbeaux", status: "published", sales: 957, downloads: 1587, avgReading: "79%", revenue: 4050.00 },
  ],
  salesData: [
    { name: 'Jan', ebook: 1200, audiobook: 800 },
    { name: 'Fév', ebook: 1350, audiobook: 920 },
    { name: 'Mar', ebook: 1400, audiobook: 1050 },
    { name: 'Avr', ebook: 1520, audiobook: 980 },
    { name: 'Mai', ebook: 1800, audiobook: 1200 },
    { name: 'Juin', ebook: 1650, audiobook: 1100 },
  ],
  readerDemographics: [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 25 },
    { name: '45-54', value: 15 },
    { name: '55+', value: 10 },
  ],
  geographicData: [
    { name: 'France', value: 65 },
    { name: 'Canada', value: 12 },
    { name: 'Belgique', value: 8 },
    { name: 'Suisse', value: 7 },
    { name: 'Autres', value: 8 },
  ],
  recentComments: [
    { id: 1, book: "Le Secret des Étoiles", user: "Marie L.", rating: 5, comment: "Une histoire captivante qui m'a tenue en haleine jusqu'à la dernière page.", date: "2025-04-20" },
    { id: 2, book: "L'Envol des Corbeaux", user: "Thomas R.", rating: 4, comment: "Univers très riche et personnages bien développés.", date: "2025-04-19" },
    { id: 3, book: "Les Chroniques d'Amalthée", user: "Sophie M.", rating: 5, comment: "Une vraie révélation! J'attends avec impatience la suite.", date: "2025-04-18" },
  ],
  financials: {
    pendingPayments: 2450.75,
    lastPaymentAmount: 3675.20,
    lastPaymentDate: "2025-04-05",
    yearlyRevenue: 16235.50
  }
};

// Configuration des couleurs pour les graphiques
const chartConfig = {
  ebook: { label: "Ebook", color: "#8B5CF6" },
  audiobook: { label: "Livre audio", color: "#0EA5E9" },
  "18-24": { color: "#D946EF" },
  "25-34": { color: "#8B5CF6" },
  "35-44": { color: "#0EA5E9" },
  "45-54": { color: "#F97316" },
  "55+": { color: "#D6BCFA" },
  "France": { color: "#8B5CF6" },
  "Canada": { color: "#0EA5E9" },
  "Belgique": { color: "#F97316" },
  "Suisse": { color: "#D946EF" },
  "Autres": { color: "#D6BCFA" }
};

const COLORS = ["#8B5CF6", "#0EA5E9", "#F97316", "#D946EF", "#D6BCFA"];

export default function WriterDashboard() {
  const [data, setData] = useState(MOCK_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Simulation du chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Données chargées",
        description: "Votre tableau de bord est prêt",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Fonction pour formater les dates
  function formatDate(dateString: string) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tableau de bord Écrivain</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Exporter les données
          </Button>
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" /> Publier un nouveau livre
          </Button>
        </div>
      </div>
      
      {/* Vue générale - KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Ventes totales" 
          value={data.summary.totalSales} 
          description="Tous formats confondus" 
          icon={<BookText className="h-8 w-8" />}
          isLoading={isLoading} 
        />
        
        <StatCard 
          title="Revenus (€)" 
          value={data.summary.totalRevenue.toLocaleString('fr-FR')} 
          description="Total des ventes" 
          icon={<DollarSign className="h-8 w-8" />}
          isLoading={isLoading} 
        />
        
        <StatCard 
          title="Téléchargements" 
          value={data.summary.totalDownloads} 
          description="Livres et extraits" 
          icon={<Download className="h-8 w-8" />}
          isLoading={isLoading} 
        />
        
        <StatCard 
          title="Croissance" 
          value={data.summary.weeklyGrowth} 
          description="Vs semaine précédente" 
          icon={<TrendingUp className="h-8 w-8" />}
          isLoading={isLoading} 
        />
      </div>
      
      {/* Onglets pour les différentes sections */}
      <Tabs defaultValue="publications" className="space-y-4">
        <TabsListWrapper>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="sales">Ventes</TabsTrigger>
          <TabsTrigger value="readers">Lecteurs</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsListWrapper>
        
        {/* Section Publications */}
        <TabsContent value="publications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes livres publiés</CardTitle>
              <CardDescription>Gérez vos publications et suivez leurs performances</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Ventes</TableHead>
                      <TableHead>Téléchargements</TableHead>
                      <TableHead>Lecture moyenne</TableHead>
                      <TableHead>Revenus (€)</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>
                          <StatusBadge status={book.status} />
                        </TableCell>
                        <TableCell>{book.sales}</TableCell>
                        <TableCell>{book.downloads}</TableCell>
                        <TableCell>{book.avgReading}</TableCell>
                        <TableCell>{book.revenue.toLocaleString('fr-FR')}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Détails</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Section Ventes */}
        <TabsContent value="sales" className="grid md:grid-cols-2 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Évolution des ventes</CardTitle>
              <CardDescription>Ventes mensuelles par format de livre</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-80 w-full bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <ChartContainer config={chartConfig} className="h-80">
                  <AreaChart data={data.salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="ebook" stroke={chartConfig.ebook.color} fill={chartConfig.ebook.color} fillOpacity={0.3} />
                    <Area type="monotone" dataKey="audiobook" stroke={chartConfig.audiobook.color} fill={chartConfig.audiobook.color} fillOpacity={0.3} />
                    <Legend />
                  </AreaChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <CardTitle>Répartition géographique</CardTitle>
              </div>
              <CardDescription>Distribution des ventes par pays</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 w-full bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <ChartContainer config={chartConfig} className="h-64">
                  <PieChart>
                    <Pie
                      data={data.geographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <CardTitle>Performance par format</CardTitle>
              </div>
              <CardDescription>Comparaison ebooks vs livres audio</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 w-full bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <ChartContainer config={chartConfig} className="h-64">
                  <BarChart data={data.salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="ebook" name="Ebook" fill={chartConfig.ebook.color} />
                    <Bar dataKey="audiobook" name="Livre audio" fill={chartConfig.audiobook.color} />
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Section Lecteurs */}
        <TabsContent value="readers" className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <CardTitle>Démographie des lecteurs</CardTitle>
              </div>
              <CardDescription>Répartition par âge</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 w-full bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <ChartContainer config={chartConfig} className="h-64">
                  <PieChart>
                    <Pie
                      data={data.readerDemographics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.readerDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Commentaires récents</CardTitle>
              <CardDescription>Avis des lecteurs sur vos livres</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="py-2">
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))
              ) : (
                <ul className="space-y-4">
                  {data.recentComments.map((comment) => (
                    <li key={comment.id} className="border-b pb-3 last:border-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{comment.user}</p>
                        <div className="flex items-center">
                          {Array(5).fill(0).map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-sm ${i < comment.rating ? "text-yellow-500" : "text-gray-300"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.book}</p>
                      <p className="text-sm mt-1">{comment.comment}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(comment.date)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Voir tous les commentaires</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Section Finance */}
        <TabsContent value="finance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif Financier</CardTitle>
              <CardDescription>Vue d'ensemble de vos revenus</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Revenu annuel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {data.financials.yearlyRevenue.toLocaleString('fr-FR')} €
                      </div>
                      <p className="text-xs text-muted-foreground">Année civile en cours</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Dernier paiement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {data.financials.lastPaymentAmount.toLocaleString('fr-FR')} €
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(data.financials.lastPaymentDate)}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Paiements en attente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {data.financials.pendingPayments.toLocaleString('fr-FR')} €
                      </div>
                      <p className="text-xs text-muted-foreground">Sera versé au prochain cycle</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" /> Relevé des ventes (PDF)
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" /> Factures fiscales (ZIP)
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Composant pour les cartes de statistiques
function StatCard({ title, value, description, icon, isLoading }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// Wrapper pour TabsList avec style responsive
function TabsListWrapper({ children }) {
  return (
    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
      {children}
    </TabsList>
  );
}

// Badge de statut pour les livres
function StatusBadge({ status }) {
  let color = "";
  let label = "";
  
  switch (status) {
    case "published":
      color = "bg-green-100 text-green-800";
      label = "Publié";
      break;
    case "pending":
      color = "bg-yellow-100 text-yellow-800";
      label = "En attente";
      break;
    case "draft":
      color = "bg-gray-100 text-gray-800";
      label = "Brouillon";
      break;
    default:
      color = "bg-gray-100 text-gray-800";
      label = status;
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}
