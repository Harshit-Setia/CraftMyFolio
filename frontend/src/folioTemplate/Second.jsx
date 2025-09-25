import React from "react";

// Helper to safely get the year from a date string
const getYear = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date.getFullYear() : null;
};

// Static data mirroring your Mongoose schema for preview
const staticData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  bio: "Creative Frontend Developer focused on building beautiful and functional user interfaces. Passionate about design systems and web accessibility.",
  avatar: "https://i.pravatar.cc/150?u=janedoe",
  resume: "#",
  social: [
    { id: 1, platform: "GitHub", url: "#" },
    { id: 2, platform: "LinkedIn", url: "#" },
    { id: 3, platform: "Portfolio", url: "#" },
  ],
  skills: ["React", "TypeScript", "Figma", "Storybook", "Testing Library", "CSS-in-JS"],
  experience: [
    {
      id: 1,
      title: "UI Engineer",
      company: "Innovate LLC",
      from: "2021-06-01",
      isCurrent: true,
      description: "Leading the development of a new design system and component library to standardize UI across all company products.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Agency",
      from: "2019-01-15",
      to: "2021-05-30",
      isCurrent: false,
      description: "Built and maintained responsive websites and web applications for a variety of clients using modern frontend technologies.",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Project Showcase",
      description: "A platform for designers and developers to share their work. Features a masonry grid layout and advanced filtering.",
      github: "#",
      deployed: "#",
    },
  ],
  education: [
     {
       id: 1,
       degree: "Master of Fine Arts",
       institution: "Creative University",
       yearOfCompletion: "2018-05-20",
       fieldOfStudy: "Interaction Design",
     },
  ],
};


const Second = () => {
  const { 
    name, email, bio, avatar, social, skills, 
    experience, projects, education, testimonials 
  } = staticData || {};

  return (
    <div className="font-sans bg-slate-50 min-h-full p-4 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto lg:flex lg:gap-12">
        
        {/* Left Column (Sticky Sidebar) */}
        <aside className="lg:w-1/3 lg:sticky lg:top-8 self-start text-center lg:text-left">
          <img src={avatar} alt={name} className="w-32 h-32 rounded-full mx-auto lg:mx-0 object-cover border-4 border-white shadow-lg" />
          <h1 className="mt-6 text-3xl font-bold text-slate-800">{name}</h1>
          {bio && <p className="mt-2 text-slate-600">{bio}</p>}

          <div className="mt-6 space-y-3">
            {email && (
              <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${email}`} className="hover:text-cyan-500 transition-colors">
                  {email}
                </a>
              </div>
            )}
            
            {(social && social.length > 0) && (
              <div className="flex justify-center lg:justify-start gap-4">
                {social.map(s => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 font-medium hover:text-cyan-500 transition-colors">
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {(skills && skills.length > 0) && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-700">Skills</h2>
              <ul className="mt-2 flex flex-wrap justify-center lg:justify-start gap-2">
                {skills.map((skill, i) => (
                  <li key={i} className="bg-cyan-100 text-cyan-800 text-sm font-medium px-3 py-1 rounded-full">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Column (Main Content) */}
        <main className="lg:w-2/3 mt-12 lg:mt-0 space-y-12">

          {/* ✅ RESTORED: Experience Section */}
          {(experience && experience.length > 0) && (
            <section>
              <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-cyan-400 pb-2">Work Experience</h2>
              <div className="mt-4 space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-lg text-slate-700">{exp.title}</h3>
                      <p className="text-sm text-slate-500">{getYear(exp.from)} - {exp.isCurrent ? "Present" : getYear(exp.to)}</p>
                    </div>
                    <p className="text-md text-slate-600">{exp.company}</p>
                    {exp.description && <p className="mt-2 text-slate-500">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ✅ RESTORED: Projects Section */}
          {(projects && projects.length > 0) && (
            <section>
              <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-cyan-400 pb-2">Projects</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(p => (
                  <div key={p.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-lg text-slate-700">{p.title}</h3>
                    <p className="mt-1 text-slate-600">{p.description}</p>
                    <div className="mt-4 flex gap-4 text-cyan-600 font-semibold text-sm">
                      {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>}
                      {p.deployed && <a href={p.deployed} target="_blank" rel="noopener noreferrer" className="hover:underline">Live Demo</a>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ✅ RESTORED: Education Section */}
          {(education && education.length > 0) && (
             <section>
              <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-cyan-400 pb-2">Education</h2>
              <div className="mt-4 space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-lg text-slate-700">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.institution} - {getYear(edu.yearOfCompletion)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ✅ RESTORED: Testimonials Section */}
          {(testimonials && testimonials.length > 0) && (
            <section>
              <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-cyan-400 pb-2">Testimonials</h2>
              <div className="mt-4 space-y-4">
                {testimonials.map(t => (
                  <blockquote key={t.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 italic">
                    <p className="text-slate-600">"{t.feedback}"</p>
                    <footer className="text-right mt-2 text-sm text-slate-500 not-italic">— {t.name}, {t.role}</footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}
          
        </main>
      </div>
    </div>
  );
};

export default Second;