import SellerLoginForm from '../components/SellerLoginForm';
import Popup from '../components/Popup';
import { useSeller } from '../hooks/useSeller';
import { useState } from 'react';
import usePopup from '../hooks/usePopup';
import { useNavigate } from 'react-router-dom';
import { validate } from '../api/validate';

const SellerLoginPage = () => {
  const navigate = useNavigate();
  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();
  const [isLoading, setIsLoading] = useState(false);
  const sellerContext = useSeller();
  const handleSubmit = async (email, password) => {
    setIsLoading(true);
    if (!validate(email, password))
      return ShowPopup('Error', 'Invalid Email or Password');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/seller/login`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );
      const res = await response.json();
      if (res.err) {
        if (res.err === 1 || res.err === 3)
          ShowPopup('Error', 'Invalid Email or Password');
        else if (res.err === 2)
          ShowPopup(
            'Error',
            'Email not verified. check your email for email verification'
          );
        else ShowPopup('Error', 'Something went wrong');
      } else {
        await sellerContext.login(res);
        await sellerContext.fetchProducts();
        await sellerContext.fetchOrders();
        navigate('/seller');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login as a Seller
          </h2>
        </div>
        <SellerLoginForm isLoading={isLoading} onSubmit={handleSubmit} />
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

export default SellerLoginPage;
