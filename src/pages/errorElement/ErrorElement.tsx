import { useTranslation } from "react-i18next";

export default function ErrorElement() {
    const { t } = useTranslation()
    return (
        <div>
            <h1 className={`text-center md:mt-10 text-lg md:text-2xl font-bold`}>{t('errorElement.title')}</h1>
            <div className="flex justify-center">
                <img src="./../../../500Internal.png" alt="" width={500} />
            </div>
        </div>
    )
}
