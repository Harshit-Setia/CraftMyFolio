import React from "react";

const EmptyStateCard = ({ title, message }) => (
  <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-gray-500">{message}</p>
  </div>
);

export default EmptyStateCard;
