import React, { useState, useEffect } from 'react';
import '../css/JobQueueTable.css';

const JobQueueTable = ({ apiUrl }) => {
  // State for jobs data
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEntries: 0,
    entriesPerPage: 10
  });

  // Dummy data for initial display
  const dummyJobs = [
    {
      id: 1,
      jobType: 'GATE_IN',
      containerNo: 'CAJU6931431',
      containerSize: '20',
      source: 'RJ27084549',
      destination: '018/080 D',
      jobAssignTime: '08-07-2025 18:05:32',
      status: 'pending'
    },
    {
      id: 2,
      jobType: 'GATE_IN',
      containerNo: 'CSNU2375623',
      containerSize: '20',
      source: 'HRS583287',
      destination: '018/074 D',
      jobAssignTime: '08-07-2025 14:27:02',
      status: 'pending'
    },
    {
      id: 3,
      jobType: 'GATE_IN',
      containerNo: 'FFAJJ3984033',
      containerSize: '40',
      source: 'HRS980973',
      destination: '037/011 D',
      jobAssignTime: '08-07-2025 13:21:28',
      status: 'completed'
    },
    {
      id: 4,
      jobType: 'GATE_IN',
      containerNo: 'ONEU2882113',
      containerSize: '20',
      source: 'HRSNY315',
      destination: '002/030 D',
      jobAssignTime: '08-07-2025 13:04:36',
      status: 'pending'
    },
    {
      id: 5,
      jobType: 'GATE_IN',
      containerNo: 'HLBUH189286',
      containerSize: '40',
      source: 'HRSSU6394',
      destination: '037/090 D',
      jobAssignTime: '08-07-2025 12:34:26',
      status: 'completed'
    },
    {
      id: 6,
      jobType: 'GATE_IN',
      containerNo: 'MEDU8249540',
      containerSize: '40',
      source: 'HR4008932',
      destination: '037/007 D',
      jobAssignTime: '08-07-2025 12:26:00',
      status: 'pending'
    }
  ];

  // Fetch data from API or use dummy data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (apiUrl) {
          // Real API call
          const response = await fetch(`${apiUrl}?page=${pagination.currentPage}`);
          const data = await response.json();
          setJobs(data.jobs);
          setPagination({
            ...pagination,
            totalPages: data.totalPages,
            totalEntries: data.totalCount
          });
        } else {
          // Use dummy data with simulated delay
          setTimeout(() => {
            setJobs(dummyJobs);
            setPagination({
              ...pagination,
              totalPages: 1,
              totalEntries: dummyJobs.length
            });
          }, 800);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [apiUrl, pagination.currentPage]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, currentPage: newPage });
    }
  };

  // Toggle job status
  const toggleJobStatus = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'completed' ? 'pending' : 'completed' } 
        : job
    ));
  };

  // Filter jobs based on completed status
  const [showCompleted, setShowCompleted] = useState(false);
  const filteredJobs = showCompleted 
    ? jobs.filter(job => job.status === 'completed')
    : jobs;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="job-queue-container">
      <div className="header-section">
        <h1 className="title">Job in Queue</h1>
        
        <div className="filter-section">
          <div className="completed-toggle">
            <label className="toggle-label">
              <input 
                type="checkbox" 
                checked={showCompleted}
                onChange={() => setShowCompleted(!showCompleted)}
                className="toggle-checkbox"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Show Completed</span>
            </label>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search container no..."
              className="search-input"
              // You would implement search functionality here
            />
            <button className="search-button">
              <i className="search-icon">🔍</i>
            </button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="job-queue-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>JOB TYPE</th>
              <th>CONTAINER NO.</th>
              <th>CONTAINER SIZE</th>
              <th>SOURCE</th>
              <th>DESTINATION</th>
              <th>JOB ASSIGN TIME</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id} className={`table-row ${job.status}`}>
                  <td>{job.id}</td>
                  <td>
                    <span className={`job-type-badge ${job.jobType.toLowerCase()}`}>
                      {job.jobType}
                    </span>
                  </td>
                  <td className="container-no">{job.containerNo}</td>
                  <td>{job.containerSize}</td>
                  <td>{job.source}</td>
                  <td>{job.destination}</td>
                  <td>{job.jobAssignTime}</td>
                  <td>
                    <span className={`status-badge ${job.status}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={`action-button ${job.status === 'completed' ? 'undo' : 'complete'}`}
                      onClick={() => toggleJobStatus(job.id)}
                    >
                      {job.status === 'completed' ? 'Undo' : 'Complete'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data-row">
                <td colSpan="9" className="no-data-message">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="showing-entries">
          Showing {(pagination.currentPage - 1) * pagination.entriesPerPage + 1} to{' '}
          {Math.min(pagination.currentPage * pagination.entriesPerPage, pagination.totalEntries)} of{' '}
          {pagination.totalEntries} entries
        </span>
        <div className="pagination-buttons">
          <button 
            className={`pagination-button ${pagination.currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
            let pageNum;
            if (pagination.totalPages <= 5) {
              pageNum = i + 1;
            } else if (pagination.currentPage <= 3) {
              pageNum = i + 1;
            } else if (pagination.currentPage >= pagination.totalPages - 2) {
              pageNum = pagination.totalPages - 4 + i;
            } else {
              pageNum = pagination.currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                className={`pagination-button ${pagination.currentPage === pageNum ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
            <span className="pagination-ellipsis">...</span>
          )}
          {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
            <button
              className="pagination-button"
              onClick={() => handlePageChange(pagination.totalPages)}
            >
              {pagination.totalPages}
            </button>
          )}
          <button 
            className={`pagination-button ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobQueueTable;