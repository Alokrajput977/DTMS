import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaTruckLoading, FaClock, FaChartBar } from 'react-icons/fa';

const iconMap = {
  FaTruckLoading: <FaTruckLoading size={28} className="modern-icon" />,
  FaClock: <FaClock size={28} className="modern-icon" />,
  FaChartBar: <FaChartBar size={28} className="modern-icon" />,
};

const Cards = ({ isSidebarOpen, cardData }) => {
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 400);
    return () => clearTimeout(timer);
  }, [isSidebarOpen]);

  const cardClass = `modern-dashboard-card ${showCards ? 'show' : ''}`;

  return (
    <Row
      className="g-4 px-3 pt-4"
      style={{
        marginLeft: isSidebarOpen ? '10px' : '6px',
        transition: 'margin-left 0.5s ease',
      }}
    >
      {cardData.map((card, idx) => (
        <Col md={4} key={idx}>
          <Card className={cardClass}>
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
  );
};

export default Cards;
