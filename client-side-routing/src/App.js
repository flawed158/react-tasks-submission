import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Translate from './pages/Translate';
import RandomString from './pages/RandomString';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/translate" element={<Translate />} />
        <Route path="/random-string" element={<RandomString />} />
        <Route path="*" element={<Translate />} />
      </Routes>
    </div>
  );
};

export default App;
