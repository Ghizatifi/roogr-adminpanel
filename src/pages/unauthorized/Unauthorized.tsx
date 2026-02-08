import { useTranslation } from "react-i18next"

export default function Unauthorized() {
    const { t } = useTranslation()
    return (
        <>
            <div className="flex justify-center">
                <img src="./../../../401Unauthorized.png" alt="" width={450} />
            </div>
            <h1 className={`text-center md:mb-10 text-lg md:text-2xl font-bold`}>{t('unauthorized.title')}</h1>
            <p className={`text-center text-xl`}>{t('unauthorized.discribution')}</p>
        </>
    )
}
