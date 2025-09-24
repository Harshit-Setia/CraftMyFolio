import { useState } from "react";

export default function FolioForm({ userId, onSuccess }) {
  const [formData, setFormData] = useState({
    template_id: "",
    main_color: "#000000",
    secondry_color: "#FFFFFF",
    accent_color: "#FFFFFF",
    font: "Arial",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Create Folio</h2>

      {/* Template ID */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Template ID
        </label>
        <input
          type="text"
          name="template_id"
          value={formData.template_id}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Color Pickers */}
      {["main_color", "secondry_color", "accent_color"].map((color) => (
        <div key={color}>
          <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
            {color.replace("_", " ")}
          </label>
          <input
            type="color"
            name={color}
            value={formData[color]}
            onChange={handleChange}
            className="w-16 h-10 p-1 border rounded-lg cursor-pointer"
          />
        </div>
      ))}

      {/* Font Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Font
        </label>
        <select
          name="font"
          value={formData.font}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Arial</option>
          <option>Helvetica</option>
          <option>Times New Roman</option>
          <option>Courier New</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
        Save Folio
      </button>
    </form>
  );
}
