import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import IntegratedAdminPanel from './components/IntegratedAdminPanel';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import WishlistPage from './pages/WishlistPage';
import CartCheckoutPage from './pages/CartCheckoutPage';
import AboutMapPage from './pages/AboutMapPage';
import OwnerDashboard from './pages/OwnerDashboard';

function MainShopLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <IntegratedAdminPanel />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// When accessing /admin, stay on the same page with Admin Panel opened
function AdminRouteHandler() {
  const { setIsAdminPanelOpen } = useApp();
  useEffect(() => {
    setIsAdminPanelOpen(true);
  }, [setIsAdminPanelOpen]);

  return (
    <MainShopLayout>
      <HomePage />
    </MainShopLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Main Shop Routes with Storefront Header, Integrated In-Page Admin Panel & Footer */}
          <Route path="/" element={<MainShopLayout><HomePage /></MainShopLayout>} />
          <Route path="/shop" element={<MainShopLayout><ShopPage /></MainShopLayout>} />
          <Route path="/wishlist" element={<MainShopLayout><WishlistPage /></MainShopLayout>} />
          <Route path="/cart" element={<MainShopLayout><CartCheckoutPage /></MainShopLayout>} />
          <Route path="/about" element={<MainShopLayout><AboutMapPage /></MainShopLayout>} />
          
          {/* Admin Panel is integrated on the same page */}
          <Route path="/admin" element={<AdminRouteHandler />} />

          {/* Standalone Owner / Superadmin Dashboard */}
          <Route path="/owner" element={<OwnerDashboard />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
