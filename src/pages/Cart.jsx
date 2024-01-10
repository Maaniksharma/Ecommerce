import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import CartItem from '../components/CartItem';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import fetchWithTokenRefresh from '../api/fetchWithTokenRefresh';
import { useEffect } from 'react';
function Cart() {
  const { isAuthenticated } = useAuth();
  const { CartItems, total, AddProduct, RemoveProduct, cartFullGet } =
    useCart();
  useEffect(() => {
    if (isAuthenticated) {
      cartFullGet();
    }
  }, []);
  const handleProductAdd = async (item) => {
    if (!isAuthenticated) return;
    const response = await fetchWithTokenRefresh(
      'token',
      `${import.meta.env.VITE_SERVERURL}/user/cartitemadd?itemId=` + item.id
    );
    if (response.error) {
      console.error(response.error);
      return;
    }
    AddProduct(item);
  };
  const handleRemoveProduct = async (item, fullRemove = false) => {
    const response = await fetchWithTokenRefresh(
      'token',
      `${import.meta.env.VITE_SERVERURL}/user/cartitemdelete?itemId=` + item.id
    );
    if (response.error) {
      console.log(response.error);
      return;
    }
    RemoveProduct(item, fullRemove);
  };
  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p>You need to be logged in to view your cart.</p>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {CartItems.length > 0 ? (
        <div className="space-y-4">
          {CartItems.map((item) => (
            <CartItem
              key={item.id}
              handleProductAdd={handleProductAdd}
              handleRemoveProduct={handleRemoveProduct}
              item={item}
            />
          ))}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-2xl font-bold">Total: ${total}</h2>
            <Link to="/checkout">
              <button className="bg-blue-500 flex items-center gap-2 text-white px-6 py-2 rounded hover:bg-blue-600">
                <div className="">Place Order</div>
                <ArrowRightIcon />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Your cart is either empty or loading.</p>
      )}
    </div>
  );
}

export default Cart;
