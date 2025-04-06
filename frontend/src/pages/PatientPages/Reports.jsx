import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/patient/getAllReports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data.reports || []);
      } catch (err) {
        setError("Failed to fetch reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-purple-600">
        Loading reports...
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
        Your Medical Reports
      </h1>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No reports found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {reports.map((report, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-600"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                {report.title}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Doctor:</span> {report.doctor}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Department:</span> {report.department}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Date:</span>{" "}
                {new Date(report.date).toLocaleDateString()}
              </p>
              <button
                onClick={() => window.open(report.pdfUrl, "_blank")}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                View PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
