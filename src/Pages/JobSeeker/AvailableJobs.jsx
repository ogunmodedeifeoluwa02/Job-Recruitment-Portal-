import { useNavigate } from "react-router";
import DashboardNav from "../../Shared/DashboardNav";
import Navbar from "../../Shared/Navbar";
import SearchJobs from "./SearchJobs";

// Job search homepage at / (with /jobs kept as an alias).
// Reuses the existing SearchJobs listing (same API, same JobCard) so there
// is only one listing implementation. Logged-out visitors get the public
// navbar; SearchJobs itself shows them a login prompt (no fake jobs).
function AvailableJobs() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const setActiveTab = (tab) => navigate(`/jobseekerdashboard?tab=${tab}`);

  return (
    <div className="flex min-h-screen flex-col bg-[#151616]">
      {isLoggedIn ? (
        <DashboardNav activeTab="search-jobs" setActiveTab={setActiveTab} />
      ) : (
        <Navbar />
      )}
      <div className="flex-1">
        <SearchJobs />
      </div>
    </div>
  );
}

export default AvailableJobs;
