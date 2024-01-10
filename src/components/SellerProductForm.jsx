import FormEntry from '../components/FormEntry';
import { useState } from 'react';

const SellerProductForm = ({ handleProductSubmit }) => {
  const [productName, setProductName] = useState('');
  const [variants, setVariants] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const onProductSubmit = (e) => {
    e.preventDefault();
    handleProductSubmit(productName, price, variants, imageUrl, imageFile);
  };
  return (
    <>
      <form className="w-[450px]">
        <FormEntry
          value={productName}
          valueFunction={setProductName}
          type="upround"
          label="Product Name"
          id="product-name"
          name="Product Name"
        />
        <FormEntry
          value={price}
          valueFunction={setPrice}
          type="upround"
          label="Price"
          id="price"
          name="price"
        />
        <FormEntry
          value={variants}
          valueFunction={setVariants}
          type="upround"
          label="Variants(Enter in comma seperated values)"
          id="variants"
          name="variants"
        />
        <FormEntry
          value={imageUrl}
          valueFunction={setImageUrl}
          type="upround"
          label="Image Url"
          id="Image-url"
          name="Image Url"
        />
        <input
          type="file"
          id="productImage"
          name="productImage"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        />
        <button
          onClick={onProductSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Send for Aprroval
        </button>
      </form>
    </>
  );
};

export default SellerProductForm;
