import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { 
  FaBoxes, 
  FaShippingFast, 
  FaTruck, 
  FaWarehouse,
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt
} from 'react-icons/fa';
import '../css/TransactionOverview.css';

const TransactionOverview = ({ isSidebarOpen }) => {
  const [showCards, setShowCards] = useState(false);

  // Sample transaction data
  const transactionData = {
    date: '06/07/2025',
    range: 'Since 2025-07-06 00:00:00 to 23:59:59',
    eximIn: {
      total: 231,
      cargo: 32,
      lContainer: 36,
      eContainer: 79,
      eTruck: 84,
    },
    eximOut: {
      total: 251,
      cargo: 12,
      lContainer: 95,
      eContainer: 38,
      eTruck: 106,
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 400);
    return () => clearTimeout(timer);
  }, [isSidebarOpen]);

  const cardClass = `modern-dashboard-card ${showCards ? 'show' : ''}`;

  return (
    <div className="px-3 pt-4">
      <Card className={`mt-4 ${cardClass}`}>
        <Card.Body className="p-4">
          <Row className="align-items-center mb-3">
            <Col md={8}>
              <h4 className="mb-0 text-gradient">
                <FaCalendarAlt className="me-2" />
                {`2025-07-06 Transaction Overview`}
              </h4>
            </Col>
            <Col md={4} className="text-end">
              <span className="badge bg-light text-dark">
                {transactionData.date}
              </span>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="text-muted mb-4">
                <small>{transactionData.range}</small>
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* EXIM IN Section */}
            <Col md={6}>
              <div className="stats-card in-card">
                <div className="stats-header">
                  <FaArrowDown className="me-2" />
                  <h5 className="mb-0">EXIM IN</h5>
                  <span className="ms-auto total-badge">{transactionData.eximIn.total}</span>
                </div>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-icon bg-purple">
                      <FaBoxes />
                    </div>
                    <div className="stat-info">
                      <small>Cargo</small>
                      <h6>{transactionData.eximIn.cargo}</h6>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon bg-teal">
                      <FaWarehouse />
                    </div>
                    <div className="stat-info">
                      <small>L-Container</small>
                      <h6>{transactionData.eximIn.lContainer}</h6>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon bg-blue">
                      <FaShippingFast />
                    </div>
                    <div className="stat-info">
                      <small>E-Container</small>
                      <h6>{transactionData.eximIn.eContainer}</h6>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon bg-orange">
                      <FaTruck />
                    </div>
                    <div className="stat-info">
                      <small>E-Truck</small>
                      <h6>{transactionData.eximIn.eTruck}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* EXIM OUT Section */}
            <Col md={6}>
              <div className="stats-card out-card">
                <div className="stats-header">
                  <FaArrowUp className="me-2" />
                  <h5 className="mb-0">EXIM OUT</h5>
                  <span className="ms-auto total-badge">{transactionData.eximOut.total}</span>
                </div>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-icon bg-purple">
                      <FaBoxes />
                    </div>
                    <div className="stat-info">
                      <small>Cargo</small>
                      <h6>{transactionData.eximOut.cargo}</h6>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon bg-teal">
                      <FaWarehouse />
                    </div>
                    <div className="stat-info">
                      <small>L-Container</small>
                      <h6>{transactionData.eximOut.lContainer}</h6>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon bg-blue">
                      <FaShippingFast />
                    </div>
                    <div className="stat-info">
                      <small>E-Container</small>
                      <h6>{transactionData.eximOut.eContainer}</h6>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon bg-orange">
                      <FaTruck />
                    </div>
                    <div className="stat-info">
                      <small>E-Truck</small>
                      <h6>{transactionData.eximOut.eTruck}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TransactionOverview;