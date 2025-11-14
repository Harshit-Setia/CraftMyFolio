// src/features/dashboard/EducationDetails.jsx
import React, { useState } from "react";
import Modal from "../../components/ui/Modal";
import EditButton from "../../components/ui/EditButton";
import EmptyStateCard from "../../components/ui/EmptyStateCard";
import EducationForm from "./EducationForm";

const EducationDetails = ({ education = [] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Education Details</h1>
          <p className="text-gray-500 mt-1">Manage your education history</p>
        </div>
        <EditButton text="Add/Edit Education" onClick={() => setIsEditOpen(true)} />
      </div>

      {education.length === 0 ? (
        <EmptyStateCard 
          title="No Education Added"
          message="You haven't added any education details yet. Click 'Add/Edit Education' to start."
        />
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700">{edu.degree || edu.level}</h3>
                  <p className="text-lg font-medium text-gray-800">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
                </div>
                <span className="text-sm font-medium text-gray-600">{edu.yearOfCompletion} ({edu.status})</span>
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4">
                <p className="text-sm text-gray-500">Board/University: <span className="font-medium text-gray-700">{edu.boardOrUniversity || "N/A"}</span></p>
                <p className="text-sm text-gray-500">Score: <span className="font-medium text-gray-700">{edu.score || "N/A"}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Education">
        <EducationForm user={{ education }} onClose={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};

export default EducationDetails;