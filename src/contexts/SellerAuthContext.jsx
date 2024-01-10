import { createContext, useState } from 'react';
import fetchWithTokenRefresh from '../api/fetchWithTokenRefresh';
export const SellerAuthContext = createContext();

export function SellerAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('sellertoken')) || false
  );
  const [SellerProducts, setSellerProducts] = useState(
    JSON.parse(localStorage.getItem('sellerProducts')) || []
  );
  const [SellerOrders, setSellerOrders] = useState(
    JSON.parse(localStorage.getItem('sellerOrders')) || []
  );
  const [DispatchedOrders, setDispatchedOrders] = useState(
    JSON.parse(localStorage.getItem('DispatchedOrders')) || []
  );

  const [seller, setSeller] = useState(
    JSON.parse(localStorage.getItem('seller')) || false
  );
  const fetchProducts = async () => {
    if (SellerProducts.length > 0) return;
    const res = await fetchWithTokenRefresh(
      'sellertoken',
      `${import.meta.env.VITE_SERVERURL}/seller/products`
    );
    setSellerProducts(res);
    localStorage.setItem('sellerProducts', JSON.stringify(res));
  };
  const fetchOrders = async () => {
    if (SellerOrders.length > 0) return;
    const res = await fetchWithTokenRefresh(
      'sellertoken',
      `${import.meta.env.VITE_SERVERURL}/seller/orderRequests`
    );
    const temp1 = res.filter((order) => order.status === 'DISPATCHED');
    setDispatchedOrders(temp1);
    for (let i = res.length - 1; i >= 0; i--) {
      if (res[i].status == 'DISPATCHED') {
        res.splice(i, 1);
      }
    }
    setSellerOrders(res);
    localStorage.setItem('sellerOrders', JSON.stringify(res));
  };
  const login = (res) => {
    setIsAuthenticated(true);
    setSeller(res.seller);
    localStorage.setItem('seller', JSON.stringify(res.seller));
    localStorage.setItem('sellertoken', res.sellertoken);
    localStorage.setItem('sellerrefreshtoken', res.refreshToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setSellerProducts([]);
    setSellerOrders([]);
    setDispatchedOrders([]);
    setSeller({});
    localStorage.removeItem('seller');
    localStorage.removeItem('sellertoken');
    localStorage.removeItem('sellerOrders');
    localStorage.removeItem('sellerProducts');
  };

  const updateSeller = (seller) => {
    setSeller(seller);
    localStorage.setItem('seller', JSON.stringify(seller));
  };
  const changeTransporterStatus = (id) => {
    const temp = SellerOrders.map((order) => {
      if (order.id === id) {
        order.atTransporter = 1;
      }
      return order;
    });
    setSellerOrders(temp);
    localStorage.setItem('sellerOrders', JSON.stringify(temp));
  };

  return (
    <SellerAuthContext.Provider
      value={{
        isAuthenticated,
        seller,
        SellerProducts,
        SellerOrders,
        DispatchedOrders,
        updateSeller,
        login,
        logout,
        fetchProducts,
        fetchOrders,
        changeTransporterStatus,
      }}
    >
      {children}
    </SellerAuthContext.Provider>
  );
}
