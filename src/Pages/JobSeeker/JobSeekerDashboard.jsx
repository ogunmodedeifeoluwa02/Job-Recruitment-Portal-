import { useState } from "react";
import DashboardNav from "../../Shared/DashboardNav";
import { ShieldCheck } from "lucide-react";
import MyProfile from "./MyProfile";
import MyApplications from "./MyApplication";
import SearchJobs from "./SearchJobs";

function JobSeekerDashBoard() {
    const [activeTab, setActiveTab] = useState("search-jobs");
    console.log(activeTab)

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