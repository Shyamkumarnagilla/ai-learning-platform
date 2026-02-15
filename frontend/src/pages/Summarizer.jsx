import { useState } from "react";
import { Sparkles, Send, Copy, RotateCcw, Brain } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useShared } from "../context/SharedContext";
import "../styles/summarizer.css";

function Summarizer() {
  const navigate = useNavigate();
  const { sharedText, setSharedText } = useShared();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!sharedText.trim()) return;

    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: sharedText }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Failed to summarize:", error);
      setSummary("Error: Could not connect to the AI service. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '8rem 2rem 4rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '800px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>AI Text <span style={{ color: 'var(--primary)' }}>Summarizer</span></h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Paste your long text below and let Summative AI distill it into key points.
        </p>

        <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', marginBottom: '2rem' }}>
          <textarea
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--glass-border)',
              borderRadius: '1rem',
              padding: '1.5rem',
              color: 'white',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
              minHeight: '200px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Enter long text here..."
            value={sharedText}
            onChange={(e) => setSharedText(e.target.value)}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', gap: '1rem' }}>
            <button
              onClick={() => { setSharedText(""); setSummary(""); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}
            >
              <RotateCcw size={18} /> Reset
            </button>
            <button
              className="pulse-primary"
              onClick={handleSummarize}
              disabled={loading || !sharedText.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 2rem',
                borderRadius: '1rem',
                background: loading ? 'var(--text-muted)' : 'var(--primary)',
                border: 'none',
                color: 'white',
                fontWeight: '700',
                cursor: (loading || !sharedText.trim()) ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? <Sparkles size={18} className="animate-pulse" /> : <Send size={18} />}
              {loading ? "Distilling..." : "Summarize Now"}
            </button>
          </div>
        </div>

        {summary && (
          <div className="glass animate-fade-in" style={{
            padding: '2.5rem',
            borderRadius: '2rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Sparkles size={24} color="var(--primary)" /> Distilled Summary
              </h3>
              <button
                onClick={() => navigator.clipboard.writeText(summary)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <Copy size={16} /> Copy
              </button>
            </div>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '2rem' }}>{summary}</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/mcq')}
                className="pulse-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2.5rem',
                  borderRadius: '1.5rem',
                  background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
                  border: 'none',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '1.1rem'
                }}
              >
                <Brain size={20} /> Generate MCQ from this content
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summarizer;
