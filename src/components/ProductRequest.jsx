/* eslint-disable react/prop-types */
function ProductRequest({ product, handleProductApproval, handleProductDeny }) {
  return (
    <div
      key={product.id}
      className="border rounded-lg p-4 shadow-lg bg-white space-y-2"
    >
      <h2 className="text-xl font-bold  mb-2">{product.productName}</h2>
      <img
        src={product.imageUrl}
        alt={product.ProductName}
        className="w-full h-64 object-cover mb-2 rounded"
      />
      <p className="">Variants: {product.variants}</p>
      <p className="">Price: {product.price}</p>
      <p className="">Seller Email: {product.sellerEmail}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleProductApproval(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Approve
        </button>
        <button
          onClick={() => handleProductDeny(product)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Deny
        </button>
      </div>
    </div>
  );
}

export default ProductRequest;
