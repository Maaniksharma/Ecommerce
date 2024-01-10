import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SellerAuthProvider } from './contexts/SellerAuthContext';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SellerRegister from './pages/SellerRegister';
import SellerLogin from './pages/SellerLogin';
import Seller from './pages/Seller';
import './index.css';
import AdminLogin from './pages/AdminLogin';
import AdminUi from './pages/AdminUi';
import Orders from './pages/Orders';
import Transporter from './pages/Transporter';
import { ToastProvider } from './contexts/ToastContext';

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
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/verifyemail?" element={<VerifyEmail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/sellerregister" element={<SellerRegister />} />
                  <Route path="/sellerLogin" element={<SellerLogin />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/adminui" element={<AdminUi />} />
                  <Route path="/seller" element={<Seller />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/transporter" element={<Transporter />} />
                </Routes>
              </SellerAuthProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
