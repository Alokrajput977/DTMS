import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import {
  FaTruckLoading, FaClock, FaChartBar, FaBoxes,
  FaShippingFast, FaTruck, FaWarehouse,
  FaArrowDown, FaArrowUp, FaCalendarAlt,
  FaChartLine, FaSortAmountDown
} from 'react-icons/fa';
import { GiCargoShip } from 'react-icons/gi';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';
import '../css/TransactionOverview.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const iconMap = {
  FaTruckLoading: <FaTruckLoading size={28} className="modern-icon" />,
  FaClock: <FaClock size={28} className="modern-icon" />,
  FaChartBar: <FaChartBar size={28} className="modern-icon" />,
};

const Dashboard = () => {
  const [showCards, setShowCards] = useState(false);
  const [showTransactionOverview, setShowTransactionOverview] = useState(false);
  const [showTeuOverview, setShowTeuOverview] = useState(false);
  const [showWeeklyOverview, setShowWeeklyOverview] = useState(false);
  const [showGraphs, setShowGraphs] = useState(false);
  const [showRecentTransactions, setShowRecentTransactions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 200);
    const timerOverview = setTimeout(() => setShowTransactionOverview(true), 400);
    const timerTeu = setTimeout(() => setShowTeuOverview(true), 600);
    const timerWeekly = setTimeout(() => setShowWeeklyOverview(true), 800);
    const timerGraphs = setTimeout(() => setShowGraphs(true), 1000);
    const timerTransactions = setTimeout(() => setShowRecentTransactions(true), 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(timerOverview);
      clearTimeout(timerTeu);
      clearTimeout(timerWeekly);
      clearTimeout(timerGraphs);
      clearTimeout(timerTransactions);
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

  const weeklyData = {
    eximInTrucks: 2837,
    eximInContainer: 849,
    eximOutTrucks: 2192,
    eximOutContainer: 1201,
    dateRange: 'Since 02-07-2025 00:00:00 to 08-07-2025 00:00:00'
  };

  // Recent transactions data from the screenshot
  const recentTransactions = {
    eximIn: [
      { id: 1, vehicleNo: 'D.L.I.AO1067', containerNo: 'F250709013', time: '08-07-2025 11:30:56', gate: 5 },
      { id: 2, vehicleNo: 'D.L.M8641', containerNo: 'F250709001', time: '08-07-2025 11:30:26', gate: 4 },
      { id: 3, vehicleNo: 'D.L.I.AO2141', containerNo: 'C250707183', time: '08-07-2025 11:30:12', gate: 5 },
      { id: 4, vehicleNo: 'D.L.I.AO1833', containerNo: 'C250707024', time: '08-07-2025 11:28:47', gate: 4 },
      { id: 5, vehicleNo: 'D.L.I.VD159', containerNo: 'C250709031', time: '08-07-2025 11:27:50', gate: 5 }
    ],
    eximOut: [
      { id: 1, vehicleNo: 'D.L.I.MA1551', containerNo: 'C250709006', time: '08-07-2025 11:28:31', gate: 1 },
      { id: 2, vehicleNo: 'D.L.I.VS600', containerNo: 'F250707058', time: '08-07-2025 11:28:23', gate: 3 },
      { id: 3, vehicleNo: 'D.L.I.VG818', containerNo: 'C250708007', time: '08-07-2025 11:26:51', gate: 3 },
      { id: 4, vehicleNo: 'D.L.I.VV7900', containerNo: 'F250708001', time: '08-07-2025 11:26:08', gate: 1 },
      { id: 5, vehicleNo: 'D.L.I.AO6533', containerNo: 'C250707231', time: '08-07-2025 11:25:21', gate: 3 }
    ]
  };

  // Chart data for EXIM IN/OUT
  const eximChartData = {
    labels: ['Cargo', 'Loaded Container', 'Empty Container', 'Truck'],
    datasets: [
      {
        label: 'EXIM IN',
        data: [
          transactionData.eximIn.cargo,
          transactionData.eximIn.lContainer,
          transactionData.eximIn.eContainer,
          transactionData.eximIn.eTruck
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'EXIM OUT',
        data: [
          transactionData.eximOut.cargo,
          transactionData.eximOut.lContainer,
          transactionData.eximOut.eContainer,
          transactionData.eximOut.eTruck
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Weekly trend data
  const weeklyTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'EXIM IN',
        data: [320, 340, 280, 410, 390, 370, 350],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'EXIM OUT',
        data: [290, 310, 350, 380, 400, 420, 450],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.3,
        fill: true
      },
    ],
  };



  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Transaction Trend',
      },
    },
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

  const WeeklyOverviewCard = () => (
    <Card className={`mt-4 ${showWeeklyOverview ? 'show' : ''}`}>
      <Card.Body className="p-4">
        <div className="dashboard-header mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-light text-primary fs-3">
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
                <span className="">
                  {weeklyData.dateRange}
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
                <h2 className="display-8 fw-light mb-0">{weeklyData.eximInTrucks.toLocaleString()}</h2>
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
                <h2 className="display-8 fw-light mb-0">{weeklyData.eximInContainer.toLocaleString()}</h2>
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
                <h2 className="display-8 fw-light  mb-0">{weeklyData.eximOutTrucks.toLocaleString()}</h2>
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
                <h2 className="  display-8 fw-light mb-0">{weeklyData.eximOutContainer.toLocaleString()}</h2>
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
      </Card.Body>
    </Card>
  );

  const RecentTransactionsCard = ({ transactions, title, icon, color }) => (
    <Card className={`mb-4 shadow-sm ${showRecentTransactions ? 'show' : ''}`} style={{ border: 'none', borderRadius: '10px' }}>
  <Card.Header className="bg-primary text-white" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
    <div className="d-flex align-items-center">
      {icon}
      <h5 className="mb-0 ms-2 fw-semibold">{title}</h5>
      <span className="badge bg-light text-primary ms-auto">{transactions.length} entries</span>
    </div>
  </Card.Header>
  <Card.Body className="p-0">
    <div className="table-responsive">
      <Table hover className="mb-0" style={{ minWidth: '600px' }}>
        <thead className="bg-light">
          <tr>
            <th style={{ width: '60px' }} className='fw-semibold text-secondary'>SN.</th>
            <th className='fw-semibold text-secondary'>VEHICLE NO.</th>
            <th className='fw-semibold text-secondary'>CONTAINER/CRM NO.</th>
            <th className='fw-semibold text-secondary'>TIME</th>
            <th className='fw-semibold text-secondary'>GATE</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={txn.id} className={index % 2 === 0 ? '' : 'bg-light'}>
              <td className="text-muted">{index + 1}</td>
              <td>
                <span className="fw-medium">{txn.vehicleNo}</span>
              </td>
              <td>
                <span className="badge bg-info bg-opacity-10 text-info">{txn.containerNo}</span>
              </td>
              <td className="text-muted">
                <i className="bi bi-clock me-1"></i> {txn.time}
              </td>
              <td>
                <span className="badge bg-success bg-opacity-10 text-success">{txn.gate}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </Card.Body>
  <Card.Footer className="bg-light text-muted small" style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
    Last updated: {new Date().toLocaleString()}
  </Card.Footer>
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

      {/* Weekly Overview Section */}
      <WeeklyOverviewCard />

      {/* Recent Transactions Section */}
      <Row className={`mt-4 ${showRecentTransactions ? 'show' : ''}`}>
        <Col md={6}>
          <RecentTransactionsCard
            transactions={recentTransactions.eximIn}
            title="Recent EXIM IN Transactions"
            icon={<FaArrowDown />}
            color="primary"
          />
        </Col>
        <Col md={6}>
          <RecentTransactionsCard
            transactions={recentTransactions.eximOut}
            title="Recent EXIM OUT Transactions"
            icon={<FaArrowUp />}
            color="danger"
          />
        </Col>
      </Row>
      {/* Data Visualization Section */}
      <Row className={`g-4 mt-4 ${showGraphs ? 'show' : ''}`}>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <FaChartBar className="me-2" />
                Transaction Distribution
              </h5>
            </Card.Header>
            <Card.Body>
              <Bar data={eximChartData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">
                <FaChartLine className="me-2" />
                Weekly Transaction Trend
              </h5>
            </Card.Header>
            <Card.Body>
              <Line data={weeklyTrendData} options={lineChartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>



    </div>
  );
};

export default Dashboard;