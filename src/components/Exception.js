import React, { useState, useEffect } from 'react';
import '../css/Exception.css';

const Exception = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const entriesPerPage = 10;

  const dummyData = [
    { id: 1, direction: 'OUT', gate: 1, permit: '', vehicle: 'MH46A8F9343', time: '19-06-2025 01:00:23' },
    { id: 2, direction: 'IN', gate: 2, permit: '', vehicle: 'DLNJB2205', time: '18-06-2025 16:31:37' },
    { id: 3, direction: 'OUT', gate: 3, permit: '', vehicle: 'HRB0DP195', time: '20-06-2025 14:04:34' },
    { id: 4, direction: 'OUT', gate: 4, permit: '', vehicle: 'DLLLAA4089', time: '21-06-2025 19:28:11' },
    { id: 5, direction: 'OUT', gate: 3, permit: '', vehicle: 'H83AAJ7418', time: '24-06-2025 15:20:19' },
    { id: 6, direction: 'OUT', gate: 3, permit: '', vehicle: 'UP22BT3903', time: '24-06-2025 15:21:29' },
    { id: 7, direction: 'OUT', gate: 1, permit: '', vehicle: 'H83AAJ7418', time: '24-06-2025 14:38:26' },
    { id: 8, direction: 'OUT', gate: 1, permit: '', vehicle: 'RJTIGD0182', time: '23-06-2025 19:12:41' },
    { id: 9, direction: 'OUT', gate: 1, permit: '', vehicle: 'RJ140HS088', time: '26-06-2025 17:23:08' },
    { id: 10, direction: 'IN', gate: 4, permit: '', vehicle: 'RJ140HS088', time: '26-06-2025 10:42:09' },
    { id: 11, direction: 'IN', gate: 2, permit: 'VIP', vehicle: 'DL1CAB1234', time: '27-06-2025 09:15:22' },
    { id: 12, direction: 'OUT', gate: 3, permit: '', vehicle: 'MH02AX5678', time: '27-06-2025 18:45:33' },
    { id: 13, direction: 'IN', gate: 1, permit: 'Delivery', vehicle: 'KA03MN7890', time: '28-06-2025 11:20:15' },
    { id: 14, direction: 'OUT', gate: 4, permit: '', vehicle: 'TN09PQ3456', time: '28-06-2025 20:10:45' },
    { id: 15, direction: 'IN', gate: 2, permit: '', vehicle: 'GJ05RS6789', time: '29-06-2025 14:30:10' },
    { id: 16, direction: 'OUT', gate: 1, permit: 'Emergency', vehicle: 'WB12TU9012', time: '29-06-2025 22:15:30' },
    { id: 17, direction: 'IN', gate: 3, permit: '', vehicle: 'AP07VW2345', time: '30-06-2025 10:45:55' },
    { id: 18, direction: 'OUT', gate: 2, permit: '', vehicle: 'KL08XY6789', time: '30-06-2025 19:30:15' },
    { id: 19, direction: 'IN', gate: 4, permit: 'Contractor', vehicle: 'MP09ZA0123', time: '01-07-2025 08:20:40' },
    { id: 20, direction: 'OUT', gate: 1, permit: '', vehicle: 'BR10BC4567', time: '01-07-2025 17:45:20' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setEntries(dummyData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter entries based on search term and filter
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.time.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || entry.direction === filter;
    return matchesSearch && matchesFilter;
  });

  // Get current entries for pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format direction with color
  const formatDirection = (direction) => {
    return direction === 'IN' 
      ? <span className="direction-in">{direction}</span>
      : <span className="direction-out">{direction}</span>;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Exception</h1>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by vehicle or time..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <i className="fas fa-search"></i>
          </div>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => {
                setFilter('all');
                setCurrentPage(1);
              }}
            >
              All
            </button>
            <button 
              className={filter === 'IN' ? 'active' : ''}
              onClick={() => {
                setFilter('IN');
                setCurrentPage(1);
              }}
            >
              Entries
            </button>
            <button 
              className={filter === 'OUT' ? 'active' : ''}
              onClick={() => {
                setFilter('OUT');
                setCurrentPage(1);
              }}
            >
              Exits
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div >
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="entries-table">
                <thead>
                  <tr>
                    <th>SN.</th>
                    <th>IN/OUT</th>
                    <th>Gate NO.</th>
                    <th>Special Permit</th>
                    <th>Vehicle NO.</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.length > 0 ? (
                    currentEntries.map((entry, index) => (
                      <tr key={entry.id}>
                        <td>{indexOfFirstEntry + index + 1}</td>
                        <td>{formatDirection(entry.direction)}</td>
                        <td>{entry.gate}</td>
                        <td>{entry.permit || '-'}</td>
                        <td>{entry.vehicle}</td>
                        <td>{entry.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No entries found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredEntries.length > entriesPerPage && (
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? 'active' : ''}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

    
    </div>
  );
};

export default Exception;