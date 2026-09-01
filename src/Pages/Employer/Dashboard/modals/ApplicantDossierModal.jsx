import './ApplicantDossierModal.css';

export default function ApplicantDossierModal({ candidate, isOpen, onClose }) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="dossier-backdrop" onClick={onClose}>
      <div className="dossier-container" onClick={(e) => e.stopPropagation()}>
        <div className="dossier-header">
          <div className="header-left">
            <p className="category-label">CANDIDATE DOSSIER</p>
            <h2 className="candidate-title">{candidate.name}</h2>
            <p className="candidate-email">{candidate.email}</p>
          </div>
          <div className="header-right">
            <span className="status-badge">SUBMITTED</span>
          </div>
        </div>

    
        <div className="dossier-content">
          <div className="content-column">
            <h3 className="column-title">APPLICATION</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">ROLE</p>
                <p className="info-value">{candidate.role}</p>
              </div>
              <div className="info-item">
                <p className="info-label">LOCATION</p>
                <p className="info-value">{candidate.location || "Lagos, Nigeria"}</p>
              </div>
              <div className="info-item">
                <p className="info-label">APPLIED</p>
                <p className="info-value">{candidate.appliedTime || "10d ago"}</p>
              </div>
            </div>
          </div>

         
          <div className="content-column">
            <h3 className="column-title">EVIDENCE</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">HEADLINE</p>
                <p className="info-value">{candidate.headline || "Full-Stack Developer"}</p>
              </div>
              <div className="info-item">
                <p className="info-label">SKILLS</p>
                <p className="info-value">{candidate.skills || "Node.js, Express, React, PostgreSQL"}</p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="candidate-record">
          <h3 className="record-title">CANDIDATE RECORD</h3>
          <div className="record-info">
            <div className="record-item">
              <p className="record-label">Education</p>
              <p className="record-value">{candidate.education || "B.Eng. Software Engineering, Covenant University (2024)"}</p>
            </div>
            <div className="record-item">
              <p className="record-label">Work experience</p>
              <p className="record-value">{candidate.workExperience || "Backend Intern, Paykobo (Jan 2024 - Jul 2024)"}</p>
            </div>
          </div>
        </div>

        <div className="dossier-footer">
          <div className="footer-left">
            <button className="action-pill secondary">Read CV</button>
            <button className="action-pill secondary">View activity</button>
          </div>
          <div className="footer-right">
            <button className="action-pill primary">Hire / reject</button>
            <button className="action-pill close" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
