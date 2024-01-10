import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useSeller } from '../hooks/useSeller';
import { Link, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { ProductCount, ClearCart } = useCart();
  const SellerAuthenticated = useSeller().isAuthenticated;
  const SellerLogout = useSeller().logout;
  const { userName, email: userEmail } = user;
  const handleLogout = () => {
    if (!userEmail) navigate('/login');
    // fetch(`${import.meta.env.VITE_SERVERURL}/logout`).then((res) => {
    logout();
    ClearCart();
    navigate('/login');
    // });
  };
  const handleSellerLogout = () => {
    if (!SellerAuthenticated) navigate('/sellerlogin');
    else SellerLogout();
  };
  return (
    <nav className="flex justify-between items-center p-5 bg-blue-500 text-white">
      <Link to="/">
        <h1 className="text-xl md:text-2xl">Apni Dukkan</h1>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/sellerlogin">
          <div>
            <button
              onClick={handleSellerLogout}
              className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-blue-800 "
            >
              {SellerAuthenticated ? 'Logged in as seller' : 'Seller Login'}
            </button>
          </div>
        </Link>
        <Link to="/cart">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shopping-cart"></i>
            <span>{ProductCount}</span>
          </div>
        </Link>
        <p>{userEmail ? `Welcome, ${userName}` : 'Welcome'}</p>
        <div onClick={handleLogout}>
          <button className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-blue-800 ">
            {userEmail ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
