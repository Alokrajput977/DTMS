// src/components/GateInEIRReports.jsx
import React, { useState } from 'react';
import '../css/GateInEIRReports.css';
import { FaArrowRight } from 'react-icons/fa';

const GateInEIRReports = () => {
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [gateFilter, setGateFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [appliedRange, setAppliedRange] = useState({ from: null, to: null });
    const itemsPerPage = 10;

    // Sample data
    const reportsData = [
        { id: 1, category: 'IN', containerNo: 'GAOU2532385', containerSize: '20', vehicleNo: 'NLOIA01557', gateNo: '2', createdAt: '2025-07-07T13:30:56' },
        { id: 2, category: 'IN', containerNo: 'BAXU5053290', containerSize: '40', vehicleNo: 'HRSW6192', gateNo: '3', createdAt: '2025-07-02T22:59:01' },
        { id: 3, category: 'IN', containerNo: 'FTAUS67849', containerSize: '40', vehicleNo: 'HR726926', gateNo: '3', createdAt: '2025-05-29T15:58:06' },
        { id: 4, category: 'IN', containerNo: 'HDMI6362138', containerSize: '40', vehicleNo: 'NLOIA57752', gateNo: '2', createdAt: '2025-05-07T17:29:47' },
        { id: 5, category: 'IN', containerNo: 'PCUI2186255', containerSize: '20', vehicleNo: 'HR3586084', gateNo: '3', createdAt: '2025-05-06T15:54:01' },
        { id: 6, category: 'IN', containerNo: 'HLBU2723195', containerSize: '40', vehicleNo: 'HR4703035', gateNo: '2', createdAt: '2025-04-30T04:09:02' },
        { id: 7, category: 'IN', containerNo: 'CARU2747020', containerSize: '20', vehicleNo: 'GJ397A3684', gateNo: '2', createdAt: '2025-04-29T15:44:24' },
        { id: 8, category: 'IN', containerNo: 'SUOUB557922', containerSize: '40', vehicleNo: 'HR38AC1639', gateNo: '4', createdAt: '2025-04-25T16:11:18' },
        { id: 9, category: 'OUT', containerNo: 'TGHU7896541', containerSize: '20', vehicleNo: 'MH01AB1234', gateNo: '1', createdAt: '2025-04-20T10:22:33' },
        { id: 10, category: 'IN', containerNo: 'KLMB4561237', containerSize: '40', vehicleNo: 'DL2CDF5678', gateNo: '3', createdAt: '2025-04-15T08:45:12' },
        { id: 11, category: 'IN', containerNo: 'GAOU2532385', containerSize: '20', vehicleNo: 'NLOIA01557', gateNo: '2', createdAt: '2025-07-07T13:30:56' },
        { id: 12, category: 'IN', containerNo: 'BAXU5053290', containerSize: '40', vehicleNo: 'HRSW6192', gateNo: '3', createdAt: '2025-07-02T22:59:01' },
        { id: 13, category: 'IN', containerNo: 'FTAUS67849', containerSize: '40', vehicleNo: 'HR726926', gateNo: '3', createdAt: '2025-05-29T15:58:06' },
        { id: 14, category: 'IN', containerNo: 'HDMI6362138', containerSize: '40', vehicleNo: 'NLOIA57752', gateNo: '2', createdAt: '2025-05-07T17:29:47' },
        { id: 15, category: 'IN', containerNo: 'PCUI2186255', containerSize: '20', vehicleNo: 'HR3586084', gateNo: '3', createdAt: '2025-05-06T15:54:01' },
        { id: 16, category: 'IN', containerNo: 'HLBU2723195', containerSize: '40', vehicleNo: 'HR4703035', gateNo: '2', createdAt: '2025-04-30T04:09:02' },
        { id: 17, category: 'IN', containerNo: 'CARU2747020', containerSize: '20', vehicleNo: 'GJ397A3684', gateNo: '2', createdAt: '2025-04-29T15:44:24' },
        { id: 18, category: 'IN', containerNo: 'SUOUB557922', containerSize: '40', vehicleNo: 'HR38AC1639', gateNo: '4', createdAt: '2025-04-25T16:11:18' },
        { id: 19, category: 'OUT', containerNo: 'TGHU7896541', containerSize: '20', vehicleNo: 'MH01AB1234', gateNo: '1', createdAt: '2025-04-20T10:22:33' },
        { id: 20, category: 'IN', containerNo: 'KLMB4561237', containerSize: '40', vehicleNo: 'DL2CDF5678', gateNo: '3', createdAt: '2025-04-15T08:45:12' },
        // ... (keep other data same, convert dates to ISO format like above)
    ];

    const filteredData = reportsData.filter(report => {
        const reportDate = new Date(report.createdAt);
        const matchesCategory = categoryFilter === 'All' || report.category === categoryFilter;
        const matchesGate = gateFilter === 'All' || report.gateNo === gateFilter;
        const matchesSearch = searchTerm === '' ||
            report.containerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = !appliedRange.from || !appliedRange.to ||
            (reportDate >= appliedRange.from && reportDate <= appliedRange.to);

        return matchesCategory && matchesGate && matchesSearch && matchesDate;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handleApplyDate = () => {
        if (fromDate && toDate && new Date(fromDate) <= new Date(toDate)) {
            setAppliedRange({ from: new Date(fromDate), to: new Date(toDate) });
            setCurrentPage(1);
        } else {
            alert('Please select a valid From/To range');
        }
    };

    return (
        <div className="app-container">
            <div className="report-container">
                <div className="header-section">
                    <button className="gate-in-btn">Gate In</button>
                    <h2 className="header-title">EIR Reports</h2>
                </div>

                <div className="filters-container">
                    {/* Category Filter */}
                    <div className="filter-group">
                        <select id="category" value={categoryFilter}
                            onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}>
                            <option value="All">select Gate In/Out Type</option>
                            <option value="IN">Gate IN</option>
                            <option value="OUT">Gate OUT</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div className="filter-group search-group">
                        <input
                            id="search"
                            type="text"
                            placeholder="Container/Vehicle No"
                            value={searchTerm}
                            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                    </div>

                    {/* Date + Time Pickers */}
                    <div className="date-picker-group">
                        <input type="datetime-local" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                    </div>

                    {/* Buttons */}
                    <button className="reload-btn" onClick={() => {
                        setCategoryFilter('All');
                        setGateFilter('All');
                        setSearchTerm('');
                        setFromDate('');
                        setToDate('');
                        setAppliedRange({ from: null, to: null });
                        setCurrentPage(1);
                    }}>
                        ↻ Reload
                    </button>
                    <button className="apply-btn" onClick={handleApplyDate}>
                        Apply <FaArrowRight />
                    </button>
                </div>

                {/* Table */}
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Category</th>
                                <th>Container No</th>
                                <th>Size</th>
                                <th>Vehicle No</th>
                                <th>Gate No</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((r, i) => (
                                <tr key={r.id}>
                                    <td>{indexOfFirstItem + i + 1}</td>
                                    <td>{r.category}</td>
                                    <td>{r.containerNo}</td>
                                    <td>{r.containerSize}</td>
                                    <td>{r.vehicleNo}</td>
                                    <td>{r.gateNo}</td>
                                    <td>{new Date(r.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button className="view-btn" onClick={() => alert(`Viewing ${r.id}`)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="pagination-container">
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 1}
                    >Previous</button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                        <button
                            key={n}
                            className={`pagination-btn${currentPage === n ? ' active' : ''}`}
                            onClick={() => setCurrentPage(n)}
                        >{n}</button>
                    ))}

                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >Next</button>
                </div>
            </div>
        </div>
    );
};

export default GateInEIRReports;
