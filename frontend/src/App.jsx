import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Summarizer from "./pages/Summarizer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarizer" element={<Summarizer />} />
      </Routes>
    </Router>
  );
}

export default App;
