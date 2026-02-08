import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import axiosInstance from '../../axiosConfig/instanc';
import { toast, ToastContainer } from 'react-toastify';
interface BanPopupProps {
    customerName: string;
    chatId: number;
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    setIsBan: (ban: boolean) => void;
    isBan:boolean
}

const BanUnbanPopup = ({
    customerName,
    chatId,
    isModalOpen,
    setIsModalOpen,
    setIsBan,
    isBan
}: BanPopupProps) => {
    const { t } = useTranslation();
    const closeModal = () => setIsModalOpen(false);
    const banUnbanChat = async () => {
        try {
            await axiosInstance.patch(`/users/${chatId}`);
            setIsModalOpen(false)
            setIsBan(!isBan)
            if(isBan){
                toast.success(t('Reports.label.unbanMassg'));
            }else{
                toast.success(t('Reports.label.banMassg'));
            }
        } catch (error: any) {
            console.error(error);
            setIsModalOpen(false)
            toast.error(error.response.data.message);
        }
    };
    return (
        <div>
            {isModalOpen && (
                <div
                    id={`popup-modal_${chatId}`}
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-TheadBorder-light bg-opacity-25">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                                        rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 
                                        dark:hover:text-white"
                            >
                                <IoClose className="text-lg" />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-secondaryBG-light">
                                    {t('Reports.label.banReason')} {customerName}{chatId}
                                </h3>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="my-3 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                        border-gray-300 focus:ring-blue-500 
                                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <div className="flex justify-between">
                                    <button
                                        onClick={banUnbanChat}
                                        className="text-white bg-red-600 hover:bg-red-800 focus:outline-none font-medium rounded-lg 
                                                text-sm px-5 py-2.5 text-center"
                                    >
                                        {isBan?t('BanList.unBan'):t('BanList.Ban')}
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-secondaryBG-light 
                                        rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4
                                            focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-secondaryBG-dark dark:text-secondaryBG-light
                                            dark:border-gray-600"
                                    >
                                        {t('popup.cancel')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};
export default BanUnbanPopup;
