import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useBanProduct = () => {
  const [loadingPrdBan, setLoadingPrdBan] = useState(false);
  const [banPrdError, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const banProduct = async (productId: number, reason: string) => {
    setLoadingPrdBan(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axiosInstance.patch(`/products/${productId}`, {
        key: reason,
      });
      setIsSuccess(true);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to ban product with ID: ${productId}`);
      }

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      throw err;
    } finally {
      setLoadingPrdBan(false);
    }
  };

  return { banProduct, loadingPrdBan, banPrdError, isSuccess };
};

export default useBanProduct;
