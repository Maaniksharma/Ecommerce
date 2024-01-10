import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import Popup from '../components/Popup';
import usePopup from '../hooks/usePopup';
import OrderSummary from './OrderSummary';
import Loader from './Loader';
import fetchWithTokenRefresh from '../api/fetchWithTokenRefresh';
import { Checkbox } from '../../@/components/ui/checkbox';
const CheckoutUI = () => {
  const { user, updateUser } = useAuth();
  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(user.delivery_address);
  const [CodChecked, setCodChecked] = useState(false);
  const { total, CartItems, ClearCart } = useCart();
  var options = {
    key: 'rzp_test_AGKSZv7D8pRPY5', // Enter the Key ID generated from the Dashboard
    amount: `${total * 100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'USD',
    name: 'Apni Dukkan',
    description: 'Continue  Transaction', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3399cc',
    },
  };
  var rzp1 = new Razorpay(options);

  const SaveDeliveryAddress = async () => {
    if (isLoading) return;
    setIsLoading(true);
    user.delivery_address = deliveryAddress;
    const res = await fetchWithTokenRefresh(
      'token',
      `${import.meta.env.VITE_SERVERURL}/user/edituser`,
      {
        method: 'post',
        body: JSON.stringify({ user: user }),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (res.error) {
      ShowPopup('Error', 'Something went wrong');
      setIsLoading(false);
      return;
    }
    ShowPopup('Success', 'Delivery Address Saved');
    setIsLoading(false);
    updateUser(user);
  };
  const handleOrder = async (e) => {
    if (isOrderLoading) return;
    setIsOrderLoading(true);
    e.preventDefault();
    if (!CodChecked) {
      rzp1.open();
      return;
    }
    const productIds = CartItems.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    const res = await fetchWithTokenRefresh(
      'token',
      `${import.meta.env.VITE_SERVERURL}/user/order`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: productIds }),
      }
    );
    if (res.error) {
      ShowPopup('Error', 'Something went wrong');
      setIsOrderLoading(false);
      return;
    }
    ShowPopup('Success', 'Order Placed Successfully');
    ClearCart(true);
    setIsOrderLoading(false);
    return;
  };
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {deliveryAddress ? 'Delivery Address' : 'Add Delivery Address'}
        </h2>
        <div className="flex justify-between">
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          />
          <button
            className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={SaveDeliveryAddress}
          >
            <div className="">Save</div>
            {isLoading && <Loader size={16} />}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <OrderSummary />
      </div>
      <div className="flex items-center space-x-3 mt-4 pl-1">
        <Checkbox
          id="cod"
          checked={CodChecked}
          onClick={() => {
            setCodChecked((prev) => !prev);
          }}
          className="peer h-4 w-4 rounded-sm border border-gray-300  checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        />
        <label
          htmlFor="cod"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Cash on delivery
        </label>
      </div>
      <button
        id="rzp-button1"
        className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleOrder}
      >
        {CodChecked ? 'Place Order' : 'Go to Payment'}
        {isOrderLoading && <Loader size={16} />}
      </button>
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

export default CheckoutUI;
