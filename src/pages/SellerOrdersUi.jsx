import { useState, useEffect } from 'react';
import SellerOrder from '../components/SellerOrder';
import { useSeller } from '../hooks/useSeller';
import PageLoader from '../components/PageLoader';
const SellerOrderUi = () => {
  const { fetchOrders } = useSeller();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoader />; // Replace this with your actual loading spinner
  }

  return (
    <div className="bg-gray-100 pt-8 pb-8 min-h-screen">
      <SellerOrder />
    </div>
  );
};

export default SellerOrderUi;
