import React, { useEffect, useState } from 'react';

import cofirmIcon from '/true2.svg';
import rejectIcon from '/false2.svg';

import { useTranslation } from 'react-i18next';
import VerificationRequestsByUserid from '../../../hooks/verifaction_requests/useVerificationRequestsByUserid';
import useEditVerificationRequest from '../../../hooks/category_subscription/useEditVerficationReq';
import ImageWithFullscreen from '../../Fullscreen/Fulllscreen';
import ReusableInput from '../../products/ReusableInput';
import PeriodInput from '../../../pages/category_subscription/PeriodInput';
import handleStatus from '../../../hooks/category_subscription/handleStatus';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import AccordionHeader2 from '../../Accordion/AccordionHeader2';
import NotFoundSection from '../../Notfound/NotfoundSection';
import MainTable from '../../lastnews/MainTable';
import DeletePopup from '../../popups/DeletePopup';
import Tickectpopup from '../../../pages/verifaction_request/Tickectpopup';
import useToggleVerification from '../../../hooks/verifaction_requests/useUpdateVerification';

//
const ApprovedSubscription = '/true.png';
const EditIconSrc = '/Edit.svg';
const RemoveIconSrc = '/remove.svg';
const Notfound = '/not.png';

const VerifactionRequestByUserid = () => {
  const { t } = useTranslation();
  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState<string>('');
  const [isModalShow, setIsModalShow] = useState(false);
  const [item, setItem] = useState();

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
  const openModalShow = (item) => {
    setIsModalShow(true);
    setItem(item);
  };
  //
  const { toggleVerificationRequired, isSuccess } = useToggleVerification();

  const {
    EditVerificationRequest,
    loading: editLoading,
    error: editError,
    success: editSuccess,
  } = useEditVerificationRequest();
  //
  const handleOpenDeleteModal = (id: number, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsModalOpen(true);
  };
  const breadcrumbLinks = [{ label: '', path: '/' }];

  const [status, setStatus] = useState('processing');

  const { data, loading, error, refreshRequest } = VerificationRequestsByUserid(
    status,
    // currentPage,
  );
  useEffect(() => {
    if (isSuccess || editSuccess) {
      refreshRequest();
    }
  }, [isSuccess, editSuccess]);
  const fName: string = localStorage.getItem('first_name') || '';

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  //
  const headers = [
    {
      key: 'id',
      content: t('verification_request.headers.id'),
      className: 'text-center text-sm',
    },
    {
      key: 'verification_type',
      content: t('verification_request.headers.verification_type'),
      className: 'text-center text-sm',
    },
    {
      key: 'verification_type_number',
      content: t('verification_request.headers.verification_type_number'),
      className: 'text-center text-sm',
    },
    {
      key: 'verification_type_image',
      content: t('verification_request.headers.verification_type_image'),
      className: 'text-center text-sm',
    },
    {
      key: 'verification_required',
      content: t('verification_request.headers.verification_required'),
      className: 'text-center text-sm',
    },
    {
      key: 'transaction_image',
      content: t('verification_request.headers.transaction_image'),
      className: 'text-center text-sm',
    },
    {
      key: 'created_at', // Fixed typo: 'created_att' should be 'created_at'
      content: t('verification_request.headers.created_at'),
      className: 'text-center text-sm',
    },
    ...(status === 'expired' || status === 'approved'
      ? [
          {
            key: 'verified_at-approval', // Added suffix for uniqueness
            content: t('verification_request.headers.verified_at'),
            className: 'text-center text-sm',
          },
        ]
      : []),
    {
      key: 'verification_period',
      content: t('verification_request.headers.verification_period'),
      className: 'text-center text-sm',
    },
    ...(status === 'rejected'
      ? [
          {
            key: 'by_admin',
            content: t('verification_request.headers.By-admin'),
            className: 'text-center text-sm',
          },
        ]
      : []),
    {
      key: 'verified_by_accept',
      content:
        status === 'processing'
          ? t('subscriptions.headers.verified_by_accept')
          : t('subscriptions.headers.edit'),
      className: 'text-center text-sm',
    },
    {
      key: 'verified_by_reject',
      content:
        status === 'rejected'
          ? t('verification_request.headers.verified_by_accept')
          : t('verification_request.headers.verified_by_reject'),
      className: 'text-center text-sm',
    },
    ...(status === 'rejected'
      ? [
          {
            key: 'verified_at-remove',
            content: t('verification_request.headers.remove'),
            className: 'text-center text-sm',
          },
        ]
      : []),
  ];

  //

  const logs = Array.isArray(data)
    ? data.map((item) => {
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
              key: `id-${item.verification_request_id}`,
              content: 'RD-' + item.verification_request_id,
              className: 'flex justify-center text-sm',
            },
            {
              key: `verification_type-${item.verification_request_id}`,
              content: translateVerificationType(item.verification_type),
              className: 'flex justify-center text-sm',
            },
            {
              key: `verification_type_number-${item.verification_request_id}`,
              content: item.verification_type_number.toString().slice(0, 12),
              className: 'flex justify-center text-sm',
            },
            {
              key: `verification_type_image-${item.verification_request_id}`,
              content:
                item.STATUS === 'processing' ? (
                  <ImageWithFullscreen
                    src={item.verification_type_image}
                    alt="Transaction"
                    className="w-10 h-10 object-cover"
                  />
                ) : ApprovedSubscription ? (
                  <img
                    src={ApprovedSubscription}
                    alt="Approved"
                    className="w-6 h-6 text-center"
                  />
                ) : (
                  <img
                    src={Notfound}
                    alt="Approved"
                    className="w-6 h-6 text-center"
                  />
                ),
              className: 'flex justify-center text-sm',
            },
            {
              key: `verification_required-${item.verification_request_id}`,
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
              key: `transaction_image-${item.verification_request_id}`,
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
              key: `created_at-${item.verification_request_id}`,
              content: `${datePart}`,
              className: 'flex justify-center text-sm',
            },
            ...(item.STATUS === 'expired' || item.STATUS === 'approved'
              ? [
                  {
                    key: `verified_at-${item.verification_request_id}`,
                    content: `${VerifiedDatePart}`,
                    className: 'flex justify-center text-sm',
                  },
                ]
              : []),
            {
              key: `verification_period-${item.verification_request_id}`,
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
              // content:
              //   item.STATUS === 'expired' ? (
              //     <ReusableInput
              //       label=""
              //       type="text"
              //       value={`منتهية`}
              //       widthClass="w-15"
              //       border="border-2 border-Input-TextRed text-Input-TextRed"
              //       extraClass="bg-Input-red text-Input-TextRed text-center "
              //     />
              //   ) : (
              //     <PeriodInput item={item} />
              //   ),
              className: 'flex justify-center text-sm',
            },
            ...(item.STATUS === 'rejected'
              ? [
                  {
                    key: `by-${item.verification_request_id}`,
                    content: `by`,
                    className: 'flex justify-center text-sm',
                  },
                ]
              : []),
            {
              key: `verified_by_approved_or_edit-${item.verification_request_id}`,
              content:
                item.STATUS === 'processing' ? (
                  <img
                    src={cofirmIcon}
                    alt="Accept"
                    className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer text-sm"
                    onClick={() =>
                      handleStatus(
                        fName,
                        'approved',
                        undefined, // Pass undefined if `categoryId` is not relevant here
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
              key: `verified_by_reject-${item.verification_request_id}`,
              content:
                status === 'rejected' ? (
                  <img
                    src={cofirmIcon}
                    alt="Accept"
                    className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer text-sm"
                    onClick={() =>
                      handleStatus(
                        fName,
                        'approved',
                        undefined, // Pass undefined if `categoryId` is not relevant here
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
                        undefined, // Pass undefined if `categoryId` is not relevant here
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
                    key: `remove-${item.verification_request_id}`,
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
          t('verification_request.titles.rejected'),
          t('verification_request.titles.expired'),
        ]}
        onTitleClick={(index) => {
          const statusMap = ['processing', 'approved', 'rejected', 'expired'];
          setStatus(statusMap[index]);
        }}
        footerItems={[]}
        children={[
          <div key="processing">
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div key="approved">
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div key="rejected">
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div key="expired">
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
      <Tickectpopup
        item={item}
        setIsModalShow={setIsModalShow}
        isModalShow={isModalShow}
      />
    </div>
  );
};

export default VerifactionRequestByUserid;
