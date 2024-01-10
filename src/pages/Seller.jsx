import { useSeller } from '../hooks/useSeller';
import { Link } from 'react-router-dom';
import Popup from '../components/Popup';
import SellerProduct from '../components/SellerProduct';
import usePopup from '../hooks/usePopup';
import SellerProductForm from '../components/SellerProductForm';
import fetchWithTokenRefresh from '../api/fetchWithTokenRefresh';
import BlueButton from '../components/BlueButton';
const Seller = () => {
  const { isAuthenticated, SellerProducts } = useSeller();

  const { isPopupOpen, popupInfo, ShowPopup, closePopup } = usePopup();

  const handleProductSubmit = async (
    productName,
    price,
    variants,
    imageUrl,
    imageFile
  ) => {
    if ((imageUrl && imageFile) || (!imageUrl && !imageFile)) {
      ShowPopup(
        'Alert',
        'Please provide either an image URL or an image file, but not both.'
      );
      return;
    }
    if (imageFile) {
      const fileName = imageFile.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png'];
      if (!validExtensions.includes(fileExtension)) {
        ShowPopup(
          'Error',
          'Invalid file extension. Only jpg, jpeg, and png files are allowed.'
        );
        return;
      }
    }
    const productNameRegex = /^[a-zA-Z0-9 -]{1,50}$/;
    const imageUrlRegex = /^https?:\/\/.*$/i;
    const priceRegex = /^\d+(\.\d+)?$/;
    const isValidProductName = productNameRegex.test(productName);
    let isValidImageUrl = true;
    if (imageUrl) {
      isValidImageUrl = imageUrlRegex.test(imageUrl);
    }
    const isValidPrice = priceRegex.test(price);
    if (!isValidProductName || !isValidImageUrl || !isValidPrice) {
      ShowPopup('Error', 'Invalid Product Details');
      return;
    }
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('variants', variants);
    if (!imageFile) {
      formData.append('imageUrl', imageUrl);
    } else {
      formData.append('imageUrl', null);
      formData.append('imageFile', imageFile);
    }
    const response = await fetchWithTokenRefresh(
      'sellertoken',
      `${import.meta.env.VITE_SERVERURL}/seller/productrequest`,
      {
        method: 'post',
        body: formData,
      }
    );
    if (response.error) {
      ShowPopup('Error', 'Something went wrong');
      return;
    }
    ShowPopup('Success', 'Product Sent to Admin For Approval');
  };
  if (!isAuthenticated) {
    return (
      <h1 className="text-2xl font-bold text-center mt-8">
        You are not logged in click{' '}
        <Link to="/sellerlogin" className="text-blue-500">
          here
        </Link>{' '}
        to login
      </h1>
    );
  }
  return (
    <div className=" p-36 pt-8  bg-gray-100">
      {SellerProducts.length > 0 ? (
        <div>
          <div className="flex justify-between mb-2 items-center">
            <h2 className="text-2xl font-semibold ">Your Products</h2>
            <Link to="/sellerorders">
              <BlueButton text="Your Orders" />
            </Link>
          </div>
          <ul className="space-y-2">
            {SellerProducts.map((product) => (
              <SellerProduct key={product.id} product={product} />
            ))}
          </ul>
        </div>
      ) : (
        <h2 className="text-2xl font-semibold mb-2">
          No products found, add some!
        </h2>
      )}
      <div className="mt-8">
        <h2 className="font-semibold text-2xl text-left mb-4">
          Add More Product
        </h2>
        <SellerProductForm handleProductSubmit={handleProductSubmit} />
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

export default Seller;
