/* eslint-disable no-unused-vars */
import React from 'react';

const getYear = (dateString) => {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date.getFullYear() : "Present";
};

const TemplateDev = ({ user }) => {
  const {
    name, email, bio, resume, address, phone,
    social = [],
    skills = [],
    experience = [],
    projects = [],
    education = [],
  } = user || {};

  return (
    <div className="min-h-screen bg-slate-900 text-green-400 font-mono p-4 md:p-10 selection:bg-green-900 selection:text-white">
      <div className="max-w-4xl mx-auto border-2 border-slate-700 rounded-lg bg-slate-950 shadow-2xl overflow-hidden">
        
        {/* Terminal Header */}
        <div className="bg-slate-800 p-3 flex items-center gap-2 border-b-2 border-slate-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-slate-400 text-sm">user@{name ? name.toLowerCase().replace(/\s+/g, '') : 'guest'}:~</div>
        </div>

        <div className="p-6 md:p-10 space-y-12">

          {/* --- Header --- */}
          <header>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="text-green-500 mr-4">&gt;</span>
              {name || "Hello World"}
              <span className="animate-pulse">_</span>
            </h1>
            {bio && <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-slate-700 pl-4 ml-2"> // {bio}</p>}
            
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
               {email && <a href={`mailto:${email}`} className="hover:text-white hover:underline">&lt;{email}/&gt;</a>}
               {phone && <a href={`tel:${phone}`} className="hover:text-white hover:underline">&lt;{phone}/&gt;</a>}
               {resume && <a href={resume} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">[ Download_Resume.pdf ]</a>}
            </div>
          </header>

          {/* --- Socials as Environment Variables --- */}
          {social.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-purple-400 mb-4">./socials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                {social.map((s, i) => (
                  <div key={i}>
                    <span className="text-blue-400">export</span> {s.platform.toUpperCase()} = <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:underline">"{s.url}"</a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- Skills as Array --- */}
          {skills.length > 0 && (
             <section>
              <h2 className="text-xl font-bold text-purple-400 mb-4">./skills</h2>
              <div className="text-slate-300">
                <span className="text-blue-400">const</span> stack = [<br/>
                {skills.map((skill, i) => (
                  <span key={i} className="pl-4 block hover:bg-slate-800/50 cursor-default">
                    "{skill}"{i < skills.length - 1 ? "," : ""}
                  </span>
                ))}
                ];
              </div>
            </section>
          )}

          {/* --- Projects as Functions --- */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-purple-400 mb-6">./projects</h2>
              <div className="grid gap-8">
                {projects.map((p, i) => (
                  <div key={i} className="border border-slate-700 p-5 rounded hover:border-green-500/50 transition-colors bg-slate-900/50">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">function {p.title.replace(/\s+/g, '')}() &#123;</h3>
                    {p.description && <p className="text-slate-400 pl-4 mb-4 max-w-prose">/* {p.description} */</p>}
                    <div className="pl-4 flex gap-4">
                      {p.github && <a href={p.github} className="text-white hover:text-green-400 underline">return gitRepo;</a>}
                      {p.deployed && <a href={p.deployed} className="text-white hover:text-green-400 underline">return liveDemo;</a>}
                    </div>
                    <h3 className="text-xl font-bold text-yellow-400 mt-2">&#125;</h3>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- Experience as Logs --- */}
          {experience.length > 0 && (
             <section>
              <h2 className="text-xl font-bold text-purple-400 mb-6">./experience.log</h2>
              <div className="space-y-6 border-l border-slate-700 pl-6">
                {experience.map((exp, i) => (
                  <div key={i} className="relative">
                     <div className="absolute -left-[29px] top-1 w-3 h-3 bg-slate-900 border-2 border-green-500 rounded-full"></div>
                     <div className="text-sm text-slate-500 mb-1">[{getYear(exp.from)} - {getYear(exp.to)}]</div>
                     <h3 className="text-lg font-bold text-white">{exp.title} <span className="text-green-400">@ {exp.company}</span></h3>
                     {exp.description && <p className="text-slate-400 mt-2 text-sm">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default TemplateDev;