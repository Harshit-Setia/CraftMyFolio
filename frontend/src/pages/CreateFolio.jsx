import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { templateInfo } from "../folioTemplate/index.js";

export default function CreateFolio() {
  const [selected, setSelected] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) {
      alert("Please choose a template first!");
      return;
    }
    try {
      // ... (handleSubmit logic remains the same)
      const response = await fetch("/folio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, template_id: selected }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to create folio");
      }
      const data = await response.json();
      console.log("Folio created:", data);
    } catch (error)      {
      console.error(error);
      alert(error.message);
    }
  };

  const selectedTemplate = templateInfo.find((t) => t.id === selected);
  const TemplateComponent = selectedTemplate?.component;

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    // ✅ 1. Removed h-screen to allow the entire page to scroll
    <div className="grid grid-cols-12 w-full font-sans">
      
      {/* Left: Form & template picker */}
      {/* Removed h-screen from this column as well */}
      <div className="col-span-12 md:col-span-5 bg-white flex flex-col p-8">
        <form
          onSubmit={handleSubmit}
          className="flex-grow flex flex-col space-y-8"
        >
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-800">Create New Folio</h2>
            <p className="text-slate-500">Start by selecting a template for your portfolio.</p>
          </div>

          <div className="flex-grow">
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
            disabled={!selected}
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save and Continue
          </button>
        </form>
      </div>

      {/* Right: Live Preview Pane */}
      <div className="hidden md:block col-span-7 bg-slate-100 p-8">
        {/* ✅ 2. Added a "sticky" wrapper to keep the preview in view on scroll */}
        <div className="sticky top-8">
          {/* ✅ 3. Set a calculated height to prevent it from being too tall */}
          <div className="w-full h-[calc(100vh-4rem)] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
            <div className="flex-shrink-0 bg-slate-200 p-3 flex items-center gap-2 border-b border-slate-300">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-grow w-full overflow-y-auto">
              {TemplateComponent ? (
                <TemplateComponent user={user}/>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 p-10 text-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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