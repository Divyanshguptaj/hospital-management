const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const staffRoutes = require("./routes/staffRoutes");
const financeRoutes = require("./routes/financeRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: ["http://localhost:3000","https://hospital-management-seven-psi.vercel.app/"], credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/staff", staffRoutes); 
// app.use("/api/finance", financeRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
