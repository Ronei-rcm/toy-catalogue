import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from './components/ui/toaster';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/Admin/Dashboard';
import CartPage from './pages/Cart';
import CatalogPage from './pages/Catalog';
import CategoriesPage from './pages/Categories';
import NewReleasesPage from './pages/NewReleases';
import PromotionsPage from './pages/Promotions';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ProfilePage from './pages/Profile';
import AddProductPage from './pages/Admin/AddProduct';
import EditProductPage from './pages/Admin/EditProduct';
import ProductsListPage from './pages/Admin/ProductsList';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Componente para rotas protegidas
const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Componente para rotas de cliente protegidas
const ProtectedClientRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/produtos/novo" element={
            <ProtectedAdminRoute>
              <AddProductPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/produtos" element={
            <ProtectedAdminRoute>
              <ProductsListPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/produtos/editar/:id" element={
            <ProtectedAdminRoute>
              <EditProductPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/lancamentos" element={<NewReleasesPage />} />
          <Route path="/promocoes" element={<PromotionsPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<SignupPage />} />
          <Route path="/perfil" element={
            <ProtectedClientRoute>
              <ProfilePage />
            </ProtectedClientRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
