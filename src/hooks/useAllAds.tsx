import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';
import { Ad } from '../types/Ads';

const useAllAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axiosInstance.get('/ads');
        setAds(response.data.data);
      } catch (err) {
        setError('Failed to fetch ads');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return { ads, loading, error };
};

export default useAllAds;
