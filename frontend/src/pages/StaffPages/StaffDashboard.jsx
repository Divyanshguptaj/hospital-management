import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaPhone, FaEnvelope, FaClock, FaMale } from "react-icons/fa";

const StaffDashboard = () => {
  const [staff, setStaff] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/staff/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStaff(res.data);
      } catch (err) {
        console.error("Error fetching staff data:", err);
        navigate("/login");
      }
    };

    fetchStaffData();
  }, [navigate]);

  if (!staff) {
    return <div className="p-8 text-center text-purple-600 text-lg">Loading your dashboard...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-xl p-6 shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome, {staff.firstName} 👋</h1>
        <p className="text-lg">Here's your work summary & attendance</p>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Your Profile</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <p><FaUserTie className="inline mr-2 text-purple-600" /> <strong>Role:</strong> {staff.role}</p>
          <p><FaUserTie className="inline mr-2 text-purple-600" /> <strong>Department:</strong> {staff.department}</p>
          <p><FaClock className="inline mr-2 text-purple-600" /> <strong>Shift:</strong> {staff.shift}</p>
          <p><FaPhone className="inline mr-2 text-purple-600" /> <strong>Contact:</strong> {staff.contact}</p>
          <p><FaEnvelope className="inline mr-2 text-purple-600" /> <strong>Email:</strong> {staff.email}</p>
          <p><FaMale className="inline mr-2 text-purple-600" /><strong>Gender:</strong> {staff.gender || "Not specified"}</p>
        </div>
      </div>

      {/* Attendance History */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-green-600 mb-4">🟢 Recent Clock-In</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
            {staff.clockInHistory?.slice(-5).reverse().map((time, index) => (
              <li key={index}>{new Date(time).toLocaleString()}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-red-600 mb-4">🔴 Recent Clock-Out</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
            {staff.clockOutHistory?.slice(-5).reverse().map((time, index) => (
              <li key={index}>{new Date(time).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
