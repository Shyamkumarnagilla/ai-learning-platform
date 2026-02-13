import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, MessageSquare, Menu, User, LogOut, Shield, Mail } from 'lucide-react';

const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

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

                <div style={{ position: 'relative' }} ref={dropdownRef}>
                    <button
                        onClick={toggleProfile}
                        className="glass"
                        style={{
                            width: '2.8rem',
                            height: '2.8rem',
                            borderRadius: '50%',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            background: 'var(--primary)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                            transform: isProfileOpen ? 'scale(1.1)' : 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = isProfileOpen ? 'scale(1.1)' : 'scale(1)';
                            e.currentTarget.style.boxShadow = isProfileOpen ? '0 0 20px rgba(99, 102, 241, 0.4)' : '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        <User size={20} />
                    </button>

                    {isProfileOpen && (
                        <div className="glass animate-fade-in" style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '260px',
                            borderRadius: '1.5rem',
                            padding: '1.5rem',
                            background: 'rgba(15, 23, 42, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            zIndex: 1001
                        }}>
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '4rem',
                                    height: '4rem',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                    margin: '0 auto 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid rgba(255,255,255,0.1)'
                                }}>
                                    <User size={32} color="white" />
                                </div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>Shyam Kumar Nagilla</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>shyam@example.com</p>
                            </div>

                            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <button
                                    onClick={() => alert('Logout functionality will be integrated with the backend.')}
                                    style={{
                                        marginTop: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.8rem',
                                        borderRadius: '0.75rem',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        color: '#ef4444',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        width: '100%',
                                        justifyContent: 'center'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
