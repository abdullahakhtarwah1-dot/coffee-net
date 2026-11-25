import Link from "next/link";
import type { ReactNode } from "react";
import { Dancing_Script } from "next/font/google";

// Handwritten accent font for the "Together for a Better Coffee Experience" note — loaded only here.
const script = Dancing_Script({ subsets: ["latin"], weight: ["600"], display: "swap" });

type Section = { title: string; icon: ReactNode; body: ReactNode };

const SECTIONS: Section[] = [
  {
    title: "Acceptance of Terms",
    icon: <><path d="M6 3h9l4 4v14H6z" /><path d="M9 9h6M9 12h6M9 15h3" /><path d="m14 17 1.5 1.5L19 15" /></>,
    body: (
      <p>
        By accessing or using the Coffee Craft website, you agree to these Terms &amp; Conditions. If you do not
        agree with them, please do not use our website or place an order.
      </p>
    ),
  },
  {
    title: "Use of Our Website",
    icon: <><path d="M3 4h2l2.4 11h11L21 7H6.2" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
    body: (
      <p>
        Please use our website for lawful purposes only. You must not misuse it, try to gain unauthorised
        access, or do anything that could harm, damage or interfere with how it works.
      </p>
    ),
  },
  {
    title: "Products & Pricing",
    icon: <><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="8.5" r="1.4" /></>,
    body: (
      <>
        <p>
          Product descriptions, prices, availability and images may change at any time. We try to keep them
          accurate, but small differences — for example in colour or packaging — can occur.
        </p>
        <p className="terms-note">
          <strong>Preview notice:</strong> this website is still in preview. The products and prices currently
          shown are sample data and are not final offers.
        </p>
      </>
    ),
  },
  {
    title: "Orders & Payments",
    icon: <><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    body: (
      <>
        <p>
          All orders are subject to confirmation and product availability. We may decline or cancel an order —
          for example, if an item is out of stock or a price was shown incorrectly — and will let you know if this
          happens.
        </p>
        <p>The payment methods available to you will be shown at checkout.</p>
        <p className="terms-note">
          <strong>Preview notice:</strong> online checkout is not live yet, so orders and payments cannot be
          placed through this website at the moment.
        </p>
      </>
    ),
  },
  {
    title: "Shipping & Delivery",
    icon: <><path d="M2 7h12v9H2z" /><path d="M14 10h4l4 4v2h-8" /><circle cx="6" cy="17.5" r="1.7" /><circle cx="18" cy="17.5" r="1.7" /></>,
    body: (
      <p>
        For delivery estimates, shipping charges and other delivery details, please see our{" "}
        <Link href="/policies/shipping" className="terms-link">Shipping Policy</Link>.
      </p>
    ),
  },
  {
    title: "Returns & Refunds",
    icon: <><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" /><path d="M20 20v-4h-4" /></>,
    body: (
      <p>
        For return eligibility, how to request a return and how refunds are processed, please see our{" "}
        <Link href="/policies/returns" className="terms-link">Return Policy</Link>.
      </p>
    ),
  },
  {
    title: "Account Responsibility",
    icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
    body: (
      <p>
        If you create an account, you are responsible for keeping your login details secure and for the activity
        on your account. Please make sure the information you give us is accurate and up to date.
      </p>
    ),
  },
  {
    title: "Privacy",
    icon: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /><path d="M12 14.5v2.5" /></>,
    body: (
      <p>
        Your personal information should be handled as described in our{" "}
        <Link href="/policies/privacy" className="terms-link">Privacy Policy</Link>. Please read it to understand
        how your information is collected and used.
      </p>
    ),
  },
  {
    title: "Intellectual Property",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M14.8 9.5a3.5 3.5 0 1 0 0 5" /></>,
    body: (
      <p>
        The Coffee Craft name, logo, branding, website content, graphics and other original materials belong to
        Coffee Craft. They may not be copied, reproduced or used without our written permission.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    icon: <><path d="M12 3.5 21 19.5H3z" /><path d="M12 10v4.5M12 17h.01" /></>,
    body: (
      <p>
        We work hard to keep our website and products reliable, but we cannot guarantee that the website will
        always be available or free from errors. To the extent permitted by applicable law, Coffee Craft is not
        responsible for indirect or unforeseeable losses arising from the use of our website. Nothing in these
        terms limits any rights you have under the law.
      </p>
    ),
  },
  {
    title: "Changes to Terms",
    icon: <><path d="M12 4v16M5 8h14" /><path d="m5 8-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z" /><path d="M8 20h8" /></>,
    body: (
      <p>
        We may update these Terms &amp; Conditions from time to time. The latest version will always be published
        on this page, so please check back occasionally.
      </p>
    ),
  },
  {
    title: "Contact Us",
    icon: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
    body: (
      <p>
        If you have any questions about these Terms &amp; Conditions, please reach us through our{" "}
        <Link href="/contact" className="terms-link">Contact page</Link>.
      </p>
    ),
  },
];

const CARD_COUNT = 8; // first sections as a two-column card grid, the rest as a list beside the note

function Item({ s, n }: { s: Section; n: number }) {
  return (
    <li className="terms-item">
      <span className="terms-icon" aria-hidden="true">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          {s.icon}
        </svg>
      </span>
      <div>
        <h2>
          <span className="terms-num">{n}.</span> {s.title}
        </h2>
        {s.body}
      </div>
    </li>
  );
}

export function TermsPolicy() {
  return (
    <div className="terms-page">
      <section className="terms-hero">
        <div className="container">
          <p className="terms-eyebrow">Coffee Craft</p>
          <h1>Terms &amp; Conditions</h1>
          <p className="terms-tagline">
            By using our website and placing an order,
            <br />
            you agree to these terms and conditions.
          </p>
          <span className="terms-swoosh" aria-hidden="true" />
        </div>
      </section>

      <div className="container terms-body">
        <ol className="terms-grid">
          {SECTIONS.slice(0, CARD_COUNT).map((s, i) => (
            <Item key={s.title} s={s} n={i + 1} />
          ))}
        </ol>

        <div className="terms-lower">
          <ol className="terms-list" start={CARD_COUNT + 1}>
            {SECTIONS.slice(CARD_COUNT).map((s, i) => (
              <Item key={s.title} s={s} n={CARD_COUNT + i + 1} />
            ))}
          </ol>
          <aside className="terms-aside" aria-label="A note from Coffee Craft">
            <p className={`terms-script ${script.className}`}>
              Together for a
              <br />
              Better Coffee Experience
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/terms-cup.jpg" alt="Cup of coffee on a wooden saucer with roasted beans" />
          </aside>
        </div>
      </div>
    </div>
  );
}
