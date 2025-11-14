// src/features/dashboard/EducationForm.jsx
import React, { useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";
import { PlusIcon, TrashIcon } from "../../components/ui/icons";

const EducationForm = ({ user, onClose }) => {
  const [education, setEducation] = useState(user.education || []);
  const mutation = useUpdateUser(onClose);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...education];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([...education, { level: '', institution: '', yearOfCompletion: '', status: 'Completed' }]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ education: education }); // Send the entire updated array
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative">
          <button type="button" onClick={() => removeEducation(index)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100">
            <TrashIcon />
          </button>
          <div className="flex flex-wrap gap-4">
            {/* All your FormInput and FormSelect components... */}
            <FormInput id={`institution-${index}`} name="institution" label="Institution" value={edu.institution} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`degree-${index}`} name="degree" label="Degree" value={edu.degree} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`fieldOfStudy-${index}`} name="fieldOfStudy" label="Field of Study" value={edu.fieldOfStudy} onChange={(e) => handleChange(index, e)} />
            <FormSelect id={`level-${index}`} name="level" label="Level" value={edu.level} onChange={(e) => handleChange(index, e)}>
              <option value="">Select Level</option>
              <option value="Secondary (10th)">Secondary (10th)</option>
              <option value="Senior Secondary (12th)">Senior Secondary (12th)</option>
              <option value="Diploma">Diploma</option>
              <option value="Graduation">Graduation</option>
              <option value="Post-Graduation">Post-Graduation</option>
            </FormSelect>
            <FormInput id={`yearOfCompletion-${index}`} name="yearOfCompletion" label="Year of Completion" type="number" value={edu.yearOfCompletion} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`score-${index}`} name="score" label="Score" value={edu.score} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`boardOrUniversity-${index}`} name="boardOrUniversity" label="Board/University" value={edu.boardOrUniversity} onChange={(e) => handleChange(index, e)} />
            <FormSelect id={`status-${index}`} name="status" label="Status" value={edu.status} onChange={(e) => handleChange(index, e)}>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
            </FormSelect>
          </div>
        </div>
      ))}
      <button type="button" onClick={addEducation} className="w-full flex items-center justify-center mt-4 px-4 py-2 border border-dashed border-gray-400 rounded-md text-gray-700 hover:bg-gray-50">
        <PlusIcon /> Add Another Education
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

export default EducationForm;