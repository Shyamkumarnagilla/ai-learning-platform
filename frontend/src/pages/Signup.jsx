import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ArrowRight, Eye, EyeOff } from 'lucide-react';
import '../styles/auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = '/';
    };

    const handleSkip = () => {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = '/';
    };

    return (
        <div className="auth-container">
            <div className="auth-bg-circle circle-1"></div>
            <div className="auth-bg-circle circle-2"></div>

            <div className="auth-card glass">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Start your AI-powered learning journey</p>
                </div>

                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Your Name"
                                className="auth-input"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                className="auth-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                className="auth-input"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="auth-button">
                        Get Started <UserPlus size={20} />
                    </button>

                    <button type="button" onClick={handleSkip} className="skip-button">
                        Skip for now
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account?
                    <Link to="/login" className="auth-link">
                        Sign In <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
