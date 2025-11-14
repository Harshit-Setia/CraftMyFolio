// src/features/dashboard/ProjectsForm.jsx
import React, { useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import FormInput from "../../components/ui/FormInput";
import FormTextarea from "../../components/ui/FormTextarea";
import { PlusIcon, TrashIcon } from "../../components/ui/icons";

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

export default ProjectsForm;