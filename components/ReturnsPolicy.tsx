import Link from "next/link";
import type { ReactNode } from "react";

type Section = { title: string; icon: ReactNode; body: ReactNode };

const SECTIONS: Section[] = [
  {
    title: "Return Eligibility",
    icon: (
      <>
        <path d="M12 3 20 7v10l-8 4-8-4V7z" />
        <path d="m4 7 8 4 8-4M12 11v10M8 5l8 4" />
      </>
    ),
    body: (
      <p>
        You can request a return within <strong>7 days of delivery</strong>, provided the product is unused,
        unopened, and in its original packaging.
      </p>
    ),
  },
  {
    title: "Non-Returnable Items",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.5 8.5 7 7M15.5 8.5l-7 7" />
      </>
    ),
    body: (
      <p>
        For hygiene reasons, opened coffee products cannot be returned unless they are defective or you received
        the wrong item.
      </p>
    ),
  },
  {
    title: "Return Process",
    icon: (
      <>
        <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" />
        <path d="M4 4v4h4" />
        <path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" />
        <path d="M20 20v-4h-4" />
      </>
    ),
    body: (
      <p>
        To start a return, <Link href="/contact" className="ret-link">contact our support team</Link> with your
        order number. We’ll guide you through the simple return process.
      </p>
    ),
  },
  {
    title: "Return Shipping",
    icon: (
      <>
        <path d="M2 7h12v9H2z" />
        <path d="M14 10h4l4 4v2h-8" />
        <circle cx="6" cy="17.5" r="1.7" />
        <circle cx="18" cy="17.5" r="1.7" />
      </>
    ),
    body: <p>Return shipping costs are the customer’s responsibility unless the item is defective or incorrect.</p>,
  },
  {
    title: "Refund Policy",
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
    body: (
      <p>
        Once we receive and inspect the returned item, we’ll process your refund within{" "}
        <strong>5–7 business days</strong> to your original payment method.
      </p>
    ),
  },
  {
    title: "Damaged or Incorrect Orders",
    icon: (
      <>
        <path d="M12 3.5 21 19.5H3z" />
        <path d="M12 10v4.5M12 17h.01" />
      </>
    ),
    body: (
      <p>
        Received a damaged or incorrect product? Contact our support team with your order details and proof of
        the issue, such as photos of the item and packaging, and we’ll make it right.
      </p>
    ),
  },
  {
    title: "Need Help?",
    icon: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19c0 1.7-1.8 2.5-4.5 2.5" />
      </>
    ),
    body: (
      <p>
        If you have any questions, feel free to{" "}
        <Link href="/contact" className="ret-link">contact our support team</Link>. We’re here to help!
      </p>
    ),
  },
];

export function ReturnsPolicy() {
  return (
    <div className="ret-page">
      <section className="ret-hero">
        <div className="container">
          <h1>Return Policy</h1>
          <p className="ret-tagline">
            Your satisfaction is our priority.
            <br />
            Enjoy worry-free shopping with Coffee Craft.
          </p>
          <span className="ret-swoosh" aria-hidden="true" />
        </div>
      </section>

      <div className="container ret-body">
        <p className="ret-intro">
          At Coffee Craft, we want you to be completely satisfied with your purchase. If you’re not happy with your
          order, we’re here to help with our easy return policy.
        </p>
        <span className="ret-divider" aria-hidden="true" />

        <ol className="ret-list">
          {SECTIONS.map((s, i) => (
            <li key={s.title} className="ret-item">
              <span className="ret-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </span>
              <div>
                <h2>
                  <span className="ret-num">{i + 1}.</span> {s.title}
                </h2>
                {s.body}
              </div>
            </li>
          ))}
        </ol>

        <aside className="ret-cta" aria-label="Contact support">
          <span className="ret-cta-heart" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-8-4.9-8-11a4.6 4.6 0 0 1 8-3.1A4.6 4.6 0 0 1 20 10c0 6.1-8 11-8 11z" />
            </svg>
          </span>
          <p>
            Shop with confidence at Coffee Craft.
            <br />
            Your happiness is our success.
          </p>
          <Link href="/contact" className="ret-cta-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="5.5" width="18" height="13" rx="2" />
              <path d="m3.5 7 8.5 6 8.5-6" />
            </svg>
            Contact Support <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
