import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Zap, Target, BookOpen } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '8rem 2rem 4rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Hero Section */}
            <div className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '6rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    color: 'var(--primary)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '2rem'
                }}>
                    <Zap size={16} />
                    The Future of Learning is Here
                </div>

                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Master Any Subject with <span style={{ color: 'var(--primary)' }}>Summative AI</span>
                </h1>

                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', marginInline: 'auto' }}>
                    Accelerate your learning journey with our advanced AI-powered tools. Summarize content, generate study maps, and master concepts in minutes.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate('/summarizer')}
                        style={{
                            padding: '1rem 2rem',
                            borderRadius: '3rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        Start Learning <ArrowRight size={20} />
                    </button>
                    <button style={{
                        padding: '1rem 2rem',
                        borderRadius: '3rem',
                        background: 'transparent',
                        color: 'white',
                        border: '1px solid var(--glass-border)',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                    }}>
                        Watch Demo
                    </button>
                </div>
            </div>

            {/* Features Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                width: '100%',
                maxWidth: '1200px'
            }}>
                <FeatureCard
                    icon={<Brain color="var(--primary)" />}
                    title="AI Summarization"
                    description="Transform long lectures and articles into concise, actionable summaries instantly."
                />
                <FeatureCard
                    icon={<Target color="var(--secondary)" />}
                    title="Smart Quiz Generation"
                    description="Test your knowledge with AI-generated quizzes tailored to your learning material."
                />
                <FeatureCard
                    icon={<BookOpen color="var(--accent)" />}
                    title="Personalized Roadmap"
                    description="Get a custom study plan that adapts to your pace and understanding."
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', transition: 'transform 0.3s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <div style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
        }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{description}</p>
    </div>
);

export default Home;
