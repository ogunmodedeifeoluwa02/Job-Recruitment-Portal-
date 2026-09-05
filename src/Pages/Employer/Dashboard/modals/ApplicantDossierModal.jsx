import { Link } from 'react-router';
import './ApplicantDossierModal.css';

export default function ApplicantDossierModal({ candidate, isOpen, onClose }) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="dossier-backdrop" onClick={onClose}>
      <div className="dossier-container" onClick={(e) => e.stopPropagation()}>
        <p style={{ padding: '1rem' }}>Profile and CV coming soon — API work in progress.</p>
        <div className="dossier-header">
          <div className="header-left">
            <p className="category-label">CANDIDATE DOSSIER</p>
            <h2 className="candidate-title">{candidate.applicantName}</h2>
            <p className="candidate-email">{candidate.applicantEmail}</p>
          </div>
          <div className="header-right">
            <span className="status-badge">{candidate.status}</span>
          </div>
        </div>

    
        <div className="dossier-content">
          <div className="content-column">
            <h3 className="column-title">APPLICATION</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">ROLE</p>
                <p className="info-value">{candidate.jobTitle}</p>
              </div>
              <div className="info-item">
                <p className="info-label">LOCATION</p>
                <p className="info-value">{candidate.location}</p>
              </div>
              <div className="info-item">
                <p className="info-label">APPLIED</p>
                <p className="info-value">{new Date(candidate.appliedAtUtc).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

         
          <div className="content-column">
            <h3 className="column-title">EVIDENCE</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">HEADLINE</p>
                <p className="info-value">{candidate.headline}</p>
              </div>
              <div className="info-item">
                <p className="info-label">SKILLS</p>
                <p className="info-value">{candidate.skills}</p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="candidate-record">
          <h3 className="record-title">CANDIDATE RECORD</h3>
          <div className="record-info">
            <div className="record-item">
              <p className="record-label">Education</p>
              <p className="record-value">{candidate.education}</p>
            </div>
            <div className="record-item">
              <p className="record-label">Work experience</p>
              <p className="record-value">{candidate.workExperience}</p>
            </div>
          </div>
        </div>

        <div className="dossier-footer">
          <div className="footer-left">
            <Link to={`/employer/applicants/${candidate.applicantId}/resume?jobId=${candidate.jobId}`} className="action-pill secondary">Read CV</Link>
            <Link to={`/employer/applicants/${candidate.applicantId}?jobId=${candidate.jobId}`} className="action-pill secondary">View Profile</Link>
          </div>
          <div className="footer-right">
            <Link to={`/employer/hiring/${candidate.jobId}/${candidate.applicantId}`} className="action-pill primary">Hire / reject</Link>
            <button className="action-pill close" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
