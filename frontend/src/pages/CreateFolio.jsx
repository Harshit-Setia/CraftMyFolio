import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser"; // 1. Import useUser to get user data
import { useQuery, useMutation } from "@tanstack/react-query";
import { templateInfo } from "../folioTemplate/index.js";
import { SlugSpinner, ErrorIcon, CheckIcon } from "../components/ui/icons.jsx";
import {useDebounce} from '../hooks/useDebounce.js'

// --- A Simple Loading Spinner Component ---
const FullPageLoader = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <p className="text-lg font-medium text-gray-600">Loading user data...</p>
  </div>
);

const API_BASE_URL = `${import.meta.env.VITE_BE_URL}`;

export default function CreateFolio() {
  const [selected, setSelected] = useState(null);
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { data: user, isLoading: isUserLoading, error: userError } = useUser();

  // 1. Create a debounced value for the slug
  const debouncedSlug = useDebounce(slug, 500);

  // 2. Create a new query to check the slug availability
  const { data: slugAvailability, isLoading: isCheckingSlug } = useQuery({
    queryKey: ["slugCheck", debouncedSlug],
    queryFn: () => checkSlug(debouncedSlug),
    enabled: !!debouncedSlug, // Only run if the debounced slug is not empty
  });

  const checkSlug = async (slug) => {
    if (!slug) return { available: false };
    const res = await fetch(`${API_BASE_URL}/folio/check-slug/${slug}`);
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: (folioData) => {
      return fetch(`${API_BASE_URL}/folio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(folioData),
      }).then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Failed to create folio");
          });
        }
        return res.json();
      });
    },
    onSuccess: (data) => {
      console.log("Folio created:", data);
      alert("Portfolio created successfully!");
      navigate(`/folio/${data.data.slug}`);
    },
    onError: (error) => {
      console.error(error);
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected || !slug || !slugAvailability?.available) {
      alert("Please choose a template and an available public URL.");
      return;
    }
    mutation.mutate({ template_id: selected, slug });
  };

  // --- Render Logic ---
  if (isUserLoading) {
    return <FullPageLoader />;
  }
  if (!token || userError) {
    if (userError)
      console.error("Redirecting due to error:", userError.message);
    return <Navigate to="/signin" />;
  }
  if (!user) {
    return <FullPageLoader />;
  }

  const selectedTemplate = templateInfo.find((t) => t.id === selected);
  const TemplateComponent = selectedTemplate?.component;

  // 3. Determine the validation state
  const isSlugValid = slugAvailability?.available === true;
  const isSlugInvalid = slugAvailability?.available === false;
  const showSlugValidation =
    debouncedSlug === slug && (isSlugValid || isSlugInvalid || isCheckingSlug);

  return (
    <div className="grid grid-cols-12 w-full font-sans">
      <div className="col-span-12 md:col-span-5 bg-white flex flex-col p-8">
        <form
          onSubmit={handleSubmit}
          className="flex-grow flex flex-col space-y-8"
        >
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-800">
              Create New Folio
            </h2>
            <p className="text-slate-500">
              Choose a public URL and a template to get started.
            </p>
          </div>

          {/* 4. UPDATED: Slug Input Field with Real-time Validation */}
          <div>
            <label
              htmlFor="slug"
              className="block text-lg font-semibold text-slate-700 mb-4"
            >
              Choose your portfolio URL
            </label>
            <div
              className={`flex items-center border rounded-lg p-2 transition-all ${
                showSlugValidation && isSlugValid
                  ? "border-green-500 ring-2 ring-green-100"
                  : showSlugValidation && isSlugInvalid
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-slate-300 focus-within:ring-2 focus-within:ring-indigo-500"
              }`}
            >
              <span className="text-slate-500 bg-slate-100 p-2 rounded-md">
                craftfolio.com/
              </span>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().trim())}
                placeholder="harshit-singla"
                className="flex-1 p-2 outline-none text-indigo-700 font-medium"
                autoComplete="off"
              />
              {/* 5. Validation Icon */}
              <div className="pr-2">
                {isCheckingSlug ? (
                  <SlugSpinner />
                ) : isSlugValid ? (
                  <CheckIcon />
                ) : isSlugInvalid ? (
                  <ErrorIcon />
                ) : null}
              </div>
            </div>
            {/* 6. Validation Message */}
            <div className="h-5 mt-1 text-sm">
              {isCheckingSlug && (
                <p className="text-gray-500">Checking availability...</p>
              )}
              {isSlugValid && <p className="text-green-600">Available!</p>}
              {isSlugInvalid && slug.length > 0 && (
                <p className="text-red-600">
                  Sorry, this URL is already taken.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-slate-700 mb-4">
              Choose a Template
            </label>
            <div className="grid grid-cols-2 gap-4">
              {templateInfo.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelected(template.id)}
                  className={`border rounded-lg overflow-hidden group transition-all duration-300 ${
                    selected === template.id
                      ? "ring-2 ring-indigo-500 ring-offset-2 border-indigo-500"
                      : "border-slate-200 hover:border-indigo-500 hover:shadow-md"
                  }`}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-2 text-center text-sm font-semibold text-slate-600">
                    {template.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            // 7. UPDATED: Disable logic
            disabled={
              !selected ||
              !slug ||
              !isSlugValid ||
              mutation.isLoading ||
              isCheckingSlug
            }
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {mutation.isLoading ? "Creating Your Folio..." : "Create My Folio"}
          </button>
        </form>
      </div>

      {/* Right: Live Preview Pane */}
      <div className="hidden md:block col-span-7 bg-slate-100 p-8">
        <div className="sticky top-8">
          <div className="w-full h-[calc(100vh-4rem)] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
            <div className="flex-shrink-0 bg-slate-200 p-3 flex items-center gap-2 border-b border-slate-300">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-grow w-full overflow-y-auto">
              {TemplateComponent ? (
                <TemplateComponent user={user} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 p-10 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-slate-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold">Live Preview</h3>
                  <p>Select a template from the left to see how it looks.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- The Main Component ---
// export default function CreateFolio() {
//   const [selected, setSelected] = useState(null);
//   const navigate = useNavigate();

//   // 3. Get token (for auth) and user data (for payload) from our hooks
//   const { token } = useAuth();
//   const { data: user, isLoading: isUserLoading, error } = useUser();

//   // 4. Refactor handleSubmit to use useMutation
//   const mutation = useMutation({
//     mutationFn: async (templateId) => {
//       return fetch(`${import.meta.env.VITE_BE_URL}/folio`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // 5. CRITICAL FIX: Send the auth token
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           // 6. CRITICAL FIX: Get user._id from the 'user' object from useUser
//           user_id: user._id,
//           template_id: templateId
//         }),
//       }).then(res => {
//         if (!res.ok) {
//           return res.json().then(err => { throw new Error(err.message || "Failed to create folio") });
//         }
//         return res.json();
//       });
//     },
//     onSuccess: (data) => {
//       console.log("Folio created:", data);
//       alert("Portfolio created successfully!");
//       // You can now navigate the user to their new folio or the dashboard
//       navigate("/dashboard");
//     },
//     onError: (error) => {
//       console.error(error);
//       alert(error.message);
//     }
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selected) {
//       alert("Please choose a template first!");
//       return;
//     }
//     // 7. Call the mutation
//     mutation.mutate(selected);
//   };

//   // --- Render Logic ---

//   // 8. Handle the loading state while useUser is fetching
//   if (isUserLoading) {
//     return <FullPageLoader />;
//   }

//   // 9. Handle redirect logic using the new hooks
//   if (!token || error) {
//     if (error) console.error("Redirecting due to error:", error.message);
//     return <Navigate to="/signin" />;
//   }

//   const selectedTemplate = templateInfo.find((t) => t.id === selected);
//   const TemplateComponent = selectedTemplate?.component;

//   return (
//     <div className="grid grid-cols-12 w-full font-sans">
//       {/* Left: Form & template picker */}
//       <div className="col-span-12 md:col-span-5 bg-white flex flex-col p-8">
//         <form
//           onSubmit={handleSubmit}
//           className="flex-grow flex flex-col space-y-8"
//         >
//           <div className="space-y-1">
//             <h2 className="text-3xl font-bold text-slate-800">Create New Folio</h2>
//             <p className="text-slate-500">Start by selecting a template for your portfolio.</p>
//           </div>

//           <div className="flex-grow">
//             <label className="block text-lg font-semibold text-slate-700 mb-4">
//               Choose a Template
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               {templateInfo.map((template) => (
//                 <button
//                   key={template.id}
//                   type="button"
//                   onClick={() => setSelected(template.id)}
//                   className={`border rounded-lg overflow-hidden group transition-all duration-300 ${
//                     selected === template.id
//                       ? "ring-2 ring-indigo-500 ring-offset-2 border-indigo-500"
//                       : "border-slate-200 hover:border-indigo-500 hover:shadow-md"
//                   }`}
//                 >
//                   <img
//                     src={template.thumbnail}
//                     alt={template.name}
//                     className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="p-2 text-center text-sm font-semibold text-slate-600">
//                     {template.name}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             // 10. Disable button while mutation is running
//             disabled={!selected || mutation.isLoading}
//             className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             {/* 11. Show loading text */}
//             {mutation.isLoading ? "Saving..." : "Save and Continue"}
//           </button>
//         </form>
//       </div>

//       {/* Right: Live Preview Pane */}
//       <div className="hidden md:block col-span-7 bg-slate-100 p-8">
//         <div className="sticky top-8">
//           <div className="w-full h-[calc(100vh-4rem)] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
//             <div className="flex-shrink-0 bg-slate-200 p-3 flex items-center gap-2 border-b border-slate-300">
//               <div className="w-3 h-3 rounded-full bg-red-400"></div>
//               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//               <div className="w-3 h-3 rounded-full bg-green-400"></div>
//             </div>
//             <div className="flex-grow w-full overflow-y-auto">
//               {TemplateComponent ? (
//                 // 12. This prop passing is now correct!
//                 <TemplateComponent user={user} />
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-full text-slate-500 p-10 text-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   <h3 className="text-lg font-semibold">Live Preview</h3>
//                   <p>Select a template from the left to see how it looks.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
