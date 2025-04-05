import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import FinancialDashboard from "./pages/FinancialDashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUsPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { jwtDecode } from "jwt-decode";


// Check user's role from localStorage

const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    return decoded.role || null;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};



// Component to protect routes
const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole();
  console.log("User role:", role);
  if (allowedRoles.includes(role)) {
    console.log("Role allowed:", role);
    return children;
  }
  return <Navigate to="/login" />;
};

const App = () => (
  <div className="w-full h-screen bg-gray-100 flex flex-row">
    <Toaster position="top-right" reverseOrder={false} />
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        {/* <Route path="/" element={<Sidebar/>}> */}
        <Route
          path="/patient"
          element={<ProtectedRoute allowedRoles={["patient"]}>
            <Sidebar userRole="patient"/>
            <PatientDashboard />
          </ProtectedRoute>} />
        <Route
          path="/staff"
          element={<ProtectedRoute allowedRoles={["staff"]}>
            <Sidebar userRole="staff"/>
            <StaffDashboard />
          </ProtectedRoute>} />
        <Route
          path="/finance"
          element={<ProtectedRoute allowedRoles={["finance"]}>
            <Sidebar userRole="finance"/>
            <FinancialDashboard />
          </ProtectedRoute>} />
        {/* </Route> */}

        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  </div>
);

export default App;
