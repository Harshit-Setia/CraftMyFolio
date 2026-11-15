import React from 'react';
import { BulletList } from './multipage/shared.jsx';
import { MoveRight, Github, Globe, Star, Box } from 'lucide-react';

const TemplateNeoPop = ({ user }) => {
  const { name, bio, skills = [], experience = [], projects = [], social = [], education = [], testimonials = [] } = user || {};

  const NeoCard = ({ children, className = "", color = "bg-white" }) => (
    <div className={`${color} border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffbf0] text-black font-sans p-6 md:p-12 selection:bg-pink-400 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-16">

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-1 space-y-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">
              {name || "CREATOR"}
            </h1>
            <NeoCard color="bg-yellow-300" className="inline-block rotate-1">
               <p className="text-xl font-bold font-mono">{bio}</p>
            </NeoCard>
            
            <div className="flex gap-4 pt-4">
              {social.map((s, i) => (
                <a key={i} href={s.url} className="px-6 py-2 bg-pink-400 border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-300 hover:shadow-none hover:translate-y-1 transition-all">
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-y-2 border-black py-4 bg-black overflow-hidden">
          <div className="flex flex-wrap gap-x-8 gap-y-3 px-4 text-white font-mono font-bold uppercase tracking-widest">
            {skills.map((s, i) => (
              <span key={i} className="flex items-center gap-2">
                <Star size={16} className="text-yellow-400 fill-yellow-400"/> {s}
              </span>
            ))}
          </div>
        </div>

        <section>
          <div className="flex items-center gap-4 mb-8">
             <div className="w-4 h-4 bg-black"></div>
             <h2 className="text-4xl font-black uppercase">Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <NeoCard key={i} color="bg-blue-300" className="flex flex-col h-full justify-between">
                 <div>
                    <h3 className="text-2xl font-black mb-2 uppercase border-b-2 border-black pb-2 inline-block">{p.title}</h3>
                    <BulletList text={p.description} className="text-sm font-bold mt-2 mb-4 leading-relaxed space-y-1" itemClassName="pl-4 relative before:content-['→'] before:absolute before:left-0" />
                 </div>
                 <div className="flex gap-4 text-sm font-black uppercase">
                    {p.github && <a href={p.github} className="flex items-center gap-1 hover:underline"><Github size={16}/> Code</a>}
                    {p.deployed && <a href={p.deployed} className="flex items-center gap-1 hover:underline"><Globe size={16}/> Live</a>}
                 </div>
              </NeoCard>
            ))}
          </div>
        </section>

        <section>
           <div className="flex items-center gap-4 mb-8">
             <div className="w-4 h-4 bg-black"></div>
             <h2 className="text-4xl font-black uppercase">XP_Log</h2>
          </div>
          
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <NeoCard key={i} className="flex flex-col md:flex-row justify-between items-start gap-4" color="bg-white">
                 <div className="flex-1">
                    <h3 className="text-xl font-black">{exp.title}</h3>
                    <p className="font-bold text-gray-500">@{exp.company}</p>
                    <BulletList text={exp.description} className="mt-2 font-medium border-l-4 border-yellow-400 pl-3 space-y-1" itemClassName="relative" />
                 </div>
                 <div className="bg-black text-white px-3 py-1 font-mono text-sm font-bold shadow-[4px_4px_0px_0px_#9ca3af]">
                    {new Date(exp.from).getFullYear()} - {exp.isCurrent ? 'NOW' : new Date(exp.to).getFullYear()}
                 </div>
              </NeoCard>
            ))}
          </div>
        </section>


        {education.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-4 h-4 bg-black"></div>
              <h2 className="text-4xl font-black uppercase">School_Days</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {education.map((edu, i) => (
                <NeoCard key={i} color="bg-pink-300">
                  <h3 className="text-xl font-black uppercase">{edu.degree || edu.level}</h3>
                  <p className="font-bold">{edu.institution}</p>
                  <p className="mt-2 font-mono text-sm font-bold">
                    {[edu.fieldOfStudy, edu.yearOfCompletion, edu.status, edu.score && `Score ${edu.score}`].filter(Boolean).join(' / ')}
                  </p>
                </NeoCard>
              ))}
            </div>
          </section>
        )}

        {testimonials.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-4 h-4 bg-black"></div>
              <h2 className="text-4xl font-black uppercase">Hype</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((item, i) => (
                <NeoCard key={i} color="bg-yellow-300">
                  <p className="text-lg font-bold">"{item.feedback}"</p>
                  <p className="mt-3 font-mono text-sm font-black uppercase">
                    — {item.name}{item.role && `, ${item.role}`}
                  </p>
                </NeoCard>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default TemplateNeoPop;