import { useState } from "react";
import SocialLinksForm from "./SocialLinksForm";
import { SocialIcon } from "../../components/ui/icons";
import EditButton from "../../components/ui/EditButton";
import SectionHeader from "./SectionHeader";
import Modal from "../../components/ui/Modal";

const SocialLinksDetails = ({ social = [] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <div>
      <SectionHeader title={"Social Links"} subtitle={"Manage your professional links"} action={<EditButton text="Add/Edit Links" onClick={() => setIsEditOpen(true)} />} />
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        {social.length === 0 ? (
          <p className="text-gray-500 text-center">
            No social links added yet. Click 'Edit' to add your links.
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {social.map((link, index) => (
              <a
                key={index}
                href={
                  link.url.startsWith("http://") ||
                  link.url.startsWith("https://")
                    ? link.url
                    : `https://${link.url}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <SocialIcon platform={link.platform} />
                <span className="ml-3 font-medium text-gray-800">
                  {link.platform}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Social Links"
      >
        <SocialLinksForm
          user={{ social }}
          onClose={() => setIsEditOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default SocialLinksDetails;
