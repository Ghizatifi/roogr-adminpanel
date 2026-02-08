import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../store/slices/language";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeletePopup from "../popups/DeletePopup";
import { ToastContainer } from "react-toastify";
import BanUnbanPopup from "../popups/BanUnbanPopup";
import { ChatValue } from "../../types/ChatValue";
import { useTranslation } from "react-i18next";
import BanImage from "./BanImage";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
interface ChatProps {
    chat: ChatValue;
    length?: number | undefined;
    userId?: string;
    chatId?: number | string;
    displayChats: () => ChatValue[] | ChatValue | null | Promise<void>;
}
type ModalType = 'delete' | 'customer' | 'advertizer' | null;
export default function Chat({ chat, displayChats, length, userId, chatId }: ChatProps) {
    const [isCustomerBan, setIsCustomerBan] = useState<boolean>(chat?.customer_banned == 1);
    const [isAdvertizerBan, setIsAdvertizerBan] = useState<boolean>(chat?.advertizer_banned == 1);
    const [selectedChat, setٍelectedChat] = useState<ChatValue | null>(null);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [showMassages, setShowMassages] = useState<{ [key: number]: boolean }>({});
    const toggleShowMessages = (chatId: number) => {
        setShowMassages((prevState) => ({
            ...prevState,
            [chatId]: !prevState[chatId]
        }));
        
    };
    const { t } = useTranslation();
    const location = useLocation();
    const reportId = location.state?.reportId;
    const language = useSelector(selectLanguage);
    const openBanModal = (type: ModalType) => {
        setٍelectedChat(chat);
        setModalType(type);
    };
    useEffect(() => {
        setIsCustomerBan(chat?.customer_banned == 1)
        setIsAdvertizerBan(chat?.advertizer_banned == 1)
    }, [chat]);
    return (
        <div className="border-[#DBD5D5] dark:border-[#413F5C] border-2 rounded-md mb-3">
            <div className={`bg-[#F7F5F9] dark:bg-[#2E2D3D] rounded-md ${length && length > 1 ? 'mb-5' : ''} p-3 flex flex-col`}>
                <div className="flex justify-between">
                    <div className="flex items-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        <div onClick={() => openBanModal('customer')}>
                            <BanImage isBan={isCustomerBan} />
                        </div>
                        <div className="w-8 h-8 rounded-full mx-2">
                            {chat?.customer_image?
                            <img src={chat?.customer_image} alt="customer_image" className="rounded-full" />:
                            <img src={`/person.jpeg`} alt="customer_image" className="rounded-full" />
                            }
                        </div>
                        <Link to={`/profile/${chat?.customer_id}`} className="dark:text-secondaryBG text-secondaryBG-dark mx-3">
                            {chat?.customer_first_name || ''} {chat?.customer_last_name}
                        </Link>

                    </div>
                    <div className="text-secondaryBG-dark border-[#D6D4D4] border-2 pt-1 flex
                        bg-[#DCECF5] rounded-md px-3" onClick={() => toggleShowMessages(chat.id)} role="button">
                            {t('Reports.headers.id')} RC-{reportId}
                            {/* {showMassages[chat?.id] ? <TfiAngleUp /> : <TfiAngleDown />}  */}
                        </div>
                    <div className="flex items-center" dir={language === 'ar' ? 'ltr' : 'rtl'}>
                        <div onClick={() => openBanModal('advertizer')}>
                            <BanImage isBan={isAdvertizerBan} />
                        </div>
                        <div className="w-8 h-8 rounded-full mx-2">
                            {chat?.advertizer_image?
                            <img src={chat?.advertizer_image} alt="customer_image" className="rounded-full" />:
                            <img src={`/person.jpeg`} alt="customer_image" className="rounded-full" />
                            }
                        </div>
                        <Link to={`/profile/${chat?.advertizer_id}`} className="dark:text-secondaryBG text-secondaryBG-dark mx-3">
                            {chat?.advertizer_first_name || ''} {chat?.advertizer_last_name}
                        </Link>
                    </div>
                </div>
            </div>
            {showMassages[chat?.id] &&
                <>
            <ChatCard id={chatId} userId={userId} advertizer_image={chat?.advertizer_image} customer_image={chat?.customer_image} />
                </>
            }
            <div className="flex justify-center p-4 bg-[#F7F5F9] dark:bg-[#2E2D3D]">
                <div className="flex gap-10">
                    <RiDeleteBin6Line className="text-2xl text-Input-TextRed" role="button"
                        onClick={() => openBanModal('delete')} />
                </div>
            </div>
            {selectedChat && modalType === 'delete' && (
                <DeletePopup
                    deleteName={`${selectedChat.customer_first_name} ${selectedChat.id}`}
                    deleteId={selectedChat.id}
                    url={`chats`}
                    isModalOpen={modalType === 'delete'}
                    setIsModalOpen={() => setModalType(null)}
                    display={displayChats}
                />
            )}
            {selectedChat && modalType === 'advertizer' && (
                <BanUnbanPopup
                    customerName={`${selectedChat.advertizer_first_name}`}
                    chatId={selectedChat.advertizer_id}
                    isModalOpen={modalType === 'advertizer'}
                    setIsModalOpen={() => setModalType(null)}
                    setIsBan={setIsAdvertizerBan}
                    isBan={isAdvertizerBan}
                />
            )}
            {selectedChat && modalType === 'customer' && (
                <BanUnbanPopup
                    customerName={`${selectedChat.customer_first_name}`}
                    chatId={selectedChat.customer_id}
                    isModalOpen={modalType === 'customer'}
                    setIsModalOpen={() => setModalType(null)}
                    setIsBan={setIsCustomerBan}
                    isBan={isCustomerBan}
                />
            )}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}