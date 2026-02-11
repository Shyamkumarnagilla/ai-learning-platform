import React, { useMemo } from 'react';
import { Star, Clock, Users, ArrowUpRight, Youtube, BookOpen } from 'lucide-react';
import { useShared } from '../context/SharedContext';
import '../styles/courses.css';

const youtubeCourses = [
    {
        id: 1,
        title: "Complete AI & Machine Learning Road-Map | Hindi",
        channel: "CodeWithHarry",
        platform: "YouTube",
        rating: 4.9,
        views: "1.2M",
        duration: "15h 45m",
        price: "FREE",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        keywords: ["ai", "machine learning", "intelligence", "neural", "python", "hindi"]
    },
    {
        id: 2,
        title: "Complete Python for AI & ML | 2026 Hindi",
        channel: "Krish Naik",
        platform: "YouTube",
        rating: 4.8,
        views: "1.2M+",
        duration: "18h 45m",
        price: "FREE",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
        keywords: ["python", "ai", "machine learning", "hindi", "data science"]
    },
    {
        id: 3,
        title: "Natural Language Processing (NLP) with Spacy",
        channel: "Krish Naik",
        platform: "YouTube",
        rating: 4.7,
        views: "450k",
        duration: "12h 10m",
        price: "FREE",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
        keywords: ["nlp", "text", "language", "gpt", "chatbot", "spacy"]
    },
    {
        id: 4,
        title: "Data Science Full Course 2026 | 10 Hours",
        channel: "Edureka",
        platform: "YouTube",
        rating: 4.8,
        views: "2.5M",
        duration: "10h 00m",
        price: "FREE",
        image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=800",
        keywords: ["data science", "analytics", "sql", "big data", "stats"]
    },
    {
        id: 5,
        title: "MERN Stack Crash Course (Project Based)",
        channel: "Apna College",
        platform: "YouTube",
        rating: 4.9,
        views: "3.2M",
        duration: "20h 30m",
        price: "FREE",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        keywords: ["mern", "react", "node", "javascript", "fullstack", "web"]
    },
    {
        id: 6,
        title: "DSA Placement Series by Love Babbar",
        channel: "CodeHelp",
        platform: "YouTube",
        rating: 4.9,
        views: "5M+",
        duration: "150+ Videos",
        price: "FREE",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
        keywords: ["dsa", "coding", "placement", "interview", "love babbar"]
    }
];

const Courses = () => {
    const { sharedText } = useShared();

    const recommendedCourses = useMemo(() => {
        if (!sharedText || sharedText.trim().length < 5) {
            return youtubeCourses.slice(0, 3);
        }

        const lowercaseText = sharedText.toLowerCase();
        const scoredCourses = youtubeCourses.map(course => {
            let score = 0;
            course.keywords.forEach(kw => {
                if (lowercaseText.includes(kw)) score += 1;
            });
            return { ...course, score };
        });

        const sorted = scoredCourses.sort((a, b) => b.score - a.score);
        if (sorted[0].score === 0) return youtubeCourses.slice(0, 3);
        return sorted.slice(0, 3);
    }, [sharedText]);

    const handleImageError = (e) => {
        // Ultimate fallback: A beautiful inline SVG if Unsplash fails
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%231e1e2d'/%3E%3Cpath d='M400 150 L450 250 L350 250 Z' fill='%23ef4444' opacity='0.5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='sans-serif' font-size='24' font-weight='bold'%3EAI Course Thumbnail%3C/text%3E%3C/svg%3E";
    };

    return (
        <div className="courses-container animate-fade-in">
            <header className="courses-header">
                <h1>Top <span style={{ color: '#ef4444' }}>YouTube</span> Recommendations</h1>
                <p>Learn for free from the best Indian creators. We've handpicked the top 3 playlists that match your search.</p>
                <div style={{
                    marginTop: '1.5rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '1rem',
                    display: 'inline-block',
                    border: '1px solid var(--glass-border)'
                }}>
                    These are external playlists. Watch them directly on YouTube for free.
                </div>
            </header>

            <div className="courses-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', justifyContent: 'center' }}>
                {recommendedCourses.map(course => (
                    <div key={course.id} className="course-card glass" style={{ borderBottom: '4px solid #ef4444' }}>
                        <div className="course-image">
                            <img
                                src={course.image}
                                alt={course.title}
                                onError={handleImageError}
                            />
                            <div className="course-badge" style={{ backgroundColor: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Youtube size={12} /> {course.platform}
                            </div>
                        </div>
                        <div className="course-content">
                            <div className="course-meta">
                                <span><Star size={14} fill="#fbbf24" color="#fbbf24" /> {course.rating}</span>
                                <span><Users size={14} /> {course.views} Views</span>
                                <span><Clock size={14} /> {course.duration}</span>
                            </div>
                            <h3 className="course-title" style={{ minHeight: '3.5rem' }}>{course.title}</h3>
                            <div className="course-instructor">
                                <div className="instructor-avatar" style={{ background: '#ef4444' }}>
                                    {course.channel[0]}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Channel</div>
                                    <span className="instructor-name" style={{ color: 'white', fontWeight: '600' }}>{course.channel}</span>
                                </div>
                            </div>
                            <div className="course-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.2rem' }}>
                                <div>
                                    <span className="course-price" style={{ fontSize: '1.8rem', color: '#22c55e' }}>
                                        {course.price}
                                    </span>
                                </div>
                                <button className="btn-enroll" style={{
                                    background: '#ef4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.8rem 1.8rem',
                                    borderRadius: '1.2rem',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: '700',
                                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                                }}>
                                    Watch Now <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '5rem', padding: '3rem', borderRadius: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)' }}>

                <h2 style={{ marginBottom: '1rem' }}>Want more free content?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Our AI picks the highest-rated Indian educational channels to save your time.</p>
                <button onClick={() => window.location.href = '/summarizer'} className="btn-retry" style={{ padding: '1rem 2.5rem' }}>
                    Generate New Recommendation
                </button>
            </div>
        </div>
    );
};

export default Courses;
