import { useEffect } from 'react';
import SellerOrder from '../components/SellerOrder';
import { useSeller } from '../hooks/useSeller';
const SellerOrderUi = () => {
  const { fetchOrders } = useSeller();
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="bg-gray-100 pt-8 pb-8 min-h-screen">
      <SellerOrder />
    </div>
  );
};
export default SellerOrderUi;
