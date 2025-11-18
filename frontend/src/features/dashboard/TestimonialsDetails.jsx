import {useState} from 'react'
import TestimonialsForm from './TestimonialsForm';
import Modal from '../../components/ui/Modal';
import EditButton from '../../components/ui/EditButton';
import EmptyStateCard from '../../components/ui/EmptyStateCard';


const TestimonialsDetails = ({ testimonials = [] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage your received testimonials</p>
        </div>
        <EditButton text="Add/Edit Testimonials" onClick={() => setIsEditOpen(true)} />
      </div>
      {testimonials.length === 0 ? (
        <EmptyStateCard 
          title="No Testimonials Added"
          message="You haven't added any testimonials yet. Click 'Add/Edit Testimonials' to start."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <p className="text-gray-700 italic">"{item.feedback}"</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Testimonials">
        <TestimonialsForm user={{ testimonials }} onClose={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};


export default TestimonialsDetails;
