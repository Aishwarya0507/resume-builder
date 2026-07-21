import { BrainCircuit, ChartNoAxesCombined, FileSearch, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "candidate" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload = mode === "login"
        ? { email: form.email, password: form.password }
        : form;
      const { data } = await api.post(endpoint, payload);
      login(data);
      navigate(`/${data.role}`);
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to continue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-hero">
        <div className="hero-badge"><BrainCircuit size={18} /> AI recruitment intelligence</div>
        <h1>Turn every resume into a clear hiring decision.</h1>
        <p>
          Resume parsing, ATS scoring, skill matching, candidate ranking,
          interview generation, and recruitment analytics in one platform.
        </p>

        <div className="hero-features">
          <div><FileSearch /><span><strong>Smart parsing</strong><small>PDF, DOCX and TXT resumes</small></span></div>
          <div><BrainCircuit /><span><strong>AI insights</strong><small>Strengths, gaps and interviews</small></span></div>
          <div><ChartNoAxesCombined /><span><strong>Hiring analytics</strong><small>Power BI-ready exports</small></span></div>
          <div><ShieldCheck /><span><strong>Role security</strong><small>Candidate, recruiter and admin</small></span></div>
        </div>
      </section>

      <section className="auth-card">
        <p className="eyebrow">{mode === "login" ? "Welcome back" : "Join ResumeAI"}</p>
        <h2>{mode === "login" ? "Sign in to your portal" : "Create your account"}</h2>

        <form onSubmit={submit}>
          {mode === "register" && (
            <input name="name" placeholder="Full name" value={form.name} onChange={change} required />
          )}
          <input name="email" type="email" placeholder="Email address" value={form.email} onChange={change} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={change} required />
          {mode === "register" && (
            <select name="role" value={form.role} onChange={change}>
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
            </select>
          )}
          <button className="primary-button" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        {error && <div className="error-box">{error}</div>}

        <button className="text-button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Create a new account" : "I already have an account"}
        </button>

        <div className="demo-note">
          Admin demo: <b>admin@resumeai.local</b> / <b>Admin@123</b>
        </div>
      </section>
    </main>
  );
}
