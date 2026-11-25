import Link from "next/link";
import type { ReactNode } from "react";

type Section = { title: string; icon: ReactNode; body: ReactNode };

const SECTIONS: Section[] = [
  {
    title: "Information We Collect",
    icon: <><path d="M12 2.5 4 5.5v6c0 5 3.4 9.3 8 10.5 4.6-1.2 8-5.5 8-10.5v-6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
    body: (
      <p>
        We may collect information such as your name, email address, phone number, billing information, shipping
        address and order details, as well as anything you choose to share with us — for example, when you place
        an order, create an account or contact us.
      </p>
    ),
  },
  {
    title: "How We Use Your Information",
    icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
    body: (
      <>
        <p>We may use your information to:</p>
        <ul className="priv-bullets">
          <li>process and deliver your orders;</li>
          <li>manage your customer account;</li>
          <li>communicate with you about your orders;</li>
          <li>improve our website and your shopping experience;</li>
          <li>respond to your questions and requests.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Protection",
    icon: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /><path d="M12 14.5v2.5" /></>,
    body: (
      <p>
        We take reasonable measures to protect your personal information from unauthorised access, alteration or
        disclosure. No method of storing or sending information online is completely secure, so we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    title: "Cookies",
    icon: <><path d="M20.5 12.5A8.5 8.5 0 1 1 11.5 3.5a3 3 0 0 0 4 3.5 3 3 0 0 0 5 5.5z" /><path d="M8.5 9h.01M8 14h.01M12 12.5h.01M15.5 15.5h.01" /></>,
    body: (
      <>
        <p>
          We may use cookies and similar browser storage for website functionality, to remember your preferences,
          and for analytics where enabled.
        </p>
        <p className="priv-note">
          <strong>Right now:</strong> your cart is saved in your own browser’s local storage so it stays there
          when you come back. No analytics or advertising tools are currently in use.
        </p>
      </>
    ),
  },
  {
    title: "Sharing Your Information",
    icon: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
    body: (
      <p>
        We may share your information only where needed to fulfil your order — for example, with a delivery
        company to ship your coffee, or with a payment provider to process your payment.
      </p>
    ),
  },
  {
    title: "Your Choices",
    icon: <><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>,
    body: (
      <p>
        You can ask us to update your details or change how we contact you at any time by reaching out through our{" "}
        <Link href="/contact" className="priv-link">Contact page</Link>. You can also clear cookies and stored
        site data in your browser settings.
      </p>
    ),
  },
  {
    title: "Third-Party Services",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" /></>,
    body: (
      <p>
        Services such as delivery companies, payment providers or websites we link to are run by other
        organisations. They have their own privacy policies and practices, which we encourage you to read.
      </p>
    ),
  },
  {
    title: "Your Privacy Rights",
    icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
    body: (
      <p>
        You can contact us to ask for access to, correction of, or deletion of your personal information. We will
        respond to your request subject to any applicable requirements. Please use our{" "}
        <Link href="/contact" className="priv-link">Contact page</Link>.
      </p>
    ),
  },
  {
    title: "Updates to This Policy",
    icon: <><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" /><path d="M20 20v-4h-4" /></>,
    body: <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>,
  },
  {
    title: "Children’s Privacy",
    icon: <><path d="M12 4v16M5 8h14" /><path d="m5 8-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z" /><path d="M8 20h8" /></>,
    body: (
      <p>
        Our website is meant for adult coffee lovers and is not intentionally directed at young children. If you
        believe a child has shared personal information with us, please contact us and we will look into it.
      </p>
    ),
  },
  {
    title: "Contact Us",
    icon: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></>,
    body: (
      <p>
        If you have any questions about this Privacy Policy or your information, please visit our{" "}
        <Link href="/contact" className="priv-link">Contact page</Link>.
      </p>
    ),
  },
  {
    title: "Our Commitment",
    icon: <path d="M12 21s-8-4.9-8-11a4.6 4.6 0 0 1 8-3.1A4.6 4.6 0 0 1 20 10c0 6.1-8 11-8 11z" />,
    body: (
      <p>
        Your trust matters to us. We aim to handle your personal information responsibly and with care while you
        enjoy Coffee Craft.
      </p>
    ),
  },
];

export function PrivacyPolicy() {
  return (
    <div className="priv-page">
      <section className="priv-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="priv-tagline">Your privacy matters to us.</p>
          <span className="priv-swoosh" aria-hidden="true" />
        </div>
      </section>

      <div className="container priv-body">
        <p className="priv-intro">
          At Coffee Craft, we value your privacy and are committed to protecting your personal information. This
          Privacy Policy explains how we collect, use and safeguard your data.
        </p>
        <p className="priv-preview">
          <strong>Preview notice:</strong> this website is still in preview. Account sign-up, checkout and the
          contact form are not connected yet, so the details you type into them are currently not sent or stored.
        </p>

        <ol className="priv-grid">
          {SECTIONS.map((s, i) => (
            <li key={s.title} className="priv-item">
              <span className="priv-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </span>
              <div>
                <h2>
                  <span className="priv-num">{i + 1}.</span> {s.title}
                </h2>
                {s.body}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
