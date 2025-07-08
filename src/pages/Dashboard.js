import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaTruckLoading, FaClock, FaChartBar, FaBoxes, FaShippingFast, FaTruck, FaWarehouse, FaArrowDown, FaArrowUp, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import '../css/TransactionOverview.css'; // Ensure this CSS is applied

const iconMap = {
  FaTruckLoading: <FaTruckLoading size={28} className="modern-icon" />,
  FaClock: <FaClock size={28} className="modern-icon" />,
  FaChartBar: <FaChartBar size={28} className="modern-icon" />,
};

const Dashboard = () => {
  const [showCards, setShowCards] = useState(false);
  const [showTransactionOverview, setShowTransactionOverview] = useState(false);
  const [showTeuOverview, setShowTeuOverview] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 200);
    const timerOverview = setTimeout(() => setShowTransactionOverview(true), 400);
    const timerTeu = setTimeout(() => setShowTeuOverview(true), 600);
    return () => {
      clearTimeout(timer);
      clearTimeout(timerOverview);
      clearTimeout(timerTeu);
    };
  }, []);


  const cardData = [
    {
      icon: 'FaTruckLoading',
      title: 'Gate Dashboard Entries',
      subtext: 'Since 2025-07-06 00:00:00 to 23:59:59',
      value: '482',
    },
    {
      icon: 'FaClock',
      title: 'Avg. Turnaround Time',
      subtext: 'Since 2025-07-06 00:00:00 to 23:59:59',
      value: '92 Minutes',
    },
    {
      icon: 'FaChartBar',
      title: 'Weekly Overview',
      subtext: 'From 01-07-2025 to 07-07-2025',
      value: '7,720',
    },
  ];

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

  const teuData = {
    daily: {
      date: '2025-07-06',
      range: 'Since 2025-07-06 00:00:00 to 23:59:59',
      eximIn: 191,
      eximOut: 232,
      eximInChange: '+12%',
      eximOutChange: '+5%'
    },
    weekly: {
      dateRange: '01-07-2025 to 07-07-2025',
      range: 'Since 01-07-2025 00:00:00 to 07-07-2025 00:00:00',
      eximIn: 1457,
      eximOut: 2157,
      eximInChange: '+8%',
      eximOutChange: '+15%'
    }
  };

  const TeuCard = ({ title, icon, date, range, eximIn, eximOut, eximInChange, eximOutChange, isWeekly = false }) => (
    <Card className={`teu-card ${showTeuOverview ? 'show' : ''}`}>
      <Card.Body>
        <div className="teu-header">
          <div className="teu-title">
            {icon}
            <span>{title}</span>
          </div>
          <div className="teu-badge">
            {date}
          </div>
        </div>
        
        <p className="teu-subtitle">{range}</p>
        
        <Row className="teu-stats-row">
          <Col md={6} className="mb-4">
            <div className="teu-stat-card in">
              <div className="teu-stat-header">
                <FaArrowDown className="me-2" />
                <span>EXIM IN (TOTAL)</span>
              </div>
              <div className="teu-stat-value">
                {eximIn.toLocaleString()}
                <span className={`teu-change ${eximInChange.startsWith('+') ? 'positive' : 'negative'}`}>
                  {eximInChange}
                </span>
              </div>
            </div>
          </Col>
          
          <Col md={6} className="mb-4">
            <div className="teu-stat-card out">
              <div className="teu-stat-header">
                <FaArrowUp className="me-2" />
                <span>EXIM OUT (TOTAL)</span>
              </div>
              <div className="teu-stat-value">
                {eximOut.toLocaleString()}
                <span className={`teu-change ${eximOutChange.startsWith('+') ? 'positive' : 'negative'}`}>
                  {eximOutChange}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  return (
    <div className="container-fluid p-4 dashboard-container">
      {/* Dashboard Cards Section */}
      <Row className="g-4 px-3 pt-4 cards-section">
        {cardData.map((card, idx) => (
          <Col md={4} key={idx} className="card-col">
            <Card className={`card-item ${showCards ? 'show' : ''}`}>
              <Card.Body>
                <div className="modern-icon-wrapper">
                  {iconMap[card.icon]}
                </div>
                <div className="modern-title">{card.title}</div>
                <div className="modern-subtext">{card.subtext}</div>
                <div className="modern-value">{card.value}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Transaction Overview Section */}
      <Card className={`mt-4 transaction-overview ${showTransactionOverview ? 'show' : ''}`}>
        <Card.Body className="p-4">
          <Row className="align-items-center mb-3">
            <Col md={8}>
              <h4 className="mb-0 text-gradient transaction-header">
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
            <Col md={6} className="stats-col">
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
            <Col md={6} className="stats-col">
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

      {/* TEU Overview Section */}
      <Row className="g-4 mt-4">
        <Col md={6}>
          <TeuCard
            title="2025-07-06 TEU's Transactions Overview"
            icon={<FaCalendarAlt className="me-2" />}
            date={teuData.daily.date}
            range={teuData.daily.range}
            eximIn={teuData.daily.eximIn}
            eximOut={teuData.daily.eximOut}
            eximInChange={teuData.daily.eximInChange}
            eximOutChange={teuData.daily.eximOutChange}
          />
        </Col>
        <Col md={6}>
          <TeuCard
            title="Last 7 Days TEU's Transactions Overview"
            icon={<FaChartLine className="me-2" />}
            date={teuData.weekly.dateRange}
            range={teuData.weekly.range}
            eximIn={teuData.weekly.eximIn}
            eximOut={teuData.weekly.eximOut}
            eximInChange={teuData.weekly.eximInChange}
            eximOutChange={teuData.weekly.eximOutChange}
            isWeekly={true}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;