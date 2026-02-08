import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';

const content = {
  ar: {
    title: 'روجر Roogr',
    termsTitle: '🔶 الشروط والأحكام',
    termsIntro: 'مرحباً بك في روجر Roogr، منصة المتاجر الحرة الإلكترونية. باستخدامك للموقع فإنك توافق على الشروط التالية:',
    terms: [
      { title: '1. قبول الشروط', body: 'باستخدامك للموقع أو التسجيل فيه فإنك تقر بأنك قرأت وفهمت ووافقت على هذه الشروط. يحق لإدارة الموقع تعديل الشروط في أي وقت ويتم نشر التحديث على هذه الصفحة.' },
      { title: '2. تعريفات', body: 'الموقع: منصة روجر Roogr الإلكترونية.\nالمستخدم: كل من يستخدم الموقع سواء كان بائعاً أو مشترياً.\nالمتجر: الحساب التجاري المسجّل لعرض المنتجات وبيعها.' },
      { title: '3. إنشاء حساب', body: 'يجب أن تكون المعلومات صحيحة وكاملة.\nيحظر استخدام بيانات غيرك أو تزوير الهوية.\nتتحمل المسؤولية الكاملة عن حماية حسابك وكلمة المرور.' },
      { title: '4. شروط المتاجر', body: 'يلتزم البائع بطرح منتجات أصلية ومصرح ببيعها.\nيمنع بيع المنتجات المخالفة للأنظمة والقوانين في المملكة العربية السعودية.\nيجب توضيح تفاصيل المنتج بدقة (السعر – المواصفات – الضمان – سياسة الاسترجاع).' },
      { title: '5. مسؤولية روجر Roogr', body: 'المنصة وسيط تقني فقط بين المعلن والزبون ولا تتحمل مسؤولية مباشرة عن المنتج.\nلا تتحمل المنصة أي خسائر ناتجة عن تعامل مباشر بين المستخدمين خارج النظام.' },
      { title: '6. الدفع والرسوم', body: 'قد تفرض روجر رسوماً على تشغيل المتجر أو عمليات البيع ويتم الإعلان عنها مسبقاً.\nجميع العمليات المالية تتم عبر مزودين معتمدين وموثوقين.' },
      { title: '7. الشحن والتسليم', body: 'مسؤولية الشحن تقع على البائع أو مزود الشحن المعتمد.\nيجب توضيح مدة التوصيل وتكاليف الشحن للمشتري قبل إتمام الطلب.' },
      { title: '8. الإرجاع والاستبدال', body: 'يلتزم البائع بسياسة الاسترجاع التي يضعها النظام، وبما يتوافق مع قوانين حماية المستهلك.\nفي حال وجود نزاع يتم التعامل معه من خلال فريق الدعم الخاص بالموقع.' },
      { title: '9. المحتوى الممنوع', body: 'يُمنع تماماً عرض أو بيع:\nالأسلحة أو المواد الخطرة\nالأدوية أو المنتجات الطبية غير المصرح بها\nالمحتوى المخالف للآداب العامة أو الأنظمة المحلية\nالمنتجات المقلدة أو المنتهكة للملكية الفكرية' },
      { title: '10. الملكية الفكرية', body: 'جميع محتويات الموقع بما فيها التصميم والشعار والمحتوى محمية بحقوق الملكية الفكرية ولا يجوز استخدامها أو نسخها دون إذن.' },
      { title: '11. إيقاف الحساب', body: 'يحق لإدارة روجر Roogr إيقاف أو حذف أي حساب خالف الشروط دون إشعار مسبق.' },
      { title: '12. التواصل والدعم', body: 'يمكن التواصل مع إدارة الموقع عبر البريد أو النموذج المخصص داخل النظام.' },
    ],
    privacyTitle: '🔶 سياسة الخصوصية',
    privacy: [
      { title: '1. المعلومات التي نجمعها', body: 'معلومات التسجيل: الاسم، البريد، رقم الجوال.\nمعلومات الدفع والشحن.\nبيانات الاستخدام: مثل الصفحات التي تزورها وسجل الطلبات.' },
      { title: '2. كيفية استخدام المعلومات', body: 'توفير خدمات الموقع وتحسينها.\nمعالجة الطلبات والدفع والشحن.\nالتواصل معك عند الحاجة.\nالحماية من الاحتيال والانتهاكات.' },
      { title: '3. مشاركة المعلومات', body: 'لا يتم مشاركة بياناتك إلا مع:\nمزودي الدفع.\nشركات الشحن.\nالجهات الحكومية عند الطلب القانوني.' },
      { title: '4. حماية البيانات', body: 'نعمل على حماية بياناتك باستخدام معايير أمان عالية وتشفير للمعلومات الحساسة.' },
    ],
    cookies: '5. ملفات تعريف الارتباط (Cookies)\nيستخدم الموقع ملفات تتبع لتحسين تجربتك، ويمكنك تعطيلها من إعدادات المتصفح.',
    userRights: '6. حقوق المستخدم\nالوصول لبياناتك الشخصية\nتعديلها\nطلب حذفها',
    changes: '7. التعديلات\nقد يتم تحديث هذه السياسة في أي وقت، وسيتم نشر التحديث هنا.',
    copyright: '© 2024 روجر Roogr. جميع الحقوق محفوظة.',
    backHome: 'العودة للرئيسية',
  },
  en: {
    title: 'Roogr',
    termsTitle: '🔶 Terms and Conditions',
    termsIntro: 'Welcome to Roogr, the electronic free stores platform. By using the site you agree to the following terms:',
    terms: [
      { title: '1. Acceptance of terms', body: 'By using or registering on the site you acknowledge that you have read, understood and agreed to these terms. Management may modify the terms at any time and updates will be published on this page.' },
      { title: '2. Definitions', body: 'Site: Roogr electronic platform.\nUser: Anyone who uses the site whether seller or buyer.\nStore: The registered business account for displaying and selling products.' },
      { title: '3. Account creation', body: 'Information must be correct and complete.\nYou may not use others\' data or falsify identity.\nYou are fully responsible for protecting your account and password.' },
      { title: '4. Store terms', body: 'Sellers must list original products authorised for sale.\nSale of products that violate regulations and laws in the Kingdom of Saudi Arabia is prohibited.\nProduct details (price, specifications, warranty, return policy) must be clearly stated.' },
      { title: '5. Roogr responsibility', body: 'The platform is a technical intermediary only between advertiser and customer and is not directly responsible for the product.\nThe platform is not responsible for any losses from direct dealings between users outside the system.' },
      { title: '6. Payment and fees', body: 'Roogr may charge fees for operating the store or sales; these will be announced in advance.\nAll financial operations are through approved and trusted providers.' },
      { title: '7. Shipping and delivery', body: 'Shipping responsibility lies with the seller or approved shipping provider.\nDelivery time and shipping costs must be clarified to the buyer before completing the order.' },
      { title: '8. Returns and replacement', body: 'The seller must comply with the return policy set by the system and consumer protection laws.\nDisputes are handled by the site\'s support team.' },
      { title: '9. Prohibited content', body: 'It is strictly prohibited to display or sell:\nWeapons or dangerous materials\nUnauthorised medicines or medical products\nContent that violates public morals or local regulations\nCounterfeit products or those infringing intellectual property' },
      { title: '10. Intellectual property', body: 'All site content including design, logo and content is protected by intellectual property rights and may not be used or copied without permission.' },
      { title: '11. Account suspension', body: 'Roogr management may suspend or delete any account that violates the terms without prior notice.' },
      { title: '12. Contact and support', body: 'You can contact site management via email or the dedicated form within the system.' },
    ],
    privacyTitle: '🔶 Privacy Policy',
    privacy: [
      { title: '1. Information we collect', body: 'Registration info: name, email, phone number.\nPayment and shipping info.\nUsage data: e.g. pages you visit and order history.' },
      { title: '2. How we use information', body: 'To provide and improve site services.\nTo process orders, payment and shipping.\nTo contact you when needed.\nTo protect against fraud and abuse.' },
      { title: '3. Sharing information', body: 'Your data is not shared except with:\nPayment providers.\nShipping companies.\nGovernment bodies when legally required.' },
      { title: '4. Data protection', body: 'We protect your data using high security standards and encryption for sensitive information.' },
    ],
    cookies: '5. Cookies\nThe site uses tracking cookies to improve your experience; you can disable them in your browser settings.',
    userRights: '6. User rights\nAccess your personal data\nCorrect it\nRequest its deletion',
    changes: '7. Changes\nThis policy may be updated at any time; updates will be published here.',
    copyright: '© 2024 Roogr. All rights reserved.',
    backHome: 'Back to Home',
  },
};

export default function PrivacyPolicy() {
  const lang = useSelector(selectLanguage);
  const t = content[lang === 'ar' ? 'ar' : 'en'];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="landing-anim-fade-up">
        <h1 className="mb-6 text-4xl font-bold text-[#022E47] dark:text-[#70F1EB] sm:text-5xl">
          {t.title}
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-[#022E47] dark:text-[#70F1EB]">
          {t.termsTitle}
        </h2>
        <p className="mb-8 whitespace-pre-line text-gray-700 dark:text-gray-300">
          {t.termsIntro}
        </p>
      </div>

      <div className="space-y-6">
        {t.terms.map((item, i) => (
          <section
            key={i}
            className="landing-anim-on-scroll rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]"
          >
            <h3 className="mb-3 text-xl font-semibold text-[#022E47] dark:text-[#70F1EB]">
              {item.title}
            </h3>
            <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
              {item.body}
            </p>
          </section>
        ))}
      </div>

      <h2 className="landing-anim-on-scroll mt-12 mb-4 text-2xl font-bold text-[#022E47] dark:text-[#70F1EB]">
        {t.privacyTitle}
      </h2>
      <div className="space-y-6">
        {t.privacy.map((item, i) => (
          <section
            key={i}
            className="landing-anim-on-scroll rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]"
          >
            <h3 className="mb-3 text-xl font-semibold text-[#022E47] dark:text-[#70F1EB]">
              {item.title}
            </h3>
            <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
              {item.body}
            </p>
          </section>
        ))}
      </div>

      <div className="landing-anim-on-scroll mt-12 space-y-6">
        <section className="rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
          <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
            {t.cookies}
          </p>
        </section>
        <section className="rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
          <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
            {t.userRights}
          </p>
        </section>
        <section className="rounded-2xl border border-[#022E47]/10 bg-white p-6 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
          <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
            {t.changes}
          </p>
        </section>
      </div>

      <p className="landing-anim-on-scroll mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
        {t.copyright}
      </p>

      <div className="mt-12 flex justify-center">
        <Link
          to="/"
          className="rounded-xl bg-[#022E47] px-6 py-3 font-semibold text-white transition hover:bg-[#033a5c] dark:bg-[#70F1EB] dark:text-[#022E47] dark:hover:bg-[#8ef4ef]"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}
