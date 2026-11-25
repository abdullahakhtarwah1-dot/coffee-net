import Link from "next/link";
import type { ReactNode } from "react";

type Section = { title: string; icon: ReactNode; body: ReactNode };

const SECTIONS: Section[] = [
  {
    title: "Shipping Coverage",
    icon: (
      <>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3.5V16h-7" />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </>
    ),
    body: <p>We deliver all over Pakistan, including major cities and remote areas.</p>,
  },
  {
    title: "Order Processing",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
    body: <p>Orders are processed within <strong>1–2 business days</strong> after confirmation.</p>,
  },
  {
    title: "Delivery Time",
    icon: (
      <>
        <path d="M12 3 20 7v10l-8 4-8-4V7z" />
        <path d="m4 7 8 4 8-4M12 11v10" />
      </>
    ),
    body: (
      <ul className="ship-list">
        <li><strong>Major cities:</strong> 2–5 business days</li>
        <li><strong>Other areas:</strong> 3–7 business days</li>
      </ul>
    ),
  },
  {
    title: "Shipping Charges",
    icon: (
      <>
        <rect x="3" y="6.5" width="18" height="11" rx="1.5" />
        <circle cx="12" cy="12" r="2.6" />
        <path d="M6.5 12h.01M17.5 12h.01" />
      </>
    ),
    body: (
      <p>
        Orders of <strong>Rs. 3,000 and above</strong> qualify for <strong>free shipping!</strong> For smaller
        orders, the delivery charge is shown at checkout based on your location.
      </p>
    ),
  },
  {
    title: "Order Tracking",
    icon: (
      <>
        <path d="M12 21s-6.5-5.7-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21z" />
        <circle cx="12" cy="10.5" r="2.4" />
      </>
    ),
    body: <p>Once your order ships, you’ll receive a tracking number so you can follow your parcel to your door.</p>,
  },
  {
    title: "Delivery Issues",
    icon: (
      <>
        <path d="M12 3.5 21 19.5H3z" />
        <path d="M12 10v4.5M12 17h.01" />
      </>
    ),
    body: (
      <p>
        If your parcel is delayed, damaged or missing items, contact us with your order number (and photos if
        possible) and we’ll make it right.
      </p>
    ),
  },
  {
    title: "Incorrect Address",
    icon: (
      <>
        <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z" />
        <path d="m14.5 7.5 3 3" />
      </>
    ),
    body: (
      <p>
        Please double-check your address and phone number at checkout. Spotted a mistake? Contact us before your
        order ships and we’ll update it. Re-delivery to a corrected address may carry an extra charge.
      </p>
    ),
  },
  {
    title: "Contact Support",
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
        Questions about your delivery? Our team is happy to help —{" "}
        <Link href="/contact" className="ship-link">contact our support team</Link>.
      </p>
    ),
  },
];

export function ShippingPolicy() {
  return (
    <div className="ship-page">
      <section className="ship-hero">
        <div className="container">
          <p className="ship-eyebrow">Coffee Craft</p>
          <h1>Shipping Policy</h1>
          <p className="ship-tagline">We ensure your favorite coffee reaches you fresh and on time.</p>
          <span className="banner-rule" aria-hidden="true" />
        </div>
      </section>

      <div className="container">
        <p className="ship-intro">
          At Coffee Craft, we are committed to delivering premium coffee across Pakistan with care, speed, and
          complete transparency.
        </p>

        <ul className="ship-grid">
          {SECTIONS.map((s) => (
            <li key={s.title} className="ship-card">
              <span className="ship-icon" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </span>
              <div>
                <h2>{s.title}</h2>
                {s.body}
              </div>
            </li>
          ))}
        </ul>

        <div className="ship-lower">
          <aside className="ship-notes" aria-labelledby="ship-notes-title">
            <h2 id="ship-notes-title">
              <span className="ship-notes-i" aria-hidden="true">i</span>
              Important Notes
            </h2>
            <ul>
              <li>Delivery times may vary during holidays or special promotions.</li>
              <li>You will receive a tracking number once your order is shipped.</li>
              <li>
                If you face any issue, feel free to <Link href="/contact" className="ship-link">contact our support team</Link>.
              </li>
            </ul>
          </aside>

          <div className="ship-promo">
            <p className="ship-promo-text">
              Fresh Coffee,
              <br />
              Delivered with Care
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/shipping-cup.jpg" alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}
