import { Activity, Shield, UserRound, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/api/admin/stats"), api.get("/api/admin/users")])
      .then(([a, b]) => { setStats(a.data); setUsers(b.data); })
      .catch(console.error);
  }, []);

  if (!stats) return <main className="page-shell"><div className="loading-state"><div className="spinner" /></div></main>;

  const cards = [
    ["Total users", stats.total_users, Users],
    ["Candidates", stats.candidate_users, UserRound],
    ["Recruiters", stats.recruiter_users, Shield],
    ["Analyses", stats.total_analyses, Activity],
  ];

  return (
    <main className="page-shell">
      <div className="page-title-row"><div><p className="eyebrow">Administration</p><h1>Platform overview</h1></div></div>

      <section className="stats-grid">
        {cards.map(([label, value, Icon]) => (
          <article className="stat-card" key={label}><div className="stat-icon"><Icon /></div><span>{label}</span><strong>{value}</strong></article>
        ))}
      </section>

      <section className="panel">
        <h2>Registered users</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="role-badge">{user.role}</span></td>
                  <td>{user.is_active ? "Active" : "Inactive"}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
