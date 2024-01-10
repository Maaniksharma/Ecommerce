import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormEntry from './FormEntry';
import Loader from './Loader';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ isLoading, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <FormEntry
            value={email}
            valueFunction={setEmail}
            type="upround"
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
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="group items-center relative w-full flex justify-center gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <div>Login</div>
          {isLoading && (
            <div className="text-right">
              <Loader size={16} />
            </div>
          )}
        </button>
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Don&apos;t have an account?
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
