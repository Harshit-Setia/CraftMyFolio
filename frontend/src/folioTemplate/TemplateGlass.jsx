import React from 'react';

const TemplateGlass = ({ user }) => {
  const {
    name, bio, avatar, resume, email,
    skills = [],
    projects = [],
  } = user || {};

  return (
    <div className="min-h-screen font-sans text-slate-800 p-4 md:p-12 relative overflow-hidden">
      
      {/* --- Background Gradient --- */}
      {/* In a real app, you could let the user pick these colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 -z-10"></div>
      
      {/* --- Floating Shapes for effect --- */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob -z-10"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 -z-10"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 -z-10"></div>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* --- Header Card --- */}
        <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
           {avatar && <img src={avatar} alt={name} className="w-40 h-40 rounded-full object-cover border-4 border-white/50 shadow-lg" />}
           <div className="flex-1">
             <h1 className="text-5xl md:text-6xl font-extrabold text-purple-500 drop-shadow-sm mb-4">{name}</h1>
             <p className="text-lg md:text-xl text-slate-800 font-medium max-w-2xl">{bio}</p>
             
             <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
               {email && <a href={`mailto:${email}`} className="px-6 py-3 bg-white text-purple-600 font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition transform">Contact Me</a>}
               {resume && <a href={resume} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:bg-purple-700 transition transform">Download CV</a>}
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* --- Projects Column (2/3 width) --- */}
            <div className="md:col-span-2 space-y-8">
                <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-3xl font-bold text-purple-900 mb-6">Selected Work</h2>
                    <div className="space-y-8">
                        {projects.map((p, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-baseline">
                                   <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition">{p.title}</h3>
                                   {p.deployed && <a href={p.deployed} className="text-sm font-bold uppercase tracking-wider text-purple-800 border border-purple-800 px-3 py-1 rounded-full hover:bg-purple-800 hover:text-white transition">Visit</a>}
                                </div>
                                <p className="mt-2 text-slate-700 leading-relaxed">{p.description}</p>
                            </div>
                        ))}
                        {projects.length === 0 && <p className="text-slate-600">Coming soon...</p>}
                    </div>
                </div>
            </div>

            {/* --- Sidebar Column (Skills & More) --- */}
            <div className="space-y-8">
                <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold text-purple-900 mb-4">Toolbox</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <span key={i} className="bg-white/60 px-3 py-1 rounded-lg text-sm font-semibold text-purple-900 shadow-sm">
                                {skill}
                            </span>
                        ))}
                         {skills.length === 0 && <p className="text-slate-600 text-sm">No skills listed.</p>}
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default TemplateGlass;