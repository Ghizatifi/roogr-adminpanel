import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import axios, { AxiosError } from 'axios';
import ReusableInput from '../../components/products/ReusableInput';
import { toast } from 'react-toastify';

// Define the response type for the update function
interface UpdatePeriodResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    verification_period: number;
    status: string;
  } | null;
}

// API call to update verification period and status
const updatePeriod = async (
  id: number,
  newPeriod: number = 4000,
  STATUS: string,
): Promise<UpdatePeriodResponse | void> => {
  try {
    const response = await axiosInstance.patch<UpdatePeriodResponse>(
      `/category_subscription/${id}`,
      {
        verification_period: newPeriod,
        status: STATUS,
      },
    );

    if (response.data.success) {
      return response.data;
    } else {
      console.error('Update failed:', response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error updating period:', error.message);
    } else {
      console.error('Unexpected error updating period:', error);
    }
  }
};

// API call to update verification request period and status
const VerifiedUpdatePeriod = async (
  id: number,
  newPeriod: number = 4000,
  STATUS: string,
): Promise<UpdatePeriodResponse | void> => {
  try {
    const response = await axiosInstance.patch<UpdatePeriodResponse>(
      `/verification_request/${id}`,
      {
        verification_period: newPeriod,
        status: STATUS,
      },
    );

    if (response.data.success) {
      toast.success('Updated successfully');
      return response.data;
    } else {
      console.error('Update failed:', response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error('Error updating');
      console.error('Axios error updating period:', error.message);
    } else {
      console.error('Unexpected error updating period:', error);
      toast.error('Error updating');
    }
  }
};

// Define the interface for props
interface PeriodInputProps {
  refreshRequest: any;
  ItemStatus?: string;
  item: {
    verification_period: number;
    category_subscription_id?: number;
    verification_request_id?: number;
    STATUS: string;
  };
}

const PeriodInput: React.FC<PeriodInputProps> = ({
  refreshRequest,
  ItemStatus,
  item,
}) => {
  const [inputValue, setInputValue] = useState<string>(
    `${item.verification_period} ي`,
  );
  const [expiredValue, setExpiredValue] = useState<any>('منتهية');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleUpdatePeriod = async () => {
    const numericValue = parseInt(
      (ItemStatus === 'expired' ? expiredValue : inputValue).replace(/\D/g, ''),
      10,
    ); // Extract numeric value
    let response;

    if (item.category_subscription_id) {
      response = await updatePeriod(
        item.category_subscription_id,
        numericValue,
        item.STATUS,
      );
    } else if (item.verification_request_id) {
      response = await VerifiedUpdatePeriod(
        item.verification_request_id,
        numericValue,
        item.STATUS,
      );
    }

    if (response && response.success) {
      toast.success('Verification period updated successfully');
      setIsSuccess(true);
    } else {
      console.error('Failed to update verification period');
    }
  };

  useEffect(() => {
    if (
      inputValue !== `${item.verification_period} ي` ||
      expiredValue !== 'منتهية'
    ) {
      handleUpdatePeriod();
    }
  }, [
    inputValue,
    expiredValue,
    item.category_subscription_id,
    item.verification_request_id,
    item.STATUS,
  ]);

  useEffect(() => {
    if (isSuccess) {
      refreshRequest();
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return (
    <>
      {ItemStatus === 'expired' ? (
        <ReusableInput
          label=""
          type="text"
          value={expiredValue}
          onChange={(e) => setExpiredValue(e.target.value)}
          widthClass="w-15"
          border="border-2 border-Input-TextRed text-Input-TextRed"
          extraClass="bg-Input-red text-Input-TextRed text-center"
        />
      ) : (
        <ReusableInput
          label=""
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          widthClass="w-15"
          extraClass="bg-Input-blue text-center"
        />
      )}
    </>
  );
};

export default PeriodInput;
