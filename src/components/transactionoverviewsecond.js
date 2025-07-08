import React from 'react';
import { FaTruck, FaShippingFast, FaCalendarAlt, FaSortAmountDown } from 'react-icons/fa';
import { GiCargoShip } from 'react-icons/gi';

const TransactionOverviewsecond = () => {
  return (
    <div className="container py-4">
      <div className="dashboard-header mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold text-primary">
            <FaTruck className="me-2" />
            Last 7 Days Transactions Overview
          </h2>
          <div className="d-flex align-items-center">
            <span className="me-3 text-muted">
              <FaSortAmountDown className="me-1" />
              Sort by Weekly
            </span>
            <div className="date-range bg-light p-2 rounded">
              <FaCalendarAlt className="me-2 text-secondary" />
              <span className="fw-semibold">
                Since 02-07-2025 00:00:00 to 08-07-2025 00:00:00
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* EXIM IN TRUCKS */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card border-primary h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title text-primary">EXIM IN TRUCKS</h5>
                <div className="icon-bg bg-primary-light">
                  <FaTruck className="text-primary" size={24} />
                </div>
              </div>
              <h2 className="display-5 fw-bold mb-0">2,837</h2>
              <div className="progress mt-3" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-primary" 
                  role="progressbar" 
                  style={{ width: '75%' }}
                  aria-valuenow="75" 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* EXIM IN CONTAINER */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card border-success h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title text-success">EXIM IN CONTAINER</h5>
                <div className="icon-bg bg-success-light">
                  <GiCargoShip className="text-success" size={24} />
                </div>
              </div>
              <h2 className="display-5 fw-bold mb-0">849</h2>
              <div className="progress mt-3" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  style={{ width: '25%' }}
                  aria-valuenow="25" 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* EXIM OUT TRUCKS */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card border-warning h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title text-warning">EXIM OUT TRUCKS</h5>
                <div className="icon-bg bg-warning-light">
                  <FaShippingFast className="text-warning" size={24} />
                </div>
              </div>
              <h2 className="display-5 fw-bold mb-0">2,192</h2>
              <div className="progress mt-3" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-warning" 
                  role="progressbar" 
                  style={{ width: '60%' }}
                  aria-valuenow="60" 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* EXIM OUT CONTAINER */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card border-info h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title text-info">EXIM OUT CONTAINER</h5>
                <div className="icon-bg bg-info-light">
                  <GiCargoShip className="text-info" size={24} />
                </div>
              </div>
              <h2 className="display-5 fw-bold mb-0">1,201</h2>
              <div className="progress mt-3" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-info" 
                  role="progressbar" 
                  style={{ width: '35%' }}
                  aria-valuenow="35" 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionOverview;