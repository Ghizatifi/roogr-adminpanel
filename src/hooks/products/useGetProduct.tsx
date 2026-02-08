import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/instanc';
import { Product } from '../../types/product';

const useProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response.data.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  const refreshProduct = () => {
    fetchProduct();
  };

  return { product, loading, error, refreshProduct };
};

export default useProduct;
