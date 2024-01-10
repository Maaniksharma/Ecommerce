import { useState } from 'react';
import FormEntry from '../components/FormEntry';
import { Link } from 'react-router-dom';
import Loader from './Loader';

// eslint-disable-next-line react/prop-types
const SellerRegisterForm = ({ isLoading, onSubmit }) => {
  const [sellerName, setSellerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aaddhar_no, setAaddhar_no] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(sellerName, email, password, confirmPassword, aaddhar_no, phone);
  };
  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Want to Sell Products !!! Register As Seller
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <FormEntry
            label="Seller Name"
            type="upround"
            id="username"
            value={sellerName}
            valueFunction={setSellerName}
          />
          <FormEntry
            value={email}
            valueFunction={setEmail}
            type="downround"
            label="Email address"
            id="email-address"
            name="email"
          />
          <FormEntry
            value={password}
            valueFunction={setPassword}
            type="downround"
            label="Password"
            id="password"
            name="password"
          />
          <FormEntry
            value={confirmPassword}
            valueFunction={setConfirmPassword}
            type="downround"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <FormEntry
            value={aaddhar_no}
            valueFunction={setAaddhar_no}
            type="downround"
            label="Aadhar No"
            id="confirmPassword"
            name="confirmPassword"
          />
          <FormEntry
            value={phone}
            valueFunction={setPhone}
            type="downround"
            label="Phone"
            id="confirmPassword"
            name="confirmPassword"
          />
        </div>
        <div>
          <button
            type="submit"
            className="group items-center relative w-full flex justify-center gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <div>Request Approval</div>
            {isLoading && (
              <div>
                <Loader size={16} />
              </div>
            )}
          </button>
        </div>
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Already registered?
              <Link
                to="/sellerlogin"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Seller Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegisterForm;
