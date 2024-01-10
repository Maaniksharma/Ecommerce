import { useState } from 'react';
import FormEntry from '../components/FormEntry';
import { Link } from 'react-router-dom';
import Loader from './Loader';

// eslint-disable-next-line react/prop-types
const SignupForm = ({ isLoading, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username, email, password, confirmPassword);
  };
  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <FormEntry
            label="Username"
            type="upround"
            id="username"
            value={username}
            valueFunction={setUsername}
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
            label="confirm Password"
            id="confirmPassword"
            name="confirmPassword"
          />
        </div>
        <div>
          <button
            type="submit"
            className="group items-center relative w-full flex justify-center gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <div>Sign Up</div>
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
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
