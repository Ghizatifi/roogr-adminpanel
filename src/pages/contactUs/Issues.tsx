import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { CgAddR } from "react-icons/cg";
import AccordionHeader2 from "../../components/Accordion/AccordionHeader2";
import ContactUsTable from "./ContactUsTable";
import RepliedTable from "./RepliedTable";
import { useLocation } from "react-router-dom";

export default function Issues() {
    const { t } = useTranslation();
    const location = useLocation();
    const { id } = location.state || {};
    const breadcrumbLinks = [{ label: t('contact-us.contact-us'), path: '' }]
    return (
        <div>
            <div className="flex justify-between">
                <Breadcrumb pageName={t('contact-us.issues')} breadcrumbLinks={breadcrumbLinks} />
                <CgAddR className="text-3xl text-Input-TextGreen" role="button" />
            </div>
            <AccordionHeader2
                titles={[
                    t('contact-us.issues'),
                    t('contact-us.replied'),
                ]}
                children={[
                    <div>
                        <ContactUsTable type="issue" idPre={`RQ2-`} query={id}/>
                    </div>,
                    <div>
                        <RepliedTable type="issue" idPre={`RQ2-`} query={id}/>
                    </div>
                ]}
            />
        </div>
    )
}
