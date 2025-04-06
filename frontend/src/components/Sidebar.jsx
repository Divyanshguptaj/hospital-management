import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import sidebarData from "../data/sidebarData.json";
import * as MdIcons from "react-icons/md"; // 👈 import all Md icons

const Sidebar = ({ userRole }) => {
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const filtered = sidebarData.filter(item => item.roles.includes(userRole));
    setVisibleItems(filtered);
  }, [userRole]);

  return (
    <div className="w-1/6 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">🏥 Hospital System</h2>
      <ul className="space-y-3">
        {visibleItems.map(item => {
          const IconComponent = MdIcons[item.icon]; // dynamically load icon
          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="flex items-center p-2 hover:bg-gray-700 rounded transition h-16"
                activeclassname="bg-gray-800"
              >
                {IconComponent && <IconComponent className="text-xl mr-3" />}
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
