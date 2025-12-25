import { useState } from "react";
import "../styles/summarizer.css";

function Summarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setSummary("");

    const response = await fetch("http://127.0.0.1:8000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">AI Text Summarizer</h1>

      <textarea
        className="text-input"
        rows="8"
        placeholder="Enter text to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="primary-btn" onClick={handleSummarize}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="result-card">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
