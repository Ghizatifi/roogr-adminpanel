import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';

const STATUSES = ['processing', 'approved', 'expired', 'rejected'] as const;

export interface DashboardCounts {
  verification: { processing: number; approved: number; expired: number; rejected: number };
  category: { processing: number; approved: number; expired: number; rejected: number };
}

export function useDashboardCounts() {
  const [counts, setCounts] = useState<DashboardCounts>({
    verification: { processing: 0, approved: 0, expired: 0, rejected: 0 },
    category: { processing: 0, approved: 0, expired: 0, rejected: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [verification, category] = await Promise.all([
          Promise.all(
            STATUSES.map((status) =>
              axiosInstance
                .get(`/verification_request/status/${status}/count`)
                .then((r) => r.data?.data?.count ?? 0)
            )
          ),
          Promise.all(
            STATUSES.map((status) =>
              axiosInstance
                .get(`/category_subscription/status/${status}/count`)
                .then((r) => r.data?.data?.count ?? 0)
            )
          ),
        ]);
        setCounts({
          verification: {
            processing: verification[0],
            approved: verification[1],
            expired: verification[2],
            rejected: verification[3],
          },
          category: {
            processing: category[0],
            approved: category[1],
            expired: category[2],
            rejected: category[3],
          },
        });
      } catch {
        // keep defaults 0
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { counts, loading };
}
