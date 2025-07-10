import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import './EximGateSystem.css';
import VisualEvidenceModal from './VisualEvidence';


const EximGateSystem = () => {
  const [activeTab, setActiveTab] = useState('inGate');
  

  // Sample data for demonstration
  const containerData = {
    inGate: [
      {
        id: 1,
        containerNumber: 'F250710043',
        isoCode: '--',
        containerSize: '--',
        vehicleNo: 'DL10C9218',
        visualEvidence: 'Surveyed Info',
        surveyed: true
      },
      {
        id: 2,
        containerNumber: 'C250709104',
        isoCode: 'D1U6E0386',
        containerSize: '20ft',
        vehicleNo: 'MH05AB1234',
        visualEvidence: 'Surveyed Info',
        surveyed: true
      },
      {
        id: 3,
        containerNumber: 'G45070123',
        isoCode: 'D2U7E0456',
        containerSize: '40ft',
        vehicleNo: 'DL10C9218',
        visualEvidence: 'Surveyed Info',
        surveyed: false
      },
      {
        id: 4,
        containerNumber: 'H35070567',
        isoCode: 'D3U8E0567',
        containerSize: '40ft',
        vehicleNo: 'KA03CD5678',
        visualEvidence: 'Surveyed Info',
        surveyed: true
      }
    ],
    outGate: [
      {
        id: 1,
        containerNumber: 'O35071234',
        isoCode: 'D4U9E0678',
        containerSize: '20ft',
        vehicleNo: 'DL10C9218',
        visualEvidence: 'Surveyed Info',
        surveyed: true
      },
      {
        id: 2,
        containerNumber: 'P45071567',
        isoCode: 'D5U0E0789',
        containerSize: '40ft',
        vehicleNo: 'MH05AB1234',
        visualEvidence: 'Surveyed Info',
        surveyed: true
      }
    ]
  };
    const [showModal, setShowModal] = useState(false);

  const currentData = activeTab === 'inGate' ? containerData.inGate : containerData.outGate;

  return (
    <div className="exim-gate-system">
      <div className="header">
        <h1>EXIM IN GATE</h1>
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'inGate' ? 'active in-gate-btn' : 'in-gate-btn'}`}
            onClick={() => setActiveTab('inGate')}
          >
            EXIM IN GATE
          </button>
          <button
            className={`tab-btn ${activeTab === 'outGate' ? 'active out-gate-btn' : 'out-gate-btn'}`}
            onClick={() => setActiveTab('outGate')}
          >
            EXIM OUT GATE
          </button>
        </div>
      </div>

      <div className="cards-container">
        {currentData.map((container) => (
          <div key={container.id} className="gate-card">
            <div className="card-header">
              <div className="header-column survey-element">SURVEY ELEMENT</div>
              <div className="header-column system-value">SYSTEM VALUE</div>
              <div className="header-column inferred-value">INFERRED VALUE</div>
            </div>

            <div className="card-row">
              <div className="row-label">Container Number</div>
              <div className="row-value">{container.containerNumber}</div>
              <div className="row-inferred">--</div>
            </div>

            <div className="card-row">
              <div className="row-label">ISO Code</div>
              <div className="row-value">{container.isoCode}</div>
              <div className="row-inferred">--</div>
            </div>

            <div className="card-row">
              <div className="row-label">Container Size</div>
              <div className="row-value">{container.containerSize}</div>
              <div className="row-inferred">--</div>
            </div>

            <div className="card-row">
              <div className="row-label">Vehicle No.</div>
              <div className="row-value">{container.vehicleNo}</div>
              <div className="row-inferred">{container.vehicleNo}</div>
            </div>

            <div className="card-row last-row">
              <div
                className="row-label facility"
                onClick={() => setShowModal(true)}
              >
                Visual Evidence
              </div>
              <div className="row-value visual-evidence">
                <FaEye className="eye-icon" /> {container.visualEvidence}
              </div>
              <div className="row-inferred"></div>
            </div>

          </div>
        ))}
      </div>
      {showModal && <VisualEvidenceModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default EximGateSystem;