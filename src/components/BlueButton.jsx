/* eslint-disable react/prop-types */
import Loader from './Loader';
const BlueButton = ({ handler, loading, text }) => {
  if (handler)
    return (
      <button
        onClick={handler}
        className="bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? <Loader size={24} /> : text}
      </button>
    );
  else
    return (
      <button className="bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded">
        {loading ? <Loader size={24} /> : text}
      </button>
    );
};
export default BlueButton;
