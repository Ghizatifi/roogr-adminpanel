// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import axiosInstance from '../../axiosConfig/instanc';
interface ApiResponse {
  success: boolean;
  message: string;
  data: Product[];
}
const useUserProducts = (userId: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/products/users/${userId}`,
      );
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [userId]);
  const refreshProductsUser = () => {
    fetchProducts();
  };
  return { products, loading, error, refreshProductsUser };
};

export default useUserProducts;
