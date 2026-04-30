import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard({ user, setUser }) {
  const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
  fetch("https://remotive.com/api/remote-jobs")
    .then((res) => res.json())
    .then((data) => setJobs(data.jobs.slice(0, 10)));
}, []);
 // 🔍 FILTER LOGIC
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company_name.toLowerCase().includes(search.toLowerCase())
  );

 // save jobs
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
  setSavedJobs(saved);
}, []);

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
      <div className="dashboard-header">
        <h2>Welcome {user.email}</h2>
        <button className="logout-btn" onClick={() => setUser(null)}>
          Logout
        </button>
      </div>

        {/* SEARCH BAR */}
      <input
        className="search-input"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


       {/* JOB LIST */}
      <div className="job-list">
        {filteredJobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.company_name}</p>

              {/* clean description */}
              <p>
                {job.description.replace(/<[^>]+>/g, "").slice(0, 100)}...
              </p>


                 
               <div className="job-actions">
    
<a href={job.url} target="_blank">Apply</a>
    <button style={{marginTop:5}} onClick={() => toggleSaveJob(job)}>
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