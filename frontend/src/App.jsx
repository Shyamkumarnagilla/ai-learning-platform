import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Summarizer from "./pages/Summarizer";
import MCQ from "./pages/MCQ";
import Navbar from "./components/Navbar";
import { SharedProvider } from "./context/SharedContext";

function App() {
  return (
    <SharedProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summarizer" element={<Summarizer />} />
          <Route path="/mcq" element={<MCQ />} />
        </Routes>
      </Router>
    </SharedProvider>
  );
}

export default App;
