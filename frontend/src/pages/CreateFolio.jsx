import { useState } from "react";

export default function CreateFolio({ userId }) {
  const [formData, setFormData] = useState({ template_id: "" });
  const [selected, setSelected] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/folios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, ...formData }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to create folio");
      }

      const data = await response.json();
      console.log("Folio created:", data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Import all images from src/folioTemplate
  const templates = import.meta.glob("../assets/templates/*.{png,jpg,jpeg}", {
    eager: true,
  });

  const templateList = Object.entries(templates).map(([path, module]) => {
    const fileName = path.split("/").pop();
    const id = fileName.replace(/\.[^/.]+$/, "");
    return { id, src: module.default };
  });

  // When a template is chosen
  const selectTemplate = (id) => {
    setSelected(id);
    setFormData((prev) => ({ ...prev, template_id: id }));
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left: Form & template picker */}
      <form
        onSubmit={handleSubmit}
        className="w-1/2 max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-6 space-y-4 overflow-auto"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Create Folio</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Choose a Template
          </label>

          <div className="grid grid-cols-3 gap-4">
            {templateList.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTemplate(t.id)}
                className={`border rounded-lg overflow-hidden hover:shadow-md ${
                  selected === t.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img src={t.src} alt={t.id} className="w-full h-32 object-cover" />
                <div className="p-1 text-center text-sm">{t.id}</div>
              </button>
            ))}
          </div>

          {/* Hidden field for form submit */}
          <input type="hidden" name="template_id" value={formData.template_id} />
          {selected && (
            <p className="mt-2 text-sm text-gray-700">Selected: {selected}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition"
        >
          Save Folio
        </button>
      </form>

      {/* Right: 50% live preview */}
      <iframe
        src={`../folioTemplate/${selected}`} // route or page with the same name as template id
        title="Template Preview"
        className="w-1/2 h-full border-l border-gray-300"
      />
    </div>
  );
}
