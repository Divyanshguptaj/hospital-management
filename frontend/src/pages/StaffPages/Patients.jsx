import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaUserInjured,
  FaCalendarPlus,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchEhr, setSearchEhr] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    doctor: "",
    department: ""
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchEhr, patients]);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://hospital-management-txfj.onrender.com/api/patient/getAllPatients",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      setPatients(res.data);
      setFiltered(res.data); // <- store the original data separately
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleFilter = () => {
    if (searchEhr.trim() === "") {
      setPatients(filtered); // reset to original data if search is empty
      return;
    }

    const filteredData = filtered.filter((p) => p.ehrNumber === searchEhr);
    setPatients(filteredData);
  };

  const updatePatientStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`https://hospital-management-txfj.onrender.com/api/staff/updateStatus/${id}`, {
        status: newStatus,
      });
      toast.success("Status updated successfully!"); 
      fetchPatients();
    } catch (error) {
      toast.error("Error updating status!");
      console.error("Error updating status:", error);
    }
  };

  const updateAppointmentStatus = async (userId, appointmentIndex, newStatus) => {
    try {
      console.log(userId, appointmentIndex, newStatus);
      await axios.put("https://hospital-management-txfj.onrender.com/api/staff/updateAppointmentStatus", {
        userId,
        appointmentIndex,
        status: newStatus,
      });
      toast.success("Appointment status updated successfully!");
      fetchPatients();
    } catch (error) {
      toast.error("Error updating appointment status!");
      console.error("Error updating status:", error);
    }
  };
  
  const handleAddAppointment = (patientId) => {
    setSelectedPatientId(patientId);
    setShowForm(true);
  };
  const submitAppointment = async () => {
    try {
      await axios.put(`https://hospital-management-txfj.onrender.com/api/staff/addAppointment/${selectedPatientId}`, {
        appointment: { ...formData, status: "pending" },
      });
      toast.success("Appointment added successfully!");
      setShowForm(false);
      fetchPatients(); // Refresh patient list
    } catch (error) {
      toast.error("Error adding appointment!");
      setShowForm(false);
      console.error("Error adding appointment:", error);
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">
        Patient Management
      </h1>

      {/* Search Bar */}
      <div className="flex items-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Search by Ehr Number"
          className="p-2 border rounded w-full max-w-md"
          value={searchEhr}
          onChange={(e) => setSearchEhr(e.target.value)}
        />
        {searchEhr && (
          <button
            onClick={() => {
              setSearchEhr("");
              setPatients(filtered);
            }}
            className="p-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Clear
          </button>
        )}
      </div>

      {/* Patient List */}
      {patients.length === 0 ? (
        <p className="text-gray-600">No patients found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white shadow-md rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <FaUserInjured className="text-purple-600 text-2xl" />

                <div>
                  <p className="text-sm text-gray-500">
                    Name: {patient.firstName} {patient.lastName}
                  </p>
                  <p className="text-sm text-gray-500">Age: {patient.age}</p>
                  <p className="text-sm text-gray-500">
                    Contact: {patient.contact}
                  </p>
                  <h2 className="text-lg font-semibold">{patient.name}</h2>
                  <p className="text-sm text-gray-500">
                    EHR: {patient.ehrNumber}
                  </p>
                  <p className="text-sm">
                    Status:
                    <span
                      className={`ml-1 font-semibold ${
                        patient.status === "Admitted"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => updatePatientStatus(patient._id, "Admitted")}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Admit
                </button>
                <button
                  onClick={() => updatePatientStatus(patient._id, "Discharged")}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Discharge
                </button>
              </div>

              {/* Appointments */}
              <div className="border-t pt-2 h-100">
                <h3 className="font-semibold mb-2">Appointments</h3>
                {patient.appointments?.length > 0 ? (
                  <ul className="text-sm space-y-1  h-[100px] overflow-y-scroll">
                    {patient.appointments.map((appt, index)  => (
                      <li key={appt._id} className="bg-gray-100 rounded p-2">
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(appt.date).toLocaleString()}
                        </p>
                        <p>
                          Status:
                          <span
                            className={`ml-1 ${
                              appt.status === "Completed"
                                ? "text-green-600"
                                : appt.status === "Cancelled"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {appt.status}
                          </span>
                        </p>
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() =>
                              updateAppointmentStatus(patient._id, index,"completed")
                            }
                            className="text-green-600 hover:underline text-xs flex items-center gap-1"
                          >
                            <FaCheck /> Complete
                          </button>
                          <button
                            onClick={() =>
                              updateAppointmentStatus(patient._id, index, "pending")
                            }
                            className="text-yellow-600 hover:underline text-xs flex items-center gap-1"
                          >
                            <FaEdit /> Pending
                          </button>
                          <button
                            onClick={() =>
                              updateAppointmentStatus(patient._id, index, "cancelled")
                            }
                            className="text-red-600 hover:underline text-xs flex items-center gap-1"
                          >
                            <FaTimes /> Cancel
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No appointments.</p>
                )}
              </div>

              {/* Add Appointment (Modal/To-Do) */}
              <button
                onClick={() => handleAddAppointment(patient._id)}
                className="w-full mt-2 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 flex items-center justify-center gap-2"
              >
                <FaCalendarPlus /> Add Appointment
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-center">Add Appointment</h2>

            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="text"
              placeholder="Doctor"
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitAppointment}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    
  );
};

export default Patients;
