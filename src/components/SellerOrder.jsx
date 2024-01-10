/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import usePopup from '../hooks/usePopup';
import { useSeller } from '../hooks/useSeller';
import SellerOrderCard from './SellerOrderCard';
import fetchWithTokenRefresh from '../api/fetchWithTokenRefresh';
import Popup from './Popup'; // Update the path if necessary

const SellerOrder = ({ order }) => {
  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();
  const { changeTransporterStatus, SellerOrders, DispatchedOrders } =
    useSeller();
  const [isActiveOrders, setIsActiveOrders] = useState(true);
  const [MapOrders, setMapOrders] = useState(SellerOrders);
  useEffect(() => {
    setMapOrders(isActiveOrders ? SellerOrders : DispatchedOrders);
  }, [isActiveOrders]);
  const handleToTransporter = async (id) => {
    const response = await fetchWithTokenRefresh(
      'sellertoken',
      `http://localhost:3000/seller/dispatch?id=${id}`
    );
    if (response.error) {
      ShowPopup('Error', 'Something went wrong');
      return;
    }
    ShowPopup('Success', 'Order gone for Transporter Successfully');
    changeTransporterStatus(id);
  };
  return (
    <div className="">
      <div className="flex flex-wrap items-center gap-4">
        <button
          className={`${
            isActiveOrders ? 'bg-blue-500' : 'bg-gray-400'
          } rounded px-4 py-2 text-white`}
          onClick={() => setIsActiveOrders(true)}
        >
          Active Orders
        </button>
        <hr className="h-8 w-0.5 bg-slate-400" />
        <button
          className={`${
            isActiveOrders ? 'bg-gray-400' : 'bg-blue-500'
          } rounded px-4 py-2 text-white`}
          onClick={() => setIsActiveOrders(false)}
        >
          Dispatched Orders
        </button>
      </div>
      <hr className=" mt-2 h-0.5 w-3/2 bg-slate-400" />

      {MapOrders.length === 0 ? (
        <h1 className="text-3xl font-semibold mt-8 mb-4 text-center justify-center">
          No Orders
        </h1>
      ) : (
        <div className="flex flex-wrap items-center gap-8 mt-4">
          {MapOrders.map((order) => (
            <SellerOrderCard
              key={order.id}
              order={order}
              handleToTransporter={handleToTransporter}
              isPopupOpen={isPopupOpen}
              popupInfo={popupInfo}
              closePopup={closePopup}
            />
          ))}
        </div>
      )}
      {isPopupOpen && (
        <Popup
          title={popupInfo.current.Title}
          message={popupInfo.current.Text}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default SellerOrder;
