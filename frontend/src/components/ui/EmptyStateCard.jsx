// src/components/ui/EmptyStateCard.jsx
import React from "react";

const EmptyStateCard = ({ title, message }) => (
  <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
    <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
    <p className="text-gray-500 mt-2">{message}</p>
  </div>
);

export default EmptyStateCard;