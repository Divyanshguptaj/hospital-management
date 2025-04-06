import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserMd, FaEnvelope, FaPhone, FaUserTag } from "react-icons/fa";

const Department = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://hospital-management-txfj.onrender.com/api/staff/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStaffList(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch staff:", err);
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-purple-600 mt-10">Loading staff...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-700">Department Staff</h1>
        <p className="text-gray-600 mt-2">List of all staff members across departments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {staffList.map((staff, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaUserMd className="text-4xl text-purple-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {staff.firstName} {staff.lastName}
                </h2>
                <p className="text-sm text-gray-500">{staff.role}</p>
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <p className="flex items-center gap-2">
                <FaUserTag className="text-purple-500" />
                <span>Department: {staff.department}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-purple-500" />
                <span>Email: {staff.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-purple-500" />
                <span>Contact: {staff.contact}</span>
              </p>
              <p className="text-gray-500 text-xs">Shift: {staff.shift}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;
