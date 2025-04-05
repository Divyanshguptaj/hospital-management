import React, { useState } from 'react';
import { MdOutlineRocket } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner';
import axios from "axios";
const roles = ["Patient", "Staff", "Finance"];

const Registration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Patient");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.gender
    ) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }
    formData.role = selectedRole.toLowerCase();
    console.log(formData)
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        ...formData,
      });
      console.log(response)
      if (response.data.success) {
        console.log(response.data.token)
        localStorage.setItem("token", response.data.token);
        toast.success("Registration successful!");
        console.log(selectedRole.toLowerCase())
        navigate(`/${selectedRole.toLowerCase()}`);
      } else {
        const err = await response.json();
        toast.error(err.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-blue-500 flex items-center justify-center relative py-10">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10">
        
        {/* Left Welcome */}
        <div className="text-white text-center mb-8 lg:mb-0 lg:w-1/2">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdOutlineRocket size={60} />
          </div>
          <h1 className="text-3xl font-bold">Welcome</h1>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg p-6 pr-0 sm:p-8 w-full lg:w-1/2 round-corners">
          
          {/* Role Selection */}
          <div className="flex justify-end items-center gap-3 mb-6">
            {roles.map((role) => (
              <button
                key={role}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedRole === role
                    ? "bg-purple-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Register as {selectedRole}
            </h2>
            {status && (
              <p className="text-sm text-red-500 mt-2">{status}</p>
            )}
          </div>

          <form
            className="space-y-4 flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone *"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <div className="flex justify-center space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>

            <button
              type="submit"
              className="flex justify-center items-center w-1/2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              {loading ? <Spinner size={20} color="white" /> : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
