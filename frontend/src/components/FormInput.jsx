import React from 'react';

const FormInput = ({ id, label, value, onChange, type = 'text', placeholder, error, icon, rightAccessory }) => {
  // Base classes for the input field
  const baseClasses = "w-full bg-gray-100 text-gray-700 border rounded-lg py-3 pl-10 focus:outline-none focus:ring-2";
  
  // Dynamically adjust right padding if there's an accessory (like the eye icon)
  const paddingClass = rightAccessory ? "pr-10" : "pr-4";

  // Dynamically set border and ring color based on the error state
  const validationClasses = error 
    ? "border-red-500 focus:ring-red-500" 
    : "border-transparent focus:ring-indigo-500";

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses} ${paddingClass} ${validationClasses}`}
        />
        {/* Render the right accessory if provided */}
        {rightAccessory && (
           <div className="absolute inset-y-0 right-0 flex items-center pr-3">
             {rightAccessory}
           </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormInput;