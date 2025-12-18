import React from 'react';
import { AlertTriangle, X, Zap, ArrowRight, Mail, MapPin, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

const TemplateHazard = ({ user }) => {
  const { name, bio, email, address, experience = [], projects = [], skills = [], social = [] } = user || {};

  return (
    <div className="min-h-screen bg-yellow-400 font-mono text-black p-0 overflow-x-hidden selection:bg-black selection:text-yellow-400">
      
      {/* --- SCROLLING MARQUEE HEADER --- */}
      <div className="bg-black text-yellow-400 py-3 overflow-hidden border-b-4 border-black">
        <div className="whitespace-nowrap animate-marquee font-black text-xl tracking-widest uppercase flex gap-8">
           {[...Array(10)].map((_, i) => (
             <span key={i} className="flex items-center gap-4">
               <AlertTriangle size={20} fill="yellow" className="text-black"/> 
               WARNING: HIGH VOLTAGE TALENT DETECTED // AUTHORIZED PERSONNEL ONLY
             </span>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen border-b-4 border-black">
        
        {/* --- LEFT SIDE: THE MANIFESTO --- */}
        <div className="md:col-span-8 p-8 md:p-20 border-r-4 border-black flex flex-col justify-center relative bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]">
          
          <h1 className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter break-words z-10">
            {name ? name.split(' ')[0] : 'HARD'}
            <br />
            {name && name.split(' ')[1] ? name.split(' ')[1] : 'CORE'}
          </h1>
          
          <div className="mt-12 bg-black text-yellow-400 p-6 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] border-2 border-white max-w-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <p className="text-xl md:text-2xl font-bold uppercase leading-tight">{bio}</p>
          </div>

          {/* Decorative Diagonal Stripes BG */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)'}}>
          </div>
        </div>

        {/* --- RIGHT SIDE: SKILL STACK --- */}
        <div className="md:col-span-4 bg-black text-yellow-400 border-t-4 md:border-t-0 border-black flex flex-col">
          <div className="p-6 bg-yellow-500 text-black font-black uppercase border-b-4 border-black text-center">
            Operator Toolkit
          </div>
          {skills.map((skill, i) => (
            <div key={i} className="flex-1 flex items-center justify-between px-6 border-b border-yellow-400/30 hover:bg-yellow-400 hover:text-black transition-colors cursor-crosshair group py-4 md:py-0">
              <span className="text-xl md:text-2xl font-black uppercase tracking-widest">{skill}</span>
              <X size={24} className="opacity-0 group-hover:opacity-100"/>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION: THE PROJECTS (GRID OF DOOM) --- */}
      <div className="bg-black py-20 px-4 md:px-12 border-b-4 border-black">
        <h2 className="text-6xl md:text-8xl font-black text-stroke-yellow text-transparent mb-12 uppercase">
          Deployed<br/>Warheads
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-yellow-400">
          {projects.map((p, i) => (
            <div key={i} className="group relative border-b-4 md:border-b-0 md:border-r-4 border-yellow-400 min-h-[400px] bg-neutral-900 p-8 flex flex-col justify-between hover:bg-yellow-400 hover:text-black transition-colors duration-300">
               
               {/* Background noise on hover */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]"></div>

               <div>
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="text-3xl md:text-4xl font-black uppercase leading-none">{p.title}</h3>
                   <span className="text-xl font-bold border-2 border-current px-2 rounded-full">0{i+1}</span>
                 </div>
                 <p className="text-lg font-medium opacity-80 max-w-md">{p.description}</p>
               </div>

               <div className="mt-8">
                 {p.deployed ? (
                   <a href={p.deployed} className="inline-flex items-center gap-2 text-xl font-black uppercase hover:underline decoration-4 underline-offset-4">
                     Initialize <Zap size={24} fill="currentColor"/>
                   </a>
                 ) : (
                   <span className="text-xl font-black uppercase line-through opacity-50">Classified</span>
                 )}
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION: EXPERIENCE (RAW LIST) --- */}
      <div className="p-8 md:p-20 bg-yellow-400 text-black">
        <h2 className="text-6xl font-black uppercase mb-12 border-b-4 border-black inline-block">Battle Logs</h2>
        {experience.map((exp, i) => (
          <div key={i} className="border-t-4 border-black py-12 flex flex-col md:flex-row gap-8 items-start hover:bg-black hover:text-yellow-400 hover:px-8 transition-all duration-300 -mx-0 hover:-mx-4 group">
             <div className="md:w-1/4">
               <span className="bg-black text-yellow-400 px-4 py-2 text-xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] group-hover:bg-yellow-400 group-hover:text-black group-hover:shadow-none transition-all">
                 {new Date(exp.from).getFullYear()}
               </span>
             </div>
             <div className="md:w-3/4">
               <h3 className="text-4xl md:text-5xl font-black uppercase mb-2">{exp.title}</h3>
               <h4 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2">
                 @ {exp.company}
               </h4>
               <p className="text-lg font-bold leading-relaxed max-w-3xl opacity-80 group-hover:opacity-100">{exp.description}</p>
             </div>
          </div>
        ))}
        <div className="border-t-4 border-black"></div>
      </div>

      {/* --- SECTION: CONTACT (COMMUNICATION LINK) --- */}
      <div className="relative bg-black text-yellow-400 border-t-4 border-black overflow-hidden">
        
        {/* Warning Stripes Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{backgroundImage: 'repeating-linear-gradient(-45deg, #EAB308 0, #EAB308 20px, transparent 20px, transparent 40px)'}}>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto p-8 md:p-24 text-center">
           <div className="inline-block border-2 border-yellow-400 px-4 py-1 mb-8 uppercase font-bold tracking-[0.2em] animate-pulse">
              System Alert: Link Available
           </div>
           
           <h2 className="text-5xl md:text-7xl font-black uppercase mb-12">
              Establish<br/>Connection
           </h2>

           {/* Giant Email Button */}
           {email && (
             <a href={`mailto:${email}`} className="group relative inline-block mb-16">
               <div className="absolute inset-0 bg-yellow-600 transform translate-x-4 translate-y-4"></div>
               <div className="relative bg-yellow-400 text-black border-4 border-white p-6 md:p-10 text-3xl md:text-6xl font-black uppercase hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-200 flex items-center justify-center gap-4 break-all">
                  <Mail size={48} className="hidden md:block"/>
                  {email}
               </div>
             </a>
           )}

           {/* Socials Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {social.map((s, i) => (
                <a key={i} href={s.url} className="bg-neutral-900 border-2 border-yellow-400/30 p-4 flex flex-col items-center justify-center hover:bg-yellow-400 hover:text-black hover:border-white transition-all duration-300 group h-32">
                   {/* Icon Logic */}
                   {s.platform.toLowerCase().includes('github') && <Github size={32} className="mb-2"/>}
                   {s.platform.toLowerCase().includes('linkedin') && <Linkedin size={32} className="mb-2"/>}
                   {s.platform.toLowerCase().includes('twitter') && <Twitter size={32} className="mb-2"/>}
                   {!['github', 'linkedin', 'twitter'].some(k => s.platform.toLowerCase().includes(k)) && <ExternalLink size={32} className="mb-2"/>}
                   
                   <span className="font-bold uppercase tracking-widest text-sm">{s.platform}</span>
                </a>
              ))}
              
              {/* Address Box */}
              {address && (
                 <div className="col-span-2 bg-neutral-900 border-2 border-yellow-400/30 p-4 flex flex-col items-center justify-center text-center opacity-70">
                    <MapPin size={24} className="mb-2"/>
                    <span className="font-bold uppercase text-xs">{address}</span>
                 </div>
              )}
           </div>

           <footer className="mt-20 text-yellow-600 text-xs font-bold tracking-[0.3em] uppercase">
              End of Transmission // {new Date().getFullYear()}
           </footer>
        </div>
      </div>

      <style jsx>{`
        .text-stroke-yellow {
          -webkit-text-stroke: 2px #EAB308;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TemplateHazard;