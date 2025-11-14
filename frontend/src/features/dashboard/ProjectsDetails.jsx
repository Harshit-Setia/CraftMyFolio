// src/features/dashboard/ProjectsDetails.jsx
import React, { useState } from "react";
import Modal from "../../components/ui/Modal";
import EditButton from "../../components/ui/EditButton";
import EmptyStateCard from "../../components/ui/EmptyStateCard";
import ProjectsForm from "./ProjectsForm";

const ProjectsDetails = ({ projects = [] }) => {
  const [isEditOpen, setIsEditOpen] =useState(false);
  
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

export default ProjectsDetails;