import { Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function RecruiterCandidates() {
  const [result, setResult] = useState({ items: [], page: 1, total_pages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [page, setPage] = useState(1);

  async function load() {
    const { data } = await api.get("/api/recruiter/candidates", {
      params: { search, min_score: minScore, page, page_size: 8 }
    });
    setResult(data);
  }

  useEffect(() => { load(); }, [page]);

  async function toggle(item) {
    await api.patch(`/api/recruiter/candidates/${item.id}/shortlist`, {
      shortlisted: !item.shortlisted
    });
    load();
  }

  function applyFilters(e) {
    e.preventDefault();
    setPage(1);
    load();
  }

  return (
    <main className="page-shell">
      <div className="page-title-row">
        <div><p className="eyebrow">Recruiter Portal</p><h1>Candidate ranking</h1><p>{result.total} analyzed candidates</p></div>
      </div>

      <section className="panel">
        <form className="filter-bar" onSubmit={applyFilters}>
          <div className="search-wrap"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidate or role" /></div>
          <select value={minScore} onChange={(e) => setMinScore(Number(e.target.value))}>
            <option value="0">All ATS scores</option>
            <option value="50">50% and above</option>
            <option value="70">70% and above</option>
            <option value="85">85% and above</option>
          </select>
          <button className="primary-button">Apply filters</button>
        </form>

        <div className="table-wrap">
          <table>
            <thead><tr><th>Rank</th><th>Candidate</th><th>Role</th><th>ATS</th><th>Skill match</th><th>Matched skills</th><th>Status</th></tr></thead>
            <tbody>
              {result.items.map((item, index) => (
                <tr key={item.id}>
                  <td>#{(page - 1) * 8 + index + 1}</td>
                  <td><strong>{item.candidate_name}</strong><small>{item.candidate_email}</small></td>
                  <td>{item.job_title}</td>
                  <td><span className="score-pill">{Math.round(item.ats_score)}%</span></td>
                  <td>{Math.round(item.skill_match_score)}%</td>
                  <td><div className="compact-tags">{item.matched_skills.slice(0, 3).map((x) => <span key={x}>{x}</span>)}</div></td>
                  <td>
                    <button className={item.shortlisted ? "shortlist-button active" : "shortlist-button"} onClick={() => toggle(item)}>
                      <Star size={15} /> {item.shortlisted ? "Shortlisted" : "Shortlist"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} of {result.total_pages}</span>
          <button disabled={page >= result.total_pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </section>
    </main>
  );
}
