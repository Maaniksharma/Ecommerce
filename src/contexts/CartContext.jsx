import { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import fetchWithTokenRefresh from '../api/fetchWithTokenRefresh';
export const CartContext = createContext();
export function CartProvider({ children }) {
  const { transferOrders } = useAuth();
  const productCountFromStorage = localStorage.getItem('ProductCount');
  const cartItemsFromStorage = localStorage.getItem('CartItems');

  const [ProductCount, setProductCount] = useState(
    productCountFromStorage ? JSON.parse(productCountFromStorage) : 0
  );

  const [CartItems, setCartItems] = useState(
    cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []
  );
  const [total, setTotal] = useState(
    CartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  useEffect(() => {
    setTotal(
      CartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  }, [CartItems]);
  async function cartGet() {
    try {
      const data = await fetchWithTokenRefresh(
        'token',
        `${import.meta.env.VITE_SERVERURL}/user/cartget?count=true`
      );
      setProductCount(data.count);
      localStorage.setItem('ProductCount', data.count);
      const data2 = await fetchWithTokenRefresh(
        'token',
        `${import.meta.env.VITE_SERVERURL}/user/cartget`
      );
      setCartItems(data2?.cart);
      localStorage.setItem('Cartitems', data2?.cart);
    } catch (error) {
      console.error('Failed to get cart:', error);
    }
  }
  const AddProduct = (product) => {
    setCartItems((prevCartItems) => {
      let isProductAdded = false;
      const updatedCartItems = prevCartItems.map((item) => {
        if (item.id === product.id) {
          isProductAdded = true;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      if (!isProductAdded) {
        setProductCount((prev) => prev + 1);
        localStorage.setItem('ProductCount', ProductCount + 1);
        updatedCartItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };
  const RemoveProduct = (product, fullRemove = false) => {
    let isProductRemoved = false;
    let updatedCartItems = [];
    if (!fullRemove) {
      updatedCartItems = CartItems.map((item) => {
        if (item.id === product.id && item.quantity > 1) {
          isProductRemoved = true;
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    }
    if (isProductRemoved && !fullRemove) {
      setCartItems(updatedCartItems);
      localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
    } else {
      setCartItems((prev) => {
        const updatedCartItems = prev.filter((item) => item.id !== product.id);
        localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
        setProductCount((prev) => prev - 1);
        localStorage.setItem('ProductCount', ProductCount - 1);
        return updatedCartItems;
      });
    }
  };

  const ClearCart = async (atServer = false) => {
    if (atServer) {
      const res1 = await fetchWithTokenRefresh(
        'token',
        `${import.meta.env.VITE_SERVERURL}/user/cartclear`
      );
      transferOrders(CartItems);
    }
    setProductCount(0);
    setCartItems([]);
    localStorage.removeItem('CartItems');
    localStorage.removeItem('ProductCount');
  };

  return (
    <CartContext.Provider
      value={{
        CartItems,
        ProductCount,
        total,
        cartGet,
        AddProduct,
        RemoveProduct,
        ClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
