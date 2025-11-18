import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser"; // 1. Import useUser to get user data
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { templateInfo } from "../folioTemplate/index.js";
import { SlugSpinner, ErrorIcon, CheckIcon } from "../components/ui/icons.jsx";
import { useDebounce } from "../hooks/useDebounce.js";

// --- A Simple Loading Spinner Component ---
const FullPageLoader = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <p className="text-lg font-medium text-gray-600">Loading user data...</p>
  </div>
);

const API_BASE_URL = `${import.meta.env.VITE_BE_URL}`;

const fetchPublicFolio = async (slug) => {
  if (!slug) return null;
  const res = await fetch(`${API_BASE_URL}/folio/${slug}`);
  if (!res.ok) throw new Error("Portfolio not found");
  return res.json();
};

const checkSlug = async (slug) => {
  if (!slug) return { available: false };
  const res = await fetch(`${API_BASE_URL}/folio/check-slug/${slug}`);
  return res.json();
};

export default function CreateFolio() {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Get the query client

  // 1. Get auth and user data
  const token = localStorage.getItem("token");
  const { data: user, isLoading: isUserLoading, error: userError } = useUser();

  // 2. Check if we are in "Edit Mode"
  // The 'user' object is populated with 'folio_id' (which has the slug)
  const isEditMode = Boolean(user?.folio_id);
  const existingFolio = user?.folio_id;

  // 3. Set initial state from the user's existing folio, if it exists
  const [selected, setSelected] = useState(existingFolio?.template_id || null);
  const [slug, setSlug] = useState(existingFolio?.slug || "");

  const debouncedSlug = useDebounce(slug, 500);

  // 4. Slug availability check
  const { data: slugAvailability, isLoading: isCheckingSlug } = useQuery({
    queryKey: ["slugCheck", debouncedSlug],
    queryFn: () => checkSlug(debouncedSlug),
    enabled: !!debouncedSlug,
  });

  // 5. Setup the CREATE mutation
  const createMutation = useMutation({
    mutationFn: async (folioData) => {
      return fetch(`${API_BASE_URL}/folio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(folioData),
      }).then((res) =>
        res.json().then((data) => {
          if (!res.ok) throw new Error(data.message);
          return data;
        })
      );
    },
    onSuccess: async (data) => {
      alert("Portfolio created successfully!");
      const newSlug = data.data.slug;

      // 1. Invalidate the user query (can run in background)
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // 2. AWAIT the prefetch for the new page's data
      await queryClient.prefetchQuery({
        queryKey: ["folio", newSlug],
        queryFn: () => fetchPublicFolio(newSlug),
      });

      navigate(`/folio/${newSlug}`); // <-- Remember to use hash router path if needed
    },
    onError: (error) => alert(`Error: ${error.message}`),
  });

  // 6. Setup the UPDATE mutation
  const updateMutation = useMutation({
    mutationFn: async (folioData) => {
      return fetch(`${API_BASE_URL}/folio/me`, {
        // Use the 'PATCH /me' route
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(folioData), // Send new template_id and/or slug
      }).then((res) =>
        res.json().then((data) => {
          if (!res.ok) throw new Error(data.message);
          return data;
        })
      );
    },
    onSuccess: async (data) => {
      alert("Portfolio updated successfully!");
      const newSlug = data.data.slug;

      // 1. Invalidate the user query
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // 2. AWAIT the prefetch
      await queryClient.prefetchQuery({
        queryKey: ["folio", newSlug],
        queryFn: () => fetchPublicFolio(newSlug),
      });

      // 3. NOW navigate
      navigate(`/folio/${newSlug}`); // <-- Remember to use hash router path if needed
    },
    onError: (error) => alert(`Error: ${error.message}`),
  });

  // Is the mutation (either create or update) running?
  const isMutating = createMutation.isLoading || updateMutation.isLoading;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if slug is available (if it's not the user's current slug)
    const slugIsTaken =
      slugAvailability?.available === false && slug !== existingFolio?.slug;

    if (!selected || !slug) {
      alert("Please choose a template and enter a public URL.");
      return;
    }
    if (slugIsTaken) {
      alert("That URL is already taken. Please choose another.");
      return;
    }

    const folioData = { template_id: selected, slug };

    // 7. Call the correct mutation
    if (isEditMode) {
      updateMutation.mutate(folioData);
    } else {
      createMutation.mutate(folioData);
    }
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

  // 8. Determine the validation state
  const isSlugValid =
    slugAvailability?.available === true || slug === existingFolio?.slug;
  const isSlugInvalid =
    slugAvailability?.available === false && slug !== existingFolio?.slug;
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
            {/* 9. Dynamic UI Text */}
            <h2 className="text-3xl font-bold text-slate-800">
              {isEditMode ? "Change Your Folio" : "Create New Folio"}
            </h2>
            <p className="text-slate-500">
              {isEditMode
                ? "Change your public URL or template."
                : "Choose a public URL and a template to get started."}
            </p>
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-lg font-semibold text-slate-700 mb-4"
            >
              {isEditMode ? "Your portfolio URL" : "Choose your portfolio URL"}
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
            <div className="h-5 mt-1 text-sm">
              {isCheckingSlug && (
                <p className="text-gray-500">Checking availability...</p>
              )}
              {isSlugValid && slug !== existingFolio?.slug && (
                <p className="text-green-600">Available!</p>
              )}
              {isSlugInvalid && (
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
            disabled={
              !selected ||
              !slug ||
              isSlugInvalid ||
              isMutating ||
              isCheckingSlug
            }
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {/* 9. Dynamic Button Text */}
            {isMutating
              ? isEditMode
                ? "Saving Changes..."
                : "Creating Folio..."
              : isEditMode
                ? "Save Changes"
                : "Create My Folio"}
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
