// src/features/dashboard/BasicDetails.jsx
import React, { useState } from "react";
import Modal from "../../components/ui/Modal";
import EditButton from "../../components/ui/EditButton";
import BasicDetailsForm from "./BasicDetailsForm";

const BasicDetails = ({ user }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  const latestEducation = user?.education?.[0] || {};

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Basic Details</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and profile</p>
        </div>
        <EditButton text="Edit Profile" onClick={() => setIsEditOpen(true)} />
      </div>
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:space-x-6">
          <img className="w-24 h-24 rounded-full object-cover" src={user.avatar || 'https://placehold.co/100x100/E2E8F0/4A5568?text=??'} alt={user.name} />
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Active</span>
            </div>
            <p className="text-gray-500 mt-1">User ID: {user.email}</p>
            <div className="flex flex-col md:flex-row items-center md:space-x-6 mt-4 text-gray-600">
              <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>{user.email}</span>
              <span className="flex items-center mt-2 md:mt-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>{user.phone || "Not provided"}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium text-gray-800">{user.name}</p></div>
            <div><p className="text-sm text-gray-500">College/University</p><p className="font-medium text-gray-800">{latestEducation.institution || "Not provided"}</p></div>
            <div><p className="text-sm text-gray-500">Date of Birth</p><p className="font-medium text-gray-800">{formatDate(user.dob)}</p></div>
            <div><p className="text-sm text-gray-500">Department</p><p className="font-medium text-gray-800">{latestEducation.fieldOfStudy || "Not provided"}</p></div>
            <div><p className="text-sm text-gray-500">Location</p><p className="font-medium text-gray-800">{user.address || "Not provided"}</p></div>
            <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium text-gray-800">{user.phone || "Not provided"}</p></div>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500">Bio</p>
            <p className="font-medium text-gray-800 italic">{user.bio || "No bio provided."}</p>
          </div>
        </div>
      </div>
      
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Basic Details">
        <BasicDetailsForm user={user} onClose={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};

export default BasicDetails;