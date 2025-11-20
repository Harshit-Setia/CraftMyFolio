import React from 'react';

// --- Social Icons ---
// (In a real app, you might put these in a separate file)
const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
);
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);
const LinkIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
);

// Helper function to safely format dates
const getYear = (dateString) => {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date.getFullYear() : "Present";
};

// Main Template Component
const TemplateClassic = ({ user }) => {
  // Destructure all possible fields from the user prop, providing defaults.
  const {
    name, email, bio, avatar, resume, address, phone,
    social = [],
    skills = [],
    experience = [],
    projects = [],
    education = [],
    testimonials = [],
  } = user || {};

  return (
    <div className="font-sans bg-white min-h-full text-gray-800">
      
      {/* --- Hero Section --- */}
      <header className="bg-slate-50 text-center p-12 md:p-16">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover border-8 border-white shadow-xl"
          />
        )}
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">{name || "Your Name"}</h1>
        {bio && <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">{bio}</p>}
      </header>

      {/* --- Contact & Info Bar --- */}
      {(email || phone || address) && (
        <div className="bg-slate-800 text-slate-200 p-4">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-indigo-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-indigo-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                {phone}
              </a>
            )}
            {address && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                {address}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Main Content Area --- */}
      <main className="p-4 sm:p-8 md:p-12 max-w-6xl mx-auto space-y-16">
        
        {/* --- Social & Resume Links --- */}
        {(resume || (social && social.length > 0)) && (
          <section className="text-center">
            <div className="flex justify-center flex-wrap gap-4">
              {resume && (
                <a href={resume} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors shadow-lg">
                  View My Resume
                </a>
              )}
              {social.map(s => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-800 font-bold py-3 px-6 rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-lg">
                  {s.platform.toLowerCase() === 'github' ? <GitHubIcon /> : s.platform.toLowerCase() === 'linkedin' ? <LinkedInIcon /> : <LinkIcon />}
                  {s.platform}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* --- Experience Section --- */}
        {(experience && experience.length > 0) && (
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Experience</h2>
            <div className="space-y-8 relative border-l-2 border-slate-200 ml-3 pl-10">
              {experience.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[47px] top-1 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white"></div>
                  <p className="text-sm text-slate-500 font-medium">{getYear(exp.from)} - {getYear(exp.to)}</p>
                  <h3 className="font-semibold text-xl text-indigo-700">{exp.title}</h3>
                  <p className="font-medium text-slate-700">{exp.company} {exp.location && `| ${exp.location}`}</p>
                  {exp.description && <p className="mt-2 text-slate-600 whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Skills Section --- */}
        {(skills && skills.length > 0) && (
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-700 font-medium text-lg px-5 py-2 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* --- Projects Section --- */}
        {(projects && projects.length > 0) && (
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <div key={i} className="bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden">
                  {project.media && project.media.length > 0 && (
                    <img src={project.media[0]} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-indigo-700">{project.title}</h3>
                    {project.description && <p className="mt-2 text-slate-600">{project.description}</p>}
                    <div className="flex gap-4 mt-4">
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-600 font-medium">GitHub</a>}
                      {project.deployed && <a href={project.deployed} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-semibold">Live Demo</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* --- Education Section --- */}
        {(education && education.length > 0) && (
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-xl text-slate-800">{edu.degree || edu.level}</h3>
                  <p className="text-indigo-700 font-medium">{edu.institution}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {edu.fieldOfStudy} {edu.yearOfCompletion && `| ${edu.yearOfCompletion}`}
                  </p>
                  {edu.score && <p className="text-sm text-slate-600 mt-1">Score: {edu.score}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Testimonials Section --- */}
        {(testimonials && testimonials.length > 0) && (
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <blockquote key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <p className="italic text-slate-600 before:content-['“'] before:text-2xl before:font-bold before:text-indigo-600 before:mr-1 after:content-['”'] after:text-2xl after:font-bold after:text-indigo-600 after:ml-1">
                    {t.feedback}
                  </p>
                  <footer className="mt-4 text-right font-semibold text-slate-700">
                    — {t.name}{t.role && `, ${t.role}`}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}
        
      </main>
    </div>
  );
};

export default TemplateClassic;