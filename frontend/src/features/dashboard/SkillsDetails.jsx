import {useState} from 'react'
import Modal from '../../components/ui/Modal';
import EditButton from '../../components/ui/EditButton';
import SkillsForm from './SkillsForm';


const SkillsDetails = ({ skills = [] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Skills</h1>
          <p className="text-gray-500 mt-1">Manage your technical skills</p>
        </div>
        <EditButton text="Add/Edit Skills" onClick={() => setIsEditOpen(true)} />
      </div>
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        {skills.length === 0 ? (
          <p className="text-gray-500 text-center">No skills added yet. Click 'Edit' to add your first skill.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-700 font-medium px-4 py-2 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Skills">
        <SkillsForm user={{ skills }} onClose={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};

export default SkillsDetails;