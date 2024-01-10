import { useQuery } from '@tanstack/react-query';
import fetchProducts from '../api/fetchProducts';

const useFetchProducts = (page) => {
  const Results = useQuery({
    queryKey: ['products', page],
    queryFn: fetchProducts,
  });

  const products = Results?.data;
  return {
    products,
    isLoading: Results?.isLoading,
  };
};

export default useFetchProducts;
