const Popup = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg px-6 py-6 w-72 min-h-40 max-h-96 mx-auto shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{message}</p>
        <button className="absolute top-0 right-0 m-4" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 hover:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Popup;
