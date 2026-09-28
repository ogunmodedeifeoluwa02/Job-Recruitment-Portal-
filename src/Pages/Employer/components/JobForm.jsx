// Shared job-posting fields for Create + Edit. Controlled via props so both
// pages stay identical without duplicating markup.
function JobForm({ formData, categories, disabled, onChange }) {
  const field = (name, label, node) => (
    <div key={name}>
      <label htmlFor={`job-${name}`} className="td-label">
        {label}
      </label>
      {node}
    </div>
  );

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {field(
        "title",
        "Job title *",
        <input
          type="text"
          id="job-title"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="e.g. Senior Frontend Developer"
          required
          disabled={disabled}
          className="td-input"
        />,
      )}
      {field(
        "location",
        "Location *",
        <input
          type="text"
          id="job-location"
          name="location"
          value={formData.location}
          onChange={onChange}
          placeholder="e.g. Lagos, Remote"
          required
          disabled={disabled}
          className="td-input"
        />,
      )}
      {field(
        "employmentType",
        "Employment type",
        <select
          id="job-employmentType"
          name="employmentType"
          value={formData.employmentType}
          onChange={onChange}
          disabled={disabled}
          className="td-input"
        >
          <option value="FullTime">Full-time</option>
          <option value="PartTime">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>,
      )}
      {field(
        "experienceLevel",
        "Experience level",
        <select
          id="job-experienceLevel"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={onChange}
          disabled={disabled}
          className="td-input"
        >
          <option value="Entry">Entry level</option>
          <option value="Mid">Mid level</option>
          <option value="Senior">Senior level</option>
        </select>,
      )}
      {field(
        "categoryId",
        "Category *",
        <select
          id="job-categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={onChange}
          required
          disabled={disabled}
          className="td-input"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>,
      )}
      {field(
        "salary",
        "Salary (optional)",
        <input
          type="number"
          id="job-salary"
          name="salary"
          value={formData.salary}
          onChange={onChange}
          placeholder="e.g. 80000"
          step="0.01"
          min="0"
          disabled={disabled}
          className="td-input"
        />,
      )}
      {field(
        "deadline",
        "Application deadline *",
        <input
          type="date"
          id="job-deadline"
          name="deadline"
          value={formData.deadline}
          onChange={onChange}
          required
          disabled={disabled}
          className="td-input"
        />,
      )}
      <div className="sm:col-span-2">
        <label htmlFor="job-description" className="td-label">
          Job description *
        </label>
        <textarea
          id="job-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Describe the role and responsibilities…"
          rows={5}
          required
          disabled={disabled}
          className="td-input"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="job-requirements" className="td-label">
          Requirements *
        </label>
        <textarea
          id="job-requirements"
          name="requirements"
          value={formData.requirements}
          onChange={onChange}
          placeholder="List the required skills and qualifications…"
          rows={4}
          required
          disabled={disabled}
          className="td-input"
        />
      </div>
    </div>
  );
}

export default JobForm;
