import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import { AuthCard } from "@/components/AuthCard";

export const metadata: Metadata = { title: "Login & Sign Up" };

// Handwritten accent font — loaded only on this page.
const script = Dancing_Script({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

const PERKS = [
  {
    label: "Exclusive Deals",
    icon: <><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="8.5" r="1.4" /></>,
  },
  {
    label: "Track Your Orders",
    icon: <><path d="M2 7h12v9H2z" /><path d="M14 10h4l4 4v2h-8" /><circle cx="6" cy="17.5" r="1.7" /><circle cx="18" cy="17.5" r="1.7" /></>,
  },
  {
    label: "Personalized Experience",
    icon: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  },
];

const FEATURES = [
  {
    title: "Secure & Safe",
    text: "Your data is protected",
    icon: <><path d="M12 2.5 4 5.5v6c0 5 3.4 9.3 8 10.5 4.6-1.2 8-5.5 8-10.5v-6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  },
  {
    title: "24/7 Support",
    text: "We’re here to help",
    icon: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.7-1.8 2.5-4.5 2.5" /></>,
  },
  {
    title: "A Premium Coffee Experience",
    text: "Beyond just coffee",
    icon: <><ellipse cx="12" cy="12" rx="6.5" ry="9.5" transform="rotate(30 12 12)" /><path d="M15 4.5c-3.5 3-1 7-3.5 10.5S8 18 8 20" /></>,
  },
];

export default function AccountPage() {
  return (
    <div className="auth-view">
      <div className="container auth-layout">
        <section className="auth-brand" aria-labelledby="auth-brand-title">
          <h1 id="auth-brand-title">
            <span className={`auth-script ${script.className}`}>Welcome to</span>
            Coffee Craft
          </h1>
          <span className="auth-brand-rule" aria-hidden="true" />
          <p className="auth-tagline">Good Coffee. Good Vibes.</p>
          <p className="auth-intro">Sign in or create an account to enjoy a better coffee experience.</p>

          <ul className="auth-perks">
            {PERKS.map((p) => (
              <li key={p.label}>
                <span className="auth-perk-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                </span>
                {p.label}
              </li>
            ))}
          </ul>

          <p className={`auth-brew ${script.className}`}>
            Let’s brew something
            <br />
            amazing together! <span aria-hidden="true">♡</span>
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="auth-cup" src="/images/auth-cup.jpg" alt="Coffee Craft latte with heart art beside a sack of roasted beans" />
        </section>

        <AuthCard />
      </div>

      <div className="container">
        <ul className="auth-features" aria-label="Why Coffee Craft">
          {FEATURES.map((f) => (
            <li key={f.title}>
              <span className="auth-feature-icon" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
              </span>
              <span>
                <strong>{f.title}</strong>
                <span>{f.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
