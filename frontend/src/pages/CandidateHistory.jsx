import { Download, History } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function CandidateHistory() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/analysis/history")
      .then((r) => setItems(r.data))
      .catch((e) => setError(e.response?.data?.detail || "Unable to load history"));
  }, []);

  async function download(id) {
    const response = await api.get(`/api/analysis/${id}/report.txt`, { responseType: "blob" });
    const url = URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ResumeAI_Report_${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="page-shell">
      <div className="page-title-row">
        <div><p className="eyebrow">Candidate Portal</p><h1>Analysis history</h1></div>
      </div>

      <section className="panel">
        {error && <div className="error-box">{error}</div>}
        {!items.length && !error && <div className="empty-result"><History size={44} /><h2>No analyses yet</h2></div>}

        <div className="history-grid">
          {items.map((item) => (
            <article className="history-card" key={item.id}>
              <div>
                <small>{new Date(item.created_at).toLocaleDateString()}</small>
                <h3>{item.job_title}</h3>
                <p>{item.candidate_name}</p>
              </div>
              <div className="mini-score">{Math.round(item.ats_score)}%</div>
              <button className="secondary-button" onClick={() => download(item.id)}>
                <Download size={16} /> Report
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
