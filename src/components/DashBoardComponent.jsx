const DashBoardComponent = ({ title, value }) => {
  const displayValue = Number.isNaN(Number(value)) || !value ? 0 : value;
  return (
    <div className="w-44 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-3">
        <div className="text-left text-sm text-gray-400">{title}</div>
        <div className="text-2xl font-bold text-center my-4">
          {displayValue}
        </div>
        <div className="text-right text-sm text-gray-500">Since last month</div>
      </div>
    </div>
  );
};

export default DashBoardComponent;
