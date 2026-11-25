"use client";

import { useState } from "react";

type Field = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;

const SUBJECTS = ["Order question", "Product question", "Feedback", "Wholesale & events", "Other"];

function validate(data: Record<string, string>): Errors {
  const e: Errors = {};
  if (data.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Please enter a valid email address.";
  if (!data.subject) e.subject = "Please select a subject.";
  if (data.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  if (data.message.length > 2000) e.message = "Message must be under 2,000 characters.";
  return e;
}

export function ContactForm() {
  const [data, setData] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "not-configured">("idle");

  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));
  const err = (k: Field) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `c-${k}-err` } : {};

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (data.website) return; // honeypot
        const errs = validate(data);
        setErrors(errs);
        if (Object.keys(errs).length) return;
        // Delivery (POST /api/contact + email provider) is part of the backend slice.
        setStatus("not-configured");
      }}
    >
      <div className="cf-field">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" autoComplete="name" placeholder="Your Name" value={data.name} onChange={set("name")} {...err("name")} />
        {errors.name && <p id="c-name-err" className="cf-error">{errors.name}</p>}
      </div>
      <div className="cf-field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" type="email" autoComplete="email" placeholder="you@example.com" value={data.email} onChange={set("email")} {...err("email")} />
        {errors.email && <p id="c-email-err" className="cf-error">{errors.email}</p>}
      </div>
      <div className="cf-field">
        <label htmlFor="c-subject">Subject</label>
        <div className="cf-select">
          <select id="c-subject" value={data.subject} onChange={set("subject")} data-empty={!data.subject} {...err("subject")}>
            <option value="" disabled>Select a subject</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
        </div>
        {errors.subject && <p id="c-subject-err" className="cf-error">{errors.subject}</p>}
      </div>
      <div className="cf-field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" rows={4} placeholder="Your message..." value={data.message} onChange={set("message")} {...err("message")} />
        {errors.message && <p id="c-message-err" className="cf-error">{errors.message}</p>}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" tabIndex={-1} autoComplete="off" value={data.website} onChange={set("website")} />
      </div>
      <button type="submit" className="cf-submit">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M21.5 2.5 2.8 10.1a.6.6 0 0 0 0 1.1l6.3 2.4 2.4 6.3a.6.6 0 0 0 1.1 0L21.5 2.5ZM9.6 13.1l8.2-7.4-6.1 9.3" /></svg>
        Send message
      </button>
      {status === "not-configured" && (
        <p className="cf-status" role="status">
          Your message looks good, but it was <strong>not sent</strong>: message delivery hasn&apos;t been set up yet.
        </p>
      )}
    </form>
  );
}
