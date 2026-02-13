import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, MessageSquare, Menu, User } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="glass" style={{
            position: 'fixed',
            top: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            height: '4rem',
            borderRadius: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            zIndex: 1000,
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    padding: '0.5rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Sparkles size={24} color="white" />
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Summative AI
                </span>
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '0.95rem', fontWeight: '500', opacity: 0.8 }}>Home</Link>
                <Link to="/summarizer" style={{ fontSize: '0.95rem', fontWeight: '500', opacity: 0.8 }}>Summarizer</Link>
                <Link to="/mcq" style={{ fontSize: '0.95rem', fontWeight: '500', opacity: 0.8 }}>MCQ Quiz</Link>
                <Link to="/courses" style={{ fontSize: '0.95rem', fontWeight: '500', opacity: 0.8 }}>Courses</Link>
                <button className="glass" style={{
                    width: '2.8rem',
                    height: '2.8rem',
                    borderRadius: '50%',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease',
                    color: 'white'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--primary)';
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'var(--glass-border)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}>
                    <User size={20} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
