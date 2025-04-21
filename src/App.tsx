
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookDetail from "./pages/BookDetail";
import AuthorPage from "./pages/AuthorPage";
import EbookCategories from "./pages/EbookCategories";
import AudiobookCategories from "./pages/AudiobookCategories";
import CategoryPage from "./pages/CategoryPage";
import WriterLayout from "./components/admin/WriterLayout";

// Pages admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import WriterDashboard from "./pages/admin/WriterDashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import BooksManagement from "./pages/admin/BooksManagement";
import TransactionsManagement from "./pages/admin/TransactionsManagement";
import ReportsManagement from "./pages/admin/ReportsManagement";
import BadgesManagement from "./pages/admin/BadgesManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Index />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/author/:authorId" element={<AuthorPage />} />
            <Route path="/categories/ebooks" element={<EbookCategories />} />
            <Route path="/categories/audiobooks" element={<AudiobookCategories />} />
            <Route path="/category/:type/:categoryName" element={<CategoryPage />} />
            
            {/* Routes admin */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="books" element={<BooksManagement />} />
              <Route path="transactions" element={<TransactionsManagement />} />
              <Route path="reports" element={<ReportsManagement />} />
              <Route path="badges" element={<BadgesManagement />} />
            </Route>

            {/* Espace écrivain séparé */}
            <Route path="/writer-dashboard" element={<WriterLayout />}>
              <Route index element={<WriterDashboard />} />
            </Route>
            
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
