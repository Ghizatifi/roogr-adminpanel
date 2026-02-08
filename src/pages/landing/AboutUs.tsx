import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <div className="landing-anim-fade-up">
        <h1 className="mb-4 text-4xl font-bold text-[#022E47] dark:text-[#70F1EB] sm:text-5xl">
          About Us
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          Learn more about Roogr and our mission.
        </p>
      </div>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section className="landing-anim-on-scroll rounded-2xl border border-[#022E47]/10 bg-white p-8 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
          <h2 className="mb-4 text-2xl font-semibold text-[#022E47] dark:text-[#70F1EB]">Who We Are</h2>
          <p className="leading-relaxed">
            Roogr is a modern classifieds and community platform designed to connect people locally. We provide a secure, easy-to-use space for buying, selling, and discovering offers while keeping you in control of your data and experience.
          </p>
        </section>

        <section className="landing-anim-on-scroll landing-anim-delay-1 rounded-2xl border border-[#022E47]/10 bg-white p-8 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
          <h2 className="mb-4 text-2xl font-semibold text-[#022E47] dark:text-[#70F1EB]">Our Mission</h2>
          <p className="leading-relaxed">
            We aim to make local trading and community interaction simple and trustworthy. Through clear policies, responsive support, and continuous improvement of our app and admin tools, we strive to serve both users and partners with transparency and respect.
          </p>
        </section>

        <section className="landing-anim-on-scroll landing-anim-delay-2 rounded-2xl border border-[#022E47]/10 bg-white p-8 shadow-sm dark:border-[#70F1EB]/20 dark:bg-[#1E1E26]">
          <h2 className="mb-4 text-2xl font-semibold text-[#022E47] dark:text-[#70F1EB]">Contact & Support</h2>
          <p className="leading-relaxed">
            For questions, feedback, or support, use the contact options available inside the app or reach out through our admin portal. We are committed to helping you get the most out of Roogr.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/"
          className="rounded-xl bg-[#022E47] px-6 py-3 font-semibold text-white transition hover:bg-[#033a5c] dark:bg-[#70F1EB] dark:text-[#022E47] dark:hover:bg-[#8ef4ef]"
        >
          Back to Home
        </Link>
        <Link
          to="/how-to-delete-account"
          className="rounded-xl border-2 border-[#022E47] px-6 py-3 font-semibold text-[#022E47] transition hover:bg-[#022E47] hover:text-white dark:border-[#70F1EB] dark:text-[#70F1EB] dark:hover:bg-[#70F1EB] dark:hover:text-[#022E47]"
        >
          How to delete your account
        </Link>
      </div>
    </div>
  );
}
