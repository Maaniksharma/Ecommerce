/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SellerAuthProvider } from './contexts/SellerAuthContext';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
const Signup = lazy(() => import('./pages/Signup'));
// import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
const Cart = lazy(() => import('./pages/Cart'));
// import Cart from './pages/Cart';
const Checkout = lazy(() => import('./pages/Checkout'));
// import Checkout from './pages/Checkout';
const SellerRegister = lazy(() => import('./pages/SellerRegister'));
// import SellerRegister from './pages/SellerRegister';
const SellerLogin = lazy(() => import('./pages/SellerLogin'));
// import SellerLogin from './pages/SellerLogin';
const Seller = lazy(() => import('./pages/Seller'));
// import Seller from './pages/Seller';
const SellerOrdersUi = lazy(() => import('./pages/SellerOrdersUi'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
// import AdminLogin from './pages/AdminLogin';
const AdminUi = lazy(() => import('./pages/AdminUi'));
// import AdminUi from './pages/AdminUi';
const Orders = lazy(() => import('./pages/Orders'));
// import Orders from './pages/Orders';
const Transporter = lazy(() => import('./pages/Transporter'));
// import Transporter from './pages/Transporter';
import { ToastProvider } from './contexts/ToastContext';
import PageLoader from './components/PageLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <SellerAuthProvider>
                <Navbar />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verifyemail?" element={<VerifyEmail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                      path="/sellerregister"
                      element={<SellerRegister />}
                    />
                    <Route path="/sellerLogin" element={<SellerLogin />} />
                    <Route path="/seller" element={<Seller />} />
                    <Route path="/sellerorders" element={<SellerOrdersUi />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/adminui" element={<AdminUi />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/transporter" element={<Transporter />} />
                  </Routes>
                </Suspense>
              </SellerAuthProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
