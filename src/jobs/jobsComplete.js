import React, { useState } from 'react';
import { FiSearch, FiRefreshCw, FiChevronRight, FiFilter, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../css/EquipmentUI.css';

const equipmentList = [
  'R-S1', 'R-S3', 'RH04', 'RH05', 'RH06', 'RH07', 'RH08',
  'RH10', 'RH12', 'RH13', 'RTG9', 'RTG5', 'RTG6', 'RTG8', 'R-S2'
];

const jobTypes = ['GATE_IN', 'GATE_OUT'];

const EquipmentUI = () => {
  const navigate = useNavigate();
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  

  // Filter data based on user selections
  const filteredData = Array.from({ length: 14 }).map((_, idx) => ({
    id: idx + 1,
    jobType: jobTypes[idx % jobTypes.length],
    containerNo: `CONTAINER${idx + 1}`,
    size: idx % 2 === 0 ? '20' : '40',
    assigned: `00${idx}/045 D`,
    placed: `012/04${idx}A`,
    equipment: equipmentList[idx % equipmentList.length],
    time: `09-07-2025 0${idx + 6}:45:00`,
    status: ['Pending', 'In Progress', 'Completed'][idx % 3],
    source: ['Yard', 'Vessel', 'Truck'][idx % 3]
  })).filter(item => {
    if (searchTerm && !item.containerNo.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedEquipment && item.equipment !== selectedEquipment) return false;
    return true;
  });


      const [activeTab, setActiveTab] = useState('queue');
      const [pagination, setPagination] = useState({
          currentPage: 1,
          totalPages: 1,
          totalEntries: 0,
          entriesPerPage: 10
      });

      const handleClick = () => {
        setActiveTab('completed');
        setPagination({ ...pagination, currentPage: 1 });
        navigate('/completed');
    };

  const handleReset = () => {
    setSelectedEquipment('');
    setSearchTerm('');
    setDateFilter('');
  };

  return (
    <div className="equipment-ui-container">
      <div className="header">
        <div className="header-content">
          <div className="tabs-container">
            <button
              className={`tab-button ${activeTab === 'queue' ? 'active' : ''}`}
               onClick={() => navigate(-1)}
            >
              Job Queue
            </button>
            <button
              className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={handleClick}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-bar">
          <div className={`search-input ${activeFilter === 'search' ? 'active' : ''}`}>
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search container..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setActiveFilter('search')}
              onBlur={() => setActiveFilter(null)}
            />
          </div>

          <div className={`filter-dropdown ${activeFilter === 'equipment' ? 'active' : ''}`}>
            <FiFilter className="filter-icon" />
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              onFocus={() => setActiveFilter('equipment')}
              onBlur={() => setActiveFilter(null)}
            >
              <option value="">All Equipment</option>
              {equipmentList.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className={`date-filter ${activeFilter === 'date' ? 'active' : ''}`}>
            <FiCalendar className="calendar-icon" />
            <input
              type="datetime-local"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              onFocus={() => setActiveFilter('date')}
              onBlur={() => setActiveFilter(null)}
            />
          </div>

          <button style={{ color: "white" }} className="btn apply-btn" onClick={() => { }}>
            <FiChevronRight className="btn-icon" />
            Apply
          </button>
          <button style={{ color: "white" }} className="btn apply-btn" onClick={handleReset}>
            <FiRefreshCw className="btn-icon" />
            Reset
          </button>
        </div>
      </div>


      <div className="table-container">


        <div className="table-wrapper">
          <table className="equipment-table">
            <thead>
              <tr>
                {['S.NO', 'JOB TYPE', 'CONTAINER NO', 'CONTAINER SIZE', 'ASSIGNED', 'PLACED', 'EQUIPMENT', 'TIME', 'SOURCE'].map(header => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <span className={`job-type ${item.jobType.toLowerCase().replace('_', '-')}`}>
                      {item.jobType}
                    </span>
                  </td>
                  <td className="container-no">{item.containerNo}</td>
                  <td>
                    <span className={`size-badge ${item.size === '20' ? 'small' : 'large'}`}>
                      {item.size}
                    </span>
                  </td>
                  <td>{item.assigned}</td>
                  <td>{item.placed}</td>
                  <td className="equipment-name">{item.equipment}</td>
                  <td>{item.time}</td>
                  <td>
                    <span className={`source-badge ${item.source.toLowerCase()}`}>
                      {item.source}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentUI;