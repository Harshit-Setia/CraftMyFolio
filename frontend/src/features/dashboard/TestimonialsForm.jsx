import {useState} from 'react'
import { useUpdateUser } from '../../hooks/useUpdateUser';
import FormInput from '../../components/ui/FormInput';
import FormTextarea from '../../components/ui/FormTextarea';
import { PlusIcon ,TrashIcon } from '../../components/ui/icons';


const TestimonialsForm = ({ user, onClose }) => {
  const [testimonials, setTestimonials] = useState(user.testimonials || []);
  const mutation = useUpdateUser(onClose, 'me/testimonials');
  
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [name]: value };
    setTestimonials(updatedTestimonials);
  };
  
  const addTestimonial = () => {
    setTestimonials([...testimonials, { name: '', role: '', feedback: '' }]);
  };
  
  const removeTestimonial = (index) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ testimonials: testimonials });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {testimonials.map((item, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative">
          <button type="button" onClick={() => removeTestimonial(index)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"><TrashIcon /></button>
          <div className="flex flex-wrap gap-4">
            <FormInput id={`name-${index}`} name="name" label="Name" value={item.name} onChange={(e) => handleChange(index, e)} placeholder="e.g., Jane Doe" />
            <FormInput id={`role-${index}`} name="role" label="Role" value={item.role} onChange={(e) => handleChange(index, e)} placeholder="e.g., Product Manager @ Google" />
            <FormTextarea id={`feedback-${index}`} name="feedback" label="Feedback" value={item.feedback} onChange={(e) => handleChange(index, e)} />
          </div>
        </div>
      ))}
      <button type="button" onClick={addTestimonial} className="w-full flex items-center justify-center mt-4 px-4 py-2 border border-dashed border-gray-400 rounded-md text-gray-700 hover:bg-gray-50">
        <PlusIcon /> Add Another Testimonial
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


export default TestimonialsForm;