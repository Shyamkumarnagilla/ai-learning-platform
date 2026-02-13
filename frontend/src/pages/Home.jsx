import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Target, BookOpen } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '8rem 2rem 4rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Hero Section */}
            <div className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '6rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Master Any Subject with <span style={{ color: 'var(--primary)' }}>Summative AI</span>
                </h1>

                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '650px', marginInline: 'auto', lineHeight: '1.6' }}>
                    The ultimate AI-powered study companion. Summarize complex texts, generate interactive quizzes, and discover curated courses—all in one place to help you learn faster and smarter.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate('/summarizer')}
                        style={{
                            padding: '1rem 2.5rem',
                            borderRadius: '3rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
                            cursor: 'pointer'
                        }}
                    >
                        Start Learning Now <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* Features Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                width: '100%',
                maxWidth: '1200px',
                marginBottom: '4rem'
            }}>
                <FeatureCard
                    icon={<Brain color="var(--primary)" />}
                    title="AI Summarizer"
                    description="Transform long lectures and complex articles into concise, actionable summaries instantly using advanced neural models."
                    onClick={() => navigate('/summarizer')}
                />
                <FeatureCard
                    icon={<Target color="var(--secondary)" />}
                    title="Smart Quizzes"
                    description="Test your knowledge with dynamic AI-generated quizzes tailored specifically to your uploaded learning material."
                    onClick={() => navigate('/mcq')}
                />
                <FeatureCard
                    icon={<BookOpen color="var(--accent)" />}
                    title="YouTube Courses"
                    description="Access hand-picked, high-quality educational playlists from top creators, verified by our expert recommendation engine."
                    onClick={() => navigate('/courses')}
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, onClick }) => (
    <div className="glass"
        onClick={onClick}
        style={{
            padding: '2.5rem',
            borderRadius: '2rem',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: onClick ? 'pointer' : 'default',
            border: '1px solid var(--glass-border)',
            position: 'relative',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.03)'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        }}>
        <div style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>{description}</p>
        <div style={{
            marginTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--primary)',
            fontSize: '0.9rem',
            fontWeight: '600'
        }}>
            Try it now <ArrowRight size={16} />
        </div>
    </div>
);

export default Home;
