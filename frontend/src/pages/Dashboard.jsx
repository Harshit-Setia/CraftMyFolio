import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Import useMutation
import { useMutation } from "@tanstack/react-query";

// --- SVG Icons (All necessary icons) ---
const IconWrapper = ({ children }) => <span className="mr-3 w-6 h-6">{children}</span>;

const icons = {
  'Basic Details': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  'Education Details': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.905 59.905 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
  ),
  'Internship & Work Experience': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 01-2.25 2.25h-13.5a2.25 2.25 0 01-2.25-2.25v-4.07m18-4.22l-7.5-4.22m0 0l-7.5 4.22m7.5-4.22v7.5M3 16.06V9.75a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 9.75v6.31" />
    </svg>
  ),
  'Projects': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v3.776" />
    </svg>
  )
};
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

// --- NEW: Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Form content with scrolling for long forms */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Reusable Form Components ---
const FormInput = ({ id, label, value, onChange, type = "text", name = id }) => (
  <div className="flex-1 min-w-[45%]">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="mt-1 w-full bg-gray-100 border border-gray-200 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const FormTextarea = ({ id, label, value, onChange, name = id }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      id={id}
      name={name}
      value={value || ''}
      onChange={onChange}
      rows="3"
      className="mt-1 w-full bg-gray-100 border border-gray-200 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const FormSelect = ({ id, label, value, onChange, name = id, children }) => (
  <div className="flex-1 min-w-[45%]">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      id={id}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="mt-1 w-full bg-gray-100 border border-gray-200 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {children}
    </select>
  </div>
);

// --- NEW: Reusable Data Mutation Hook ---
const useUpdateUser = (onClose) => {
  const { setUser } = useAuth();
  
  return useMutation({
    mutationFn: (updatedData) => {
      return fetch(`${import.meta.env.VITE_BE_URL}/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(updatedData), // Send only the fields to be updated
      }).then(res => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      });
    },
    onSuccess: (updatedData) => {
      setUser(updatedData.data); // Update global state
      onClose(); // Close the modal
    },
    onError: (error) => {
      console.error("Update failed:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  });
};

// --- Form Components ---

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

const ExperienceForm = ({ user, onClose }) => {
  const [experience, setExperience] = useState(user.experience || []);
  const mutation = useUpdateUser(onClose);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedExperience = [...experience];
    const val = type === 'checkbox' ? checked : value;
    updatedExperience[index] = { ...updatedExperience[index], [name]: val };
    
    // If "current" is checked, clear the "to" date
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

const ProjectsForm = ({ user, onClose }) => {
  const [projects, setProjects] = useState(user.projects || []);
  const mutation = useUpdateUser(onClose);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', description: '', github: '', deployed: '', media: [] }]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // A little extra logic to handle 'media' as a comma-separated string
    const projectsWithMediaArray = projects.map(p => ({
      ...p,
      media: typeof p.media === 'string' ? p.media.split(',').map(s => s.trim()).filter(Boolean) : (p.media || [])
    }));
    mutation.mutate({ projects: projectsWithMediaArray });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {projects.map((project, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative">
          <button type="button" onClick={() => removeProject(index)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100">
            <TrashIcon />
          </button>
          <div className="flex flex-wrap gap-4">
            <FormInput id={`title-${index}`} name="title" label="Title" value={project.title} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`github-${index}`} name="github" label="GitHub URL" value={project.github} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`deployed-${index}`} name="deployed" label="Deployed URL" value={project.deployed} onChange={(e) => handleChange(index, e)} />
            <FormTextarea id={`description-${index}`} name="description" label="Description" value={project.description} onChange={(e) => handleChange(index, e)} />
            <FormInput id={`media-${index}`} name="media" label="Image URLs (comma-separated)" value={Array.isArray(project.media) ? project.media.join(', ') : project.media} onChange={(e) => handleChange(index, e)} />
          </div>
        </div>
      ))}
      <button type="button" onClick={addProject} className="w-full flex items-center justify-center mt-4 px-4 py-2 border border-dashed border-gray-400 rounded-md text-gray-700 hover:bg-gray-50">
        <PlusIcon /> Add Another Project
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

// --- Reusable Button ---
const EditButton = ({ onClick, text = "Edit" }) => (
  <button onClick={onClick} className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
    {text}
  </button>
);

// --- Reusable Empty State Card ---
const EmptyStateCard = ({ title, message }) => (
  <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
    <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
    <p className="text-gray-500 mt-2">{message}</p>
  </div>
);

// --- Content Components for the Right Side ---

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

const EducationDetails = ({ education = [] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Education Details</h1>
          <p className="text-gray-500 mt-1">Manage your education history</p>
        </div>
        <EditButton text="Add/Edit Education" onClick={() => setIsEditOpen(true)} />
      </div>

      {education.length === 0 ? (
        <EmptyStateCard 
          title="No Education Added"
          message="You haven't added any education details yet. Click 'Add/Edit Education' to start."
        />
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700">{edu.degree || edu.level}</h3>
                  <p className="text-lg font-medium text-gray-800">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
                </div>
                <span className="text-sm font-medium text-gray-600">{edu.yearOfCompletion} ({edu.status})</span>
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4">
                <p className="text-sm text-gray-500">Board/University: <span className="font-medium text-gray-700">{edu.boardOrUniversity || "N/A"}</span></p>
                <p className="text-sm text-gray-500">Score: <span className="font-medium text-gray-700">{edu.score || "N/A"}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Education">
        <EducationForm user={{ education }} onClose={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};

const ExperienceDetails = ({ experience = [] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const formatExpDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Internship & Work Experience</h1>
          <p className="text-gray-500 mt-1">Manage your professional experience</p>
        </div>
        <EditButton text="Add/Edit Experience" onClick={() => setIsEditOpen(true)} />
      </div>

      {experience.length === 0 ? (
        <EmptyStateCard 
          title="No Experience Added"
          message="You haven't added any work experience yet. Click 'Add/Edit Experience' to start."
        />
      ) : (
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700">{exp.title}</h3>
                  <p className="text-lg font-medium text-gray-800">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {formatExpDate(exp.from)} - {exp.isCurrent ? "Present" : formatExpDate(exp.to)}
                </span>
              </div>
              {exp.description && (
                <p className="text-gray-600 mt-4 pt-4 border-t border-gray-100 whitespace-pre-line">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Experience">
         <ExperienceForm user={{ experience }} onClose={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};

const ProjectsDetails = ({ projects = [] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-500 mt-1">Manage your portfolio projects</p>
        </div>
        <EditButton text="Add/Edit Projects" onClick={() => setIsEditOpen(true)} />
      </div>

      {projects.length === 0 ? (
        <EmptyStateCard 
          title="No Projects Added"
          message="You haven't added any projects yet. Click 'Add/Edit Projects' to start."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              {project.media?.[0] && (
                <img className="w-full h-48 object-cover" src={project.media[0]} alt={project.title} />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-700">{project.title}</h3>
                <p className="text-gray-600 mt-2 h-20 overflow-hidden text-ellipsis">{project.description}</p>
                <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 font-medium">GitHub</a>
                  )}
                  {project.deployed && (
                    <a href={project.deployed} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-semibold">Live Demo</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Projects">
        <ProjectsForm user={{ projects }} onClose={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};


// --- Main Dashboard Page Component ---

const Dashboard = () => {
  const { user, loading } = useAuth();
  const menuItems = [ "Basic Details", "Education Details", "Internship & Work Experience", "Projects" ];
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  const renderContent = () => {
    if (!user) return null; // Don't render content if user is somehow null
    switch (activeItem) {
      case "Basic Details":
        return <BasicDetails user={user} />;
      case "Education Details":
        return <EducationDetails education={user.education} />;
      case "Internship & Work Experience":
        return <ExperienceDetails experience={user.experience} />;
      case "Projects":
        return <ProjectsDetails projects={user.projects} />;
      default:
        return <BasicDetails user={user} />;
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-lg font-medium text-gray-600">Loading your session...</p>
        </div>
    );
  }
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white p-6 border-r border-gray-200 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-indigo-700">Dashboard</h1>
          <p className="text-sm text-gray-500">User Profile</p>
        </div>
        <nav className="flex-grow">
          <ul>
            {menuItems.map((item) => (
              <li key={item} className="mb-2">
                <button
                  onClick={() => setActiveItem(item)}
                  className={`w-full flex items-center py-2.5 px-4 rounded-lg text-left transition-colors duration-200 ${
                    activeItem === item
                      ? "bg-indigo-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <IconWrapper>{icons[item]}</IconWrapper>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-10 max-h-screen overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;