import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import EditButton from '../../components/ui/EditButton';
import BasicDetailsForm from './BasicDetailsForm';
// 1. Import our new AvatarUploadForm
import AvatarUploadForm from './AvatarUploadForm';

const BasicDetails = ({ user }) => {
  // 2. We now need state for BOTH modals
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  
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
        {/* 3. This button opens the DETAILS modal */}
        <EditButton text="Edit Profile" onClick={() => setIsDetailsModalOpen(true)} />
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:space-x-6">
          
          {/* 4. This is the new Avatar section */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <img 
              className="w-24 h-24 rounded-full object-cover" 
              src={user.avatar || 'https://placehold.co/100x100/E2E8F0/4A5568?text=??'} 
              alt={user.name} 
            />
            {/* 5. This button opens the PHOTO modal */}
            <button 
              onClick={() => setIsPhotoModalOpen(true)}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white border-2 border-white hover:bg-indigo-700 transition"
              aria-label="Change profile photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
          
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
      
      {/* 6. Render the DETAILS modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title="Edit Basic Details">
        <BasicDetailsForm user={user} onClose={() => setIsDetailsModalOpen(false)} />
      </Modal>

      {/* 7. Render the new PHOTO modal */}
      <Modal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} title="Update Profile Photo">
        <AvatarUploadForm user={user} onClose={() => setIsPhotoModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default BasicDetails;