import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
interface SettingsPopupProps {
    id: number;
    enquiry: string;
    isModalOpen: boolean;
    response:string
    setIsModalOpen: (isModalOpen: boolean) => void;
}
const ReplyPopup = ({
    id,
    isModalOpen,
    enquiry,
    response,
    setIsModalOpen,
}: SettingsPopupProps) => {

    const { t } = useTranslation();
    const closeModal = () => setIsModalOpen(false);
    return (
        <div>
            {isModalOpen && (
                <div
                    id={`popup-modal_add_${id}`}
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-secondaryBG-light data:bg-secondaryBG-dark bg-opacity-20"
                >
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
                            <div className="p-4 md:p-5">
                                <h3 className="mb-5 text-center text-2xl font-normal text-gray-500 dark:text-secondaryBG-light">
                                    {id && ` ${t('settings.edit')}`}
                                </h3>
                                <div className='m-auto w-[90%]'>
                                    <h3 className="mb-2 font-semibold dark:text-white">{t('contact-us.ticketDetails')}</h3>
                                    <div className='m-auto w-[90%] dark:bg-white dark:text-header-inputDark p-2 rounded-md'>{enquiry}</div>
                                </div>


                                <div className='m-auto w-[90%]'>
                                    <h3 className="mb-2 font-semibold dark:text-white">{t('contact-us.reply')}</h3>
                                    <div className='m-auto w-[90%] dark:bg-white dark:text-header-inputDark p-2 rounded-md'>{response}</div>
                                </div>


                                <div className="mb-5 mt-2">
                                    <div className="flex justify-end">
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
                </div>
            )}
        </div>
    );
};

export default ReplyPopup;
