import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { Product } from '../../types/product';

interface ApiResponse {
  success: boolean;
  message: string;
  data: Product[];
}

interface UseFetchProductsByType {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
  refreshProductsType: any;
}

const useProductsByType = (
  type: string,
  page: number = 1,
  limit = 8,
): UseFetchProductsByType => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>(
        `/products/type/${type}?page=${page}&limit=${limit}`,
      );

      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [type, page, limit]);
  const refreshProductsType = () => {
    fetchProducts();
  };
  return { products, loading, error, refreshProductsType };
};

export default useProductsByType;
