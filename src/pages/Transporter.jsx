import { useState, useEffect } from 'react';
import usePopup from '../hooks/usePopup';
import Popup from '../components/Popup';
const Transporter = () => {
  const [products, setProducts] = useState([]);
  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/transporter`
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const shipProduct = async (OrderId) => {
    const response = await fetch(
      `http://localhost:3000/transporter/dispatch?orderId=${OrderId}`
    );
    if (response.ok) {
      ShowPopup('Success', 'Order gone for Dispatched Successfully');
      const temp = products.map((product) => {
        if (product.orderId === OrderId) {
          product.status = 'DISPATCHED';
        }
        return product;
      });
      setProducts(temp);
      return;
    }
    ShowPopup('Error', 'Something went wrong');
  };
  const MarkDelivered = async (OrderId) => {
    const response = await fetch(
      `http://localhost:3000/transporter/delivered?orderId=${OrderId}`
    );
    if (response.ok) {
      ShowPopup('Success', 'Order Marked as delivered successfully');
      const temp = products.filter((product) => product.orderId !== OrderId);
      setProducts(temp);
      return;
    }
    ShowPopup('Error', 'Something went wrong');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Products to be shipped</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.orderId}
            className="bg-white p-4 rounded shadow w-80"
          >
            <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="mb-2"
            />
            <div className="">
              <p className="text-gray-600 mb-2">${product.price}</p>
              <p className="text-gray-600 mb-2">{product.quantity}</p>
              <p className="text-gray-600 mb-2">{product.userEmail}</p>
              <div className="flex justify-between">
                <button
                  className={`${
                    product.status === 'DISPATCHED'
                      ? 'bg-gray-200 text-gray-800 border-2 border-gray-600'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }  font-bold py-2 px-4 rounded`}
                  onClick={() => shipProduct(product.orderId)}
                  disabled={product.status === 'DISPATCHED'}
                >
                  {product.status === 'DISPATCHED' ? 'Dispatched' : 'Dispatch'}
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => MarkDelivered(product.orderId)}
                >
                  Mark Delivered
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <Popup
          title={popupInfo.current.Title}
          message={popupInfo.current.Text}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default Transporter;
