const fetchProducts = async ({ queryKey }) => {
  const page = queryKey[1];
  console.log(page);
  return await fetch(
    `${import.meta.env.VITE_SERVERURL}/api/products?pagecount=${page}`
  )
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export default fetchProducts;
