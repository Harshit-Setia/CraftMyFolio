import React from "react";

// Helper function to safely format dates
const getYear = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date.getFullYear() : null;
};

const Third = ({ user }) => {
  // Destructure all possible fields from the user prop.
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
    <div className="font-sans bg-white min-h-full">
      
      {/* Hero Section */}
      <header className="bg-slate-100 text-center p-8 md:p-12">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-36 h-36 rounded-full mx-auto object-cover border-8 border-white shadow-xl"
          />
        )}
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-800">{name}</h1>
        {bio && <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">{bio}</p>}
      </header>

      {/* Contact & Info Bar */}
      <div className="bg-slate-800 text-slate-300 p-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
          {email && (
            <div className="flex items-center gap-2">
              <a href={`mailto:${email}`} className="hover:text-emerald-400">{email}</a>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2">
              <span>&#8226;</span>
              <a href={`tel:${phone}`} className="hover:text-emerald-400">{phone}</a>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-2">
              <span>&#8226;</span>
              <span>{address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="p-4 sm:p-8 max-w-5xl mx-auto space-y-12">
        {/* Social & Resume Links */}
        <section className="text-center">
            <div className="flex justify-center flex-wrap gap-4">
              {resume && <a href={resume} className="bg-emerald-500 text-white font-bold py-2 px-5 rounded-full hover:bg-emerald-600 transition-colors">View Resume</a>}
              {(social && social.length > 0) && social.map(s => (
                <a key={s.platform} href={s.url} className="bg-slate-200 text-slate-800 font-bold py-2 px-5 rounded-full hover:bg-slate-300 transition-colors">{s.platform}</a>
              ))}
            </div>
        </section>

        {/* Experience Section */}
        {(experience && experience.length > 0) && (
          <section>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Experience</h2>
            <div className="space-y-6 relative border-l-2 border-slate-200 pl-8">
              {experience.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[38px] top-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white"></div>
                  <h3 className="font-semibold text-xl text-slate-700">{exp.title}</h3>
                  <p className="font-medium text-slate-600">{exp.company}</p>
                  <p className="text-sm text-slate-500">{getYear(exp.from)} - {exp.isCurrent ? "Present" : getYear(exp.to)}</p>
                  {exp.description && <p className="mt-2 text-slate-600">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {(skills && skills.length > 0) && ( <section> ... </section> )}

        {/* Projects Section */}
        {(projects && projects.length > 0) && ( <section> ... </section> )}
        
        {/* ✅ ADDED: Education Section */}
        {(education && education.length > 0) && (
          <section>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-xl text-slate-700">{edu.degree || edu.level}</h3>
                  <p className="text-slate-600">{edu.institution}</p>
                  <p className="text-sm text-slate-500">{edu.yearOfCompletion}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ✅ ADDED: Testimonials Section */}
        {(testimonials && testimonials.length > 0) && (
          <section>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <blockquote key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <p className="italic text-slate-600 before:content-['“'] after:content-['”']">
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

export default Third;