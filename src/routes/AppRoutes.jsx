import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import SavedJobs from "../components/Savedjobs/SavedJobs";

export default function AppRoutes({ user, setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />

      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard user={user} setUser={setUser} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
       <Route
        path="/saved"
        element={
          user ? (
            <SavedJobs setUser={setUser} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}