import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/LOgin";
import Register from "./components/Register/Register";
import "./App.css";
import Dashboard from "./components/Dashboard/DashBoard";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar/NavBar";

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <Routes>
//       {/* default route */}
//       <Route path="/" element={<Navigate to="/login" />} />

//       {/* login */}
//       <Route path="/login" element={<Login setUser={setUser} />} />

//       {/* register */}
//       <Route path="/register" element={<Register />} />

//       {/* protected route */}
//       <Route
//         path="/dashboard"
//         element={
//           user ? (
//             <Dashboard user={user} setUser={setUser} />
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />
//     </Routes>
//   );
// }
function App() {
  const [user, setUser] = useState(null);

   const location = useLocation();

  const hideNavbar = ["/login", "/register"].includes(location.pathname)
 
   return (
    <>
      {!hideNavbar && <Navbar setUser={setUser} />}
      <AppRoutes user={user} setUser={setUser} />
    </>
  );
}

export default App;