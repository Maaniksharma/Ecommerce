import LoginForm from '../components/LoginForm';
import Popup from '../components/Popup';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePopup from '../hooks/usePopup';
import { validate } from '../api/validate';
import { useCart } from '../hooks/useCart';

const LoginPage = () => {
  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();
  const { cartCountGet } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useAuth();
  const navigate = useNavigate();
  if (userContext.isAuthenticated) {
    navigate('/');
  }
  const handleSubmit = async (email, password) => {
    setIsLoading(true);
    if (!validate(email, password)) {
      ShowPopup('Error', 'Invalid Email or Password');
      return;
    }
    let res = await fetch(`${import.meta.env.VITE_SERVERURL}/user/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    res = await res.json();
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
      userContext.login(res);
      cartCountGet();
    }
    setIsLoading(false);
  };

  return (
    <div className="pt-20 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
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

export default LoginPage;
