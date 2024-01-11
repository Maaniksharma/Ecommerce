import { useSeller } from '../hooks/useSeller';
import DashBoardComponent from './DashBoardComponent';
const SellerDashboard = () => {
  const {
    orderLastMonth,
    averageDispatchTimeInDays,
    averageDeliveryTimeInDays,
  } = useSeller();
  console.log(
    orderLastMonth,
    averageDispatchTimeInDays,
    averageDeliveryTimeInDays
  );
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <DashBoardComponent value={orderLastMonth} title={'Orders'} />
        <DashBoardComponent
          value={averageDispatchTimeInDays}
          title={'Average Dispatch Time'}
        />
        <DashBoardComponent
          value={averageDeliveryTimeInDays}
          title={'Average Delivery Time'}
        />
      </div>
    </div>
  );
};
export default SellerDashboard;
