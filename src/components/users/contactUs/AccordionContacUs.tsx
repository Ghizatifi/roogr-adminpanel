import { useTranslation } from "react-i18next";
import ContactUsTable from "../../../pages/contactUs/ContactUsTable";
import RepliedTable from "../../../pages/contactUs/RepliedTable";
import AccordionHeader2 from "../../Accordion/AccordionHeader2";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";

interface AccordionContacUsProps {
    id?: string;
    idPre: string;
    type: string;
    pageName: string;
}

export default function AccordionContacUs({ pageName, idPre, type, id }: AccordionContacUsProps) {
    const { t } = useTranslation();
    return (
        <>
            <Breadcrumb breadcrumbLinks={[]} pageName={t(pageName)} />
            <AccordionHeader2
                titles={[
                    t(pageName),
                    t('contact-us.replied'),
                ]}
                children={[
                    <div>
                        <ContactUsTable type={type} idPre={idPre} id={id} />
                    </div>,
                    <div>
                        <RepliedTable type={type} idPre={idPre} id={id} />
                    </div>
                ]}
            />
        </>
    )
}
