import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

const DETAILS = [
  {
    icon: <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" fill="currentColor" stroke="none" />,
    main: <a href="tel:+923001234567">+92 300 123 4567</a>,
    sub: "Mon – Fri, 9AM – 9PM",
  },
  {
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2" fill="currentColor" stroke="none" />
        <path d="m3.5 7 8.5 6 8.5-6" stroke="var(--night)" strokeWidth="1.6" />
      </>
    ),
    main: <a href="mailto:hello@coffeecraft.com">hello@coffeecraft.com</a>,
    sub: "We’ll reply within 24 hours",
  },
  {
    icon: (
      <>
        <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" fill="currentColor" stroke="none" />
        <circle cx="12" cy="10" r="2.6" fill="var(--night)" stroke="none" />
      </>
    ),
    main: (
      <>
        123 Coffee Street,
        <br />
        Karachi, Pakistan
      </>
    ),
    sub: null,
  },
];

export default function ContactPage() {
  return (
    <section className="contact-view">
      <div className="contact-inner">
        <div className="contact-intro">
          <h1>
            Contact <span className="accent">Us</span>
          </h1>
          <p className="contact-sub">Have a question? We’d love to hear from you.</p>
          <span className="banner-rule" aria-hidden="true" />
          <ul className="contact-details">
            {DETAILS.map((d, i) => (
              <li key={i}>
                <span className="contact-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24">{d.icon}</svg>
                </span>
                <span>
                  <span className="contact-main">{d.main}</span>
                  {d.sub && <span className="contact-note">{d.sub}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
