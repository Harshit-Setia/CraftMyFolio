import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { templateInfo } from "../folioTemplate/index.js";
import { sanitizePublicUser } from "../folioTemplate/sanitize.js";

const API_BASE_URL = `${import.meta.env.VITE_BE_URL}`; 

const FullPageLoader = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
    <p className="text-xl font-medium text-gray-600">Loading Portfolio...</p>
  </div>
);

const ErrorView = ({ message }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Portfolio Not Found</h2>
    <p className="text-gray-500 max-w-md mx-auto">{message || "The link you followed may be broken, or the portfolio may have been removed."}</p>
  </div>
);

const fetchPublicFolio = async (slug) => {
  const res = await fetch(`${API_BASE_URL}/folio/${slug}`);
  
  if (!res.ok) {
    throw new Error('Portfolio not found');
  }
  
  return res.json();
};

const PublicFolioPage = () => {
  const { slug } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['folio', slug], 
    queryFn: () => fetchPublicFolio(slug),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (error) {
    return <ErrorView message={error.message} />;
  }

  const { template_id, user_id: user } = data;

  const selectedTemplate = templateInfo.find(t => t.id === template_id);
  const TemplateComponent = selectedTemplate?.component;

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-10">
        <div>
          <h1 className="text-3xl font-bold text-red-600">System Error</h1>
          <p className="text-gray-600 mt-2">
            The template <code>{template_id}</code> could not be loaded.
          </p>
        </div>
      </div>
    );
  }
  return <TemplateComponent user={sanitizePublicUser(user)} basePath={`/folio/${slug}`} />;
};

export default PublicFolioPage;