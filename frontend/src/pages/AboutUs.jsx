import React from "react";
import {
  FaCheck,
  FaFileAlt,
  FaUserMd,
  FaClipboardList,
  FaStethoscope,
  FaHospitalSymbol,
  FaUserNurse,
  FaBrain,
  FaPills,
  FaBed,
} from "react-icons/fa";
import doctorImg from "../assets/doctor.png"; // Replace with your actual image path

const AboutUs = () => {
  const topFeatures = [
    { icon: <FaCheck size={30} />, title: "Make an appointment" },
    { icon: <FaFileAlt size={30} />, title: "Choose your package" },
    { icon: <FaUserMd size={30} />, title: "Help by specialist" },
    { icon: <FaClipboardList size={30} />, title: "Get diagnostic report" },
  ];

  const services = [
    { icon: <FaStethoscope size={24} />, label: "Medical checkup" },
    { icon: <FaHospitalSymbol size={24} />, label: "Gyn Care" },
    { icon: <FaUserNurse size={24} />, label: "Nursing Services" },
    { icon: <FaBrain size={24} />, label: "Neurology" },
    { icon: <FaPills size={24} />, label: "Pharmacy" },
    { icon: <FaBed size={24} />, label: "Sleep Center" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 text-white px-10 py-16 font-sans">
      <div className="grid grid-cols-2 gap-10">
        {/* Left: Doctor Image */}
        <div className="flex items-end justify-center">
          <img src={doctorImg} alt="Doctor" className="h-[85%] object-contain rounded-xl shadow-lg" />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center gap-12">
          {/* Section: Why Choose Us */}
          <div>
            <h2 className="text-3xl font-bold mb-4 border-b-2 border-white inline-block">Why Choose Us</h2>
            <div className="grid grid-cols-2 gap-5 mt-4">
              {topFeatures.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-center text-white mb-3">
                    <div className="bg-white/20 p-3 rounded-full">{item.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-200 mt-2">
                    Lorem ipsum dolor sit amet, nec te mollis utroque honestatis.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Our Services */}
          <div>
            <h2 className="text-3xl font-bold mb-4 border-b-2 border-white inline-block">Our Services</h2>
            <div className="grid grid-cols-2 gap-5 mt-4">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="bg-white/20 p-2 rounded-full text-white">{service.icon}</div>
                  <div>
                    <h4 className="font-semibold">{service.label}</h4>
                    <p className="text-sm text-gray-200">Vestibulum tincidunt enim in pharetra malesuada.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;