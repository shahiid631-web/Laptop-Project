import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, register } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validate = () => {
    const errs = {};
    if (mode === "register" && !form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (mode === "register" && form.password !== form.confirm) errs.confirm = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const result = mode === "login"
      ? login(form.email, form.password)
      : register(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) navigate(`/${redirect}`);
    else setErrors({ general: result.error });
  };

  return (
    <div className="auth-page" data-testid="auth-page">
      <div className="auth-card" data-testid="auth-card">
        <div className="auth-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">TechDesk</span>
        </div>

        <div className="auth-tabs" data-testid="auth-tabs">
          <button
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => { setMode("login"); setErrors({}); }}
            data-testid="tab-login"
          >Sign In</button>
          <button
            className={`auth-tab ${mode === "register" ? "active" : ""}`}
            onClick={() => { setMode("register"); setErrors({}); }}
            data-testid="tab-register"
          >Register</button>
        </div>

        <form onSubmit={handleSubmit} data-testid="auth-form" noValidate>
          {errors.general && (
            <div className="form-error-banner" data-testid="error-general">{errors.general}</div>
          )}

          {mode === "register" && (
            <div className="form-group" data-testid="field-name">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                className={errors.name ? "input-error" : ""}
                data-testid="input-name"
              />
              {errors.name && <span className="field-error" data-testid="error-name">{errors.name}</span>}
            </div>
          )}

          <div className="form-group" data-testid="field-email">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => set("email", e.target.value)}
              className={errors.email ? "input-error" : ""}
              data-testid="input-email"
            />
            {errors.email && <span className="field-error" data-testid="error-email">{errors.email}</span>}
          </div>

          <div className="form-group" data-testid="field-password">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => set("password", e.target.value)}
              className={errors.password ? "input-error" : ""}
              data-testid="input-password"
            />
            {errors.password && <span className="field-error" data-testid="error-password">{errors.password}</span>}
          </div>

          {mode === "register" && (
            <div className="form-group" data-testid="field-confirm">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={e => set("confirm", e.target.value)}
                className={errors.confirm ? "input-error" : ""}
                data-testid="input-confirm"
              />
              {errors.confirm && <span className="field-error" data-testid="error-confirm">{errors.confirm}</span>}
            </div>
          )}

          <button type="submit" className="btn-primary auth-submit" disabled={loading} data-testid="auth-submit">
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="auth-demo" data-testid="demo-hint">
          <p>Demo: Register any account to try it out.</p>
        </div>
      </div>
    </div>
  );
}
