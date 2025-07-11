import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import JobQueueTable from './jobs/jobs';
import './App.css'; // Make sure you have this CSS file
import JOBS from './jobs/jobsComplete';
import Exception from './components/Exception';
import EximDashboard from './components/Livestatus';
import GateInEIRReports from './components/EIRReport';
import Main from './Reports/Main';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          
          <div className="content-wrapper">
            <Routes>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<JobQueueTable />} />  
              <Route path="/completed" element={<JOBS />} />
              <Route path="/Exception" element={<Exception />} />
              <Route path="/LiveStatus" element={<EximDashboard />} />
              <Route path="/EIRReport" element={<GateInEIRReports />} />
               <Route path="/Reports" element={<Main />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;