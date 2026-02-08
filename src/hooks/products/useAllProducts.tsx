import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import axiosInstance from '../../axiosConfig/instanc';

const useAllProducts = (page: number = 1) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(
        `/products?page=${page}&limit=8`,
      );
      setProducts(response.data.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const refreshProducts = () => {
    fetchProducts();
  };

  return { products, loading, error, refreshProducts };
};

export default useAllProducts;
