/* eslint-disable react/prop-types */
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';

const CartItem = ({ handleProductAdd, handleRemoveProduct, item }) => {
  return (
    <div
      key={item.id}
      className="flex items-center justify-between border-b-2 py-2"
    >
      <div className="flex items-center space-x-2">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover"
        />
        <div>
          <h2 className="text-lg font-medium">{item.productName}</h2>
          <p className="text-sm text-gray-500">Variants: {item.variants}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-lg font-medium">${item.price}</p>
        <div className="flex items-center gap-3 px-4  border-2 border-gray-300">
          <button
            onClick={() => handleProductAdd(item)}
            className="text-green-500 hover:text-green-700"
          >
            <PlusIcon />
          </button>
          <p>{item.quantity}</p>
          <button
            onClick={() => {
              handleRemoveProduct(item);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <MinusIcon />
          </button>
        </div>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => handleRemoveProduct(item, true)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default CartItem;
