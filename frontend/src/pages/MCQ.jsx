import React, { useState, useEffect } from 'react';
// No icons used as per request
import { useShared } from '../context/SharedContext';
import '../styles/mcq.css';

const MCQ = () => {
    const { sharedText, setSharedText } = useShared();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [error, setError] = useState("");

    const fetchMCQs = async (textToUse = sharedText) => {
        if (!textToUse.trim()) {
            setError("Please provide some text to generate questions from.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:8000/generate-mcqs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: textToUse }),
            });

            const data = await response.json();
            if (data.questions && data.questions.length > 0) {
                setQuestions(data.questions);
            } else {
                setError("Could not generate questions from this text. Try a longer or more descriptive text.");
            }
        } catch (err) {
            setError("Failed to connect to AI service. Please ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (sharedText && questions.length === 0) {
            fetchMCQs();
        }
    }, [sharedText]);

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const handleNext = () => {
        if (selectedOption === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setScore(0);
        setShowResult(false);
        setQuestions([]);
        if (!sharedText) setError("");
    };

    const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    const renderContent = () => {
        if (loading) {
            return (
                <div className="quiz-card glass animate-fade-in" style={{ textAlign: 'center', padding: '60px' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Generating Knowledge Check...</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Our AI is analyzing the material to create a unique evaluation for you.</p>
                </div>
            );
        }

        if (error && questions.length === 0) {
            return (
                <div className="quiz-card glass animate-fade-in" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '12px' }}>Connection Issues</h2>
                    <p style={{ color: '#ef4444', marginBottom: '24px' }}>{error}</p>
                    <button className="btn-retry" onClick={() => setError("")}>Try Again</button>
                </div>
            );
        }

        if (questions.length === 0) {
            return (
                <div className="quiz-card glass animate-fade-in">
                    <textarea
                        className="glass"
                        style={{
                            width: '100%', minHeight: '200px', padding: '20px',
                            borderRadius: '16px', background: 'rgba(255,255,255,0.03)',
                            color: 'white', border: '1px solid var(--glass-border)',
                            fontSize: '1rem', outline: 'none', marginBottom: '20px'
                        }}
                        placeholder="Paste your study material here..."
                        onChange={(e) => setSharedText(e.target.value)}
                        value={sharedText}
                    ></textarea>

                    <button
                        className="btn-next pulse-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '16px', cursor: !sharedText.trim() ? 'not-allowed' : 'pointer' }}
                        onClick={() => fetchMCQs()}
                        disabled={!sharedText.trim()}
                    >
                        Generate Knowledge Check
                    </button>
                </div>
            );
        }

        if (showResult) {
            return (
                <div className="quiz-card glass animate-fade-in">
                    <div className="result-container">
                        <div className="score-circle">
                            <span className="score-value">{score}/{questions.length}</span>
                            <span className="score-label">Points Earned</span>
                        </div>
                        <h2 className="result-title">
                            {score === questions.length ? "Mastery Achieved!" : score >= questions.length / 2 ? "Great Progress!" : "Keep Practicing"}
                        </h2>
                        <p className="result-message">
                            {score === questions.length
                                ? "You have demonstrated complete understanding of the material."
                                : "Review the content again to master all the key concepts."}
                        </p>
                        <div className="result-actions">
                            <button className="btn-retry" onClick={resetQuiz}>
                                New Evaluation
                            </button>
                            <button className="btn-next" onClick={() => window.location.href = '/'}>
                                Return Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="quiz-card glass animate-fade-in">
                <div className="quiz-header">
                    <div className="progress-info">
                        <span className="question-status">Evaluation {currentQuestion + 1} of {questions.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="quiz-body">
                    <h2 className="question-text">{questions[currentQuestion].question}</h2>

                    <div className="options-grid">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className={`option-button ${selectedOption === index ? 'selected' : ''}`}
                                onClick={() => handleOptionSelect(index)}
                            >
                                <div className="option-indicator"></div>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="quiz-footer">
                    <button
                        className="btn-next"
                        onClick={handleNext}
                        disabled={selectedOption === null}
                    >
                        {currentQuestion + 1 === questions.length ? "Finalize Mastery" : "Next Challenge"}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div style={{ padding: '8rem 2rem 4rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="animate-fade-in" style={{ width: '100%', maxWidth: '800px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>
                    MCQ <span style={{ color: 'var(--primary)' }}>Generator</span>
                </h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                    Validate your learning with instant evaluations generated from your study material.
                </p>
                {renderContent()}
            </div>
        </div>
    );
};

export default MCQ;
