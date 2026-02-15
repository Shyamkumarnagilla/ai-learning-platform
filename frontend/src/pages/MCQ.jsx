import React, { useState, useEffect } from 'react';
import { ChevronRight, RotateCcw, Home as HomeIcon, Trophy, Brain, Sparkles, Send } from 'lucide-react';
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

    if (loading) {
        return (
            <div className="mcq-container">
                <div className="quiz-card glass animate-fade-in" style={{ textAlign: 'center', padding: '60px' }}>
                    <div className="pulse-primary" style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: 'var(--primary)', margin: '0 auto 24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Sparkles size={40} color="white" className="animate-pulse" />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Generating Your Quiz...</h2>
                    <p style={{ color: 'var(--text-muted)' }}>AI is analyzing your text to create unique questions.</p>
                </div>
            </div>
        );
    }

    if (!sharedText && questions.length === 0) {
        return (
            <div className="mcq-container">
                <div className="quiz-card glass animate-fade-in" style={{ maxWidth: '600px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <Brain size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
                        <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Generate Custom Quiz</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Paste your study material below and let AI create a personalized quiz for you.</p>
                    </div>

                    <textarea
                        className="glass"
                        style={{
                            width: '100%', minHeight: '200px', padding: '20px',
                            borderRadius: '16px', background: 'rgba(255,255,255,0.03)',
                            color: 'white', border: '1px solid var(--glass-border)',
                            fontSize: '1rem', outline: 'none', marginBottom: '20px'
                        }}
                        placeholder="Paste your content here..."
                        onChange={(e) => setSharedText(e.target.value)}
                        value={sharedText}
                    ></textarea>

                    {error && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}

                    <button
                        className="btn-next pulse-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
                        onClick={() => fetchMCQs()}
                        disabled={!sharedText.trim()}
                    >
                        <Send size={20} /> Generate Quiz
                    </button>
                </div>
            </div>
        );
    }

    if (error && questions.length === 0) {
        return (
            <div className="mcq-container">
                <div className="quiz-card glass animate-fade-in" style={{ textAlign: 'center', maxWidth: '500px' }}>
                    <div style={{ color: '#ef4444', marginBottom: '20px' }}>⚠️</div>
                    <h2 style={{ marginBottom: '12px' }}>Oops! Something went wrong</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{error}</p>
                    <button className="btn-retry" onClick={() => setError("")}>Try Again</button>
                </div>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="mcq-container animate-fade-in">
                <div className="quiz-card glass">
                    <div className="result-container">
                        <div className="score-circle">
                            <Trophy size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <span className="score-value">{score}/{questions.length}</span>
                            <span className="score-label">Points</span>
                        </div>
                        <h2 className="result-title">
                            {score === questions.length ? "Perfect Score! 🌟" : score >= questions.length / 2 ? "Great Job! 👏" : "Keep Learning! 📚"}
                        </h2>
                        <p className="result-message">
                            {score === questions.length
                                ? "Incredible! You have a perfect grasp of the material."
                                : "Good effort! Review the content again to master all the concepts."}
                        </p>
                        <div className="result-actions">
                            <button className="btn-retry" onClick={resetQuiz}>
                                <RotateCcw size={18} /> New Quiz
                            </button>
                            <button className="btn-next" onClick={() => window.location.href = '/'}>
                                <HomeIcon size={18} /> Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mcq-container animate-fade-in">
            {questions.length > 0 && (
                <div className="quiz-card glass">
                    <div className="quiz-header">
                        <div className="progress-info">
                            <span className="question-status">Question {currentQuestion + 1} of {questions.length}</span>
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
                            {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MCQ;
