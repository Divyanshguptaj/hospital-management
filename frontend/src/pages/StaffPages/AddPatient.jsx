import React, { useState } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const AddPatientPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    contact: "",
    password: "",
    email: "",
    gender: "",
    ehrNumber: "",
    status: "Admitted",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPatient = async () => {
    try {
      const res = await axios.post("https://hospital-management-txfj.onrender.com/api/staff/addPatient", formData);
      toast.success("Patient added successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        password: "",
        contact: "",
        email: "",
        gender: "",
        ehrNumber: "",
        status: "Admitted",
      });
    } catch (error) {
      console.error("Error adding patient:", error);
    toast.error("Error adding patient. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-purple-700">
          <FaUserPlus /> Add New Patient
        </h2>

        <div className="space-y-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="contact"
            type="text"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
            <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            name="ehrNumber"
            type="text"
            placeholder="EHR Number"
            value={formData.ehrNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={handleAddPatient}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-all"
          >
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientPage;
