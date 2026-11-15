import { Terminal, Code, ExternalLink, Github, Mail, FileText, Twitter, Linkedin, Coffee, Monitor, Layers, Cpu, DecimalsArrowLeft } from 'lucide-react';
import { telHref } from './multipage/helpers.js';
import { BulletList } from './multipage/shared.jsx';
import { ExperienceSection, EducationSection, TestimonialsSection } from './shared/DataSections.jsx';

const neoC = {
  section: 'bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
  heading: 'text-3xl font-black mb-6 uppercase bg-yellow-300 border-2 border-black inline-block px-2',
  list: 'space-y-6',
  card: 'border-l-4 border-black pl-4',
  title: 'text-xl font-black uppercase',
  sub: 'font-bold text-gray-600',
  meta: 'font-mono text-sm font-bold bg-black text-white inline-block px-2 py-0.5 my-1',
  bullets: 'mt-2 space-y-1 font-medium',
  bullet: "pl-5 relative before:content-['→'] before:absolute before:left-0 before:font-black",
  quote: 'text-lg font-bold',
};

const TemplateNeoBrutal = ({ user }) => {
  const { name, bio, avatar, phone, social = [], skills = [], projects = [] } = user || {};
  const current = (user?.experience || []).find((e) => e.isCurrent);

  return (
    <div className="min-h-screen bg-[#FFDEE9] bg-gradient-to-b from-[#fff1eb] to-[#ace0f9] p-4 sm:p-8 font-sans text-black">
      <div className="max-w-5xl mx-auto">
        
        <div className="bg-white border-4 border-black p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-8 items-center md:items-start transform hover:-translate-y-1 transition-transform">
          {avatar && (
            <div className="w-32 h-32 shrink-0 bg-yellow-300 border-4 border-black overflow-hidden rounded-full relative">
               <img src={avatar} alt={name} className="w-full h-full object-cover grayscale contrast-125" />
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            {current && (
              <div className="inline-block bg-purple-400 border-2 border-black px-3 py-1 font-bold text-xs mb-2 uppercase tracking-wider transform -rotate-2">
                {current.title} @ {current.company}
              </div>
            )}
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4 italic tracking-tighter">
              {name}
            </h1>
            <p className="text-xl font-bold border-l-4 border-black pl-4 bg-yellow-200 p-2 inline-block transform rotate-1">
              {bio}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              {social.map((s, i) => (
                <a key={i} href={s.url} className="px-6 py-2 bg-white border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-2 active:shadow-none">
                  {s.platform}
                </a>
              ))}
              {phone && (
                <a href={telHref(phone)} className="px-6 py-2 bg-yellow-300 border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                  {phone}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4">
            <div className="bg-[#FD9413] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-3xl font-black mb-6 uppercase bg-white border-2 border-black inline-block px-2">Toolbox</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-white border-2 border-black px-3 py-1 font-bold text-sm hover:bg-blue-300 transition cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
             {projects.map((p, i) => (
               <div key={i} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-50 transition">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black uppercase underline decoration-4 decoration-[#FD9413]">{p.title}</h3>
                    <div className="flex gap-2">
                        {p.github && <a href={p.github} className="bg-gray-200 p-2 border-2 border-black hover:bg-gray-300"><Github size={20}/></a>}
                        {p.deployed && <a href={p.deployed} className="bg-green-300 p-2 border-2 border-black hover:bg-green-400"><ExternalLink size={20}/></a>}
                    </div>
                 </div>
                 <BulletList text={p.description} className="space-y-1 font-medium text-lg" itemClassName="pl-5 relative before:content-['→'] before:absolute before:left-0 before:font-black" />
               </div>
             ))}
          </div>

        </div>

        <div className="mt-8 space-y-8">
          <ExperienceSection user={user} c={neoC} title="Experience" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EducationSection user={user} c={neoC} />
            <TestimonialsSection user={user} c={neoC} title="Kudos" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateNeoBrutal;