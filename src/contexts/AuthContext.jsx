/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import fetchWithTokenRefresh from '../api/fetchWithTokenRefresh';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {}
  );
  const [customerOrders, setCustomerOrders] = useState(
    JSON.parse(localStorage.getItem('customerOrders')) || []
  );

  const login = (res) => {
    setIsAuthenticated(true);
    setUser(res.user);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('token', res.token);
    localStorage.setItem('refreshtoken', res.refreshToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({});
    setCustomerOrders([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('customerOrders');
  };

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  async function fetchOrders() {
    if (customerOrders.length > 0) return;
    console.log('come here');
    const response = await fetchWithTokenRefresh(
      'token',
      `${import.meta.env.VITE_SERVERURL}/user/orders`
    );
    localStorage.setItem('customerOrders', JSON.stringify(response));
    console.log(response);
    setCustomerOrders(response);
    return;
  }
  const transferOrders = async (cartItems) => {
    const temp = cartItems.map((item) => {
      return { ...item, status: 'NOT DISPACTHED' };
    });
    setCustomerOrders((prev) => [...prev, ...temp]);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        customerOrders,
        login,
        logout,
        updateUser,
        fetchOrders,
        transferOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
