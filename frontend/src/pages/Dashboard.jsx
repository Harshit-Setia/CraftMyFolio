// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser"; // 1. Import the new useUser hook
import { IconWrapper, icons } from "../components/ui/icons";

// 2. Import all the "feature" components
import BasicDetails from "../features/dashboard/BasicDetails";
import EducationDetails from "../features/dashboard/EducationDetails";
import ExperienceDetails from "../features/dashboard/ExperienceDetails";
import ProjectsDetails from "../features/dashboard/ProjectsDetails";

const DashboardPage = () => {
  // 3. Use the new hook to get data, loading, and error states
  const { data: user, isLoading, isError } = useUser();

  const menuItems = [ "Basic Details", "Education Details", "Internship & Work Experience", "Projects" ];
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  const renderContent = () => {
    if (!user) return null; // Content is only rendered if user exists
    
    switch (activeItem) {
      case "Basic Details":
        return <BasicDetails user={user} />;
      case "Education Details":
        return <EducationDetails education={user.education} />;
      case "Internship & Work Experience":
        return <ExperienceDetails experience={user.experience} />;
      case "Projects":
        return <ProjectsDetails projects={user.projects} />;
      default:
        return <BasicDetails user={user} />;
    }
  };

  // 4. Handle the new loading state from TanStack Query
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading your session...</p>
      </div>
    );
  }

  // 5. Handle the new error state (e.g., bad token) or if user is just null
  if (isError || !user) {
    // We were logged out by our useUser hook's onError,
    // or the user just isn't found. Navigate home.
    return <Navigate to="/" />;
  }

  // 6. If we are here, user is loaded and valid
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white p-6 border-r border-gray-200 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-indigo-700">Dashboard</h1>
          <p className="text-sm text-gray-500">User Profile</p>
        </div>
        <nav className="flex-grow">
          <ul>
            {menuItems.map((item) => (
              <li key={item} className="mb-2">
                <button
                  onClick={() => setActiveItem(item)}
                  className={`w-full flex items-center py-2.5 px-4 rounded-lg text-left transition-colors duration-200 ${
                    activeItem === item
                      ? "bg-indigo-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <IconWrapper>{icons[item]}</IconWrapper>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-10 max-h-screen overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardPage;