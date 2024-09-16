import React from 'react';
import Labs from './Labs';
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Kanbas from './Kanbas';
import LandingPage from './LandingPage';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="LandingPage" />} />
          <Route path="/LandingPage/*" element={<LandingPage />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>

  );
}

export default App;
