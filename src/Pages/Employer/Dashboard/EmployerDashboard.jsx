import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import api from '../../../Core/Api';
import ApplicantDossierModal from './modals/ApplicantDossierModal';
import './EmployerDashboard.css';

export default function EmployerDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Load applications and jobs in parallel
        const [applicationsData, jobsData] = await Promise.all([
          api.getApplications().catch(() => []),
          api.getJobs().catch(() => [])
        ]);
        
        // Calculate metrics from data
        const metricsData = {
          openRoles: jobsData?.filter(job => job.status === 'Active').length || 0,
          totalApplicants: applicationsData?.length || 0,
          interviewsScheduled: 0, // No interview endpoint available
          hired: applicationsData?.filter(app => app.status === 'Hired').length || 0,
        };

        setMetrics(metricsData);
        setCandidates(applicationsData || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        // Don't set error - show dashboard with empty data instead
        setMetrics({ openRoles: 0, totalApplicants: 0, interviewsScheduled: 0, hired: 0 });
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleOpenDossier = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDossierOpen(true);
  };

  const handleCloseDossier = () => {
    setSelectedCandidate(null);
    setIsDossierOpen(false);
  };

  if (loading) {
    return (
      <div className="employer-dashboard">
        <header className="top-header">
          <div className="header-content">
            <div className="brand-section">
              <div className="brand-icon">
                <div className="orange-circle"></div>
              </div>
              <span className="brand-text">Job Recruitment Portal</span>
            </div>
          </div>
        </header>
        <div className="content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employer-dashboard">
        <header className="top-header">
          <div className="header-content">
            <div className="brand-section">
              <div className="brand-icon">
                <div className="orange-circle"></div>
              </div>
              <span className="brand-text">Job Recruitment Portal</span>
            </div>
          </div>
        </header>
        <div className="content">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employer-dashboard">
      <header className="top-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-icon">
              <div className="orange-circle"></div>
            </div>
            <span className="brand-text">Job Recruitment Portal</span>
          </div>
          <div className="user-section">
            <span className="employer-badge">EMPLOYER</span>
            <div className="avatar">DE</div>
            <span className="user-email">de@example.com</span>
            <Link to="/logout" className="logout-link">Log Out</Link>
          </div>
        </div>
      </header>
      <nav className="sub-nav">
        <div className="sub-nav-content">
          <div className="nav-tabs">
            <Link to="/employer" className="nav-tab active">My Postings</Link>
            <Link to="/employer/applicants" className="nav-tab">Applicants</Link>
          </div>
          <div className="developer-tools">
            <span className="dev-tools-icon">≡</span>
            <span className="dev-tools-text">Developer tools</span>
          </div>
        </div>
      </nav>

      <div className="content">
        <div className="hero-section">
          <p className="hero-subheadline">Recruitment Portal · EMPLOYER WORKSPACE</p>
          <h1 className="hero-title">Hiring, with a clear next step.</h1>
          <button className="hero-action-button">Review decision queue →</button>
        </div>

       
        <div className="metrics-bar">
          <div className="metric-item">
            <p className="metric-label">OPEN ROLES</p>
            <p className="metric-value">{metrics?.openRoles || 0}</p>
          </div>
          <div className="metric-item">
            <p className="metric-label">APPLICANTS</p>
            <p className="metric-value">{metrics?.totalApplicants || 0}</p>
          </div>
          <div className="metric-item">
            <p className="metric-label">INTERVIEWS</p>
            <p className="metric-value">{metrics?.interviewsScheduled || 0}</p>
          </div>
          <div className="metric-item">
            <p className="metric-label">HIRED</p>
            <p className="metric-value">{metrics?.hired || 0}</p>
          </div>
        </div>

       
        <div className="main-grid">
          <div className="grid-card decision-queue">
            <h3 className="card-title">DECISION QUEUE</h3>
            <div className="dossier-list">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="dossier-item">
                  <div className="dossier-info">
                    <p className="candidate-name">{candidate.name}</p>
                    <p className="candidate-role">{candidate.role}</p>
                    <p className="applied-timeline">Applied {candidate.appliedTime}</p>
                  </div>
                  <button 
                    className="dossier-button"
                    onClick={() => handleOpenDossier(candidate)}
                  >
                    Open dossier →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-card upcoming-conversations">
            <h3 className="card-title">UPCOMING CONVERSATIONS</h3>
            <div className="conversation-list">
              <div className="conversation-item">
                <div className="date-badge">08-12</div>
                <div className="conversation-info">
                  <p className="candidate-name">James Wilson</p>
                  <p className="candidate-role">Frontend Developer</p>
                  <p className="interview-time">2:00 PM</p>
                </div>
              </div>
              <div className="conversation-item">
                <div className="date-badge">08-13</div>
                <div className="conversation-info">
                  <p className="candidate-name">Alex Thompson</p>
                  <p className="candidate-role">Backend Engineer</p>
                  <p className="interview-time">10:00 AM</p>
                </div>
              </div>
              <div className="conversation-item">
                <div className="date-badge">08-14</div>
                <div className="conversation-info">
                  <p className="candidate-name">Maria Garcia</p>
                  <p className="candidate-role">Product Designer</p>
                  <p className="interview-time">3:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApplicantDossierModal
        candidate={selectedCandidate}
        isOpen={isDossierOpen}
        onClose={handleCloseDossier}
      />
    </div>
  );
}
