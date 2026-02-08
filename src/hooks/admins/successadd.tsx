import { useState } from 'react';

export const useAdminState = () => {
  const [isSuccessAdd, setIsSuccessAdd] = useState<boolean>(false);
  return { isSuccessAdd, setIsSuccessAdd };
};
