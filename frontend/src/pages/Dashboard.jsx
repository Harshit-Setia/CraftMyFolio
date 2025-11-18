// src/pages/DashboardPage.jsx
import React, { useState} from "react";
import { Navigate ,useNavigate} from "react-router-dom";
import { useUser } from "../hooks/useUser"; // 1. Import the new useUser hook
import { IconWrapper, icons } from "../components/ui/icons";

// 2. Import all the "feature" components
import BasicDetails from "../features/dashboard/BasicDetails";
import EducationDetails from "../features/dashboard/EducationDetails";
import ExperienceDetails from "../features/dashboard/ExperienceDetails";
import ProjectsDetails from "../features/dashboard/ProjectsDetails";
import SkillsDetails from "../features/dashboard/SkillsDetails";
import SocialLinksDetails from "../features/dashboard/SocialLinks";
import TestimonialsDetails from "../features/dashboard/TestimonialsDetails";

const DashboardPage = () => {
  // 3. Use the new hook to get data, loading, and error states
  const { data: user, isLoading, isError } = useUser();
  const navigate = useNavigate();

  const menuItems = [
    "Basic Details",
    "Education Details",
    "Internship & Work Experience",
    "Projects",
    "Skills",
    "Social Links",
    "Testimonials",
  ];
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  const handleViewFolio = () => {
    if (user && user.folio_id && user.folio_id.slug) {
      navigate(`/folio/${user.folio_id.slug}`);
    } else {
      navigate("/create");
    }
  };

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
      case "Skills" : 
        return <SkillsDetails skills={user.skills} />
      case "Social Links":
        return <SocialLinksDetails social={user.social} />;
      case "Testimonials":
        return <TestimonialsDetails testimonials={user.testimonials} />;
      default:
        return <BasicDetails user={user} />;
    }
  };

  // 4. Handle the new loading state from TanStack Query
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Loading your session...
        </p>
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

        <button
          onClick={handleViewFolio}
          className="w-full mb-6 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {user.folio_id ? "View My Folio" : "Create My Folio"}
        </button>

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
