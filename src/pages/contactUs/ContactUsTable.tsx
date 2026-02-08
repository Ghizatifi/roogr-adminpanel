import { useTranslation } from 'react-i18next';
import TableHeader from '../../components/Tables/TableHeader';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import SupportPopup from '../../components/popups/SupportPopup';
import ContactUsType from '../../types/Contactus';

interface ContactUsTableProps {
  type: string;
  idPre: string;
  query?: string;
  id?: string;
}
export default function ContactUsTable({
  type,
  idPre,
  query,
  id,
}: ContactUsTableProps) {
  const { t } = useTranslation();
  const [contactUs, setContactUs] = useState<ContactUsType[]>([]);
  const [selectedSupport, setSelectedSupport] = useState<ContactUsType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const header: any[] = [
    t(`contact-us.ticketNumber`),
    t(`contact-us.username`),
    t(`contact-us.inquiryDate`),
    t(`contact-us.view`),
  ];

  const openModle = (support: ContactUsType) => {
    setSelectedSupport(support);
    setIsModalOpen(true);
  };
  const displayContactUs = async () => {
    try {
      const res = await axiosInstance.get(
        `/support/type/${type}/status/open`,
      );
      setContactUs(res.data.data);
    } catch (error: any) {
      console.error(error);
    }
  };
  const displayContactUsByUser = async () => {
    try {
      const res = await axiosInstance.get(
        `/support/users/${id}/type/${type}/status/open`,
        {},
      );
      setContactUs(res.data.data);
    } catch (error: any) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!id) {
      displayContactUs();
    } else if (id) {
      displayContactUsByUser();
    }
  }, [type, query, id]);
  return (
    <div>
      <table className="w-full text-[20px] text-left rtl:text-right text-text-light dark:text-text-dark">
        <TableHeader header={header} />
        <tbody>
          {contactUs.map((support, index) => (
            <tr
              key={support.ticket_id}
              className={`dark:border-gray-700  ${
                index % 2 !== 0
                  ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                  : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
              }`}
            >
              <td
                scope="row"
                className="px-2 py-2 font-[400] text-[17px] text-center"
              >
                {idPre}
                {support.ticket_id}
              </td>
              <td className="px-2 py-2 font-[400] text-[17px] text-center">
                {support.customer_name}
              </td>
              <td className="px-2 py-2 font-[400] text-[17px] text-center">
                {support.date_added}
              </td>
              <td className="px-2 py-2 font-[400] text-[17px] text-center">
                <img
                  src="./../../../Edit.svg"
                  alt=""
                  className="bg-edit p-1 m-auto rounded-md"
                  role="button"
                  onClick={() => openModle(support)}
                />
              </td>
              {selectedSupport && (
                <SupportPopup
                  id={selectedSupport.ticket_id}
                  ticket_id={selectedSupport.ticket_id}
                  response={selectedSupport.response}
                  enquiry={selectedSupport.enquiry}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  admin_id={selectedSupport.admin_id}
                  customer_id={selectedSupport.customer_id}
                  subject={selectedSupport.subject}
                  display={displayContactUs}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
