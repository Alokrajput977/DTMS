import React from 'react';
import '../css/VisualEvidenceModal.css';

const VisualEvidenceModal = ({ onClose }) => {
  return (
    <div className="vem-overlay" onClick={onClose}>
      <div className="vem-content" onClick={e => e.stopPropagation()}>
        <header className="vem-header">
          <h2>Visual Evidence</h2>
          <button className="vem-close" onClick={onClose}>&times;</button>
        </header>

        <div className="vem-body">
          <div className="vem-grid">
            <EvidenceCard title="Container Number" />
            <EvidenceCard title="ISO Code" />
            <EvidenceCard title="Vehicle No" />
          </div>
        </div>

        <footer className="vem-footer">
          <button className="vem-btn" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
};

const EvidenceCard = ({ title }) => (
  <div className="vem-card">
    <div className="vem-placeholder">
      <i className="bi bi-image" />
      <p>No image</p>
    </div>
    <div className="vem-title">{title}</div>
  </div>
);

export default VisualEvidenceModal;
