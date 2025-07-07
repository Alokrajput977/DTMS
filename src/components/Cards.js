import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaTruck, FaBox, FaDatabase } from 'react-icons/fa'; // Icons

const Cards = () => {
  return (
    <Row className="g-4">
      <Col md={4}>
        <Card className="shadow border-0 rounded card-custom">
          <Card.Body>
            <div className="icon-container">
              <FaTruck size={50} className="card-icon" />
            </div>
            <Card.Title className="card-title">EXIM IN (TOTAL)</Card.Title>
            <Card.Text className="card-value">231</Card.Text>
            <Card.Footer className="card-footer">
              <small>Since 2025-07-06</small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={4}>
        <Card className="shadow border-0 rounded card-custom">
          <Card.Body>
            <div className="icon-container">
              <FaBox size={50} className="card-icon" />
            </div>
            <Card.Title className="card-title">EXIM OUT (TOTAL)</Card.Title>
            <Card.Text className="card-value">251</Card.Text>
            <Card.Footer className="card-footer">
              <small>Since 2025-07-06</small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={4}>
        <Card className="shadow border-0 rounded card-custom">
          <Card.Body>
            <div className="icon-container">
              <FaDatabase size={50} className="card-icon" />
            </div>
            <Card.Title className="card-title">Average Truck Turnaround Time</Card.Title>
            <Card.Text className="card-value">92 Minutes</Card.Text>
            <Card.Footer className="card-footer">
              <small>Since 2025-07-06</small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Cards;
