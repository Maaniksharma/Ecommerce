import { useState } from 'react';
import Popup from '../components/Popup';
import SellerRegisterForm from '../components/SellerRegisterForm';
import usePopup from '../hooks/usePopup';
const SellerRegister = () => {
  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (
    sellerName,
    email,
    password,
    confirmPassword,
    aaddhar_no,
    phone
  ) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      ShowPopup('Error', 'Passwords do not match');
      return;
    }
    const seller = {
      sellerName,
      email,
      password,
      aaddhar_no,
      phone,
    };
    fetch(`${import.meta.env.VITE_SERVERURL}/seller/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seller),
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'Seller already exists') {
          ShowPopup('Error', 'Seller already exists');
        }
        if (res === 'Seller created') {
          ShowPopup(
            'Email Sent',
            'Click to the link sent to your email id to verify your account and then login to your account.'
          );
        } else {
          ShowPopup('Error', 'Something went wrong');
        }
      })
      .catch((err) => {
        console.log(err);
        ShowPopup('Error', 'Something went wrong');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="pt-20 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SellerRegisterForm isLoading={isLoading} onSubmit={onSubmit} />
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

export default SellerRegister;
