/* eslint-disable react/prop-types */
function SellerRequest({ request, handleApproval, handleDeny }) {
  return (
    <div key={request.aaddhar_no} className="border rounded p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">{request.sellerName}</h2>
      <p>Email: {request.email}</p>
      <p>Phone: {request.phone}</p>
      <p>Aadhar No: {request.aaddhar_no}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleApproval(request.email)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Approve
        </button>
        <button
          onClick={() => handleDeny(request.email)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Deny
        </button>
      </div>
    </div>
  );
}
export default SellerRequest;
