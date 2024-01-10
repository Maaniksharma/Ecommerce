// SellerProduct.jsx
const SellerProduct = ({ product }) => {
  return (
    <li className="text-lg border-2 border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-16 h-16 rounded-md"
        />
        <div>
          <h3 className="font-semibold">{product.productName}</h3>
          <p className="text-gray-500">
            Quantity Sold: {product.quantity_sold}
          </p>
          <p className="text-gray-500">Variants: {product.variants}</p>
        </div>
      </div>
    </li>
  );
};

export default SellerProduct;
