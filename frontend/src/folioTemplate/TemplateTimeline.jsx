import React from 'react';
import { Briefcase, GraduationCap, User, Github, Linkedin, Link as LinkIcon } from 'lucide-react';

const TemplateTimeline = ({ user }) => {
  const { name, bio, social = [], education = [], experience = [] } = user || {};

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100 font-sans selection:bg-purple-500 selection:text-white pb-20">
      
      {/* Hero Header */}
      <header className="py-20 text-center px-4 bg-gradient-to-b from-gray-900 to-[#111827]">
        <div className="w-20 h-1 bg-purple-500 mx-auto mb-8 rounded-full"></div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">{name}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">{bio}</p>
        <div className="flex justify-center gap-6">
          {social.map((s, i) => (
            <a key={i} href={s.url} className="text-gray-400 hover:text-purple-400 transition transform hover:scale-110">
               {s.platform.toLowerCase().includes('github') ? <Github /> : 
                s.platform.toLowerCase().includes('linkedin') ? <Linkedin /> : <LinkIcon />}
            </a>
          ))}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        
        {/* --- Timeline Container --- */}
        <div className="relative">
          {/* The Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800"></div>

          {/* Section: Experience */}
          <div className="mb-16">
            <h2 className="text-center text-2xl font-bold text-white mb-12 bg-[#111827] relative z-10 w-max mx-auto px-4">Experience</h2>
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Dot on Line */}
                  <div className="absolute left-4 md:left-1/2 -ml-[9px] top-0 w-5 h-5 rounded-full border-4 border-[#111827] bg-purple-500 z-10"></div>
                  
                  {/* Empty space for opposite side */}
                  <div className="flex-1 hidden md:block"></div>

                  {/* Content Card */}
                  <div className="flex-1 ml-12 md:ml-0">
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition">
                      <div className="flex items-center gap-2 mb-2 text-purple-400">
                        <Briefcase size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">{exp.company}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <span className="text-xs text-gray-500 block mb-3">
                         {new Date(exp.from).toLocaleDateString()} - {exp.isCurrent ? 'Present' : new Date(exp.to).toLocaleDateString()}
                      </span>
                      <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="mb-16">
            <h2 className="text-center text-2xl font-bold text-white mb-12 bg-[#111827] relative z-10 w-max mx-auto px-4">Education</h2>
            <div className="space-y-12">
              {education.map((edu, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  <div className="absolute left-4 md:left-1/2 -ml-[9px] top-0 w-5 h-5 rounded-full border-4 border-[#111827] bg-blue-500 z-10"></div>
                  <div className="flex-1 hidden md:block"></div>

                  <div className="flex-1 ml-12 md:ml-0">
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition">
                       <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <GraduationCap size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">{edu.institution}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{edu.degree || edu.level}</h3>
                      <div className="flex justify-between text-xs text-gray-500 mt-3 border-t border-gray-700 pt-3">
                        <span>Completed: {edu.yearOfCompletion}</span>
                        <span>Score: {edu.score}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TemplateTimeline;