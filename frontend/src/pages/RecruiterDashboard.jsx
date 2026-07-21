import { Download, Gauge, Target, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { API_BASE, api } from "../api";

export default function RecruiterDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/api/analytics/").then((r) => setData(r.data)).catch(console.error);
  }, []);

  async function exportCsv() {
    const response = await api.get("/api/analytics/export.csv", { responseType: "blob" });
    const url = URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resumeai_analytics.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!data) return <main className="page-shell"><div className="loading-state"><div className="spinner" /><h2>Loading dashboard...</h2></div></main>;

  const cards = [
    { label: "Total candidates", value: data.total_candidates, icon: Users },
    { label: "Average ATS", value: `${data.average_ats_score}%`, icon: Gauge },
    { label: "Shortlisted", value: data.shortlisted_candidates, icon: UserCheck },
    { label: "Success rate", value: `${data.interview_success_rate}%`, icon: Target },
  ];

  return (
    <main className="page-shell">
      <div className="page-title-row">
        <div><p className="eyebrow">Recruiter Portal</p><h1>Hiring intelligence</h1><p>Monitor candidate quality and hiring trends.</p></div>
        <button className="secondary-button" onClick={exportCsv}><Download size={17} /> Export for Power BI</button>
      </div>

      <section className="stats-grid">
        {cards.map(({ label, value, icon: Icon }) => (
          <article className="stat-card" key={label}>
            <div className="stat-icon"><Icon /></div>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel chart-panel">
          <h2>ATS score distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.candidate_distribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#20324c" />
              <XAxis dataKey="range" stroke="#90a3bd" />
              <YAxis stroke="#90a3bd" allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="panel chart-panel">
          <h2>Skill demand</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.skill_demand} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#20324c" />
              <XAxis type="number" stroke="#90a3bd" allowDecimals={false} />
              <YAxis type="category" dataKey="skill" width={100} stroke="#90a3bd" />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="panel chart-panel wide">
          <h2>Applications by role</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.job_distribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#20324c" />
              <XAxis dataKey="job_title" stroke="#90a3bd" />
              <YAxis stroke="#90a3bd" allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>
    </main>
  );
}
