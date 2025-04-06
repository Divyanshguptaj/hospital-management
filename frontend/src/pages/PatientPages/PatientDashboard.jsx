import React, { useEffect, useState } from "react";
import { FaUserMd, FaFileMedical, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const PatientDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserDetails = async () => {
      if (!token) return;

      try {
        const userRes = await Promise.all([
          axios.get("http://localhost:5000/api/patient/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        console.log(userRes[0].data);
        setUserDetails(userRes[0].data);
        console.log(userDetails);

        const sortedAppointments = userRes[0].data.appointments
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setAppointments(sortedAppointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 w-full">
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Welcome, {userDetails?.firstName || "Patient"} 👋
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link to="/patient/appointments" className="no-underline">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <FaCalendarAlt className="text-purple-600 text-3xl" />
              <div>
                <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
                <p className="text-gray-500">
                  {userDetails?.appointments?.length || 0} Scheduled
                </p>
              </div>
            </div>
          </Link>

          <Link to="/patient/medical-history" className="no-underline">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <FaFileMedical className="text-purple-600 text-3xl" />
              <div>
                <h2 className="text-lg font-semibold">Medical History</h2>
                <p className="text-gray-500">{userDetails?.medicalHistory?.length || 0}</p>
              </div>
            </div>
          </Link>

          <Link to="/patient/reports" className="no-underline">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <FaUserMd className="text-purple-600 text-3xl" />
              <div>
                <h2 className="text-lg font-semibold">Reports</h2>
                <p className="text-gray-500">{userDetails?.reports?.length || 0}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-2xl font-semibold mb-6 text-purple-700">
    Recent Appointments
  </h2>

  {appointments.length === 0 ? (
    <div className="text-center py-10 text-gray-500">
      <p>No recent appointments found.</p>
    </div>
  ) : (
    <div className="grid md:grid-cols-2 gap-4">
      {appointments.slice(0, 3).map((appt, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 bg-gray-50"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {appt.doctor}
            </h3>
            <span className={`text-sm px-2 py-1 rounded-full 
              ${appt.status === "completed" ? "bg-green-100 text-green-700" : 
                appt.status === "cancelled" ? "bg-red-100 text-red-600" : 
                "bg-yellow-100 text-yellow-700"}`}>
              {appt.status || "Pending"}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Department :</strong> {appt.department}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Date :</strong> {formatDate(appt.date)}
          </p>
          <p className="text-sm text-gray-600">
          <strong>Time :</strong> {new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

      </main>
    </div>
  );
};

export default PatientDashboard;
