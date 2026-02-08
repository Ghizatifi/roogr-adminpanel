import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, setLanguage } from '../store/slices/language';
import i18n from '../i18n';

const navLinks = [
  { to: '/', labelKey: 'landing.nav.home' },
  { to: '/about-us', labelKey: 'landing.nav.about' },
  { to: '/how-to-delete-account', labelKey: 'landing.nav.deleteAccount' },
  { to: '/privacy-policy', labelKey: 'landing.nav.privacy' },
];

const navLabels: Record<string, { en: string; ar: string }> = {
  'landing.nav.home': { en: 'Home', ar: 'الرئيسية' },
  'landing.nav.about': { en: 'About Us', ar: 'من نحن' },
  'landing.nav.deleteAccount': { en: 'How to delete your account', ar: 'حذف الحساب' },
  'landing.nav.privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
};

export default function LandingLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  const toggleLanguage = () => {
    const next = language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(next);
    dispatch(setLanguage(next));
  };

  useEffect(() => {
    let disconnect: (() => void) | undefined;
    const t = setTimeout(() => {
      const els = document.querySelectorAll('.landing-anim-on-scroll');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => e.isIntersecting && e.target.classList.add('landing-visible'));
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      els.forEach((el) => observer.observe(el));
      disconnect = () => observer.disconnect();
    }, 50);
    return () => {
      clearTimeout(t);
      disconnect?.();
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFF] dark:bg-[#14141A]">
      <header className="landing-header sticky top-0 z-50 w-full border-b border-[#022E47]/10 bg-white/95 backdrop-blur-md dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <img
              src="/logo/logo.svg"
              alt="Logo"
              className="h-9 w-auto dark:hidden"
            />
            <img
              src="/logo/logo-dark.svg"
              alt="Logo"
              className="hidden h-9 w-auto dark:block"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ to, labelKey }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors landing-nav-link ${
                    isActive
                      ? 'text-[#022E47] dark:text-[#70F1EB]'
                      : 'text-gray-600 hover:text-[#022E47] dark:text-gray-300 dark:hover:text-[#70F1EB]'
                  }`
                }
              >
                {navLabels[labelKey]?.[language as 'en' | 'ar'] ?? labelKey}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-lg border border-[#022E47]/20 px-3 py-2 text-sm font-medium text-[#022E47] transition hover:bg-[#022E47]/5 dark:border-[#70F1EB]/30 dark:text-[#70F1EB] dark:hover:bg-[#70F1EB]/10"
              title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>{language === 'ar' ? 'En' : 'ع'}</span>
            </button>
            <Link
              to="/auth/login"
              className="rounded-xl bg-[#022E47] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#033a5c] hover:shadow-xl dark:bg-[#70F1EB] dark:text-[#022E47] dark:hover:bg-[#8ef4ef]"
            >
              Admin Login
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2E2D3D] md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="landing-mobile-nav border-t border-gray-200 dark:border-[#2E2D3D] bg-white dark:bg-[#1E1E26] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ to, labelKey }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-[#022E47]/10 text-[#022E47] dark:bg-[#70F1EB]/20 dark:text-[#70F1EB]'
                        : 'text-gray-600 dark:text-gray-300'
                    }`
                  }
                >
                  {navLabels[labelKey]?.[language as 'en' | 'ar'] ?? labelKey}
                </NavLink>
              ))}
              <Link
                to="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-[#022E47] px-4 py-3 text-center text-sm font-semibold text-white dark:bg-[#70F1EB] dark:text-[#022E47]"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="landing-footer border-t border-[#022E47]/10 bg-[#022E47] dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link to="/" className="shrink-0">
              <img src="/logo/logo-dark.svg" alt="Logo" className="h-8 w-auto opacity-90" />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link to="/" className="text-white/80 transition hover:text-white">{navLabels['landing.nav.home'][language as 'en' | 'ar']}</Link>
              <Link to="/about-us" className="text-white/80 transition hover:text-white">{navLabels['landing.nav.about'][language as 'en' | 'ar']}</Link>
              <Link to="/how-to-delete-account" className="text-white/80 transition hover:text-white">{navLabels['landing.nav.deleteAccount'][language as 'en' | 'ar']}</Link>
              <Link to="/privacy-policy" className="text-white/80 transition hover:text-white">{navLabels['landing.nav.privacy'][language as 'en' | 'ar']}</Link>
              <Link to="/auth/login" className="text-white/80 transition hover:text-white">{language === 'ar' ? 'دخول الإدارة' : 'Admin Login'}</Link>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-white/60">
            © {new Date().getFullYear()} Roogr. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
