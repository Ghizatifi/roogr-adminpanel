import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';
import axiosInstance from '../../axiosConfig/instanc';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ChatCardProps {
    id?: number | string;
    userId?: string;
    advertizer_image: string;
    customer_image: string;
}
interface MessagesValue {
    customer_id: number;
    from_id: number;
    form_name: string;
    advertizer_id: number;
    to_name: string;
    message_id: number;
    text: string;
    attachment: string;
    date_added: string;
    status: number;
    length: number;
}

export default function ChatCard({ id, userId, customer_image, advertizer_image }: ChatCardProps) {
    const { t } = useTranslation();
    const language = useSelector(selectLanguage);
    const [messages, setMessages] = useState<MessagesValue[]>([]);
    const displayChatMsg = async () => {
        try {
            const res = await axiosInstance.get(`/chats/messages/${id}`);
            setMessages(res.data.data);

        } catch (error: any) {
            console.error(error);
        }
    };
    useEffect(() => {
        displayChatMsg();
    }, []);

    return (
        <div className="p-3 h-70 overflow-y-scroll">
            {messages.length > 0 ? (
                messages.map((msg) => {
                    const isUserMessage = msg.from_id === msg.customer_id;
                    const bubbleDirection = isUserMessage ? (language === 'ar' ? 'rtl' : 'ltr') : (language === 'ar' ? 'ltr' : 'rtl');
                    return (
                        <div key={msg.message_id} className={`flex mb-6 ${isUserMessage ? 'justify-start' : 'justify-end'}`}>
                            <div
                                className="flex items-start gap-2.5"
                                dir={bubbleDirection}
                            >
                                {isUserMessage && (
                                    <>
                                        <div className="w-8 h-8 rounded-full">
                                            {customer_image?
                                            <img src={customer_image} alt="customer_image" className="rounded-full" />:
                                            <img src={`/person.jpeg`} alt="customer_image" className="rounded-full" />
                                            }
                                        </div>
                                        <div
                                            className={`w-64 p-4 rounded-xl leading-1.5 border-gray-200 bg-[#335E86] dark:[#335E86]`}
                                        >
                                            <p className="text-secondaryBG-light">{msg.text}</p>
                                            <p className="text-secondaryBG-light flex justify-end">{new Date(msg.date_added).toLocaleDateString()}</p>
                                        </div>
                                    </>
                                )}
                                {!isUserMessage && (
                                    <>
                                        <div className="w-8 h-8 rounded-full">
                                            {advertizer_image ?
                                                <img src={advertizer_image} alt="advertizer_image" className="rounded-full" /> :
                                                <img src={`/person.jpeg`} alt="advertizer_image" className="rounded-full" />
                                            }
                                        </div>
                                        <div
                                            className={`w-64 p-4 rounded-xl leading-1.5 border-gray-200 bg-[#9D9D9D] dark:[#9D9D9D]`}
                                        >
                                            <p className="text-secondaryBG-light" dir={language === 'ar' ? 'rtl' : 'ltr'}>{msg.text}</p>
                                            <p className="text-secondaryBG-light">{new Date(msg.date_added).toLocaleDateString()}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="font-semibold">{t('Reports.label.isMsg')}</div>
            )}
        </div>
    );
}
