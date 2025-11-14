// src/components/ui/FormSelect.jsx
import React from "react";

const FormSelect = ({ id, label, value, onChange, name = id, children }) => (
  <div className="flex-1 min-w-[45%]">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      id={id}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="mt-1 w-full bg-gray-100 border border-gray-200 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {children}
    </select>
  </div>
);

export default FormSelect;