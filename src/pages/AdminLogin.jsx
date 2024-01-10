import AdminLoginForm from '../components/AdminLoginForm';
import Popup from '../components/Popup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePopup from '../hooks/usePopup';
const AdminLogin = () => {
  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (password) => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_SERVERURL}/admin/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.err) {
          if (res.err === 1) ShowPopup('Error', 'Invalid Password');
          else ShowPopup('Error', 'Something went wrong');
        } else {
          console.log(res);
          await localStorage.setItem('admintoken', res.token);
          await localStorage.setItem('adminrefreshtoken', res.refreshToken);
          navigate('/adminui');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="pt-20 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin login
          </h2>
        </div>
        <AdminLoginForm isLoading={isLoading} onSubmit={handleSubmit} />
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

export default AdminLogin;
