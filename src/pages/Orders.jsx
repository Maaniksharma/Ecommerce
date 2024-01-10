import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import OrderUi from '../components/OrderUi';
const Orders = () => {
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
  } else return <OrderUi />;
};
export default Orders;
