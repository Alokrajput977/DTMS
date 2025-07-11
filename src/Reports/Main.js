// DashboardCombined.js

import React, { useState } from 'react';
import '../css/Main.css';

const DashboardCombined = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    laneType: '',
    operationType: '',
    gateNumber: '',
    vehicleNumber: '',
    containerNumber: '',
    truckNumber: ''
  });
  const [showTable, setShowTable] = useState(false);

  const tabs = [
    'Transaction (IN+OUT)',
    'Truck Turnaround',
    'Truck History',
    'Containers',
    'In / Out Report'
  ];

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setShowTable(true);
  };

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      laneType: '',
      operationType: '',
      gateNumber: '',
      vehicleNumber: '',
      containerNumber: '',
      truckNumber: ''
    });
    setShowTable(false);
  };

  const getTableTitle = () => {
    const titles = [
      'Transaction Records (IN+OUT)',
      'Truck Turnaround Time Records',
      'Truck History Records',
      'Container Movement Records',
      'In/Out Report Records'
    ];
    return titles[activeTab];
  };

  // --- Dummy datasets for each tab ---
  const transactionData = [
    { id: 1, inOut: 'IN', gateNo: '4', permitNo: 'ECT2507101900', vehicleNo: 'HR55AK8269', containerNo: 'C25071028', containerSize: 'N/A', damaged: 'N', time: '2025-07-11 13:43:57' },
    { id: 2, inOut: 'IN', gateNo: '3', permitNo: 'EPC250700242', vehicleNo: 'HR85V1570', containerNo: 'SEKU6210615', containerSize: '40', damaged: 'N', time: '2025-07-11 13:42:10' },
    { id: 3, inOut: 'OUT', gateNo: '3', permitNo: 'ECT2507100285', vehicleNo: 'HR55AFB83', containerNo: 'C25071018', containerSize: 'N/A', damaged: 'N', time: '2025-07-11 13:41:55' },
    { id: 1, inOut: 'IN', gateNo: '4', permitNo: 'ECT2507101900', vehicleNo: 'HR55AK8269', containerNo: 'C25071028', containerSize: 'N/A', damaged: 'N', time: '2025-07-11 13:43:57' },
    { id: 2, inOut: 'IN', gateNo: '3', permitNo: 'EPC250700242', vehicleNo: 'HR85V1570', containerNo: 'SEKU6210615', containerSize: '40', damaged: 'N', time: '2025-07-11 13:42:10' },
    { id: 3, inOut: 'OUT', gateNo: '3', permitNo: 'ECT2507100285', vehicleNo: 'HR55AFB83', containerNo: 'C25071018', containerSize: 'N/A', damaged: 'N', time: '2025-07-11 13:41:55' },

  ];

  const turnaroundData = [
    { sn: 1, vehicleNo: 'MH12AB1234', inTime: '2025-07-11 09:15', inGateNo: 'Gate 1', outTime: '2025-07-11 10:05', outGateNo: 'Gate 3', tttInMinutes: 50 },
    { sn: 2, vehicleNo: 'DL05CD5678', inTime: '2025-07-11 08:50', inGateNo: 'Gate 2', outTime: '2025-07-11 09:40', outGateNo: 'Gate 4', tttInMinutes: 50 },
    // ... more dummy rows
  ];

  const historyData = [
    { sn: 1, inOut: 'IN', gateNo: 'Gate 1', permitNo: 'PERM1001', vehicleNo: 'MH12AB1234', time: '2025-07-11 09:15' },
    { sn: 2, inOut: 'OUT', gateNo: 'Gate 3', permitNo: 'PERM1002', vehicleNo: 'DL05CD5678', time: '2025-07-11 10:05' },
    // ... more dummy rows
  ];

  const containerData = [
    { id: 1, operation: 'Import', containerNo: 'C25071028', size: '20ft', time: '2025-07-11 11:00' },
    { id: 2, operation: 'Export', containerNo: 'SEKU6210615', size: '40ft', time: '2025-07-11 12:30' },
    // ... more dummy rows
  ];

  const reportData = [
    { id: 1, date: '2025-07-11', totalIn: 25, totalOut: 20 },
    { id: 2, date: '2025-08-10', totalIn: 31, totalOut: 29 },
    { id: 3, date: '2025-09-11', totalIn: 15, totalOut: 20 },
    { id: 4, date: '2025-10-10', totalIn: 60, totalOut: 29 },
    { id: 5, date: '2025-17-11', totalIn: 65, totalOut: 20 },
    { id: 6, date: '2025-17-10', totalIn: 70, totalOut: 28 },
    { id: 7, date: '2025-27-11', totalIn: 35, totalOut: 29 },
    { id: 8, date: '2025-29-10', totalIn: 20, totalOut: 58 },
    // ... more dummy rows
  ];

  return (
    <div className="dashboard-container">
      {/* Header & Tabs */}
      <div className="tabs-header">
        <h2 className="dashboard-title">Terminal Operations Dashboard</h2>
        <div className="tabs-container">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`tab-button ${activeTab === idx ? 'active' : ''}`}
              onClick={() => { setActiveTab(idx); resetFilters(); }}
            >
              {tab}
              {activeTab === idx && <span className="tab-indicator" />}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Section */}
      <div className="dashboard-content">
        <div className="filter-section">
          <div className="filter-row">
            {/* Date Range */}
            <div className="filter-group">
              <label>Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                className="input"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-group">
              <label>End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                className="input"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>

            {/* Conditional extra filters per tab */}
            {activeTab === 0 && (
              <>
                <div className="filter-group">
                  <label>Lane Type</label>
                  <select name="laneType" className="select" value={filters.laneType} onChange={handleFilterChange}>
                    <option value="">All Lanes</option>
                    <option value="1">Lane 1</option>
                    <option value="2">Lane 2</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Gate Number</label>
                  <select name="gateNumber" className="select" value={filters.gateNumber} onChange={handleFilterChange}>
                    <option value="">All Gates</option>
                    <option value="1">Gate 1</option>
                    <option value="2">Gate 2</option>
                    <option value="3">Gate 3</option>
                    <option value="4">Gate 4</option>
                    <option value="5">Gate 5</option>
                  </select>
                </div>
              </>
            )}
            {activeTab === 1 && (
              <div className="filter-group">
                <label>Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  className="input"
                  placeholder="Enter vehicle #"
                  value={filters.vehicleNumber}
                  onChange={handleFilterChange}
                />
              </div>
            )}
            {activeTab === 2 && (
              <div className="filter-group">
                <label>Truck Number</label>
                <input
                  type="text"
                  name="truckNumber"
                  className="input"
                  placeholder="Enter truck #"
                  value={filters.truckNumber}
                  onChange={handleFilterChange}
                />
              </div>
            )}
            {activeTab === 3 && (
              <div className="filter-group">
                <label>Container Number</label>
                <input
                  type="text"
                  name="containerNumber"
                  className="input"
                  placeholder="Enter container #"
                  value={filters.containerNumber}
                  onChange={handleFilterChange}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-row">
            <div className="action-group">
              <button className="action-button primary" onClick={applyFilters}>
                <span className="icon">→</span>
                <span className="text">{activeTab === 4 ? 'Generate' : (activeTab === 0 ? 'Apply' : 'Search')}</span>
              </button>
              <button className="action-button">
                <span className="icon">↓</span>
                <span className="text">{activeTab === 0 ? 'Download' : 'Export'}</span>
              </button>
              <button className="action-button" onClick={resetFilters}>
                <span className="icon">⟳</span>
                <span className="text">Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        {showTable && (
          <div className="data-section">
            <div className="data-header">
              <h3>{getTableTitle()}</h3>
              <div className="data-summary">
                <span>Showing all entries</span>
              </div>
            </div>

            <div className="table-container">
              {activeTab === 0 && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>SN.</th><th>IN/OUT</th><th>GATE NO.</th><th>PERMIT NO.</th>
                      <th>VEHICLE NO.</th><th>CONTAINER NO.</th><th>SIZE</th><th>DAMAGED?</th><th>TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.map((r, i) => (
                      <tr key={r.id}>
                        <td>{i + 1}</td>
                        <td className={r.inOut === 'IN' ? 'in-cell' : 'out-cell'}>{r.inOut}</td>
                        <td>{r.gateNo}</td><td>{r.permitNo}</td><td>{r.vehicleNo}</td>
                        <td>{r.containerNo}</td><td>{r.containerSize}</td><td>{r.damaged}</td><td>{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 1 && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>SN.</th><th>VEHICLE NO.</th><th>IN TIME</th><th>IN GATE</th><th>OUT TIME</th><th>OUT GATE</th><th>TTT (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turnaroundData.map(r => (
                      <tr key={r.sn}>
                        <td>{r.sn}</td><td>{r.vehicleNo}</td><td>{r.inTime}</td><td>{r.inGateNo}</td>
                        <td>{r.outTime}</td><td>{r.outGateNo}</td><td>{r.tttInMinutes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 2 && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>SN.</th><th>IN/OUT</th><th>GATE NO.</th><th>PERMIT NO.</th><th>VEHICLE NO.</th><th>TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map(r => (
                      <tr key={r.sn}>
                        <td>{r.sn}</td><td>{r.inOut}</td><td>{r.gateNo}</td><td>{r.permitNo}</td><td>{r.vehicleNo}</td><td>{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 3 && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th><th>Operation</th><th>Container No.</th><th>Size</th><th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {containerData.map(r => (
                      <tr key={r.id}>
                        <td>{r.id}</td><td>{r.operation}</td><td>{r.containerNo}</td><td>{r.size}</td><td>{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 4 && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th><th>Date</th><th>Total IN</th><th>Total OUT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map(r => (
                      <tr key={r.id}>
                        <td>{r.id}</td><td>{r.date}</td><td>{r.totalIn}</td><td>{r.totalOut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="table-footer">
              <div className="pagination-controls">
                <button className="pagination-button" disabled>Previous</button>
                <span className="page-info">Page 1 of 1</span>
                <button className="pagination-button" disabled>Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCombined;
