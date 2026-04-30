import { useEffect, useState } from "react";
import Navbar from "../../navbar/NavBar";

export default function SavedJobs({ setUser }) {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(saved);
  }, []);

  return (
    <>
      

      <div style={{ padding: "20px" }}>
        <h2>Saved Jobs</h2>

        {savedJobs.length === 0 ? (
          <p>No saved jobs</p>
        ) : (
          savedJobs.map((job) => (
            <div key={job.id} style={{ marginBottom: "15px" }}>
              <h3>{job.title}</h3>
              <p>{job.company_name}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}