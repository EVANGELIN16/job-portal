import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../utils/auth";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = () => {
    registerUser(form);
    alert("Registered!");
    navigate("/login");
  };

  return (
    <div className="register-page">
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="register-btn" onClick={handleSubmit}>
        Register
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}