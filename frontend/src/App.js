import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

// Pages
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUsPage";

import PatientDashboard from "./pages/PatientPages/PatientDashboard";
import MedicalHistory from "./pages/PatientPages/MedicalHistory";
import Appointments from "./pages/PatientPages/Appointments";
import Reports from "./pages/PatientPages/Reports";

import StaffDashboard from "./pages/StaffPages/StaffDashboard";
import Roster from "./pages/StaffPages/Patients";
import Attendance from "./pages/StaffPages/Attendance";

import FinancialDashboard from "./pages/FinancialPages/FinancialDashboard";
import Billing from "./pages/FinancialPages/Billing";
import Payments from "./pages/FinancialPages/Payements";

// Layout
import Sidebar from "./components/Sidebar";
import EditProfile from "./pages/PatientPages/EditProfile";
import Department from "./pages/StaffPages/Department";
import Patients from "./pages/StaffPages/Patients";
import AddPatientPage from "./pages/StaffPages/AddPatient";

// Get user role from token
const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

// Protected Route
const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = getUserRole();
  // console.log(allowedRoles.includes(role),role);
  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

// Dashboard layout with sidebar + outlet
const DashboardLayout = ({ userRole }) => (
  <div className="w-full h-screen flex flex-row">
    <Sidebar userRole={userRole} />
    <div className="flex-1 p-6 overflow-y-auto">
      <Outlet />
    </div>
  </div>
);

const App = () => (
  <Router>
    <Toaster position="top-right" reverseOrder={false} />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />

      {/* PATIENT ROUTES */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <DashboardLayout userRole="patient" />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientDashboard />} />
        <Route path="medical-history" element={<MedicalHistory />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="reports" element={<Reports />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>

      {/* STAFF ROUTES */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <DashboardLayout userRole="staff" />
          </ProtectedRoute>
        }
      >
        <Route index element={<StaffDashboard />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="add-patient" element={<AddPatientPage />} />
        <Route path="department" element={<Department />} />
        <Route path="patients" element={<Patients />} />
      </Route>

      {/* FINANCE ROUTES */}
      <Route
        path="/finance"
        element={
          <ProtectedRoute allowedRoles={["finance"]}>
            <DashboardLayout userRole="finance" />
          </ProtectedRoute>
        }
      >
        <Route index element={<FinancialDashboard />} />
        <Route path="billing" element={<Billing />} />
        <Route path="payments" element={<Payments />} />
      </Route>

      {/* Catch-all route */}
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  </Router>
);

export default App;
