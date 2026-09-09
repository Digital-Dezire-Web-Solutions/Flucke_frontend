import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthModal.css";
import authImage from "../../Assets/Banner/fbanner.jpg";

export default function AuthModal({
  isOpen,
  onClose,
  onLogin,
  onSignup,
  onForgotPassword,
  onResetPassword,
}) {
  // "login" | "signup" | "forgot" | "reset"
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [resetEmail, setResetEmail] = useState(""); // carried from "forgot" into "reset"
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Reset to login view every time the modal is freshly opened.
  useEffect(() => {
    if (isOpen) {
      setMode("login");
      setError("");
      setInfo("");
      setSubmitting(false);
    }
  }, [isOpen]);

  // Esc to close + focus the first field on open.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", handleKey);
      clearTimeout(t);
    };
  }, [isOpen, onClose, mode]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const goToMode = (nextMode) => {
    setError("");
    setInfo("");
    setMode(nextMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError("");
    setInfo("");

    const form = new FormData(e.target);

    try {
      if (mode === "login") {
        await onLogin({
          email: form.get("email"),
          password: form.get("password"),
        });
        onClose();
      } else if (mode === "signup") {
        await onSignup({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          password: form.get("password"),
        });
        onClose();
      } else if (mode === "forgot") {
        const email = form.get("email");
        await onForgotPassword({ email });
        setResetEmail(email);
        setInfo("We've emailed you a 6-digit code.");
        setMode("reset");
      } else if (mode === "reset") {
        const newPassword = form.get("newPassword");
        const confirmPassword = form.get("confirmPassword");

        if (newPassword !== confirmPassword) {
          throw new Error("Passwords don't match.");
        }

        await onResetPassword({
          email: resetEmail,
          otp: form.get("otp"),
          newPassword,
        });

        setInfo("Password reset — please sign in.");
        setMode("login");
      }
    } catch (err) {
      setError(
        typeof err === "string" ? err : err?.message || "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    setSubmitting(true);
    try {
      await onForgotPassword({ email: resetEmail });
      setInfo("Code resent — check your email.");
    } catch (err) {
      setError(
        typeof err === "string" ? err : err?.message || "Could not resend the code.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const titles = {
    login: "Login",
    signup: "Create an Account",
    forgot: "Reset your password",
    reset: "Enter your code",
  };

  const submitLabels = {
    login: "Sign in",
    signup: "Create an account",
    forgot: "Send code",
    reset: "Reset password",
  };

  return (
    <div
      className="auth-modal__backdrop"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-label={titles[mode]}
        ref={dialogRef}
      >
        <button
          type="button"
          className="auth-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="auth-modal__image">
          <img src={authImage} alt="" />
        </div>

        <div className="auth-modal__panel">
          <div
            className={`auth-modal__scroll ${mode === "signup" ? "auth-modal__scroll--signup" : ""
              }`}
          >
            <h2 className="auth-modal__title">{titles[mode]}</h2>

            {(mode === "login" || mode === "signup") && (
              <form
                className="auth-modal__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="auth-modal__extra" aria-hidden={mode === "login"}>
                  <div className="auth-modal__extra-inner">
                    <label className="auth-modal__field">
                      <span>First name*</span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full name"
                        required={mode === "signup"}
                        tabIndex={mode === "signup" ? 0 : -1}
                      />
                    </label>
                    <label className="auth-modal__field">
                      <span>Phone No.*</span>
                      <input
                        type="number"
                        name="phone"
                        placeholder="Your phone no."
                        required={mode === "signup"}
                        tabIndex={mode === "signup" ? 0 : -1}
                      />
                    </label>
                  </div>
                </div>

                <label className="auth-modal__field">
                  <span>Your email*</span>
                  <input
                    ref={firstFieldRef}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="auth-modal__field">
                  <span>Password*</span>
                  <div className="auth-modal__password-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      autoComplete={
                        mode === "login" ? "current-password" : "new-password"
                      }
                      minLength={mode === "signup" ? 8 : undefined}
                      required
                    />
                    <button
                      type="button"
                      className="auth-modal__eye"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      <EyeIcon off={showPassword} />
                    </button>
                  </div>
                </label>

                {mode === "login" ? (
                  <button
                    type="button"
                    className="auth-modal__forgot"
                    onClick={() => goToMode("forgot")}
                  >
                    Forgot your password?
                  </button>
                ) : (
                  <div className="auth-modal__checks">
                    <label className="auth-modal__check">
                      <input type="checkbox" name="agree" required />
                      <span>
                        By clicking here, i agree to the{" "}
                        <a href="/terms">Terms of use</a> and{" "}
                        <a href="/privacy">Privacy policy</a>.
                      </span>
                    </label>
                  </div>
                )}

                {error && <p className="auth-modal__error">{error}</p>}

                <button
                  type="submit"
                  className="auth-modal__submit"
                  disabled={submitting}
                >
                  {submitting ? "Please wait…" : submitLabels[mode]}
                </button>

                <button
                  type="button"
                  className="auth-modal__switch"
                  onClick={() =>
                    goToMode(mode === "login" ? "signup" : "login")
                  }
                >
                  {mode === "login" ? "Create an account" : "Back to login"}
                </button>
              </form>
            )}

            {mode === "forgot" && (
              <form
                className="auth-modal__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <p className="auth-modal__hint">
                  Enter the email on your account and we'll send you a
                  6-digit code to reset your password.
                </p>

                <label className="auth-modal__field">
                  <span>Your email*</span>
                  <input
                    ref={firstFieldRef}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />
                </label>

                {info && <p className="auth-modal__info">{info}</p>}
                {error && <p className="auth-modal__error">{error}</p>}

                <button
                  type="submit"
                  className="auth-modal__submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : submitLabels[mode]}
                </button>

                <button
                  type="button"
                  className="auth-modal__switch"
                  onClick={() => goToMode("login")}
                >
                  Back to login
                </button>
              </form>
            )}

            {mode === "reset" && (
              <form
                className="auth-modal__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <p className="auth-modal__hint">
                  We sent a 6-digit code to <strong>{resetEmail}</strong>.
                  Enter it below along with your new password.
                </p>

                <label className="auth-modal__field">
                  <span>6-digit code*</span>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    name="otp"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="123456"
                    required
                  />
                </label>

                <label className="auth-modal__field">
                  <span>New password*</span>
                  <div className="auth-modal__password-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter a new password"
                      autoComplete="new-password"
                      minLength={6}
                      required
                    />
                    <button
                      type="button"
                      className="auth-modal__eye"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      <EyeIcon off={showPassword} />
                    </button>
                  </div>
                </label>

                <label className="auth-modal__field">
                  <span>Confirm new password*</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your new password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </label>

                {info && <p className="auth-modal__info">{info}</p>}
                {error && <p className="auth-modal__error">{error}</p>}

                <button
                  type="submit"
                  className="auth-modal__submit"
                  disabled={submitting}
                >
                  {submitting ? "Please wait…" : submitLabels[mode]}
                </button>

                <button
                  type="button"
                  className="auth-modal__switch"
                  onClick={handleResend}
                  disabled={submitting}
                >
                  Resend code
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EyeIcon({ off }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M1.5 10S4.7 3.5 10 3.5 18.5 10 18.5 10 15.3 16.5 10 16.5 1.5 10 1.5 10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      {off && (
        <line
          x1="2.5"
          y1="17.5"
          x2="17.5"
          y2="2.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      )}
    </svg>
  );
}

/**
 * Minimal auth-status hook. Swap the localStorage check for your real
 * auth/context source (e.g. an AuthContext, redux slice, or cookie check).
 */
export function useIsLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(
    () => !!localStorage.getItem("rl_token"),
  );
  useEffect(() => {
    const onStorage = () => setLoggedIn(!!localStorage.getItem("rl_token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return loggedIn;
}