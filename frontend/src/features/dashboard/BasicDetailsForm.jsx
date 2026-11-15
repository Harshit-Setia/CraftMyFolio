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
    showPhone: Boolean(user.showPhone),
  });
  
  const mutation = useUpdateUser(onClose);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShowPhoneChange = (e) => {
    setFormData(prev => ({ ...prev, showPhone: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput id="name" name="name" label="Full Name" value={formData.name} onChange={handleInputChange} />
      <FormInput id="phone" name="phone" label="Phone" value={formData.phone} onChange={handleInputChange} />
      <label htmlFor="showPhone" className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 cursor-pointer">
        <input
          id="showPhone"
          type="checkbox"
          checked={formData.showPhone}
          onChange={handleShowPhoneChange}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span>
          <span className="block text-sm font-medium text-gray-800">Show my phone number on my public portfolio</span>
          <span className="block text-xs text-gray-500 mt-0.5">
            Optional and off by default. When on, anyone who visits your portfolio can see and tap to call this number.
          </span>
        </span>
      </label>
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