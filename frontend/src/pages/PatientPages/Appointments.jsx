import React, { useEffect, useState } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/patient/getAllAppointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched appointments:", response.data);
        setAppointments(response.data.appointments || []);
      } catch (err) {
        setError("Failed to fetch appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-purple-600">
        Loading appointments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        Your Appointments
      </h1>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No appointments found.
        </p>
      ) : (
        <div className="w-full grid gap-6 md:grid-cols-2">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-600 w-full"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                Appointment with {appointment.doctor}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Department:</span> {appointment.department}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Date:</span>{" "}
                {new Date(appointment.date).toLocaleDateString()}
              </p>
              {appointment.date && (
                <p className="text-gray-600">
                  <span className="font-medium">Time:</span>{" "}
                  {new Date(appointment.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              
              )}
              {appointment.status && (
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span> {appointment.status}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
