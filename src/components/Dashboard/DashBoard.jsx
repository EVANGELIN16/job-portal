import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard({ user, setUser }) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);

  // ✅ Fetch jobs
  useEffect(() => {
    fetch("https://remotive.com/api/remote-jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs.slice(0, 10)));
  }, []);

  // ✅ Load saved jobs
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(saved);
  }, []);

  // ✅ Filter logic (SAFE)
  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (job.location || "")
        .toLowerCase()
        .includes(location.toLowerCase()) &&
      (type === "" || job.job_type?.toLowerCase() === type)
    );
  });

  // ✅ Save / Unsave job
  const toggleSaveJob = (job) => {
    const exists = savedJobs.find((j) => j.id === job.id);

    let updated;

    if (exists) {
      updated = savedJobs.filter((j) => j.id !== job.id);
    } else {
      updated = [...savedJobs, job];
    }

    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Welcome {user?.email}</h2>
        <button className="logout-btn" onClick={() => setUser(null)}>
          Logout
        </button>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="full_time">Full Time</option>
          <option value="part_time">Part Time</option>
          <option value="contract">Contract</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setLocation("");
            setType("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* JOB COUNT */}
      <p style={{ marginBottom: "10px" }}>
        Showing {filteredJobs.length} jobs
      </p>

      {/* JOB LIST */}
      <div className="job-list">
        {filteredJobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.company_name}</p>
              <p>{job.location || "Remote"}</p>

              {/* CLEAN DESCRIPTION */}
              <p>
                {job.description
                  .replace(/<[^>]+>/g, "")
                  .slice(0, 120)}
                ...
              </p>

              {/* ACTIONS */}
              <div className="job-actions">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply
                </a>

                <button onClick={() => toggleSaveJob(job)}>
                  {savedJobs.find((j) => j.id === job.id)
                    ? "Saved ❤️"
                    : "Save 🤍"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}