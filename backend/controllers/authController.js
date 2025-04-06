const Patient = require("../models/patientModel");
const Staff = require("../models/staffModel");
const Finance = require("../models/financeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { email, password, role, firstName, lastName, contact, gender } =
    req.body;
  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Please provide email, password, and role" });
  }
  console.log("object")
  let Model;
  switch (role.toLowerCase()) {
    case "patient":
      Model = Patient;
      break;
    case "staff":
      Model = Staff;
      break;
    case "finance":
      Model = Finance;
      break;
    default:
      return res.status(400).json({ message: "Invalid role" });
  }
  try {
    const user = await Model.findOne({email});
    console.log(user,"1")
    if (!user) return res.status(404).json({ message: `${role} not found` });
    // console.log(user)
    
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    console.log(isMatch,"2")
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    
    // Update missing fields if provided
    let updateRequired = false;
    if (!user.firstName && firstName) {
      user.firstName = firstName;
      updateRequired = true;
    }
    if (!user.lastName && lastName) {
      user.lastName = lastName;
      updateRequired = true;
    }
    if (!user.contact && contact) {
      user.contact = contact;
      updateRequired = true;
    }
    if (!user.gender && gender) {
      user.gender = gender;
      updateRequired = true;
    }
    console.log(updateRequired,"3")
    if (updateRequired) await user.save();

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.firstName,
        role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};