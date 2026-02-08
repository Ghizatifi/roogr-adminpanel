import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';

const content = {
  ar: {
    title: 'كيفية حذف حسابك',
    intro: 'اتبع الخيارات أدناه لحذف حسابك نهائياً.',
    optionA: 'الخيار أ — من داخل التطبيق (موصى به)',
    optionADesc: 'افتح التطبيق → الإعدادات → الحساب → حذف الحساب → ثم أكد الطلب.',
    optionB: 'الخيار ب — عبر البريد الإلكتروني (إذا لا يمكنك الدخول للتطبيق)',
    optionBDesc: 'أرسل رسالة إلى',
    optionBEmail: 'gmsila92@gmail.com',
    optionBInclude: 'وتضمّن:',
    optionBList: ['البريد الإلكتروني/المعرّف المستخدم داخل التطبيق', 'العنوان: طلب حذف الحساب', 'حدد إن كنت تريد حذف الحساب + البيانات أو البيانات فقط'],
    whatDeleted: 'ما الذي سيتم حذفه',
    whatDeletedList: ['بيانات الملف الشخصي (مثل الاسم، البريد الإلكتروني، المعرّف)', 'المحتوى/البيانات التي أنشأتها داخل التطبيق (مثل التفضيلات والسجل والعناصر المحفوظة)', 'رموز تسجيل الدخول والجلسات'],
    processing: 'مدة المعالجة',
    processingDesc: 'تتم معالجة الحذف خلال 30 يومًا كحد أقصى. قد نحتفظ ببعض البيانات لفترة أطول إذا كان ذلك مطلوبًا قانونيًا (الفوترة، مكافحة الاحتيال، متطلبات تنظيمية).',
    developerInfo: 'معلومات المطوّر',
    appName: 'اسم التطبيق',
    appNameVal: 'روجر (Roogr)',
    developer: 'المطوّر',
    developerVal: 'Roogr',
    country: 'البلد',
    countryVal: 'السعودية',
    lastUpdate: 'آخر تحديث',
    lastUpdateVal: '2026-01-26',
    dataRetained: 'بيانات قد يتم الاحتفاظ بها',
    dataRetainedDesc: 'سجلات تقنية (Logs)، بيانات ضرورية للأمان، وبيانات مطلوبة قانونيًا (مثل الفوترة).',
    links: 'روابط',
    privacyLink: 'سياسة الخصوصية',
    termsLink: 'شروط الاستخدام',
    screenshots: 'لقطات الشاشة',
    screen1: 'لقطة 1 — الوصول إلى الإعدادات',
    screen2: 'لقطة 2 — قسم الحساب',
    screen3: 'لقطة 3 — زر "حذف الحساب"',
    screen4: 'لقطة 4 — تأكيد الحذف',
    viewScreens: 'عرض لقطات الشاشة',
    warning: 'حذف الحساب نهائي. لا يمكن استرداد البيانات.',
    backHome: 'العودة للرئيسية',
    aboutUs: 'من نحن',
  },
  en: {
    title: 'How to delete your account',
    intro: 'Follow the options below to permanently delete your account.',
    optionA: 'Option A — From inside the app (recommended)',
    optionADesc: 'Open the app → Settings → Account → Delete account → then confirm the request.',
    optionB: 'Option B — Via email (if you cannot access the app)',
    optionBDesc: 'Send an email to',
    optionBEmail: 'gmsila92@gmail.com',
    optionBInclude: 'and include:',
    optionBList: ['The email/identifier used in the app', 'Subject: Account deletion request', 'Specify whether you want to delete account + data or data only'],
    whatDeleted: 'What will be deleted',
    whatDeletedList: ['Profile data (e.g. name, email, identifier)', 'Content/data you created in the app (e.g. preferences, history, saved items)', 'Login tokens and sessions'],
    processing: 'Processing time',
    processingDesc: 'Deletion is processed within 30 days at most. We may retain some data longer if legally required (billing, fraud prevention, regulatory requirements).',
    developerInfo: 'Developer information',
    appName: 'App name',
    appNameVal: 'Roogr',
    developer: 'Developer',
    developerVal: 'Roogr',
    country: 'Country',
    countryVal: 'Saudi Arabia',
    lastUpdate: 'Last update',
    lastUpdateVal: '2026-01-26',
    dataRetained: 'Data that may be retained',
    dataRetainedDesc: 'Technical logs, data necessary for security, and data required by law (e.g. billing).',
    links: 'Links',
    privacyLink: 'Privacy Policy',
    termsLink: 'Terms of Use',
    screenshots: 'Screenshots',
    screen1: 'Screenshot 1 — Accessing Settings',
    screen2: 'Screenshot 2 — Account section',
    screen3: 'Screenshot 3 — "Delete account" button',
    screen4: 'Screenshot 4 — Confirm deletion',
    viewScreens: 'View screenshots',
    warning: 'Account deletion is permanent. Data cannot be recovered.',
    backHome: 'Back to Home',
    aboutUs: 'About Us',
  },
};

const screens = [
  { src: '/assets/screen-1.png', altKey: 'screen1' as const },
  { src: '/assets/screen-2.png', altKey: 'screen2' as const },
  { src: '/assets/screen-3.png', altKey: 'screen3' as const },
  { src: '/assets/screen-4.png', altKey: 'screen4' as const },
];

export default function HowToDeleteAccount() {
  const lang = useSelector(selectLanguage);
  const t = content[lang === 'ar' ? 'ar' : 'en'];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="landing-anim-fade-up">
        <h1 className="mb-4 text-4xl font-bold text-[#022E47] dark:text-[#70F1EB] sm:text-5xl">
          {t.title}
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          {t.intro}
        </p>
      </div>

      <section className="landing-anim-on-scroll mb-8 rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
        <h2 className="mb-4 text-2xl font-semibold text-[#022E47] dark:text-[#70F1EB]">
          {t.optionA}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t.optionADesc}
        </p>
      </section>

      <section className="landing-anim-on-scroll mb-8 rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
        <h2 className="mb-4 text-2xl font-semibold text-[#022E47] dark:text-[#70F1EB]">
          {t.optionB}
        </h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          {t.optionBDesc}{' '}
          <a
            href={`mailto:${content.ar.optionBEmail}?subject=${encodeURIComponent(lang === 'ar' ? 'طلب حذف الحساب' : 'Account deletion request')}`}
            className="font-mono text-[#022E47] underline dark:text-[#70F1EB]"
          >
            {t.optionBEmail}
          </a>{' '}
          {t.optionBInclude}
        </p>
        <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
          {t.optionBList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="landing-anim-on-scroll mb-8 rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
        <h2 className="mb-4 text-2xl font-semibold text-[#022E47] dark:text-[#70F1EB]">
          {t.whatDeleted}
        </h2>
        <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
          {t.whatDeletedList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="landing-anim-on-scroll mb-8 rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
        <h2 className="mb-2 text-2xl font-semibold text-[#022E47] dark:text-[#70F1EB]">
          {t.processing}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t.processingDesc}
        </p>
      </section>

      <aside className="landing-anim-on-scroll mb-8 rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
        <h2 className="mb-4 text-2xl font-semibold text-[#022E47] dark:text-[#70F1EB]">
          {t.developerInfo}
        </h2>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <dt className="text-gray-600 dark:text-gray-400">{t.appName}</dt>
          <dd>{t.appNameVal}</dd>
          <dt className="text-gray-600 dark:text-gray-400">{t.developer}</dt>
          <dd>{t.developerVal}</dd>
          <dt className="text-gray-600 dark:text-gray-400">{t.country}</dt>
          <dd>{t.countryVal}</dd>
          <dt className="text-gray-600 dark:text-gray-400">{t.lastUpdate}</dt>
          <dd>{t.lastUpdateVal}</dd>
        </dl>
        <h3 className="mt-6 mb-2 text-lg font-semibold text-[#022E47] dark:text-[#70F1EB]">
          {t.dataRetained}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {t.dataRetainedDesc}
        </p>
        <h3 className="mt-6 mb-2 text-lg font-semibold text-[#022E47] dark:text-[#70F1EB]">
          {t.links}
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/privacy-policy" className="rounded-lg border border-[#022E47] px-4 py-2 text-[#022E47] hover:bg-[#022E47] hover:text-white dark:border-[#70F1EB] dark:text-[#70F1EB] dark:hover:bg-[#70F1EB] dark:hover:text-[#022E47]">
            {t.privacyLink}
          </Link>
          <a href="https://roogr.sa/privacy-policy/" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#022E47] px-4 py-2 text-[#022E47] hover:bg-[#022E47] hover:text-white dark:border-[#70F1EB] dark:text-[#70F1EB] dark:hover:bg-[#70F1EB] dark:hover:text-[#022E47]">
            {t.termsLink}
          </a>
        </div>
      </aside>

      <section id="screens" className="landing-anim-on-scroll mb-8 rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
        <h2 className="mb-6 text-2xl font-semibold text-[#022E47] dark:text-[#70F1EB]">
          {t.screenshots}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {screens.map((s, i) => (
            <figure key={i} className="overflow-hidden rounded-xl border border-gray-200 dark:border-[#2E2D3D]">
              <img
                src={s.src}
                alt={t[s.altKey]}
                className="h-auto w-full bg-gray-100 object-cover dark:bg-[#2E2D3D]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#f3f4f6" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-size="14">${t[s.altKey]}</text></svg>`);
                }}
              />
              <figcaption className="bg-gray-50 p-2 text-center text-sm text-gray-600 dark:bg-[#2E2D3D] dark:text-gray-400">
                {t[s.altKey]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800/50 dark:bg-amber-900/20">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
          {t.warning}
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/"
          className="rounded-xl bg-[#022E47] px-6 py-3 font-semibold text-white transition hover:bg-[#033a5c] dark:bg-[#70F1EB] dark:text-[#022E47] dark:hover:bg-[#8ef4ef]"
        >
          {t.backHome}
        </Link>
        <Link
          to="/about-us"
          className="rounded-xl border-2 border-[#022E47] px-6 py-3 font-semibold text-[#022E47] transition hover:bg-[#022E47] hover:text-white dark:border-[#70F1EB] dark:text-[#70F1EB] dark:hover:bg-[#70F1EB] dark:hover:text-[#022E47]"
        >
          {t.aboutUs}
        </Link>
        <a
          href="#screens"
          className="rounded-xl border-2 border-red-500 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-[#022E47]"
        >
          {t.viewScreens}
        </a>
      </div>
    </div>
  );
}
