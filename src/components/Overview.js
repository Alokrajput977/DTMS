import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import '../css/TEUOverview.css';

const TEUOverview = () => {
  const dailyData = {
    date: '2025-07-06',
    range: 'Since 2025-07-06 00:00:00 to 23:59:59',
    eximIn: 191,
    eximOut: 232,
    eximInChange: '+12%',
    eximOutChange: '+5%'
  };

  const weeklyData = {
    dateRange: '01-07-2025 to 07-07-2025',
    range: 'Since 01-07-2025 00:00:00 to 07-07-2025 00:00:00',
    eximIn: 1457,
    eximOut: 2157,
    eximInChange: '+8%',
    eximOutChange: '+15%'
  };

  return (
    <div className="teu-overview-container">
      <Row className="g-4">
        {/* Daily TEU Overview */}
        <Col md={6}>
          <Card className="teu-card">
            <Card.Body>
              <div className="teu-header">
                <div className="teu-title">
                  <FaCalendarAlt className="me-2" />
                  <span>2025-07-06 TEU's Transactions Overview</span>
                </div>
                <div className="teu-badge">
                  {dailyData.date}
                </div>
              </div>
              
              <p className="teu-subtitle">{dailyData.range}</p>
              
              <Row className="teu-stats-row">
                <Col md={6} className="mb-4">
                  <div className="teu-stat-card in">
                    <div className="teu-stat-header">
                      <FaArrowDown className="me-2" />
                      <span>EXIM IN (TOTAL)</span>
                    </div>
                    <div className="teu-stat-value">
                      {dailyData.eximIn}
                      <span className="teu-change positive">
                        {dailyData.eximInChange}
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
                      {dailyData.eximOut}
                      <span className="teu-change positive">
                        {dailyData.eximOutChange}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Weekly TEU Overview */}
        <Col md={6}>
          <Card className="teu-card">
            <Card.Body>
              <div className="teu-header">
                <div className="teu-title">
                  <FaChartLine className="me-2" />
                  <span>Last 7 Days TEU's Transactions Overview</span>
                </div>
                <div className="teu-badge">
                  {weeklyData.dateRange}
                </div>
              </div>
              
              <p className="teu-subtitle">{weeklyData.range}</p>
              
              <Row className="teu-stats-row">
                <Col md={6} className="mb-4">
                  <div className="teu-stat-card in">
                    <div className="teu-stat-header">
                      <FaArrowDown className="me-2" />
                      <span>EXIM IN (TOTAL)</span>
                    </div>
                    <div className="teu-stat-value">
                      {weeklyData.eximIn}
                      <span className="teu-change positive">
                        {weeklyData.eximInChange}
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
                      {weeklyData.eximOut}
                      <span className="teu-change positive">
                        {weeklyData.eximOutChange}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TEUOverview;