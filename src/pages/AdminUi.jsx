import { useState, useEffect } from 'react';
import usePopup from '../hooks/usePopup';
import Popup from '../components/Popup';
import SellerRequest from '../components/SellerRequest';
import ProductRequest from '../components/ProductRequest';
import fetchWithTokenRefresh from '../api/fetchWithTokenRefresh';

const AdminUi = () => {
  const [sellerRequests, setSellerRequests] = useState([]);
  const [productRequests, setProductRequests] = useState([]);
  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();
  useEffect(() => {
    async function getRequests() {
      const res = await fetchWithTokenRefresh(
        'admintoken',
        `${import.meta.env.VITE_SERVERURL}/admin/requests`
      );
      console.log(res);
      if (res.error) {
        ShowPopup('Error', 'Something went wrong');
      } else {
        setSellerRequests(res.seller_requests);
        setProductRequests(res.product_requests);
      }
    }
    getRequests();
  }, []);
  const handleSellerApproval = async (email) => {
    const res = await fetchWithTokenRefresh(
      `${import.meta.env.VITE_SERVERURL}/admin/sellerApproval`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ email }),
      }
    );
    if (res.error) {
      ShowPopup('Error', 'Something went wrong');
      return;
    }
    const temp = sellerRequests.filter((request) => request.email !== email);
    setSellerRequests(temp);
    ShowPopup('Success', 'Seller Approved');
  };
  const handleSellerDeny = async (email) => {
    const res = await fetchWithTokenRefresh(
      'admintoken',
      `${import.meta.env.VITE_SERVERURL}/admin/sellerdeny`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ email }),
      }
    );
    if (res.error) {
      ShowPopup('Error', 'Something went wrong');
      return;
    }
    const temp = sellerRequests.filter((request) => request.email !== email);
    setSellerRequests(temp);
    ShowPopup('Success', 'Seller Denied');
  };
  const handleProductApproval = async (product) => {
    const res = await fetchWithTokenRefresh(
      'admintoken',
      `${import.meta.env.VITE_SERVERURL}/admin/productApproval`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ productRequest: product }),
      }
    );
    if (res.error) {
      ShowPopup('Error', 'Something went wrong');
      return;
    }
    const temp = productRequests.filter((request) => request.id !== product.id);
    setProductRequests(temp);
    ShowPopup('Success', 'Product Approved');
  };
  const handleProductDeny = async (product) => {
    const res = await fetchWithTokenRefresh(
      'admintoken',
      `${import.meta.env.VITE_SERVERURL}/admin/productdeny`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ productRequest: product }),
      }
    );
    if (res.error) {
      ShowPopup('Error', 'Something went wrong');
      return;
    }
    const temp = productRequests.filter((request) => request.id !== product.id);
    setProductRequests(temp);
    ShowPopup('Success', 'Product Denied');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Seller Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellerRequests.map((request) => (
          <SellerRequest
            key={request.aaddhar_no}
            request={request}
            handleApproval={handleSellerApproval}
            handleDeny={handleSellerDeny}
          />
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-8">Product Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productRequests.map((request) => (
          <ProductRequest
            key={request.id}
            product={request}
            handleProductApproval={handleProductApproval}
            handleProductDeny={handleProductDeny}
          />
        ))}
      </div>
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

export default AdminUi;
