import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PlaceholderContent = ({ title = "No Content" }) => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    <p className="text-gray-500 mt-1">
      This is a placeholder for the {title.toLowerCase()} section.
    </p>
    <div className="mt-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <p className="text-gray-600">
        Content for this section has not been created yet. Check back later!
      </p>
    </div>
  </div>
);

//  DashBoard is temporary redirected to home page when user is not logged in after the login page is ready it should be navigated there

const Dashboard = () => {
  const { user } = useAuth();

  const menuItems = [
    "Basic Details",
    "Education Details",
    "Internship & Work Experience",
    "Projects",
  ];
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  const renderContent = () => {
    switch (activeItem) {
      case "Basic Details":
        // return <BasicDetails />;
        return <PlaceholderContent title="Basic Details" />;
      case "Education Details":
        return <PlaceholderContent title="Education Details" />;
      case "Internship & Work Experience":
        return <PlaceholderContent title="Internship & Work Experience" />;
      case "Projects":
        return <PlaceholderContent title="Projects" />;
      default:
        return <PlaceholderContent />;
    }
  };

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-gray-50 flex">
          {/* Sidebar */}
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
                      {/* <IconWrapper>{icons[item]}</IconWrapper> */}
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-10">{renderContent()}</main>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

// --- SVG Icons for Sidebar ---
// A utility component for sidebar icons
// const IconWrapper = ({ children }) => <span className="mr-3 w-6 h-6">{children}</span>;

// const icons = {
//     'Basic Details': (
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
//         </svg>
//     ),
//     'Education Details': (
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//             <path d="M12 14l9-5-9-5-9 5 9 5z" />
//             <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" />
//         </svg>
//     ),
//     'Internship & Work Experience': (
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 01-2.25 2.25h-13.5a2.25 2.25 0 01-2.25-2.25v-4.07m18-4.22l-7.5-4.22m0 0l-7.5 4.22m7.5-4.22v7.5M3 16.06V9.75a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 9.75v6.31" />
//         </svg>
//     ),
//     'Projects': (
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v3.776" />
//         </svg>
//     )
// };

// --- Content Components for the Right Side ---

// const BasicDetails = () => (
//     <div>
//         <div className="flex justify-between items-center mb-6">
//             <div>
//                 <h1 className="text-3xl font-bold text-gray-800">Basic Details</h1>
//                 <p className="text-gray-500 mt-1">Manage your personal information and profile</p>
//             </div>
//             <button className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
//                     <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
//                 </svg>
//                 Edit Profile
//             </button>
//         </div>

//         <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
//             <div className="flex items-center space-x-6">
//                 <img className="w-24 h-24 rounded-full object-cover" src="https://placehold.co/100x100/E2E8F0/4A5568?text=JS" alt="John Smith" />
//                 <div>
//                     <div className="flex items-center space-x-3">
//                         <h2 className="text-2xl font-bold text-gray-800">John Smith</h2>
//                         <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Active</span>
//                     </div>
//                     <p className="text-gray-500 mt-1">Superset ID: CF2025001</p>
//                     <div className="flex items-center space-x-6 mt-4 text-gray-600">
//                         <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>John.smith@email.com</span>
//                         <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>+1 (555) 123-4567</span>
//                     </div>
//                 </div>
//             </div>

//             <div className="border-t border-gray-200 mt-8 pt-8">
//                 <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                     <div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium text-gray-800">John Michael Smith</p></div>
//                     <div><p className="text-sm text-gray-500">Current College</p><p className="font-medium text-gray-800">Stanford University</p></div>
//                     <div><p className="text-sm text-gray-500">Date of Birth</p><p className="font-medium text-gray-800">15th June, 1998</p></div>
//                     <div><p className="text-sm text-gray-500">Department</p><p className="font-medium text-gray-800">Computer Science</p></div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

export default Dashboard;
