// eslint-disable-next-line react/prop-types
const FormEntry = ({ value, valueFunction, type, label, id, name }) => {
  const className = type === 'upround' ? 't' : 'b';

  return (
    <input
      id={id}
      name={name}
      type="text"
      autoComplete="on"
      placeholder={label}
      required
      className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${className}-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
      value={value}
      onChange={(e) => valueFunction(e.target.value)}
    />
  );
};

export default FormEntry;
