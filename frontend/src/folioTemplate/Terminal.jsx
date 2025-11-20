import { Terminal, Code, ExternalLink, Github, Mail, FileText, Twitter, Linkedin, Coffee, Monitor, Layers, Cpu } from 'lucide-react';

const TemplateTerminal = ({ user }) => {
  const { name, bio, social = [], skills = [], projects = [] } = user || {};
  
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#00ff41] font-mono p-4 selection:bg-[#00ff41] selection:text-black">
      <div className="max-w-4xl mx-auto border border-[#30363d] rounded-lg overflow-hidden bg-[#010409] shadow-2xl">
        {/* Window Header */}
        <div className="bg-[#161b22] border-b border-[#30363d] p-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-xs text-gray-400">user@dev-portfolio:~</span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 space-y-8">
          
          {/* Header Section */}
          <section>
            <p className="mb-2 text-blue-400">Last login: {new Date().toDateString()} on ttys000</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">
              <span className="text-[#00ff41] mr-2">➜</span>
              {name}
              <span className="animate-pulse">_</span>
            </h1>
            <p className="text-gray-400 max-w-2xl leading-relaxed mt-4 text-lg">
              {bio || "System initialized. Ready to build."}
            </p>
          </section>

          {/* Skills Array */}
          <section>
             <div className="text-yellow-400 mb-2">const skills = [</div>
             <div className="pl-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-gray-300">
                {skills.map((skill, i) => (
                  <span key={i}>"{skill}"<span className="text-gray-600">{i < skills.length - 1 ? ',' : ''}</span></span>
                ))}
             </div>
             <div className="text-yellow-400 mt-2">];</div>
          </section>

          {/* Projects "Files" */}
          <section>
            <h2 className="text-xl text-white border-b border-[#30363d] pb-2 mb-4 flex items-center gap-2">
              <Terminal size={18} /> ./projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p, i) => (
                <div key={i} className="group border border-[#30363d] p-4 hover:bg-[#161b22] transition cursor-pointer">
                  <div className="flex justify-between items-start">
                     <h3 className="text-[#79c0ff] font-bold group-hover:underline">./{p.title.toLowerCase().replace(/\s/g, '-')}</h3>
                     <span className="text-xs text-gray-500">r-x</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2 mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex gap-4 text-sm">
                    {p.github && <a href={p.github} className="flex items-center gap-1 hover:text-white"><Github size={14}/> code</a>}
                    {p.deployed && <a href={p.deployed} className="flex items-center gap-1 hover:text-white"><ExternalLink size={14}/> deploy</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social Footer */}
          <footer className="pt-8 border-t border-[#30363d] flex flex-wrap gap-6 text-sm text-gray-500">
             {social.map((s, i) => (
               <a key={i} href={s.url} className="hover:text-[#00ff41] transition">[ {s.platform} ]</a>
             ))}
          </footer>

        </div>
      </div>
    </div>
  );
};

export default TemplateTerminal;