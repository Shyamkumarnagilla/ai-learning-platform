import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, MessageSquare, Menu } from 'lucide-react';

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
                <button className="pulse-primary" style={{
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '1.5rem',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                }}>
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
