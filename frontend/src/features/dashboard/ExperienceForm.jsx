// src/features/dashboard/ExperienceForm.jsx
import React, { useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import FormInput from "../../components/ui/FormInput";
import FormTextarea from "../../components/ui/FormTextarea";
import { PlusIcon, TrashIcon } from "../../components/ui/icons";

const ExperienceForm = ({ user, onClose }) => {
  const [experience, setExperience] = useState(user.experience || []);
  const mutation = useUpdateUser(onClose);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedExperience = [...experience];
    const val = type === 'checkbox' ? checked : value;
    updatedExperience[index] = { ...updatedExperience[index], [name]: val };
    
    if (name === 'isCurrent' && checked) {
      updatedExperience[index].to = '';
    }
    setExperience(updatedExperience);
  };

  const addExperience = () => {
    setExperience([...experience, { title: '', company: '', location: '', from: '', to: '', isCurrent: false, description: '' }]);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ experience: experience });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {experience.map((exp, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative">
          <button type="button" onClick={() => removeExperience(index)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100">
            <TrashIcon />
          </button>
          <div className="flex flex-wrap gap-4">
            <FormInput id={`title-${index}`} name="title" label="Title" value={exp.title} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`company-${index}`} name="company" label="Company" value={exp.company} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`location-${index}`} name="location" label="Location" value={exp.location} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`from-${index}`} name="from" label="From Date" type="date" value={exp.from ? exp.from.split('T')[0] : ''} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`to-${index}`} name="to" label="To Date" type="date" value={exp.to ? exp.to.split('T')[0] : ''} onChange={(e) => handleChange(index, e)} disabled={exp.isCurrent} />
            <FormTextarea id={`description-${index}`} name="description" label="Description" value={exp.description} onChange={(e) => handleChange(index, e)} />
            <div className="w-full flex items-center">
              <input type="checkbox" id={`isCurrent-${index}`} name="isCurrent" checked={exp.isCurrent} onChange={(e) => handleChange(index, e)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor={`isCurrent-${index}`} className="ml-2 block text-sm text-gray-900">I currently work here</label>
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addExperience} className="w-full flex items-center justify-center mt-4 px-4 py-2 border border-dashed border-gray-400 rounded-md text-gray-700 hover:bg-gray-50">
        <PlusIcon /> Add Another Experience
      </button>
      <div className="flex justify-end gap-4 pt-4 border-t mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200">Cancel</button>
        <button type="submit" disabled={mutation.isLoading} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300">
          {mutation.isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;