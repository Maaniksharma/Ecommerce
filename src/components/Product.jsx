/* eslint-disable react/prop-types */
import { useCart } from '../hooks/useCart';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../@/components/ui/popover';
import useToast from '../hooks/useToast';
import fetchWithTokenRefresh from '../api/fetchWithTokenRefresh';

function Product({ productName, price, imageUrl, variants, id }) {
  const showToast = useToast();
  const { AddProduct } = useCart();
  const handleProductAdd = async () => {
    const response = await fetchWithTokenRefresh(
      'token',
      `${import.meta.env.VITE_SERVERURL}/user/cartitemadd?itemId=` + id
    );
    await AddProduct({ id, imageUrl, price, productName, variants });
    showToast('Product added to cart successfully');
  };
  return (
    <div className="flex flex-col justify-between h-full max-w-sm rounded overflow-hidden shadow-lg mt-10 md:mt-0 ">
      <div className="">
        <img
          className="w-full h-64 object-cover"
          src={imageUrl}
          alt={productName}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{productName}</div>
          <p className="text-gray-700 text-base">${price}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 md:pb-4 flex justify-between items-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => {
            handleProductAdd();
          }}
        >
          <span>Add to cart</span>
        </button>
        <Popover>
          <PopoverTrigger>
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Details
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-white text-black p-4 shadow-lg rounded-lg border border-gray-200">
            <h2 className="font-bold text-xl mb-2 text-center">
              {productName}
            </h2>
            <p className="mb-1.5 font-semibold">Price: {price}</p>
            <p className=" font-semibold">Variants: {variants}</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Product;
