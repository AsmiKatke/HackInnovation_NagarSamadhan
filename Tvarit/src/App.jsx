import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { TicketProvider } from './context/TicketContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportPage from './pages/ReportPage';
import TrackingPage from './pages/TrackingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <TicketProvider>
      <Router>
        <div className="min-h-screen bg-gov-light">
          <Navbar />
          <main className="pt-16 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/track" element={<TrackingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TicketProvider>
  );
}

export default App;
