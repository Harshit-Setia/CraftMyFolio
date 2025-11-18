import {useState} from 'react'
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { PlusIcon, TrashIcon } from '../../components/ui/icons';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';



const SocialLinksForm = ({ user, onClose }) => {
  const [social, setSocial] = useState(user.social || []);
  const mutation = useUpdateUser(onClose);
  
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSocial = [...social];
    updatedSocial[index] = { ...updatedSocial[index], [name]: value };
    setSocial(updatedSocial);
  };

  const addSocial = () => {
    setSocial([...social, { platform: 'GitHub', url: '' }]);
  };
  
  const removeSocial = (index) => {
    setSocial(social.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ social: social });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {social.map((link, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative">
          <button type="button" onClick={() => removeSocial(index)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"><TrashIcon /></button>
          <div className="flex flex-wrap gap-4">
            <FormSelect id={`platform-${index}`} name="platform" label="Platform" value={link.platform} onChange={(e) => handleChange(index, e)}>
              <option value="GitHub">GitHub</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
              <option value="Website">Website</option>
              <option value="Other">Other</option>
            </FormSelect>
            <FormInput id={`url-${index}`} name="url" label="URL" value={link.url} onChange={(e) => handleChange(index, e)} placeholder="https://..." />
          </div>
        </div>
      ))}
      <button type="button" onClick={addSocial} className="w-full flex items-center justify-center mt-4 px-4 py-2 border border-dashed border-gray-400 rounded-md text-gray-700 hover:bg-gray-50">
        <PlusIcon /> Add Another Link
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

export default SocialLinksForm;