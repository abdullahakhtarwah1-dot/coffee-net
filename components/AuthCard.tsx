"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

/*
 * Login / Sign Up card for /account.
 * There is NO authentication backend yet (no /api/auth, database or OAuth — see ADR-0006).
 * The forms validate input fully, but never pretend a sign-in or registration succeeded.
 */

type Tab = "login" | "signup";
type Errors = Record<string, string>;
type Status = { kind: "idle" | "loading" | "info" | "error"; text?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PASSWORD = 8;
const NOT_CONNECTED =
  "isn’t available yet — our account system hasn’t been connected. Your details were not sent or saved.";

function validateLogin(d: { email: string; password: string }): Errors {
  const e: Errors = {};
  if (!d.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(d.email.trim())) e.email = "Please enter a valid email, e.g. you@example.com.";
  if (!d.password) e.password = "Please enter your password.";
  return e;
}

function validateSignup(d: { name: string; email: string; password: string; confirm: string; terms: boolean }): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!d.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(d.email.trim())) e.email = "Please enter a valid email, e.g. you@example.com.";
  if (!d.password) e.password = "Please create a password.";
  else if (d.password.length < MIN_PASSWORD) e.password = `Password must be at least ${MIN_PASSWORD} characters.`;
  if (!d.confirm) e.confirm = "Please confirm your password.";
  else if (d.confirm !== d.password) e.confirm = "Passwords do not match.";
  if (!d.terms) e.terms = "Please accept the Terms & Conditions to continue.";
  return e;
}

/* ---------- small building blocks ---------- */

function Icon({ name }: { name: "mail" | "lock" | "user" | "eye" | "eye-off" }) {
  const paths = {
    mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
    lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /><path d="M12 14.5v2.5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
    eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    "eye-off": <><path d="M2 12s3.6-7 10-7c2 0 3.7.7 5.1 1.6M22 12s-3.6 7-10 7c-2 0-3.7-.7-5.1-1.6" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" /></>,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

type FieldProps = {
  id: string;
  label: string;
  icon: "mail" | "lock" | "user";
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete: string;
  placeholder: string;
  password?: boolean;
};

function Field({ id, label, icon, type = "text", value, onChange, error, autoComplete, placeholder, password }: FieldProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-field">
      <label htmlFor={id} className="sr-only">{label}</label>
      <div className={`auth-input ${error ? "has-error" : ""}`}>
        <span className="auth-input-icon"><Icon name={icon} /></span>
        <input
          id={id}
          type={password ? (show ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
        />
        {password && (
          <button
            type="button"
            className="auth-eye"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            aria-pressed={show}
          >
            <Icon name={show ? "eye" : "eye-off"} />
          </button>
        )}
      </div>
      {error && <p id={`${id}-err`} className="auth-error">{error}</p>}
    </div>
  );
}

function StatusMessage({ status }: { status: Status }) {
  if (status.kind === "idle" || status.kind === "loading") return null;
  return (
    <p className={`auth-status auth-status-${status.kind}`} role={status.kind === "error" ? "alert" : "status"}>
      {status.text}
    </p>
  );
}

function SocialButtons({ onUnavailable }: { onUnavailable: (provider: string) => void }) {
  return (
    <>
      <div className="auth-divider"><span>or continue with</span></div>
      <div className="auth-social">
        <button type="button" className="auth-social-btn" aria-disabled="true" onClick={() => onUnavailable("Google")}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2-1.9 3.2-4.7 3.2-8Z" />
            <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23Z" />
            <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.1a11 11 0 0 0 0 9.9l3.7-2.8Z" />
            <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4Z" />
          </svg>
          <span>Continue with Google</span>
          <span className="auth-soon">Not connected</span>
        </button>
        <button type="button" className="auth-social-btn" aria-disabled="true" onClick={() => onUnavailable("Facebook")}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="#1877F2" />
            <path fill="#fff" d="M13.2 19.5v-6.1h2.1l.3-2.4h-2.4V9.5c0-.7.2-1.2 1.2-1.2h1.3V6.2c-.2 0-1-.1-1.9-.1-1.9 0-3.1 1.1-3.1 3.2V11H8.6v2.4h2.1v6.1h2.5Z" />
          </svg>
          <span>Continue with Facebook</span>
          <span className="auth-soon">Not connected</span>
        </button>
      </div>
    </>
  );
}

/* ---------- forms ---------- */

function useFakeSubmit() {
  // Brief loading state so the button gives feedback, then an honest "not connected" result.
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (done: () => void) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(done, 700);
  };
}

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [d, setD] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const submit = useFakeSubmit();
  const uid = useId();

  const update = (k: "email" | "password") => (v: string) => {
    setD((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: validateLogin({ ...d, [k]: v })[k] ?? "" }));
  };

  return (
    <form
      noValidate
      className="auth-form"
      aria-labelledby={`${uid}-title`}
      onSubmit={(e) => {
        e.preventDefault();
        const errs = validateLogin(d);
        setErrors(errs);
        if (Object.keys(errs).length) {
          setStatus({ kind: "error", text: "Please fix the highlighted fields and try again." });
          return;
        }
        setStatus({ kind: "loading" });
        submit(() => setStatus({ kind: "info", text: `Your details look good, but sign-in ${NOT_CONNECTED}` }));
      }}
    >
      <div className="auth-head">
        <h2 id={`${uid}-title`}>Welcome Back!</h2>
        <p>Sign in to continue your coffee journey</p>
        <span className="auth-bean-rule" aria-hidden="true" />
      </div>

      <Field id="login-email" label="Email address" icon="mail" type="email" value={d.email} onChange={update("email")} error={errors.email} autoComplete="email" placeholder="Email Address" />
      <Field id="login-password" label="Password" icon="lock" value={d.password} onChange={update("password")} error={errors.password} autoComplete="current-password" placeholder="Password" password />

      <div className="auth-row">
        <label className="auth-check">
          <input type="checkbox" checked={d.remember} onChange={(e) => setD((p) => ({ ...p, remember: e.target.checked }))} />
          <span>Remember Me</span>
        </label>
        <button
          type="button"
          className="auth-link"
          onClick={() => setStatus({ kind: "info", text: `Password reset ${NOT_CONNECTED}` })}
        >
          Forgot Password?
        </button>
      </div>

      <button type="submit" className="auth-submit" disabled={status.kind === "loading"} aria-busy={status.kind === "loading"}>
        {status.kind === "loading" ? (
          <><span className="auth-spinner" aria-hidden="true" /> Checking…</>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 13h16v5a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-5Z" /><path d="M22 15h2a3 3 0 0 1 0 6h-2.4" /><path d="M12 4c-1 2 1 3 0 5M17 4c-1 2 1 3 0 5" />
            </svg>
            Login Now <span aria-hidden="true">→</span>
          </>
        )}
      </button>
      <StatusMessage status={status} />

      <SocialButtons onUnavailable={(p) => setStatus({ kind: "info", text: `${p} sign-in ${NOT_CONNECTED}` })} />

      <p className="auth-switch">
        Don’t have an account?{" "}
        <button type="button" className="auth-link auth-link-strong" onClick={onSwitch}>Sign Up</button>
      </p>
    </form>
  );
}

function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const [d, setD] = useState({ name: "", email: "", password: "", confirm: "", terms: false });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const submit = useFakeSubmit();
  const uid = useId();

  const update = (k: "name" | "email" | "password" | "confirm") => (v: string) => {
    const next = { ...d, [k]: v };
    setD(next);
    if (errors[k] || (k === "password" && errors.confirm)) {
      const all = validateSignup(next);
      setErrors((e) => ({ ...e, [k]: all[k] ?? "", ...(e.confirm ? { confirm: all.confirm ?? "" } : {}) }));
    }
  };

  return (
    <form
      noValidate
      className="auth-form"
      aria-labelledby={`${uid}-title`}
      onSubmit={(e) => {
        e.preventDefault();
        const errs = validateSignup(d);
        setErrors(errs);
        if (Object.keys(errs).length) {
          setStatus({ kind: "error", text: "Please fix the highlighted fields and try again." });
          return;
        }
        setStatus({ kind: "loading" });
        submit(() => setStatus({ kind: "info", text: `Your details look good, but account registration ${NOT_CONNECTED}` }));
      }}
    >
      <div className="auth-head">
        <h2 id={`${uid}-title`}>Create Account</h2>
        <p>Join Coffee Craft and start your coffee journey</p>
        <span className="auth-bean-rule" aria-hidden="true" />
      </div>

      <Field id="su-name" label="Full name" icon="user" value={d.name} onChange={update("name")} error={errors.name} autoComplete="name" placeholder="Full Name" />
      <Field id="su-email" label="Email address" icon="mail" type="email" value={d.email} onChange={update("email")} error={errors.email} autoComplete="email" placeholder="Email Address" />
      <Field id="su-password" label="Password" icon="lock" value={d.password} onChange={update("password")} error={errors.password} autoComplete="new-password" placeholder={`Password (min. ${MIN_PASSWORD} characters)`} password />
      <Field id="su-confirm" label="Confirm password" icon="lock" value={d.confirm} onChange={update("confirm")} error={errors.confirm} autoComplete="new-password" placeholder="Confirm Password" password />

      <div className="auth-field">
        <label className="auth-check">
          <input
            type="checkbox"
            checked={d.terms}
            onChange={(e) => {
              setD((p) => ({ ...p, terms: e.target.checked }));
              if (e.target.checked) setErrors((er) => ({ ...er, terms: "" }));
            }}
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? "su-terms-err" : undefined}
          />
          <span>
            I agree to the <Link href="/policies/terms" className="auth-inline-link">Terms &amp; Conditions</Link> and{" "}
            <Link href="/policies/privacy" className="auth-inline-link">Privacy Policy</Link>
          </span>
        </label>
        {errors.terms && <p id="su-terms-err" className="auth-error">{errors.terms}</p>}
      </div>

      <button type="submit" className="auth-submit" disabled={status.kind === "loading"} aria-busy={status.kind === "loading"}>
        {status.kind === "loading" ? (
          <><span className="auth-spinner" aria-hidden="true" /> Creating…</>
        ) : (
          <>
            <Icon name="user" /> Create Account <span aria-hidden="true">→</span>
          </>
        )}
      </button>
      <StatusMessage status={status} />

      <p className="auth-switch">
        Already have an account?{" "}
        <button type="button" className="auth-link auth-link-strong" onClick={onSwitch}>Login</button>
      </p>
    </form>
  );
}

/* ---------- card with tabs ---------- */

export function AuthCard() {
  const [tab, setTab] = useState<Tab>("login");
  const tabs = useRef<Record<Tab, HTMLButtonElement | null>>({ login: null, signup: null });

  // Allow deep links: /account#signup
  useEffect(() => {
    const fromHash = () => setTab(window.location.hash === "#signup" ? "signup" : "login");
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (t: Tab, focus = false) => {
    setTab(t);
    history.replaceState(null, "", t === "signup" ? "#signup" : window.location.pathname);
    if (focus) tabs.current[t]?.focus();
  };

  const tabProps = (t: Tab) => ({
    ref: (el: HTMLButtonElement | null) => { tabs.current[t] = el; },
    id: `auth-tab-${t}`,
    role: "tab" as const,
    type: "button" as const,
    "aria-selected": tab === t,
    "aria-controls": `auth-panel-${t}`,
    tabIndex: tab === t ? 0 : -1,
    className: `auth-tab ${tab === t ? "is-active" : ""}`,
    onClick: () => select(t),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        select(t === "login" ? "signup" : "login", true);
      }
    },
  });

  return (
    <div className="auth-card">
      <span className="auth-beans auth-beans-top" aria-hidden="true" />
      <div className="auth-tabs" role="tablist" aria-label="Account">
        <button {...tabProps("login")}>
          <Icon name="lock" /> Login
        </button>
        <button {...tabProps("signup")}>
          <Icon name="user" /> Sign Up
        </button>
      </div>

      <div id="auth-panel-login" role="tabpanel" aria-labelledby="auth-tab-login" hidden={tab !== "login"} className="auth-panel">
        {tab === "login" && <LoginForm onSwitch={() => select("signup", true)} />}
      </div>
      <div id="auth-panel-signup" role="tabpanel" aria-labelledby="auth-tab-signup" hidden={tab !== "signup"} className="auth-panel">
        {tab === "signup" && <SignupForm onSwitch={() => select("login", true)} />}
      </div>
    </div>
  );
}
