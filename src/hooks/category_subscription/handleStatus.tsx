import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

// Define the types for the callback functions
type EditCategorySubscriptionStatus = (
  categoryId: number | string,
  status: 'approved' | 'rejected',
  reason?: string,
  dateNow?: string,
) => Promise<void>;

type EditVerificationRequest = (
  verificationId: number | string, // Accept both number and string
  status: 'approved' | 'rejected',
  reason?: string,
  dateNow?: string,
) => Promise<void>;

// const handleStatus = async (
//   adminName: string,
//   newStatus: 'approved' | 'rejected',

//   categoryId?: number | string,
//   VerifiedId?: number | string,

//   editCategorySubscriptionStatus?: EditCategorySubscriptionStatus,
//   EditVerificationRequest?: EditVerificationRequest,
// ) => {
//   const DateNow = new Date().toLocaleString('en-GB', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   });

//   const title = newStatus === 'approved' ? 'تأكيد الموافقة' : 'تفاصيل الطلب';
//   const confirmButtonText =
//     newStatus === 'approved' ? 'تأكيد الموافقة' : 'تأكيد الرفض';
//   const reasonTextarea =
//     newStatus === 'rejected'
//       ? `<div class="w-90">
//          <textarea id="reason" class="swal2-textarea w-full text-right" placeholder="اكتب سبب الرفض هنا" rows="4"></textarea>
//        </div>`
//       : '';

//   const { value: reason } = await Swal.fire({
//     html: `
//       <div class="text-center bg-secondaryBG-light dark:bg-secondaryBG-dark">
//         <h3 class="text-xl font-semibold text-text-light dark:text-text-dark mb-2">${title}</h3>
//         <div class="grid grid-cols-3 gap-2">
//           <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-1 rounded-md">
//             <span class="block font-bold text-lg">رقم القسم</span>
//             <span>RS-${categoryId}</span>
//           </div>
//           <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-1 rounded-md">
//             <span class="block font-bold text-lg">تاريخ اليوم</span>
//             <span>${DateNow}</span>
//           </div>
//           <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-1 rounded-md">
//             <span class="block font-bold text-lg">بواسطة</span>
//             <span>${adminName}</span>
//           </div>
//         </div>
//         ${reasonTextarea}
//       </div>
//     `,
//     focusConfirm: false,
//     showCancelButton: true,
//     customClass: {
//       popup:
//         'custom-popup bg-secondaryBG-light dark:bg-secondaryBG-dark rounded-md',
//       confirmButton:
//         newStatus === 'approved'
//           ? 'custom-confirm-btn bg-ConfirmIconBg text-white font-bold py-2 px-4 rounded'
//           : 'custom-confirm-btn bg-RejectIconBg text-white font-bold py-2 px-4 rounded',
//       cancelButton:
//         'custom-cancel-btn bg-red-500 text-white font-bold py-2 px-4 rounded',
//     },
//     confirmButtonText: confirmButtonText,
//     cancelButtonText: 'إلغاء',
//     preConfirm: () => {
//       if (newStatus === 'rejected') {
//         const reason = document.getElementById('reason')?.value;
//         if (!reason) {
//           Swal.showValidationMessage('الرجاء كتابة سبب الرفض');
//         }
//         return reason;
//       } else {
//         return '';
//       }
//     },
//   });

//   if (newStatus === 'approved' || reason) {
//     try {
//       if (categoryId && editCategorySubscriptionStatus) {
//         await editCategorySubscriptionStatus(
//           categoryId,
//           newStatus,
//           reason,
//           DateNow,
//         );
//       } else if (VerifiedId && EditVerificationRequest) {
//         await EditVerificationRequest(VerifiedId, newStatus, reason, DateNow);
//       }
//       // Optional: Reload the page or update the UI here
//       // window.location.reload();
//     } catch (error) {
//       console.error(
//         `Error updating category subscription (${newStatus}):`,
//         error,
//       );
//     }
//   }
// };

const handleStatus = async (
  adminName: string,
  newStatus: 'approved' | 'rejected',
  categoryId?: number | string,
  VerifiedId?: number | string,
  editCategorySubscriptionStatus?: EditCategorySubscriptionStatus,
  EditVerificationRequest?: EditVerificationRequest,
) => {
  const DateNow = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const title = newStatus === 'approved' ? 'تأكيد الموافقة' : 'تفاصيل الطلب';
  const confirmButtonText =
    newStatus === 'approved' ? 'تأكيد الموافقة' : 'تأكيد الرفض';
  const reasonTextarea =
    newStatus === 'rejected'
      ? `<div class="w-90">
           <textarea id="reason" class="swal2-textarea w-full text-right" placeholder="اكتب سبب الرفض هنا" rows="4"></textarea>
         </div>`
      : '';

  // Show the SweetAlert modal
  const { value: reason, isConfirmed } = await Swal.fire({
    html: `
      <div class="text-center bg-secondaryBG-light dark:bg-secondaryBG-dark">
        <h3 class="text-xl font-semibold text-text-light dark:text-text-dark mb-2">${title}</h3>
        <div class="grid grid-cols-3 gap-2">
          <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-1 rounded-md">
            <span class="block font-bold text-lg">رقم القسم</span>
            <span>RS-${categoryId}</span>
          </div>
          <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-1 rounded-md">
            <span class="block font-bold text-lg">تاريخ اليوم</span>
            <span>${DateNow}</span>
          </div>
          <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-1 rounded-md">
            <span class="block font-bold text-lg">بواسطة</span>
            <span>${adminName}</span>
          </div>
        </div>
        ${reasonTextarea}
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    customClass: {
      popup:
        'custom-popup bg-secondaryBG-light dark:bg-secondaryBG-dark rounded-md',
      confirmButton:
        newStatus === 'approved'
          ? 'custom-confirm-btn bg-ConfirmIconBg text-white font-bold py-2 px-4 rounded'
          : 'custom-confirm-btn bg-RejectIconBg text-white font-bold py-2 px-4 rounded',
      cancelButton:
        'custom-cancel-btn bg-red-500 text-white font-bold py-2 px-4 rounded',
    },
    confirmButtonText: confirmButtonText,
    cancelButtonText: 'إلغاء',
    preConfirm: () => {
      if (newStatus === 'rejected') {
        const reason = document.getElementById('reason')?.value;
        if (!reason) {
          Swal.showValidationMessage('الرجاء كتابة سبب الرفض');
        }
        return reason;
      } else {
        return ''; // No reason needed for approval
      }
    },
  });

  // If the user clicked "Cancel" (isConfirmed is false), exit early
  if (!isConfirmed) {
    // console.log('User canceled the operation');
    return; // No action is performed
  }

  // Proceed with the approval or rejection process
  if (newStatus === 'approved' || reason) {
    try {
      if (categoryId && editCategorySubscriptionStatus) {
        await editCategorySubscriptionStatus(
          categoryId,
          newStatus,
          reason,
          DateNow,
        );
      } else if (VerifiedId && EditVerificationRequest) {
        await EditVerificationRequest(VerifiedId, newStatus, reason, DateNow);
      }
      // Optional: Reload the page or update the UI here
      // window.location.reload();
    } catch (error) {
      console.error(
        `Error updating category subscription (${newStatus}):`,
        error,
      );
    }
  }
};

export default handleStatus;
