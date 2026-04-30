import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function Navbar({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2 className="logo">JobPortal</h2>

      <div className="nav-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Jobs
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Saved Jobs
        </NavLink>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}