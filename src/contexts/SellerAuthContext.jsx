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
  let averageDispatchTimeInDays = localStorage.getItem(
    'averageDispatchTimeInDays'
  );
  let averageDeliveryTimeInDays = localStorage.getItem(
    'averageDeliveryTimeInDays'
  );
  let ordersLastMonth = localStorage.getItem('ordersLastMonth');
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
    // Assuming `orders` is your array of orders
    console.log(res);
    const lastMonthOrders = res.filter((order) => {
      const orderDate = new Date(order.Created_at);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth());
      return (
        orderDate.getFullYear() === lastMonth.getFullYear() &&
        orderDate.getMonth() === lastMonth.getMonth()
      );
    });
    ordersLastMonth = lastMonthOrders.length;
    console.log(lastMonthOrders);
    localStorage.setItem('ordersLastMonth', ordersLastMonth);
    const dispatchTimes = lastMonthOrders.map(
      (order) => new Date(order.Dispatched_at) - new Date(order.Created_at)
    );
    const deliveryTimes = lastMonthOrders.map(
      (order) => new Date(order.Delivered_at) - new Date(order.Dispatched_at)
    );
    console.log(dispatchTimes, deliveryTimes);

    const averageDispatchTime =
      dispatchTimes.reduce((a, b) => a + b, 0) / dispatchTimes.length;
    const averageDeliveryTime =
      deliveryTimes.reduce((a, b) => a + b, 0) / deliveryTimes.length;
    console.log(averageDispatchTime, averageDeliveryTime);
    // Convert milliseconds to days
    averageDispatchTimeInDays = averageDispatchTime / (1000 * 60 * 60 * 24);
    localStorage.setItem(
      'averageDispatchTimeInDays',
      averageDispatchTimeInDays
    );
    averageDeliveryTimeInDays = averageDeliveryTime / (1000 * 60 * 60 * 24);
    localStorage.setItem(
      'averageDeliveryTimeInDays',
      averageDeliveryTimeInDays
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
    localStorage.removeItem('averageDispatchTimeInDays');
    localStorage.removeItem('averageDeliveryTimeInDays');
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
        averageDispatchTimeInDays,
        averageDeliveryTimeInDays,
        ordersLastMonth,
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
