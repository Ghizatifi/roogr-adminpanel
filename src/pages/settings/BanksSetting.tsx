import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin6Line } from 'react-icons/ri';
import TableHeader from '../../components/Tables/TableHeader';
import { FiEdit3 } from 'react-icons/fi';
import DeletePopup from '../../components/popups/DeletePopup';
import BankPopup from '../../components/popups/BankPopup';
export interface BankType {
  bank_id: number;
  bank_account_name: string;
  bank_name: string;
  bank_account_num: string;
  bank_ipan: string;
  bank_img: string;
  length: number;
}

export default function BanksSetting() {
  const [banks, setBanks] = useState<BankType[]>([]);
  const [selectedBank, setSelectedBank] = useState<BankType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddBank = (bank: BankType | null) => {
    if (bank) {
      setSelectedBank(bank);
    } else {
      setSelectedBank(null);
    }
    setIsAddModalOpen(true);
  };
  const header: any[] = [
    `#`,
    t(`settings.accountHolder`),
    t(`settings.accountNumber`),
    t(`settings.bankIBAN`),
    t(`settings.bankLogo`),
    t(`settings.edit`),
    <RiDeleteBin6Line className="text-xl text-Input-TextRed" />,
  ];
  const openModal = (bank: BankType) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };
  const displayBanks = async () => {
    try {
      const res = await axiosInstance.get(`/banks`);
      setBanks(res.data.data);
    } catch (error: any) {
      console.error(error);
    }
  };
  useEffect(() => {
    displayBanks();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <div className="mb-3">
        <svg
          onClick={() => openAddBank(null)}
          role="button"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433284 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9967 7.34885 18.9421 4.80723 17.0674 2.93259C15.1928 1.05794 12.6512 0.00330774 10 0ZM13.8462 10.7692H10.7692V13.8462C10.7692 14.0502 10.6882 14.2458 10.5439 14.3901C10.3997 14.5343 10.204 14.6154 10 14.6154C9.79599 14.6154 9.60033 14.5343 9.45607 14.3901C9.31182 14.2458 9.23077 14.0502 9.23077 13.8462V10.7692H6.15385C5.94984 10.7692 5.75418 10.6882 5.60992 10.5439C5.46566 10.3997 5.38462 10.204 5.38462 10C5.38462 9.79599 5.46566 9.60033 5.60992 9.45607C5.75418 9.31181 5.94984 9.23077 6.15385 9.23077H9.23077V6.15384C9.23077 5.94983 9.31182 5.75418 9.45607 5.60992C9.60033 5.46566 9.79599 5.38461 10 5.38461C10.204 5.38461 10.3997 5.46566 10.5439 5.60992C10.6882 5.75418 10.7692 5.94983 10.7692 6.15384V9.23077H13.8462C14.0502 9.23077 14.2458 9.31181 14.3901 9.45607C14.5343 9.60033 14.6154 9.79599 14.6154 10C14.6154 10.204 14.5343 10.3997 14.3901 10.5439C14.2458 10.6882 14.0502 10.7692 13.8462 10.7692Z"
            fill="#40C734"
          />
        </svg>
      </div>
      <table className="w-full text-[20px] text-left rtl:text-right text-text-light dark:text-text-dark">
        <TableHeader header={header} />
        <tbody>
          {banks.map((bank, index) => (
            <tr
              key={bank.bank_id}
              className={`${index !== bank.length - 1 ? 'border-b' : ''}
                            dark:border-gray-700  ${
                              index % 2 !== 0
                                ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                                : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
                            }`}
            >
              <td
                scope="row"
                className="px-2 py-2 font-[400] text-[17px] text-center"
              >
                {index + 1}
              </td>
              <td
                scope="row"
                className="px-2 py-2 font-[400] text-[17px] text-center"
              >
                {bank.bank_account_name}
              </td>
              <td className="px-2 py-2 font-[400] text-[17px] text-center">
                {bank.bank_account_num}
              </td>
              <td className="px-2 py-2 font-[400] text-[17px] text-center">
                {bank.bank_ipan}
              </td>
              <td className="px-2 py-2 font-[400] text-[17px]">
                <img
                  src={bank.bank_img}
                  width={100}
                  alt={bank.bank_name}
                  className="m-auto"
                />
              </td>
              <td
                className="px-2 py-2 font-[400] text-[17px] m-auto"
                onClick={() => openAddBank(bank)}
              >
                <FiEdit3
                  className="text-xl text-Input-TextGreen"
                  role="button"
                />
              </td>
              <td className="px-2 py-2 font-[400] text-[17px]">
                <RiDeleteBin6Line
                  className="text-xl text-Input-TextRed"
                  role="button"
                  onClick={() => openModal(bank)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedBank && (
        <DeletePopup
          deleteName={selectedBank.bank_account_num}
          deleteId={selectedBank.bank_id}
          url={`banks`}
          isModalOpen={isModalOpen}
          display={displayBanks}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {selectedBank && (
        <BankPopup
          id={selectedBank.bank_id}
          bank_account_name={selectedBank.bank_account_name}
          bank_name={selectedBank.bank_name}
          bank_account_num={selectedBank.bank_account_num}
          bank_ipan={selectedBank.bank_ipan}
          bank_img={selectedBank.bank_img}
          display={displayBanks}
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
        />
      )}
      {!selectedBank && (
        <BankPopup
          isModalOpen={isAddModalOpen}
          display={displayBanks}
          setIsModalOpen={setIsAddModalOpen}
        />
      )}
    </div>
  );
}
