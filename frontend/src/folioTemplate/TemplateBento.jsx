import React from 'react';

const TemplateBento = ({ user }) => {
  const {
    name, email, bio, avatar, resume,
    social = [],
    skills = [],
    projects = [],
    education = [],
  } = user || {};

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
        
        {/* --- 1. Profile Block (Large) --- */}
        <div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm flex flex-col justify-center items-start">
          {avatar && <img src={avatar} alt={name} className="w-24 h-24 rounded-full object-cover mb-6 shadow-sm" />}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{name || "Name"}</h1>
          {bio && <p className="text-lg text-gray-600 leading-relaxed">{bio}</p>}
          <div className="mt-6 flex gap-3">
             {email && <a href={`mailto:${email}`} className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">Contact Me</a>}
             {resume && <a href={resume} className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition">Resume</a>}
          </div>
        </div>

        {/* --- 2. Socials Block --- */}
        <div className="bg-indigo-600 rounded-3xl p-8 shadow-sm flex flex-col justify-between text-white">
          <h2 className="text-2xl font-bold mb-4">Connect</h2>
          <div className="space-y-3">
            {social.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noreferrer" className="block hover:opacity-80 transition text-lg font-medium border-b border-indigo-400 pb-1 last:border-0">
                {s.platform} &rarr;
              </a>
            ))}
             {social.length === 0 && <p className="opacity-70">No links added.</p>}
          </div>
        </div>

        {/* --- 3. Skills Block (Tall) --- */}
        <div className="md:row-span-2 bg-white rounded-3xl p-8 shadow-sm overflow-hidden">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium">
                {skill}
              </span>
            ))}
             {skills.length === 0 && <p className="text-gray-500">Add skills to see them here.</p>}
          </div>
        </div>

        {/* --- 4. Projects Block (Wide) --- */}
        <div className="md:col-span-3 bg-gray-900 text-white rounded-3xl p-8 shadow-sm">
           <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {projects.map((p, i) => (
               <div key={i} className="group">
                 <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold group-hover:text-indigo-400 transition">{p.title}</h3>
                    <div className="flex gap-2 text-sm opacity-60">
                        {p.github && <a href={p.github} className="hover:text-white hover:opacity-100">Code</a>}
                        {p.deployed && <a href={p.deployed} className="hover:text-white hover:opacity-100">Live</a>}
                    </div>
                 </div>
                 <p className="text-gray-400 text-sm line-clamp-2">{p.description}</p>
               </div>
             ))}
             {projects.length === 0 && <p className="text-gray-500">No projects added yet.</p>}
           </div>
        </div>

        {/* --- 5. Education Block --- */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="space-y-4">
                {education.map((edu, i) => (
                    <div key={i} className="border-l-2 border-indigo-500 pl-4">
                        <h3 className="font-bold text-gray-800">{edu.degree || edu.level}</h3>
                        <p className="text-sm text-gray-500">{edu.institution} • {edu.yearOfCompletion}</p>
                    </div>
                ))}
                 {education.length === 0 && <p className="text-gray-500">No education details.</p>}
            </div>
        </div>

      </div>
    </div>
  );
};

export default TemplateBento;