import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'Welcome to Roogr',
    subtitle: 'Your trusted platform for classifieds and community.',
    cta: 'Get Started',
    ctaLink: '/about-us',
    gradient: 'from-[#022E47] to-[#033a5c]',
  },
  {
    title: 'Simple & Secure',
    subtitle: 'Manage your listings and connect with confidence.',
    cta: 'Learn More',
    ctaLink: '/about-us',
    gradient: 'from-[#022E47] via-[#0a4a6e] to-[#022E47]',
  },
  {
    title: 'Download the App',
    subtitle: 'Available on App Store and Google Play.',
    cta: 'See links below',
    ctaLink: '#download',
    gradient: 'from-[#14141A] via-[#022E47] to-[#14141A]',
  },
];

export default function LandingHome() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Hero Slider */}
      <section className="landing-hero relative min-h-[85vh] overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`landing-slide absolute inset-0 flex items-center justify-center bg-gradient-to-br ${slide.gradient} transition-opacity duration-700 ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="landing-slide-content mx-auto max-w-4xl px-6 text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl landing-anim-fade-up">
                {slide.title}
              </h1>
              <p className="mb-8 text-lg text-white/90 sm:text-xl landing-anim-fade-up landing-anim-delay-1">
                {slide.subtitle}
              </p>
              <div className="landing-anim-fade-up landing-anim-delay-2">
                <Link
                  to={slide.ctaLink}
                  className="inline-block rounded-xl bg-[#70F1EB] px-8 py-4 text-lg font-semibold text-[#022E47] shadow-xl transition-all hover:bg-white hover:shadow-2xl"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-8 bg-[#70F1EB]' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About / Description */}
      <section className="landing-about relative overflow-hidden bg-white py-20 dark:bg-[#1E1E26]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#022E4708_0%,_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_#70F1EB12_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="landing-anim-on-scroll mb-6 text-3xl font-bold text-[#022E47] dark:text-[#70F1EB] sm:text-4xl">
            About Roogr
          </h2>
          <p className="landing-anim-on-scroll landing-anim-delay-1 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Roogr is your go-to platform for classified ads and community connections. We bring together
            buyers and sellers in a simple, secure environment. Whether you are looking to list items,
            discover local offers, or manage your account, we are here to help you every step of the way.
          </p>
          <div className="landing-anim-on-scroll landing-anim-delay-2 mt-10">
            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#022E47] px-6 py-3 font-semibold text-[#022E47] transition-all hover:bg-[#022E47] hover:text-white dark:border-[#70F1EB] dark:text-[#70F1EB] dark:hover:bg-[#70F1EB] dark:hover:text-[#022E47]"
            >
              Read more about us
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* App Store & Play Store */}
      <section id="download" className="landing-download relative overflow-hidden bg-[#F9FAFF] py-20 dark:bg-[#14141A]">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#022E47]/30 to-transparent dark:via-[#70F1EB]/30" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="landing-anim-on-scroll mb-4 text-3xl font-bold text-[#022E47] dark:text-[#70F1EB] sm:text-4xl">
            Download the App
          </h2>
          <p className="landing-anim-on-scroll landing-anim-delay-1 mb-12 text-lg text-gray-600 dark:text-gray-400">
            Get Roogr on your device and start browsing or posting in minutes.
          </p>
          <div className="landing-anim-on-scroll landing-anim-delay-2 flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-[#022E47] px-8 py-4 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl dark:bg-[#1E1E26] dark:ring-2 dark:ring-[#70F1EB]"
            >
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="text-left">
                <span className="block text-xs">Download on the</span>
                <span className="block text-lg font-semibold">App Store</span>
              </span>
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-[#022E47] px-8 py-4 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl dark:bg-[#1E1E26] dark:ring-2 dark:ring-[#70F1EB]"
            >
              <svg className="h-10 w-10" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,12L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <span className="text-left">
                <span className="block text-xs">Get it on</span>
                <span className="block text-lg font-semibold">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
