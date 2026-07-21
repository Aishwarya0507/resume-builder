export default function ScoreRing({ value, label }) {
  const rounded = Math.round(value || 0);
  return (
    <div className="score-ring-wrap">
      <div className="score-ring" style={{ "--score": `${rounded * 3.6}deg` }}>
        <div>
          <strong>{rounded}%</strong>
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
}
