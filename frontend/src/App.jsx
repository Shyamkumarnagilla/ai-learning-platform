import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Summarizer from "./pages/Summarizer";
import MCQ from "./pages/MCQ";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { SharedProvider } from "./context/SharedContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check local storage for auth state
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    // Listen for storage changes (for logout across tabs or triggers)
    const handleStorageChange = () => {
      const status = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(status);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <SharedProvider>
      <Router>
        {isAuthenticated && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/signup" />}
          />
          <Route
            path="/summarizer"
            element={isAuthenticated ? <Summarizer /> : <Navigate to="/signup" />}
          />
          <Route
            path="/mcq"
            element={isAuthenticated ? <MCQ /> : <Navigate to="/signup" />}
          />
          <Route
            path="/courses"
            element={isAuthenticated ? <Courses /> : <Navigate to="/signup" />}
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/signup"} />} />
        </Routes>
      </Router>
    </SharedProvider>
  );
}

export default App;
