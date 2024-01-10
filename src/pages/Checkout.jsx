import { Link } from 'react-router-dom';
import CheckoutUI from '../components/CheckoutUI';
import { useAuth } from '../hooks/useAuth';

const Checkout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-8">
        <p className="text-gray-600">Please login first to continue.</p>
        <Link to="/login" className="text-blue-500 hover:underline">
          Go to login page
        </Link>
      </div>
    );
  } else return <CheckoutUI />;
};
export default Checkout;
