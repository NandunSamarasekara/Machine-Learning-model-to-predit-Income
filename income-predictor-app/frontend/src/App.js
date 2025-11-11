import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoverPage from './components/CoverPage';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/predict" element={<PredictionForm />} />
      </Routes>
    </Router>
  );
}

export default App;