import React from "react";

const FormButton = ({ children, type = "submit" }) => {
  return (
    <button
      type={type}
      className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md"
    >
      {children}
    </button>
  );
};

export default FormButton;
