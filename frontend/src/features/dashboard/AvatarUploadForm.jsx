// In a new file: src/features/dashboard/AvatarUploadForm.jsx

import React, { useState, useRef } from 'react';
import { useUpdateUserAvatar } from '../../hooks/useUpdateUserAvatar'; // We will create this hook

const AvatarUploadForm = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    
    const mutation = useUpdateUserAvatar(onClose); // Use our new, specialized hook
    console.log("mutation object: ", mutation);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Create a temporary URL for preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");       
    if (!file) return;
    console.log("SUBMIT CLICKED 2");       
    mutation.mutate(file); // Mutate with the file object
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
        {/* The Preview Image */}
        <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
          {preview ? (
            <img src={preview} alt="New avatar preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500">Select an image</span>
          )}
        </div>
        
        <input 
          type="file" 
          accept="image/png, image/jpeg" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
        
        {/* The "Choose File" Button */}
        <button 
          type="button" 
          onClick={() => fileInputRef.current.click()} 
          className="mt-4 px-4 py-2 rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Choose File
        </button>
      </div>
      
      <div className="flex justify-end gap-4 pt-6 border-t mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200">
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={!file || mutation.isLoading || mutation.isPending} 
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {mutation.isPending ? "Uploading..." : "Save Photo"}
        </button>
      </div>
    </form>
  );
};

export default AvatarUploadForm;