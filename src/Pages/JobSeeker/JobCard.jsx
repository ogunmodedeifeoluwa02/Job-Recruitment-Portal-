import { Briefcase, MapPin, Clock } from "lucide-react";

function JobCard({ job, application, onView }) {
  return (
    <div className="border-b border-white/20 py-4 sm:px-2">
      <div className="flex gap-4">
        <Briefcase size={20} className="mt-1 shrink-0 text-[#ff6b2c]" />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{job.category?.name}</p>
          <h3 className="mt-3 text-[21px] font-semibold">{job.title}</h3>
          <div className="my-5 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1"><MapPin size={13} />{job.location}</span>
            <span>{job.employmentType}</span>
            <span>{job.experienceLevel}</span>
            {job.salary != null && <span>Salary: {Number(job.salary).toLocaleString()}</span>}
            <span className="flex items-center gap-1"><Clock size={13} />Closes {new Date(job.deadline).toLocaleDateString()}</span>
          </div>
          <p className="mb-4 line-clamp-2 text-sm text-gray-300">{job.description}</p>
          <button onClick={() => onView(job)} className="rounded-sm bg-[#ed7a35] px-6 py-2 text-xs font-semibold text-black">
            {application ? "View job" : "View & Apply"}
          </button>
          {application && <span className="ml-3 text-xs text-[#9ebcff]">{application.status}</span>}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
