import {useState} from 'react'
import { useUpdateUser } from '../../hooks/useUpdateUser';
import FormTextarea from '../../components/ui/FormTextarea';


const SkillsForm = ({ user, onClose }) => {
  // We manage skills as a simple string for the text area
  const [skills, setSkills] = useState(user.skills ? user.skills.join(', ') : '');
  const mutation = useUpdateUser(onClose);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert the string back into an array for the backend
    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
    mutation.mutate({ skills: skillsArray });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormTextarea
        id="skills"
        name="skills"
        label="Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="e.g., React, Node.js, JavaScript"
      />
      <p className="text-xs text-gray-500">Separate your skills with commas.</p>
      <div className="flex justify-end gap-4 pt-4 border-t mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200">Cancel</button>
        <button type="submit" disabled={mutation.isLoading} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300">
          {mutation.isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default SkillsForm;