// src/features/dashboard/BasicDetailsForm.jsx
import React, { useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import FormInput from "../../components/ui/FormInput";
import FormTextarea from "../../components/ui/FormTextarea";

const BasicDetailsForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
    dob: user.dob ? user.dob.split('T')[0] : '',
    bio: user.bio,
  });
  
  const mutation = useUpdateUser(onClose);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput id="name" name="name" label="Full Name" value={formData.name} onChange={handleInputChange} />
      <FormInput id="phone" name="phone" label="Phone" value={formData.phone} onChange={handleInputChange} />
      <FormInput id="address" name="address" label="Location (e.g. City, Country)" value={formData.address} onChange={handleInputChange} />
      <FormInput id="dob" name="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleInputChange} />
      <FormTextarea id="bio" name="bio" label="Bio" value={formData.bio} onChange={handleInputChange} />
      
      <div className="flex justify-end gap-4 pt-4 border-t mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200">Cancel</button>
        <button type="submit" disabled={mutation.isLoading} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300">
          {mutation.isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default BasicDetailsForm;