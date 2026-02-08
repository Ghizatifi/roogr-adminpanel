import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useTranslation } from 'react-i18next';
import AdminsList from '../../components/admins/AdminList';
import { useState } from 'react';
import AddAdmin from './AddAdmin';

export default function Admins() {
  const { t } = useTranslation();
  const breadcrumbLinks = [{ label: t('admins.label'), path: '/admins' }];

  return (
    <>
      <div className="">
        <Breadcrumb
          pageName={t('admins.title')}
          breadcrumbLinks={breadcrumbLinks}
        />
        <Accordion />
        {/* <Link to={`/admins/add-admin`}>
          <CgAddR className="text-3xl text-Input-TextGreen" role="button" />
        </Link> */}
      </div>
      <AdminsList />
    </>
  );
}
//

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2>
        <button
          type="button"
          className={`flex items-center rounded-md justify-between w-full p-5 font-medium bg-secondaryBG-light dark:bg-secondaryBG-dark  gap-3 ${
            isOpen ? '' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-3">
            {title}
            <svg
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
          </span>
          <svg
            className={`w-3 h-3 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 10 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5L5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      {isOpen && <div className="  ">{children}</div>}
    </div>
  );
};

const Accordion = () => {
  const { t } = useTranslation();

  return (
    <div id="accordion-open">
      <AccordionItem title={t('admins.add')}>
        <AddAdmin />
      </AccordionItem>
    </div>
  );
};
