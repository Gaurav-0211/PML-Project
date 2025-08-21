import { Route, Routes } from "react-router-dom";
//import "./App.css";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
    <>
      {/* <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/send-email-link">Forgot Password</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send-email-link" element={<ForgotPassword />} />
        <Route path="/forgot-password-link" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
