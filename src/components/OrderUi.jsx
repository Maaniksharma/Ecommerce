import { useAuth } from '../hooks/useAuth';
const OrderUi = () => {
  const { customerOrders } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        {customerOrders.length > 0 ? 'Your Orders' : 'No Orders'}
      </h1>
      {customerOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded shadow p-6 m-4 w-full md:max-w-md"
        >
          <h2 className="text-xl font-bold mb-2">{order.productName}</h2>
          <img src={order.imageUrl} alt={order.productName} className="mb-2" />
          <p className="text-slate-900 mb-1 font-semibold">
            Price: {order.price}
          </p>
          <p className="text-slate-900 mb-1 font-semibold">
            Quantity: {order.quantity}
          </p>
          <p className="text-slate-900 font-semibold">Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderUi;
