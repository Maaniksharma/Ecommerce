import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const OrderSummary = () => {
  const { CartItems, total } = useCart();
  const { user } = useAuth();

  return (
    <div className="border rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      {CartItems.map((item) => (
        <div key={item.id} className="mb-2">
          <p className="text-lg">
            <span className="font-bold">{item.name}</span> - ${item.price} x{' '}
            {item.quantity}
          </p>
        </div>
      ))}
      <p className="text-lg font-bold mt-4">Total: ${total.toFixed(2)}</p>
      <h3 className="text-xl font-bold mt-4">Delivery Address:</h3>
      <p className="text-sm">
        {user.delivery_address || 'No delivery address'}
      </p>
    </div>
  );
};

export default OrderSummary;
