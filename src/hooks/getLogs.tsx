import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';
import { LogData } from '../types/LogData';
interface LogsApiResponse {
  success: boolean;
  message: string;
  data: LogData[];
}
const useLogs = (page: number = 0) => {
  const [logs, setLogs] = useState<LogData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<LogsApiResponse>(
          `/logs?page=${page}&limit=8`,
        );

        if (response.data.success) {
          setLogs(response.data.data);
        } else {
          setError('Failed to fetch logs');
        }
      } catch (err) {
        setError('An error occurred while fetching logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [page]);

  return { logs, loading, error };
};

export default useLogs;
