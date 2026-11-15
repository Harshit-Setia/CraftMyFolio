import React from 'react';
import { BulletList } from './multipage/shared.jsx';
import { Terminal, Cpu, Shield, Network, Database, Zap, Radio, AlertCircle, CornerDownRight } from 'lucide-react';

const TemplateCyberpunk = ({ user }) => {
  const { name, bio, avatar, skills = [], experience = [], projects = [], social = [], education = [], testimonials = [] } = user || {};

  const CyberCard = ({ children, title, icon: Icon, className = "" }) => (
    <div className={`relative bg-black/80 border border-green-500/30 p-6 overflow-hidden group ${className}`}>
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-400"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-400"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-400"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-400"></div>
      
      
      {title && (
        <h2 className="text-green-400 font-mono text-sm uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-green-500/30 pb-2">
          {Icon && <Icon size={16} className="animate-pulse" />}
          <span className="relative top-[1px]">{title}://</span>
        </h2>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050a0e] text-green-100 font-mono selection:bg-green-500/30 selection:text-white p-4 md:p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050a0e] to-black">
        
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        
        <div className="md:col-span-12 flex justify-between items-center text-xs text-green-600 border-b border-green-900/50 pb-2 mb-4 uppercase tracking-widest">
          <div className="flex items-center gap-2">
             <Radio size={12} className="text-red-500 animate-pulse"/> <span className="text-green-400">Net_Status: Connected</span>
          </div>
          <div>
            User ID: {name ? name.toUpperCase().replace(/\s/g, '_') : 'UNKNOWN_ENTITY'}
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
          
          <CyberCard title="IDENTITY_MATRIX" icon={Shield}>
            <div className="flex items-start gap-6">
              {avatar ? (
                <div className="relative w-24 h-24 shrink-0">
                  <div className="absolute inset-0 border-2 border-red-500/50 translate-x-1 translate-y-1"></div>
                  <div className="absolute inset-0 border-2 border-blue-500/50 -translate-x-1 -translate-y-1"></div>
                  <img src={avatar} alt={name} className="relative w-full h-full object-cover grayscale contrast-125 border-2 border-green-400" />
                </div>
              ) : (
                 <div className="w-24 h-24 border-2 border-green-400 flex items-center justify-center bg-black"><AlertCircle size={32} className="text-red-500 opacity-50"/></div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-green-400 mb-2 tracking-tight glitch-text">{name}</h1>
                <p className="text-sm text-green-200/70 leading-tight">{bio || "System Integrity Check... OK. Bio missing."}</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard title="LOADED_MODULES" icon={Cpu}>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-green-900/20 border border-green-500/40 text-green-300 hover:bg-green-500 hover:text-black transition-colors cursor-crosshair">
                  [{skill}]
                </span>
              ))}
            </div>
             {skills.length === 0 && <p className="text-xs text-red-400">[ERR: No modules found]</p>}
          </CyberCard>

          <CyberCard title="NETWORK_UPLINKS" icon={Network}>
            <div className="flex flex-col gap-2">
              {social.map((s, i) => (
                <a key={i} href={s.url} className="flex items-center gap-3 text-sm text-green-300 hover:text-green-400 hover:translate-x-2 transition-all group">
                  <CornerDownRight size={14} className="text-green-600 group-hover:text-green-400"/>
                  <span className="uppercase">/connect/{s.platform}</span>
                </a>
              ))}
            </div>
             {social.length === 0 && <p className="text-xs text-red-400">OFFLINE MODE</p>}
          </CyberCard>

        </div>


        <div className="md:col-span-8 space-y-6">
          
          <CyberCard title="SYSTEM_LOGS [Experience]" icon={Terminal}>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l border-green-900/50 group">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 bg-green-500/50 group-hover:bg-green-400 rotate-45 transition-colors"></div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h3 className="text-lg font-bold text-green-400 uppercase">{exp.title}</h3>
                    <span className="text-xs font-bold text-green-700">
                       [{new Date(exp.from).getFullYear()}.{new Date(exp.from).getMonth()+1} -- {exp.isCurrent ? 'ACTIVE' : `${new Date(exp.to).getFullYear()}.${new Date(exp.to).getMonth()+1}`}]
                    </span>
                  </div>
                  <p className="text-sm text-green-300 mb-2">@ {exp.company}</p>
                  <BulletList text={exp.description} className="space-y-1 text-sm text-green-200/60 leading-relaxed font-light" itemClassName="pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-green-500" />
                </div>
              ))}
               {experience.length === 0 && <p className="text-xs text-green-200/50">Logs purged.</p>}
            </div>
          </CyberCard>
          
          <CyberCard title="EXECUTED_PAYLOADS [Projects]" icon={Database}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p, i) => (
                <div key={i} className="bg-black border border-green-500/20 p-4 hover:border-green-400 transition-colors group relative overflow-hidden">
                   <div className="absolute inset-0 bg-green-400/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 pointer-events-none"></div>

                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <h3 className="text-base font-bold text-green-300 group-hover:text-green-100 uppercase truncate">{p.title}</h3>
                    {p.deployed && <Zap size={14} className="text-yellow-400 animate-pulse shrink-0"/>}
                  </div>
                  
                  <BulletList text={p.description} className="text-xs text-green-200/50 mb-4 relative z-10 space-y-1" itemClassName="pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-green-500" />
                  
                  <div className="flex gap-4 text-xs font-bold relative z-10">
                    {p.github && (
                      <a href={p.github} className="uppercase text-green-500 hover:text-green-300 flex items-center gap-1">
                        [<Terminal size={10}/> Source]
                      </a>
                    )}
                    {p.deployed && (
                      <a href={p.deployed} className="uppercase text-green-500 hover:text-green-300 flex items-center gap-1">
                        [<Zap size={10}/> Uplink]
                      </a>
                    )}
                  </div>
                </div>
              ))}
               {projects.length === 0 && <p className="text-xs text-green-200/50">No payloads deployed.</p>}
            </div>
          </CyberCard>


          {education.length > 0 && (
            <CyberCard title="ACADEMIC_RECORDS" icon={Database}>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="relative pl-6 border-l border-green-900/50">
                    <h3 className="text-base font-bold text-green-400 uppercase">{edu.degree || edu.level}</h3>
                    <p className="text-sm text-green-300">{edu.institution}</p>
                    <p className="text-xs text-green-700">
                      {[edu.fieldOfStudy, edu.yearOfCompletion, edu.status, edu.score && `Score ${edu.score}`].filter(Boolean).join(' // ')}
                    </p>
                  </div>
                ))}
              </div>
            </CyberCard>
          )}

          {testimonials.length > 0 && (
            <CyberCard title="INCOMING_TRANSMISSIONS" icon={Radio}>
              <div className="space-y-4">
                {testimonials.map((item, i) => (
                  <figure key={i} className="border border-green-500/20 p-4 bg-black">
                    <blockquote className="text-sm text-green-200/80 italic">"{item.feedback}"</blockquote>
                    <figcaption className="mt-2 text-xs text-green-600 uppercase">
                      -- {item.name}{item.role && ` / ${item.role}`}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </CyberCard>
          )}

        </div>
      </div>
    </div>
  );
};

export default TemplateCyberpunk;