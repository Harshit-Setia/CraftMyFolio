import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';

const TemplateResume = ({ user }) => {
  const {
    name, email, phone, address, bio, avatar, resume,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    social = []
  } = user || {};

  // Helper to format dates
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-12 font-sans selection:bg-slate-200">
      <div className="max-w-4xl mx-auto border border-slate-100 shadow-2xl rounded-sm overflow-hidden bg-white">
        
        {/* Top Header / Contact Bar */}
        <header className="bg-slate-900 text-white p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2 uppercase">{name}</h1>
              <p className="text-slate-400 max-w-lg text-sm leading-relaxed mb-6">{bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-xs font-mono opacity-80">
                <div className="flex items-center gap-2"><Mail size={14}/> {email}</div>
                <div className="flex items-center gap-2"><Phone size={14}/> {phone}</div>
                <div className="flex items-center gap-2"><MapPin size={14}/> {address}</div>
                {resume && (
                  <a href={resume} className="flex items-center gap-2 hover:text-blue-400 transition">
                    <Globe size={14}/> Download Full CV
                  </a>
                )}
              </div>
            </div>
            {avatar && (
              <img src={avatar} alt={name} className="w-24 h-24 rounded-none border-2 border-white/20 p-1 object-cover" />
            )}
          </div>
        </header>

        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-10">
            
            {/* Experience Section */}
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-6">Professional Experience</h2>
              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold text-slate-800">{exp.title}</h3>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {formatDate(exp.from)} — {exp.isCurrent ? "Present" : formatDate(exp.to)}
                      </span>
                    </div>
                    <p className="text-blue-600 font-semibold text-sm mb-2">{exp.company} <span className="text-slate-400 font-normal">| {exp.location}</span></p>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-6">Notable Projects</h2>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((proj, i) => (
                  <div key={i} className="border-l-2 border-slate-100 pl-4 hover:border-slate-900 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-800">{proj.title}</h3>
                      {proj.deployed && <a href={proj.deployed} className="text-slate-400 hover:text-black"><ExternalLink size={14}/></a>}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{proj.description}</p>
                    {proj.github && (
                      <a href={proj.github} className="text-[10px] font-mono text-slate-400 flex items-center gap-1 hover:text-black">
                        <Github size={12}/> source_code
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-10">
            
            {/* Skills Section */}
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-4">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="text-xs border border-slate-200 px-2 py-1 text-slate-600 font-medium hover:bg-slate-50 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold uppercase text-slate-500">{edu.level}</p>
                    <p className="text-sm font-bold text-slate-800">{edu.degree || edu.fieldOfStudy}</p>
                    <p className="text-xs text-slate-600">{edu.institution}</p>
                    <div className="flex justify-between mt-1 text-[10px] font-mono text-slate-400 uppercase">
                      <span>{edu.yearOfCompletion}</span>
                      <span>Score: {edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Social Section */}
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-4">Social</h2>
              <div className="space-y-2">
                {social.map((s, i) => (
                  <a key={i} href={s.url} className="flex items-center gap-3 text-xs text-slate-600 hover:text-blue-600 transition group">
                    <span className="p-1.5 bg-slate-50 rounded group-hover:bg-blue-50 transition-colors">
                      {s.platform.toLowerCase().includes('github') && <Github size={14}/>}
                      {s.platform.toLowerCase().includes('linkedin') && <Linkedin size={14}/>}
                      {!s.platform.toLowerCase().includes('github') && !s.platform.toLowerCase().includes('linkedin') && <Globe size={14}/>}
                    </span>
                    {s.platform}
                  </a>
                ))}
              </div>
            </section>

          </div>
        </div>
        
        {/* Print Footer */}
        <footer className="bg-slate-50 p-6 text-center border-t border-slate-100">
           <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Generated via {name}'s Digital Portfolio</p>
        </footer>
      </div>
    </div>
  );
};

export default TemplateResume;