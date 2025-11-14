// src/features/dashboard/ExperienceDetails.jsx
import React, { useState } from "react";
import Modal from "../../components/ui/Modal";
import EditButton from "../../components/ui/EditButton";
import EmptyStateCard from "../../components/ui/EmptyStateCard";
import ExperienceForm from "./ExperienceForm";

const ExperienceDetails = ({ experience = [] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const formatExpDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Internship & Work Experience</h1>
          <p className="text-gray-500 mt-1">Manage your professional experience</p>
        </div>
        <EditButton text="Add/Edit Experience" onClick={() => setIsEditOpen(true)} />
      </div>

      {experience.length === 0 ? (
        <EmptyStateCard 
          title="No Experience Added"
          message="You haven't added any work experience yet. Click 'Add/Edit Experience' to start."
        />
      ) : (
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700">{exp.title}</h3>
                  <p className="text-lg font-medium text-gray-800">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {formatExpDate(exp.from)} - {exp.isCurrent ? "Present" : formatExpDate(exp.to)}
                </span>
              </div>
              {exp.description && (
                <p className="text-gray-600 mt-4 pt-4 border-t border-gray-100 whitespace-pre-line">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Experience">
         <ExperienceForm user={{ experience }} onClose={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};

export default ExperienceDetails;