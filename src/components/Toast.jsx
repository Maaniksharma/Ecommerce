function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-0 right-0 m-6 p-4 bg-gray-700 text-white  border-2 rounded-lg shadow-lg">
      {message}
    </div>
  );
}

export default Toast;
