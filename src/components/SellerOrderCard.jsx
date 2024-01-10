/* eslint-disable react/prop-types */

function SellerOrderCard({ order, handleToTransporter }) {
  return (
    <div className="bg-white rounded shadow-md p-6 mb-4 w-4/12">
      <h2 className="text-xl font-bold mb-2">{order.productName}</h2>
      <img
        src={order.imageUrl}
        alt={order.productName}
        className="w-full h-64 object-cover mb-2"
      />
      <p className="text-gray-700 mb-2">Price: {order.price}</p>
      <p className="text-gray-700 mb-2">Quantity: {order.quantity}</p>
      <p className="text-gray-700">User Email: {order.userEmail}</p>
      <button
        className={`mt-3 ${
          order.atTransporter === 0
            ? 'bg-blue-500 hover:bg-blue-700 text-white'
            : 'bg-gray-200 text-gray-800 border-2 border-gray-600'
        } font-bold py-2 px-4 rounded`}
        onClick={() => handleToTransporter(order.id)}
        disabled={order.atTransporter == 1 || order.status === 'DISPATCHED'}
      >
        {order.status == 'DISPATCHED'
          ? 'Dispatched'
          : order.atTransporter == 1
          ? 'At Transporter'
          : 'Send to Transporter'}
      </button>
    </div>
  );
}

export default SellerOrderCard;
