import React from "react";
import { FaUserMd, FaFileMedical, FaCalendarAlt } from "react-icons/fa";

const PatientDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 w-10/12">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Welcome, Patient 👋</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            <FaCalendarAlt className="text-purple-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
              <p className="text-gray-500">2 Scheduled</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            <FaFileMedical className="text-purple-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold">Prescriptions</h2>
              <p className="text-gray-500">4 Active</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            <FaUserMd className="text-purple-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold">Reports</h2>
              <p className="text-gray-500">3 New</p>
            </div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between">
              <span>Dr. Smith - Cardiology</span>
              <span className="text-sm text-gray-500">March 28, 2025</span>
            </li>
            <li className="py-3 flex justify-between">
              <span>Dr. Rose - Dermatology</span>
              <span className="text-sm text-gray-500">March 21, 2025</span>
            </li>
            <li className="py-3 flex justify-between">
              <span>Dr. Khan - Neurology</span>
              <span className="text-sm text-gray-500">March 15, 2025</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
