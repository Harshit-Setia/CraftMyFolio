// src/components/ui/FormTextarea.jsx
import React from "react";

const FormTextarea = ({ id, label, value, onChange, name = id }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      id={id}
      name={name}
      value={value || ''}
      onChange={onChange}
      rows="3"
      className="mt-1 w-full bg-gray-100 border border-gray-200 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

export default FormTextarea;