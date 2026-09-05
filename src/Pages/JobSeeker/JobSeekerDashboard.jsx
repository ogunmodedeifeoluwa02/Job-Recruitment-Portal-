import { useSearchParams } from "react-router";
import DashboardNav from "../../Shared/DashboardNav";
import MyProfile from "./MyProfile";
import MyApplications from "./MyApplication";
import SearchJobs from "./SearchJobs";

function JobSeekerDashBoard() {
    const [params, setParams] = useSearchParams();
    const activeTab = params.get("tab") || "search-jobs";
    console.log(activeTab);
    const setActiveTab = (tab) => setParams({ tab });

    return (
        <div className="min-h-screen bg-[#151616] flex flex-col">
            <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className="flex-1">
            {
                activeTab === 'my-profile'?
                 <MyProfile /> : activeTab === 'my-applications' ? <MyApplications/> :
                 <SearchJobs/>
            }
            </div>
        </div>
    )
};

export default JobSeekerDashBoard;