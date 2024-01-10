import { useState } from 'react';
import Popup from '../components/Popup';
import SignupForm from '../components/SignupForm';
import usePopup from '../hooks/usePopup';
import { validate } from '../api/validate';
const SignupPage = () => {
  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (username, email, password, confirmPassword) => {
    setIsLoading(true);
    if (!validate(email, password, username, confirmPassword))
      if (password !== confirmPassword) {
        ShowPopup('Error', 'Passwords do not match');
        return;
      }
    if (!validate(email, password, username)) {
      ShowPopup('Error', 'Invalid credentials');
      return;
    }
    const user = {
      username,
      email,
      password,
    };
    fetch(`${import.meta.env.VITE_SERVERURL}/user/signup`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'User already exists') {
          ShowPopup('Error', 'User already exists');
        }
        if (res === 'User created') {
          ShowPopup(
            'Email Sent',
            'Click to the link sent to your email id to verify your account and then login to your account.'
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="pt-20 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SignupForm isLoading={isLoading} onSubmit={onSubmit} />
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

export default SignupPage;
