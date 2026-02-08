import React, { useEffect, useState } from 'react';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import cofirmIcon from '/true2.svg';
import rejectIcon from '/false2.svg';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import ImageWithFullscreen from '../../components/Fullscreen/Fulllscreen';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/pagination/Pagination';
import axiosInstance from '../../axiosConfig/instanc';
import PeriodInput from '../category_subscription/PeriodInput';
import useEditVerificationRequest from '../../hooks/category_subscription/useEditVerficationReq';
import handleStatus from '../../hooks/category_subscription/handleStatus';
import useVerificationRequestsByStatus from '../../hooks/verifaction_requests/useVerificationRequestsByStatus';
import DeletePopup from '../../components/popups/DeletePopup';
import useToggleVerification from '../../hooks/verifaction_requests/useUpdateVerification';
import { useLocation } from 'react-router-dom';
import Tickectpopup from './Tickectpopup';

//
const ApprovedSubscription = '/true.png';
const EditIconSrc = '/Edit.svg';
const RemoveIconSrc = '/remove.svg';

const verifaction_requestByStatus = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('processing');
  const [currentPage, setCurrentPage] = useState(0);
  const [verificationRequestCount, setverificationRequestCount] = useState(0);
  const [Count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState<string>('');
  const [isModalShow, setIsModalShow] = useState(false);
  const [item, setItem] = useState();
  const fName: string = localStorage.getItem('first_name') || '';

  const openModalShow = (item: any) => {
    setIsModalShow(true);
    setItem(item);
  };

  const location = useLocation();
  const { id } = location.state || {};
  const translateVerificationType = (type: string) => {
    switch (type) {
      case 'Identity Document':
        return t('VerificationType.Identity');
      case 'Freelancer Document':
        return t('VerificationType.Freelancer');
      case 'Commercial Register':
        return t('VerificationType.Commercial');
      default:
        return type;
    }
  };
  //
  const { EditVerificationRequest, success: editSuccess } =
    useEditVerificationRequest();
  //
  const totalPages = Math.ceil(verificationRequestCount);

  const { data, refreshRequest } = useVerificationRequestsByStatus(
    status,
    currentPage,
    id,
  );

  const handleOpenDeleteModal = (id: number, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsModalOpen(true);
  };

  const { toggleVerificationRequired, isSuccess } = useToggleVerification();
  useEffect(() => {
    // console.log(status);

    const fetchUsersCount = async () => {
      try {
        const response = await axiosInstance.get(
          `/verification_request/status/${status}/count`,
        );
        setverificationRequestCount(response.data.data.count / 8);
        setCount(response.data.data.count);
      } catch (err) {}
    };
    fetchUsersCount();
  }, [Count, status]);
  useEffect(() => {
    if (isSuccess || editSuccess) {
      refreshRequest();
    }
  }, [isSuccess, editSuccess]);
  const display = () => {
    refreshRequest();
  };
  const breadcrumbLinks = [
    { label: t('verification_request.label.label'), path: '/' },
  ];

  const headers = [
    {
      key: `header_id-${status}`,
      content: t('verification_request.headers.id'),
      className: 'text-center text-sm',
    },
    {
      key: `header_verification_type-${status}`,
      content: t('verification_request.headers.verification_type'),
      className: 'text-center text-sm',
    },
    {
      key: `header_verification_type_number-${status}`,
      content: t('verification_request.headers.verification_type_number'),
      className: 'text-center text-sm',
    },
    {
      key: `header_verification_type_image-${status}`,
      content: t('verification_request.headers.verification_type_image'),
      className: 'text-center text-sm',
    },
    {
      key: `header_verification_required-${status}`,
      content: t('verification_request.headers.verification_required'),
      className: 'text-center text-sm',
    },
    {
      key: `header_transaction_image-${status}`,
      content: t('verification_request.headers.transaction_image'),
      className: 'text-center text-sm',
    },
    {
      key: `header_created_at-${status}`,
      content: t('verification_request.headers.created_at'),
      className: 'text-center text-sm',
    },
    ...(status === 'expired' || status === 'approved'
      ? [
          {
            key: `header_verified_at-${status}`,
            content: t('verification_request.headers.verified_at'),
            className: 'text-center text-sm',
          },
        ]
      : []),
    {
      key: `header_verification_period-${status}`,
      content: t('verification_request.headers.verification_period'),
      className: 'text-center text-sm',
    },
    ...(status === 'rejected'
      ? [
          {
            key: `header_By_admin-${status}`,
            content: t('verification_request.headers.By-admin'),
            className: 'text-center text-sm',
          },
        ]
      : []),
    {
      key: `header_verified_by_accept-${status}`,
      content:
        status === 'processing'
          ? t('subscriptions.headers.verified_by_accept')
          : t('subscriptions.headers.edit'),
      className: 'text-center text-sm',
    },
    {
      key: `header_verified_by_reject-${status}`,
      content:
        status === 'rejected'
          ? t('verification_request.headers.verified_by_accept')
          : t('verification_request.headers.verified_by_reject'),
      className: 'text-center text-sm',
    },
    ...(status === 'rejected'
      ? [
          {
            key: `header_verified_at_remove-${status}`,
            content: t('verification_request.headers.remove'),
            className: 'text-center text-sm',
          },
        ]
      : []),
  ];

  const logs = Array.isArray(data)
    ? data.map((item, index) => {
        const createdAtDate = new Date(item.created_at);
        const datePart = createdAtDate.toLocaleDateString();
        const VerifiedDate = item.verified_at
          ? new Date(item.verified_at)
          : null;
        const VerifiedDatePart = VerifiedDate
          ? VerifiedDate.toLocaleDateString()
          : 'N/A';

        return {
          id: item.verification_request_id,
          type: 2,
          columns: [
            {
              key: `id-${item.verification_request_id}-${index}`,
              content: 'RD-' + item.verification_request_id,
              className: 'flex justify-center text-sm',
            },
            {
              key: `verification_type-${item.verification_request_id}-${index}`,
              content: translateVerificationType(item.verification_type),
              className: 'flex justify-center text-sm',
            },
            {
              key: `verification_type_number-${item.verification_request_id}-${index}`,
              content: item.verification_type_number.toString().slice(0, 12),
              className: 'flex justify-center text-sm',
            },
            {
              key: `transaction_image-${item.verification_request_id}-${index}`,
              content:
                item.STATUS === 'processing' ? (
                  <ImageWithFullscreen
                    src={item.verification_type_image}
                    alt="Transaction"
                    className="w-10 h-10 object-cover"
                  />
                ) : (
                  <img
                    src={ApprovedSubscription}
                    alt="Approved"
                    className="w-6 h-6 text-center"
                  />
                ),
              className: 'flex justify-center text-sm',
            },
            {
              key: `verification_required-${item.verification_request_id}-${index}`,
              content: (
                <button
                  onClick={() => {
                    toggleVerificationRequired(
                      item.verification_request_id,
                      item.verification_required,
                    );
                    refreshRequest;
                  }}
                  className={`w-10 rounded-xl text-center text-sm ${
                    item.verification_required
                      ? 'bg-Input-green text-Input-TextGreen border-2 border-Input-TextGreen'
                      : 'bg-Input-red text-Input-TextRed border-2 border-Input-TextRed'
                  }`}
                >
                  {item.verification_required ? t('yes') : t('no')}
                </button>
              ),
              className: 'flex justify-center text-sm',
            },
            {
              key: `image-${item.verification_request_id}-${index}`,
              content:
                item.STATUS === 'processing' ? (
                  <ImageWithFullscreen
                    src={item.transaction_image}
                    alt="Transaction"
                    className="w-10 h-10 object-cover text-sm"
                  />
                ) : (
                  <img
                    src={ApprovedSubscription}
                    alt="Approved"
                    className="w-6 h-6 text-center text-sm"
                  />
                ),
              className: 'flex justify-center text-sm',
            },
            {
              key: `date-${item.verification_request_id}-${index}`,
              content: `${datePart}`,
              className: 'flex justify-center text-sm',
            },
            ...(item.STATUS === 'expired' || item.STATUS === 'approved'
              ? [
                  {
                    key: `verified_date-${item.verification_request_id}-${index}`,
                    content: `${VerifiedDatePart}`,
                    className: 'flex justify-center text-sm',
                  },
                ]
              : []),
            {
              key: `verification_period-${item.verification_request_id}-${index}`,
              content:
                status === 'expired' ? (
                  <PeriodInput
                    item={item}
                    ItemStatus="expired"
                    refreshRequest={refreshRequest}
                  />
                ) : (
                  <PeriodInput item={item} refreshRequest={refreshRequest} />
                ),
              className: 'flex justify-center text-sm',
            },
            ...(item.STATUS === 'rejected'
              ? [
                  {
                    key: `by-${item.verification_request_id}-${index}`,
                    content: item?.name?.split(' ')[0],
                    className: 'flex justify-center text-sm',
                  },
                ]
              : []),
            {
              key: `verified_by_approved_or_edit-${item.verification_request_id}-${index}`,
              content:
                item.STATUS === 'processing' ? (
                  <img
                    src={cofirmIcon}
                    alt="Accept"
                    className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer text-sm"
                    onClick={() =>
                      handleStatus(
                        `${fName}`,
                        'approved',
                        item.verification_request_id,
                        item.verification_request_id,
                        undefined,
                        EditVerificationRequest,
                      )
                    }
                  />
                ) : (
                  <div
                    className="bg-EditIconBg rounded-md text-sm"
                    onClick={() => {
                      openModalShow(item);
                    }}
                  >
                    <img
                      src={EditIconSrc}
                      className="w-6 h-6 text-center p-1 cursor-pointer"
                    />
                  </div>
                ),
              className: 'flex justify-center text-sm',
            },
            {
              key: `verified_by_reject-${item.verification_request_id}-${index}`,
              content:
                item.STATUS === 'rejected' ? (
                  <img
                    src={cofirmIcon}
                    alt="Accept"
                    className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer text-sm"
                    onClick={() =>
                      handleStatus(
                        `${fName}`,
                        'approved',
                        item.verification_request_id,
                        item.verification_request_id,
                        undefined,
                        EditVerificationRequest,
                      )
                    }
                  />
                ) : (
                  <img
                    src={rejectIcon}
                    alt="Reject"
                    className="w-6 h-6 bg-RejectIconBg p-1 rounded-lg cursor-pointer text-sm"
                    onClick={() =>
                      handleStatus(
                        fName,
                        'rejected',
                        undefined,
                        item.verification_request_id,
                        undefined,
                        EditVerificationRequest,
                      )
                    }
                  />
                ),
              className: 'flex justify-center text-sm',
            },
            ...(item.STATUS === 'rejected'
              ? [
                  {
                    key: `remove-${item.verification_request_id}-${index}`,
                    content: (
                      <div className="bg-RemoveIconBg rounded-md">
                        <img
                          src={RemoveIconSrc}
                          className="w-6 h-6 text-center p-1 cursor-pointer"
                          onClick={() =>
                            handleOpenDeleteModal(
                              item.verification_request_id,
                              `RD-${item.verification_request_id}`,
                            )
                          }
                        />
                      </div>
                    ),
                    className: 'flex justify-center text-sm',
                  },
                ]
              : []),
          ],
        };
      })
    : [];

  return (
    <div>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={t('verification_request.label.confirm')}
      />

      <AccordionHeader2
        titles={[
          t('verification_request.titles.processing'),
          t('verification_request.titles.approved'),
          t('verification_request.titles.expired'),
          t('verification_request.titles.rejected'),
        ]}
        onTitleClick={(index) => {
          const statusMap = ['processing', 'approved', 'expired', 'rejected'];
          setStatus(statusMap[index]);
        }}
        footerItems={[
          <div>({Count})</div>,
          <div>({Count})</div>,
          <div>({Count})</div>,
          <div>({Count})</div>,
        ]}
        children={[
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
        ]}
      />
      {/* Delete Popup */}
      {deleteId && (
        <DeletePopup
          deleteName={deleteName}
          deleteId={deleteId}
          url="verification_request"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          display={display}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Tickectpopup
        item={item}
        setIsModalShow={setIsModalShow}
        isModalShow={isModalShow}
      />
    </div>
  );
};

export default verifaction_requestByStatus;
