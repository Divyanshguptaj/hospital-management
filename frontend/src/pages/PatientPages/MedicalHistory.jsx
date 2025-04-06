import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/patient/medical-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data.medicalHistory || []);
      } catch (err) {
        setError("Failed to fetch medical history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-purple-600">
        Loading medical history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Medical History
      </h1>
      {history.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No medical history found.</p>
      ) : (
        <div className="space-y-6">
          {history.map((record, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                Diagnosis: {record.diagnosis}
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">Doctor:</span> {record.doctor}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Department:</span> {record.department}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Date:</span>{" "}
                {new Date(record.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-medium">Prescriptions:</span>{" "}
                {record.medications && record.medications.length > 0 ? (
                    <ul className="list-disc list-inside mt-1">
                    {record.medications.map((med, index) => (
                        <li key={index}>{med}</li>
                    ))}
                    </ul>
                ) : (
                    "None"
                )}
              </p>

              <p className="text-gray-700">
                <span className="font-medium">Test Results :</span> {record.testResults}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;