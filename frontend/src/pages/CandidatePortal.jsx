import { Download, FileText, Sparkles, UploadCloud } from "lucide-react";
import { useState } from "react";
import { API_BASE, api } from "../api";
import ScoreRing from "../components/ScoreRing";

export default function CandidatePortal() {
  const [form, setForm] = useState({
    candidate_name: "",
    candidate_email: "",
    job_title: "",
    jd_text: "",
  });
  const [resume, setResume] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    if (!resume) return setError("Please upload your resume.");

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    body.append("resume", resume);
    if (jdFile) body.append("jd_file", jdFile);

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const { data } = await api.post("/api/analysis/", body);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  async function downloadReport() {
    const response = await api.get(`/api/analysis/${result.id}/report.txt`, { responseType: "blob" });
    const url = URL.createObjectURL(response.data);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ResumeAI_Report_${result.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="page-shell">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Candidate Portal</p>
          <h1>Analyze your resume</h1>
          <p>Compare your resume against a target job description and receive an actionable report.</p>
        </div>
      </div>

      <div className="analysis-layout">
        <form className="panel upload-panel" onSubmit={submit}>
          <div className="panel-title">
            <UploadCloud />
            <div><h2>Upload documents</h2><p>PDF, DOCX, or TXT up to 5 MB</p></div>
          </div>

          <input name="candidate_name" placeholder="Candidate name" value={form.candidate_name} onChange={change} required />
          <input name="candidate_email" type="email" placeholder="Candidate email" value={form.candidate_email} onChange={change} />
          <input name="job_title" placeholder="Target job title" value={form.job_title} onChange={change} required />

          <label className="file-drop">
            <FileText />
            <span>{resume ? resume.name : "Choose resume"}</span>
            <input hidden type="file" accept=".pdf,.docx,.txt" onChange={(e) => setResume(e.target.files[0])} />
          </label>

          <label className="file-drop secondary">
            <FileText />
            <span>{jdFile ? jdFile.name : "Choose JD file (optional)"}</span>
            <input hidden type="file" accept=".pdf,.docx,.txt" onChange={(e) => setJdFile(e.target.files[0])} />
          </label>

          <textarea
            name="jd_text"
            rows="9"
            placeholder="Or paste the complete job description here..."
            value={form.jd_text}
            onChange={change}
          />

          <button className="primary-button" disabled={loading}>
            <Sparkles size={18} /> {loading ? "AI is analyzing..." : "Analyze resume"}
          </button>

          {error && <div className="error-box">{error}</div>}
        </form>

        <section className="panel result-panel">
          {!result && !loading && (
            <div className="empty-result">
              <Sparkles size={52} />
              <h2>Your report will appear here</h2>
              <p>Upload a resume and job description to begin.</p>
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="spinner" />
              <h2>Analyzing resume...</h2>
              <p>Parsing content, matching skills, calculating scores, and generating interview questions.</p>
            </div>
          )}

          {result && (
            <>
              <div className="result-header">
                <div>
                  <p className="eyebrow">Analysis complete</p>
                  <h2>{result.job_title}</h2>
                </div>
                <button className="secondary-button" onClick={downloadReport}>
                  <Download size={17} /> Download report
                </button>
              </div>

              <div className="score-row">
                <ScoreRing value={result.ats_score} label="ATS score" />
                <ScoreRing value={result.skill_match_score} label="Skill match" />
                <ScoreRing value={result.semantic_score} label="Semantic" />
              </div>

              <ResultBlock title="Matched skills" values={result.matched_skills} type="success" />
              <ResultBlock title="Missing skills" values={result.missing_skills} type="warning" />

              <InsightList title="Strengths" values={result.strengths} />
              <InsightList title="Weaknesses" values={result.weaknesses} />
              <InsightList title="Learning recommendations" values={result.recommendations} />

              <div className="insight-section">
                <h3>Generated interview questions</h3>
                <ol className="question-list">
                  {result.interview_questions.map((q) => <li key={q}>{q}</li>)}
                </ol>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function ResultBlock({ title, values, type }) {
  return (
    <div className="insight-section">
      <h3>{title}</h3>
      <div className="tag-list">
        {values.length ? values.map((v) => <span className={`tag ${type}`} key={v}>{v}</span>) : <span className="muted">None detected</span>}
      </div>
    </div>
  );
}

function InsightList({ title, values }) {
  return (
    <div className="insight-section">
      <h3>{title}</h3>
      <ul className="clean-list">{values.map((v) => <li key={v}>{v}</li>)}</ul>
    </div>
  );
}
