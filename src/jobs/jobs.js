import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/JobQueueTable.css';

const JobQueueTable = ({ apiUrl }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('queue');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'jobAssignTime', direction: 'desc' });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalEntries: 0,
        entriesPerPage: 10
    });

    // Enhanced dummy data with more job types and realistic data
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
            jobType: 'GATE_OUT',
            containerNo: 'FFAJJ3984033',
            containerSize: '40',
            source: 'HRS980973',
            destination: '037/011 D',
            jobAssignTime: '08-07-2025 13:21:28',
            status: 'completed'
        },
        {
            id: 4,
            jobType: 'YARD_MOVE',
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
            jobType: 'YARD_MOVE',
            containerNo: 'MEDU8249540',
            containerSize: '40',
            source: 'HR4008932',
            destination: '037/007 D',
            jobAssignTime: '08-07-2025 12:26:00',
            status: 'pending'
        }
    ];

    // Fetch data function (made available for the reload button)
    const fetchJobs = async () => {
        try {
            setLoading(true);
            if (apiUrl) {
                const response = await fetch(`${apiUrl}?page=${pagination.currentPage}`);
                const data = await response.json();
                setJobs(data.jobs);
                setPagination({
                    ...pagination,
                    totalPages: data.totalPages,
                    totalEntries: data.totalCount
                });
            } else {
                setTimeout(() => {
                    setJobs(dummyJobs);
                    setPagination({
                        ...pagination,
                        totalPages: Math.ceil(dummyJobs.length / pagination.entriesPerPage),
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

       const navigate = useNavigate();

    const handleClick = () => {
        setActiveTab('completed');
        setPagination({ ...pagination, currentPage: 1 });
        navigate('/completed'); // replace with your actual route
    };

    useEffect(() => {
        fetchJobs();
    }, [apiUrl, pagination.currentPage]);

    // Handle search submission
    const handleSearchSubmit = () => {
        setPagination({ ...pagination, currentPage: 1 });
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination({ ...pagination, currentPage: newPage });
        }
    };

    // Request sort
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Sort jobs
    const sortedJobs = [...jobs].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Filter jobs based on active tab and search term
    const filteredJobs = sortedJobs.filter(job => {
        const matchesTab = activeTab === 'queue' ? job.status === 'pending' : job.status === 'completed';
        const matchesSearch = job.containerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.jobType.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Paginate filtered jobs
    const paginatedJobs = filteredJobs.slice(
        (pagination.currentPage - 1) * pagination.entriesPerPage,
        pagination.currentPage * pagination.entriesPerPage
    );

    // View job details
    const viewJobDetails = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedJob(null);
    };

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
                <div className="error-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                </div>
                <p className="error-message">Error loading jobs: {error}</p>
                <button
                    className="retry-button"
                    onClick={() => window.location.reload()}
                >
                    <svg className="retry-icon" viewBox="0 0 24 24">
                        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
                    </svg>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="job-queue-container">
            <div className="header-section">
               

                <div className="controls-section">
                    <div className="tabs-container">
                        <button
                            className={`tab-button ${activeTab === 'queue' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('queue');
                                setPagination({ ...pagination, currentPage: 1 });
                            }}
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

                    <div className="search-section">
                        <div className="search-buttons">
                            <button
                                className="reload-button"
                                onClick={fetchJobs}
                                title="Refresh data"
                            >
                                <svg className="reload-icon" viewBox="0 0 24 24">
                                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                                </svg>
                            </button>

                            <button
                                className="enter-button"
                                onClick={handleSearchSubmit}
                                title="Search"
                            >
                                <svg className="enter-icon" viewBox="0 0 24 24">
                                    <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
                                </svg>
                            </button>
                        </div>

                        <div className="search-input-container">
                            <input
                                type="text"
                                placeholder="Search Container Number"
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                            />
                            {searchTerm && (
                                <button
                                    className="clear-button"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setPagination({ ...pagination, currentPage: 1 });
                                    }}
                                >
                                    <svg className="clear-icon" viewBox="0 0 24 24">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="job-queue-table">
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('id')}>
                                S.NO
                                {sortConfig.key === 'id' && (
                                    <span className="sort-icon">
                                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => requestSort('jobType')}>
                                JOB TYPE
                                {sortConfig.key === 'jobType' && (
                                    <span className="sort-icon">
                                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => requestSort('containerNo')}>
                                CONTAINER NO.
                                {sortConfig.key === 'containerNo' && (
                                    <span className="sort-icon">
                                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => requestSort('containerSize')}>
                                CONTAINER SIZE
                                {sortConfig.key === 'containerSize' && (
                                    <span className="sort-icon">
                                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th>SOURCE</th>
                            <th>DESTINATION</th>
                            <th onClick={() => requestSort('jobAssignTime')}>
                                JOB ASSIGN TIME
                                {sortConfig.key === 'jobAssignTime' && (
                                    <span className="sort-icon">
                                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedJobs.length > 0 ? (
                            paginatedJobs.map((job) => (
                                <tr key={job.id} className={`table-row ${job.status}`} onClick={() => viewJobDetails(job)}>
                                    <td>{job.id}</td>
                                    <td>
                                        <span className={`job-type-badge ${job.jobType.toLowerCase().replace('_', '-')}`}>
                                            {job.jobType.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="container-no">
                                        {job.containerNo}
                                    </td>
                                    <td><span className={`size-badge size-${job.containerSize}`}>{job.containerSize}</span></td>
                                    <td>{job.source}</td>
                                    <td>{job.destination}</td>
                                    <td>{job.jobAssignTime}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className="no-data-row">
                                <td colSpan="7" className="no-data-message">
                                    <svg className="empty-icon" viewBox="0 0 24 24">
                                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h2v5zm0 2h-2v2h2v-2z" />
                                    </svg>
                                    No {activeTab === 'queue' ? 'pending' : 'completed'} jobs found
                                    {searchTerm && (
                                        <button
                                            className="clear-search-button"
                                            onClick={() => setSearchTerm('')}
                                        >
                                            Clear search
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination-container">
                <div className="showing-entries">
                    Showing {(pagination.currentPage - 1) * pagination.entriesPerPage + 1} to{' '}
                    {Math.min(pagination.currentPage * pagination.entriesPerPage, filteredJobs.length)} of{' '}
                    {filteredJobs.length} entries
                </div>
                <div className="pagination-controls">
                    <button
                        className={`pagination-button prev ${pagination.currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                    >
                        Previous
                    </button>

                    <div className="page-numbers">
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
                    </div>

                    <button
                        className={`pagination-button next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Job Details Modal */}
            {showModal && selectedJob && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2 className={{ TextAlign: 'center' }}>Job Details</h2>
                            <button className="modal-close" onClick={closeModal}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="detail-row">
                                <span className="detail-label">Job Type:</span>
                                <span className={`detail-value job-type-badge ${selectedJob.jobType.toLowerCase().replace('_', '-')}`}>
                                    {selectedJob.jobType.replace('_', ' ')}
                                </span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Container No:</span>
                                <span className="detail-value">{selectedJob.containerNo}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Size:</span>
                                <span className={`detail-value size-badge size-${selectedJob.containerSize}`}>
                                    {selectedJob.containerSize}
                                </span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Source:</span>
                                <span className="detail-value">{selectedJob.source}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Destination:</span>
                                <span className="detail-value">{selectedJob.destination}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Assigned Time:</span>
                                <span className="detail-value">{selectedJob.jobAssignTime}</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-close-button" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobQueueTable;