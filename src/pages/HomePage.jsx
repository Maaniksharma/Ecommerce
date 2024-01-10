import { useState, useEffect } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import Product from '../components/Product';
import BlueButton from '../components/BlueButton';
import Loading from '../components/Loading';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const { isAuthenticated, fetchOrders } = useAuth();
  const [page, setPage] = useState(1);
  const { products: newProducts, isLoading } = useFetchProducts(page);
  const [products, setProducts] = useState([]);
  const [isOrdersfetching, setIsOrdersFetching] = useState(false);
  const [displayPages, setDisplayPages] = useState([1, 2, 3]);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setProducts([]);
      setPage(1);
    };
  }, []);

  useEffect(() => {
    if (newProducts) {
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    }
  }, [newProducts]);

  if (isLoading) return <Loading />;

  const handleOrder = async () => {
    if (isOrdersfetching) return;
    setIsOrdersFetching(true);
    await fetchOrders();
    setIsOrdersFetching(false);
    navigate('/orders');
  };
  return (
    <div className="p-5">
      <div className="flex items-center justify-between ">
        <h1 className="text-3xl font-bold mb-5">Featured Products</h1>
        {isAuthenticated && (
          <BlueButton
            handler={handleOrder}
            loading={isOrdersfetching}
            text="My Orders"
          />
        )}
      </div>
      <div className="md:grid md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={6}
        onPageChange={(page) => {
          setProducts([]);
          setPage(page);
        }}
      />
      {/* <button
        onClick={loadMore}
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? <Loader size={24} /> : 'Load More'}
      </button> */}
    </div>
  );
};

export default HomePage;
