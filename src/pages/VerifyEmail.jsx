import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const [status, setStatus] = useState('Unverified');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (status === 'verified') {
      setTimeout(() => {
        console.log(sellerTrue, token);
        if (sellerTrue === 'true') window.location.href = '/sellerlogin';
        else window.location.href = '/login';
      }, 4000);
    }
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const sellerTrue = window.location.search.split('=')[1].split('&')[0];
    let string = '';

    if (sellerTrue) string = 'seller';
    fetch(
      `${import.meta.env.VITE_SERVERURL}/verify` + string + '?token=' + token
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message === 'verified') {
          setLoading(false);
          setStatus('verified');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);
  return (
    <>
      {loading ? (
        <div className="flex justify-center text-center pt-20 items-center">
          <Loader size={40} />
          <div className="font-semibold text-slate-800 ml-5">Verifying</div>
        </div>
      ) : status === 'verified' ? (
        <div className="text-center text-slate-800">
          <h1 className="text-3xl font-bold mb-5">Email Verified</h1>
          <p>Your email has been verified. Redirecting to Login page.</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-5">Email Not Verified</h1>
          <p>Your email has not been verified. Something Went Wrong</p>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
